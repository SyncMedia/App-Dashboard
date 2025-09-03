import { LineData } from "@/components/LineChart";
import { RankedItem } from "@/components/RankedList";
import { FilterState } from "@/components/UniversalFilterBar";
import { SColors } from "@/utils";
import { ClickHouseClient, ResultSet } from "@clickhouse/client-web";

const qfilters = (filters: FilterState): string => {
    const metrosFilter = filters.metro !== "All Metros" ? " AND proj.center = {metros_filter: String} " : "";
    const nccsFilter = filters.nccs !== "All NCCS" ? " AND proj.sec = {nccs_filter: String} " : "";
    const genderFilter = filters.gender !== "All Genders" ? " AND proj.gender = {gender_filter: String}" : "";
    const ageGroupFilter = filters.ageGroup !== "All Ages" ? " AND proj.age_group = {age_group_filter: String}" : "";

    return `
    aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    ${metrosFilter}
    ${nccsFilter}
    ${genderFilter}
    ${ageGroupFilter}`
}

const runQuery = async (
    client: ClickHouseClient,
    query: string,
    filters: FilterState,
    category: string,
): Promise<unknown[]> => {

    const data = await client.query({
        query: query,
        format: 'JSONEachRow',
        query_params: {
            var_starttime: filters.dateRange.start.format("YYYY-MM-DD HH:mm:ss"),
            var_endtime: filters.dateRange.end.format("YYYY-MM-DD HH:mm:ss"),
            metros_filter: filters.metro,
            nccs_filter: filters.nccs,
            gender_filter: filters.gender,
            age_group_filter: filters.ageGroup,
            app_category: category
        }
    })
        .then(resultSet => resultSet.json())

    return data
}

const loadTotalUsers = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
): Promise<number> => {
    const q = `
    SELECT
        ROUND(SUM(projection_factor), 2) AS total_users
    FROM (
        SELECT DISTINCT
            aus.token,
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        LEFT JOIN prod.sdk_app_meta AS meta
            ON aus.package = meta.package
        WHERE 
            ${qfilters(filters)}
           AND meta.category = {app_category: String}
    ) AS unique_devices`

    const result = await runQuery(client, q, filters, category)

    return result[0]['total_users']
}

const loadWau = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
): Promise<number> => {
    const q = `
    WITH max_date AS (
        SELECT max(toDate(start_ts)) AS max_dt
        FROM prod.app_usage_stat
        WHERE 
            start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    )
    SELECT
        ROUND(SUM(projection_factor), 2) AS total_wau
    FROM (
        SELECT DISTINCT
            aus.token,
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        INNER JOIN prod.sdk_app_meta AS meta
            ON aus.package = meta.package
        JOIN max_date ON 1 = 1
        WHERE 
            ${qfilters(filters)}
            AND toDate(aus.start_ts) BETWEEN subtractDays(max_date.max_dt, 6) AND max_date.max_dt
            AND meta.category = {app_category: String}
    ) AS unique_devices`

    const result = await runQuery(client, q, filters, category)

    return result[0]['total_wau']
}

const loadMau = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
): Promise<number> => {
    const q = `
    WITH max_date AS (
        SELECT max(toDate(start_ts)) AS max_dt
        FROM prod.app_usage_stat
        WHERE 
            start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    )
    SELECT
        ROUND(SUM(projection_factor), 2) AS total_mau
    FROM (
        SELECT DISTINCT
            aus.token,
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        INNER JOIN prod.sdk_app_meta AS meta
            ON aus.package = meta.package
        JOIN max_date ON 1 = 1
        WHERE 
            ${qfilters(filters)}
            AND toDate(aus.start_ts) BETWEEN subtractDays(max_date.max_dt, 29) AND max_date.max_dt
            AND meta.category = {app_category: String}
    ) AS unique_devices`

    const result = await runQuery(client, q, filters, category)

    return result[0]['total_mau']
}

const avgSession = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
): Promise<number> => {
    const q = `
    SELECT 
        ROUND(SUM(aus.duration) / 60 / COUNT(DISTINCT aus.token), 2) AS avg_session_duration_minutes
    FROM prod.app_usage_stat AS aus
    INNER JOIN prod.sdk_app_meta AS meta
        ON aus.package = meta.package
    INNER JOIN prod.sdk_device_projections AS proj
        ON aus.token = proj.device_id
    WHERE 
        ${qfilters(filters)}
        AND meta.category = {app_category: String}`

    const result = await runQuery(client, q, filters, category)

    return result[0]['avg_session_duration_minutes']
}

export const loadTopRow = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
) => {
    const tau = await loadTotalUsers(client, filters, category)
    const wau = await loadWau(client, filters, category)
    const mau = await loadMau(client, filters, category)
    const avg_sess = await avgSession(client, filters, category)

    return {
        tau,
        wau,
        mau,
        avg_sess
    }
}

export const loadDatewiseReach = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
): Promise<LineData[]> => {
    const q = `
    WITH max_date AS (
        SELECT max(toDate(start_ts)) AS max_dt
        FROM prod.app_usage_stat
        WHERE 
            start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    ),
    daily_unique AS (
        SELECT
            toDate(aus.start_ts) AS date,
            aus.token,
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        INNER JOIN prod.sdk_app_meta AS meta
            ON aus.package = meta.package
        JOIN max_date ON 1 = 1
        WHERE 
            ${qfilters(filters)}
            AND meta.category = {app_category: String}
        GROUP BY date, aus.token, proj.projection_factor
    )
    SELECT
        date,
        formatDateTime(date, '%b %e') AS sdate,
        ROUND(SUM(projection_factor), 2) AS value
    FROM daily_unique
    GROUP BY date
    ORDER BY date`

    const result = await runQuery(client, q, filters, category)

    return result as LineData[]
}

export const loadTopAppsByCategory = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
): Promise<RankedItem[]> => {
    const q = `
    WITH max_date AS (
        SELECT max(toDate(start_ts)) AS max_dt
        FROM prod.app_usage_stat
        WHERE 
            start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    )
    SELECT 
        app_name,
        category,
        ROUND(SUM(daily_reach), 2) AS dau
    FROM (
        -- Compute daily reach per app using unique devices
        SELECT 
            app_name,
            category,
            date,
            SUM(projection_factor) AS daily_reach
        FROM (
            SELECT 
                toDate(aus.start_ts) AS date,
                COALESCE(meta.nickname, aus.package) AS app_name,
                COALESCE(meta.category, 'Other') AS category,
                proj.device_id,
                proj.projection_factor
            FROM prod.app_usage_stat AS aus
            INNER JOIN prod.sdk_device_projections AS proj
                ON aus.token = proj.device_id
            INNER JOIN prod.sdk_app_meta AS meta
                ON aus.package = meta.package
            JOIN max_date ON 1 = 1
            WHERE 
                ${qfilters(filters)}
                AND meta.category = {app_category: String}
            GROUP BY date, app_name, category, proj.device_id, proj.projection_factor
        ) AS unique_devices
        GROUP BY app_name, category, date
    ) daily
    GROUP BY app_name, category
    ORDER BY dau DESC
    LIMIT 100`

    const result = await runQuery(client, q, filters, category)

    const parsed = result.map((row, index) => {
        let logo = row['logo'] || ''
        if (logo !== '') {
            logo = `${logo}/tr:w-256,h-256`
        }

        return {
            rank: index,
            label: row['app_name'],
            subtitle: row['category'],
            metric: row['dau'] + 'M',
            change: 0,
            logo: logo
        }
    })

    return parsed
}

export const loadMetroDistribution = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
) => {
    const q = `
    WITH total AS (
        SELECT SUM(projection_factor) AS total_reach
        FROM (
            SELECT DISTINCT aus.token, proj.projection_factor AS projection_factor
            FROM prod.app_usage_stat AS aus
            INNER JOIN prod.sdk_device_projections AS proj
                ON aus.token = proj.device_id
            INNER JOIN prod.sdk_app_meta AS meta
                ON aus.package = meta.package
            WHERE 
                ${qfilters(filters)}
                AND meta.category = {app_category: String}
        ) AS unique_devices
    )
    SELECT 
        metro,
        ROUND(100.0 * SUM(projection_factor) / total.total_reach, 2) AS reach_percentage
    FROM (
        SELECT DISTINCT aus.token, proj.projection_factor AS projection_factor, proj.center AS metro
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        INNER JOIN prod.sdk_app_meta AS meta
            ON aus.package = meta.package
        WHERE 
            ${qfilters(filters)}
            AND meta.category = {app_category: String}
    ) AS unique_devices
    JOIN total ON 1 = 1
    GROUP BY metro, total.total_reach
    ORDER BY reach_percentage DESC`

    const result = await runQuery(client, q, filters, category)

    const parsed = result.map((row, index) => {
        return {
            label: row['metro'],
            value: row['reach_percentage'],
            color: SColors[index]
        }
    })

    return parsed
}

export const loadGenderDistribution = async (
    client: ClickHouseClient,
    filters: FilterState,
    category: string,
) => {
    const q = `
    WITH total AS (
        SELECT SUM(projection_factor) AS total_reach
        FROM (
            SELECT DISTINCT aus.token, proj.projection_factor AS projection_factor
            FROM prod.app_usage_stat AS aus
            INNER JOIN prod.sdk_device_projections AS proj
                ON aus.token = proj.device_id
            INNER JOIN prod.sdk_app_meta AS meta
                ON aus.package = meta.package
            WHERE 
                ${qfilters(filters)}
                AND meta.category = {app_category: String}
        ) AS unique_devices
    )
    SELECT 
        gender,
        ROUND(100.0 * SUM(projection_factor) / total.total_reach, 2) AS reach_percentage
    FROM (
        SELECT DISTINCT aus.token, proj.projection_factor, proj.gender
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        INNER JOIN prod.sdk_app_meta AS meta
            ON aus.package = meta.package
        WHERE 
            ${qfilters(filters)}
            AND meta.category = {app_category: String}
    ) AS unique_devices
    JOIN total ON 1 = 1
    GROUP BY gender, total.total_reach
    ORDER BY reach_percentage DESC`

    const result = await runQuery(client, q, filters, category)

    const parsed = result.map((row, index) => {
        return {
            label: row['gender'],
            value: row['reach_percentage'],
            color: SColors[index]
        }
    })

    return parsed
}