import { BarData } from "@/components/BarChart";
import { HeatmapData } from "@/components/HeatmapChart";
import { KpiDataItemType } from "@/components/KpiCard";
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
    app: string,
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
            app: app
        }
    })
        .then(resultSet => resultSet.json())

    return data
}

export interface AppMeta { nickname: string, logo: string, package: string, category: string }

export const loadMeta = async (
    client: ClickHouseClient,
    app: string,
): Promise<AppMeta> => {
    console.log("Loading meta for app:", app);
    const q = `
    SELECT 
        nickname, logo, package, category
    FROM prod.sdk_app_meta
    WHERE 
        lower(nickname) = lower({app: String})
    LIMIT 1`

    const data = await client.query({
        query: q,
        format: 'JSONEachRow',
        query_params: {
            app: app
        }
    })
        .then(resultSet => resultSet.json())

    return data[0] as AppMeta
}

export const loadGenderDistribution = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
): Promise<{ label: string, value: number, color: string }[]> => {
    const q = `
    WITH unique_devices AS (
        SELECT DISTINCT
            aus.token,
            proj.gender,
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        WHERE 
            ${qfilters(filters)}
        AND aus.package = {app: String}
    )
    SELECT
        gender,
        ROUND(100.0 * SUM(projection_factor) / SUM(SUM(projection_factor)) OVER (), 2) AS user_percentage
    FROM unique_devices
    GROUP BY gender
    ORDER BY user_percentage DESC`

    const result = await runQuery(client, q, filters, app.package)

    const parsed = result.map((row, index) => {
        return {
            label: row['gender'],
            value: row['user_percentage'],
            color: SColors[index]
        }
    })

    return parsed
}

export const loadAgeDistribution = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
): Promise<BarData[]> => {
    const q = `
    WITH unique_devices AS (
        SELECT DISTINCT
            aus.token,
            proj.age_group,
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        WHERE 
            ${qfilters(filters)}
            AND aus.package = {app: String}
    )
    SELECT
        age_group,
        ROUND(100.0 * SUM(projection_factor) / SUM(SUM(projection_factor)) OVER (), 2) AS user_percentage
    FROM unique_devices
    GROUP BY age_group
    ORDER BY user_percentage DESC`

    const result = await runQuery(client, q, filters, app.package)

    const parsed = result.map((row, index) => {
        return {
            label: row['age_group'],
            value: row['user_percentage'],
            color: SColors[index]
        }
    })

    return parsed
}

const loadTU = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
): Promise<number> => {
    const q = `
    SELECT 
        round(SUM(projection_factor),2) AS total_reach
    FROM (
        SELECT DISTINCT 
            aus.token, 
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        WHERE 
            ${qfilters(filters)}
            AND aus.package = {app: String}
    ) AS unique_devices`

    const result = await runQuery(client, q, filters, app.package)

    return result[0]['total_reach'] as number
}

export const loadAU = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
): Promise<number> => {
    const q = `
    SELECT 
        round(SUM(projection_factor),2) AS total_reach
    FROM (
        SELECT DISTINCT 
            aus.token, 
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        WHERE 
            ${qfilters(filters)}
            AND aus.package = {app: String}
    ) AS unique_devices`

    const result = await runQuery(client, q, filters, app.package)

    return result[0]['total_reach'] as number
}

export const loadRau = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
    days: number
): Promise<number> => {
    const q = `
    WITH max_date AS (
        SELECT max(toDate(start_ts)) AS max_dt
        FROM prod.app_usage_stat
        WHERE 
            start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    )
    SELECT 
        ROUND(SUM(projection_factor), 2) AS total_rau
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
            AND aus.package = {app: String}
            AND toDate(aus.start_ts) BETWEEN subtractDays(max_date.max_dt, ${days}) AND max_date.max_dt
    ) AS unique_devices`

    const result = await runQuery(client, q, filters, app.package)

    return result[0]['total_rau'] as number
}

const loadRetentionRate = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
) => {
    const q = `
    WITH date_range AS (
        SELECT 
            toDate(min(start_ts)) AS start_date,
            toDate(max(start_ts)) AS end_date,
            dateDiff('day', min(start_ts), max(start_ts)) + 1 AS total_days
        FROM prod.app_usage_stat
        WHERE 
            start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    ),
    user_active_days AS (
        SELECT 
            aus.token,
            COUNT(DISTINCT toDate(aus.start_ts)) AS active_days
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        WHERE 
            ${qfilters(filters)}
            AND aus.package = {app: String}
        GROUP BY aus.token
    )
    SELECT 
        ROUND(AVG(uad.active_days / dr.total_days) * 100, 2) AS avg_retention_percentage
    FROM user_active_days AS uad
    JOIN date_range AS dr ON 1 = 1`

    const result = await runQuery(client, q, filters, app.package)

    return result[0]['avg_retention_percentage'] as number
}

export const loadAvgSession = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
): Promise<number> => {
    const q = `
    SELECT 
        ROUND(AVG(user_avg) / 60, 2) AS avg_session_duration_per_user
    FROM (
        SELECT 
            token, 
            AVG(duration) AS user_avg
        FROM prod.app_usage_stat AS aus    
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        WHERE 
            ${qfilters(filters)}
            AND aus.package = {app: String}
        GROUP BY token
    )`

    const result = await runQuery(client, q, filters, app.package)

    return result[0]['avg_session_duration_per_user'] as number
}

export const loadKpis = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
): Promise<KpiDataItemType[]> => {

    const tu = await loadTU(client, filters, app);
    // const au = await loadAU(client, filters, app);
    const wau = await loadRau(client, filters, app, 6);
    const mau = await loadRau(client, filters, app, 29);
    const rr = await loadRetentionRate(client, filters, app);
    const avgSession = await loadAvgSession(client, filters, app);

    return [
        {
            headline: "Total Users",
            value: `${tu}M`
        },
        // {
        //     headline: "Active Users",
        //     value: `${au}M`
        // },
        {
            headline: "WAU",
            value: `${wau}M`
        },
        {
            headline: "MAU",
            value: `${mau}M`
        },
        {
            headline: "Retention Rate",
            value: `${rr}%`
        },
        {
            headline: "Avg Session",
            value: `${avgSession}m`
        }
    ]
}

export const loadDatewiseReach = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
): Promise<LineData[]> => {
    const q = `
    WITH max_date AS (
        SELECT max(toDate(start_ts)) AS max_dt
        FROM prod.app_usage_stat
        WHERE 
            start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    )
    SELECT
        date,  
        formatDateTime(date, '%b %e') AS sdate, 
        ROUND(SUM(projection_factor), 2) AS value
    FROM (
        SELECT 
            toDate(aus.start_ts) AS date,
            proj.device_id AS device,
            proj.projection_factor
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        JOIN max_date ON 1=1
        WHERE 
            ${qfilters(filters)}
            AND aus.package = {app: String}
        GROUP BY date, device, proj.projection_factor
    ) AS daily_unique
    GROUP BY date
    ORDER BY date`

    const result = await runQuery(client, q, filters, app.package)

    return result as LineData[]
}

export const loadHourlyHeatmapData = async (
    client: ClickHouseClient,
    filters: FilterState,
    app: AppMeta,
): Promise<HeatmapData[]> => {
    const q = `
    WITH max_date AS (
        SELECT max(toDate(start_ts)) AS max_dt
        FROM prod.app_usage_stat
        WHERE 
            start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    )
    SELECT
        formatDateTime(start_ts, '%H') AS hour,
        formatDateTime(start_ts, '%a') AS day,
        toDayOfWeek(start_ts) AS weekday_num,
        ROUND(SUM(projection_factor), 2) AS value
    FROM (
        SELECT DISTINCT 
            aus.token, 
            proj.projection_factor, 
            aus.start_ts
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        CROSS JOIN max_date
        WHERE 
            ${qfilters(filters)}
            AND aus.package = {app: String}
    ) AS unique_devices
    GROUP BY day, hour, weekday_num
    ORDER BY weekday_num, hour`
    const result = await runQuery(client, q, filters, app.package)

    return result as HeatmapData[]
}