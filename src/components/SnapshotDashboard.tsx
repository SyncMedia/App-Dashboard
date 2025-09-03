
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Eye, Clock } from "lucide-react";
import AppHeader from "./AppHeader";
import PrimaryNavTabs from "./PrimaryNavTabs";
import UniversalFilterBar, { FilterState, loadFilters } from "./UniversalFilterBar";
import KpiCard, { KpiDataItemType } from "./KpiCard";
import RankedList, { RankedItem } from "./RankedList";
import BarChart, { BarData } from "./BarChart";
import DonutChart, { DonutSegment } from "./DonutChart";
import ExportButton from "./ExportButton";
import { loadClickhouseClient } from "@/utils/general";



const LColors = [
  ["#3F5BF6", "#556DF7", "#6B7FF8", "#8291F9", "#99A3FA",
    "#AFB5FB", "#263FF5", "#1C35E1", "#142BCC", "#0C21B8",
    "#3A65FF", "#5477FF", "#6E89FF", "#889BFF", "#A2ADFF",
    "#C3C9FF", "#2D4AEF", "#233FDC", "#1935C9", "#0F2AB5",],

  ["#F43F5E", "#F65572", "#F86B86", "#FA819A", "#FB97AE",
    "#FDAEC2", "#E12C4B", "#CC2442", "#B81F3A", "#A41932",
    "#FF4968", "#FF637E", "#FF7D94", "#FF97AA", "#FFB1C0",
    "#FFC9D4", "#DC3552", "#C62E48", "#B0273F", "#9A2136",],

  ["#10B981", "#29C291", "#42CBA1", "#5BD4B1", "#74DDC1",
    "#8DE6D1", "#0DA673", "#0A9366", "#087F58", "#066C4B",
    "#33C895", "#4ED1A5", "#69DAB5", "#84E3C5", "#9FEDD5",
    "#B9F6E4", "#0EAB78", "#0C976A", "#0A835C", "#086F4E",],

  ["#F59E0B", "#F6AB29", "#F7B847", "#F8C565", "#F9D283",
    "#FAE0A1", "#E08F0A", "#CC8109", "#B77308", "#A26507",
    "#FFAA1C", "#FFB738", "#FFC454", "#FFD170", "#FFDE8C",
    "#FFEBAB", "#DB8A09", "#C77C08", "#B26E07", "#9D6106",],

  ["#64748B", "#73829A", "#8290A9", "#919EB8", "#A0ACC7",
    "#AFBAD6", "#59697E", "#4F5E71", "#455364", "#3B4857",
    "#70809B", "#7F8EAA", "#8E9CB9", "#9DAAC8", "#ACB8D7",
    "#BBC6E6", "#556175", "#4B5768", "#414D5B", "#37434E"],
]

const SColors = ['#3F5BF6', '#F43F5E', '#10B981', '#F59E0B', '#64748B']
// { rank: 5, label: "Telegram", subtitle: "Social", metric: "1.2M", change: 15.4, logo: '....' },


function areFiltersEqual(a?: FilterState[], b?: FilterState[]): boolean {
  if (!a || !b) return false
  if (a.length !== b.length) return false

  return a.every((fa, i) => {
    const fb = b[i]
    return (
      fa.metro === fb.metro &&
      fa.nccs === fb.nccs &&
      fa.gender === fb.gender &&
      fa.ageGroup === fb.ageGroup &&
      fa.dateRange.start.isSame(fb.dateRange.start, "day") &&
      fa.dateRange.end.isSame(fb.dateRange.end, "day")
    )
  })
}

function useDeepCompareEffect(callback: React.EffectCallback, dependency: FilterState[]) {
  const prevDepRef = useRef<FilterState[]>()

  // Compare old vs new filters deeply
  const isSame = areFiltersEqual(prevDepRef.current, dependency)

  if (!isSame) {
    prevDepRef.current = dependency
  }

  useEffect(callback, [prevDepRef.current])
}

const SnapshotDashboard = () => {
  const [filters, setFilters] = useState(loadFilters)

  // Sample data
  const [kpiData, setKpiData] = useState<Array<KpiDataItemType>>([
    {
      headline: "Total DAU",
      value: 0,
      delta: { value: 0, period: "vs last day" },
      // trend: []
    },
    {
      headline: "Total WAU",
      value: 0,
      delta: { value: 0, period: "vs last week" },
      // trend: []
    },
    {
      headline: "Total MAU",
      value: 0,
      delta: { value: 0, period: "vs last month" },
      // trend: []
    }
  ])

  const [topOpenedApps, setTopOpenedApps] = useState<Array<RankedItem>>([])
  const [topUsedApps, setTopUsedApps] = useState<Array<RankedItem>>([])
  const [trendingCategories, setTopTrendingCategories] = useState<Array<RankedItem>>([])
  const [metroDistribution, setMetroDistribution] = useState<Array<BarData>>([])
  const [genderDistribution, setGenderDistribution] = useState<Array<DonutSegment>>([])

  const handleExport = (format: string) => {

    // Implement export logic
  };

  const handleKpiClick = (headline: string) => {
    console.log(`Opening drill-down for ${headline}`);
    // Implement KPI drill-down modal
  };

  const handleAppClick = (item: any) => {
    console.log(`Navigating to app: ${item.label}`);
    // Implement navigation to app dashboard
  };

  const client = useMemo(loadClickhouseClient, []);

  const loadDauMauWau = useCallback(async () => {
    const metrosFilter = filters.metro !== "All Metros" ? " AND proj.center = {metros_filter: String} " : "";
    const nccsFilter = filters.nccs !== "All NCCS" ? " AND proj.sec = {nccs_filter: String} " : "";
    const genderFilter = filters.gender !== "All Genders" ? " AND proj.gender = {gender_filter: String}" : "";
    const ageGroupFilter = filters.ageGroup !== "All Ages" ? " AND proj.age_group = {age_group_filter: String}" : "";

    const q = `WITH max_date AS 
    (
        SELECT max(toDate(start_ts)) AS max_date
        FROM prod.app_usage_stat
        WHERE start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    ) 
    SELECT
      SUMIf(projection_factor, toDate(start_ts) = m.max_date) AS dau,
      SUMIf(projection_factor, toDate(start_ts) = subtractDays(m.max_date, 1)) AS ldau,
      SUMIf(projection_factor, toDate(start_ts) BETWEEN subtractDays(m.max_date, 6) AND m.max_date) AS wau,
      SUMIf(projection_factor, toDate(start_ts) BETWEEN subtractDays(m.max_date, 14) AND subtractDays(m.max_date, 7)) AS lwau,
      SUMIf(projection_factor, toDate(start_ts) BETWEEN subtractDays(m.max_date, 30) AND m.max_date) AS mau,
      SUMIf(projection_factor, toDate(start_ts) BETWEEN subtractDays(m.max_date, 60) AND subtractDays(m.max_date, 31)) AS lmau
    FROM (
      SELECT DISTINCT 
        aus.token, 
        proj.projection_factor,
        aus.start_ts
      FROM prod.app_usage_stat AS aus
      INNER JOIN prod.sdk_device_projections AS proj
        ON aus.token = proj.device_id
      WHERE
        aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
        ${metrosFilter}
        ${nccsFilter}
        ${genderFilter}
        ${ageGroupFilter}
    ) AS unique_devices
    JOIN max_date m ON 1=1`

    const data = await client.query({
      query: q,
      format: 'JSONEachRow',
      query_params: {
        var_starttime: filters.dateRange.start.format("YYYY-MM-DD HH:mm:ss"),
        var_endtime: filters.dateRange.end.format("YYYY-MM-DD HH:mm:ss"),
        metros_filter: filters.metro,
        nccs_filter: filters.nccs,
        gender_filter: filters.gender,
        age_group_filter: filters.ageGroup
      }
    })
      .then(resultSet => resultSet.json())

    console.log("KPI Data:", data);

    const newKpidata = JSON.parse(JSON.stringify(kpiData)) as Array<KpiDataItemType>
    [['dau', 'ldau'], ['wau', 'lwau'], ['mau', 'lmau']].forEach(([field, lfield], idx) => {
      newKpidata[idx].value = data[0][field].toFixed(2)
      newKpidata[idx].delta.value = 100;
      if (data[0][lfield] > 0) {
        newKpidata[idx].delta.value = Math.round(100 * (data[0][field] - data[0][lfield]) / data[0][lfield])
      } else if (data[0][field] > 0) {
        newKpidata[idx].delta.value = 100;
      }
    })

    setKpiData(newKpidata);
  }, [filters])

  const loadTopReachedApps = useCallback(async () => {
    const metrosFilter = filters.metro !== "All Metros" ? " AND proj.center = {metros_filter: String} " : "";
    const nccsFilter = filters.nccs !== "All NCCS" ? " AND proj.sec = {nccs_filter: String} " : "";
    const genderFilter = filters.gender !== "All Genders" ? " AND proj.gender = {gender_filter: String}" : "";
    const ageGroupFilter = filters.ageGroup !== "All Ages" ? " AND proj.age_group = {age_group_filter: String}" : "";
    //https://ik.imagekit.io/syncmedia/appography/whatsapp2_KjLZaiTow
    const q = `
    SELECT
        app_name,
        category,
        ROUND(SUM(device_proj), 2) AS reach,
        any(logo) logo
    FROM (
        SELECT
            app.nickname AS app_name,
            app.category AS category,
            proj.device_id,
            MAX(proj.projection_factor) AS device_proj,
            any(app.logo) AS logo
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        INNER JOIN prod.sdk_app_meta AS app
            ON aus.package = app.package
        WHERE
          aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
          ${metrosFilter}
          ${nccsFilter}
          ${genderFilter}
          ${ageGroupFilter}
        GROUP BY app.nickname, app.category, proj.device_id
    ) AS t
    GROUP BY app_name, category
    ORDER BY reach DESC
    LIMIT 100`

    const data = await client.query({
      query: q,
      format: 'JSONEachRow',
      query_params: {
        var_starttime: filters.dateRange.start.format("YYYY-MM-DD HH:mm:ss"),
        var_endtime: filters.dateRange.end.format("YYYY-MM-DD HH:mm:ss"),
        metros_filter: filters.metro,
        nccs_filter: filters.nccs,
        gender_filter: filters.gender,
        age_group_filter: filters.ageGroup
      }
    })
      .then(resultSet => resultSet.json())

    // { rank: 5, label: "Telegram", subtitle: "Social", metric: "1.2M", change: 15.4 },

    const parsed = data.map((row, index) => {
      let logo = row['logo'] || ''
      if (logo !== '') {
        logo = `${logo}/tr:w-256,h-256`
      }

      return {
        rank: index,
        label: row['app_name'],
        subtitle: row['category'],
        metric: row['reach'] + 'M',
        change: 0,
        logo: logo
      }
    })

    setTopOpenedApps(parsed)
  }, [filters])

  const loadTopUsedApps = useCallback(async () => {
    const metrosFilter = filters.metro !== "All Metros" ? " AND proj.center = {metros_filter: String} " : "";
    const nccsFilter = filters.nccs !== "All NCCS" ? " AND proj.sec = {nccs_filter: String} " : "";
    const genderFilter = filters.gender !== "All Genders" ? " AND proj.gender = {gender_filter: String}" : "";
    const ageGroupFilter = filters.ageGroup !== "All Ages" ? " AND proj.age_group = {age_group_filter: String}" : "";

    const q = `
    SELECT
      app.nickname AS app_name,
      app.category AS category,
      ROUND(SUM(aus.duration) / 3600, 2) AS total_duration_hours,
      any(app.logo) AS logo
    FROM prod.app_usage_stat AS aus
    INNER JOIN prod.sdk_device_projections AS proj
        ON aus.token = proj.device_id
    INNER JOIN prod.sdk_app_meta AS app
        ON aus.package = app.package
    WHERE
        aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
        ${metrosFilter}
        ${nccsFilter}
        ${genderFilter}
        ${ageGroupFilter}
    GROUP BY
        app.nickname,
        app.category
    QUALIFY total_duration_hours > 0
    ORDER BY
        total_duration_hours DESC
        LIMIT 100`

    const data = await client.query({
      query: q,
      format: 'JSONEachRow',
      query_params: {
        var_starttime: filters.dateRange.start.format("YYYY-MM-DD HH:mm:ss"),
        var_endtime: filters.dateRange.end.format("YYYY-MM-DD HH:mm:ss"),
        metros_filter: filters.metro,
        nccs_filter: filters.nccs,
        gender_filter: filters.gender,
        age_group_filter: filters.ageGroup
      }
    })
      .then(resultSet => resultSet.json())

    // { rank: 5, label: "Telegram", subtitle: "Social", metric: "1.2M", change: 15.4 },

    const parsed = data.map((row, index) => {
      let logo = row['logo'] || ''
      if (logo !== '') {
        logo = `${logo}/tr:w-256,h-256`
      }

      return {
        rank: index,
        label: row['app_name'],
        subtitle: row['category'],
        metric: row['total_duration_hours'] + 'hrs',
        change: 0,
        logo: logo
      }
    })

    setTopUsedApps(parsed)
  }, [filters])

  const loadTopTrendingCategories = useCallback(async () => {
    const metrosFilter = filters.metro !== "All Metros" ? " AND proj.center = {metros_filter: String} " : "";
    const nccsFilter = filters.nccs !== "All NCCS" ? " AND proj.sec = {nccs_filter: String} " : "";
    const genderFilter = filters.gender !== "All Genders" ? " AND proj.gender = {gender_filter: String}" : "";
    const ageGroupFilter = filters.ageGroup !== "All Ages" ? " AND proj.age_group = {age_group_filter: String}" : "";

    const q = `
      WITH category_reach AS (
          SELECT
              COALESCE(category, 'Other') AS category,
              SUM(projection_factor) AS reach
          FROM (
              SELECT DISTINCT
                  aus.token,
                  appmeta.category AS category,
                  proj.projection_factor
              FROM prod.app_usage_stat AS aus
              LEFT JOIN prod.sdk_app_meta AS appmeta
                  ON aus.package = appmeta.package
              INNER JOIN prod.sdk_device_projections AS proj
                  ON aus.token = proj.device_id
              WHERE
                  aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
                  ${metrosFilter}
                  ${nccsFilter}
                  ${genderFilter}
                  ${ageGroupFilter}
          ) t
          GROUP BY category
          HAVING category != ''
      )
      SELECT
          category,
          ROUND(reach * 100 / SUM(reach) OVER (), 2) AS pct_share
      FROM category_reach
      ORDER BY pct_share DESC
      LIMIT 3`

    const data = await client.query({
      query: q,
      format: 'JSONEachRow',
      query_params: {
        var_starttime: filters.dateRange.start.format("YYYY-MM-DD HH:mm:ss"),
        var_endtime: filters.dateRange.end.format("YYYY-MM-DD HH:mm:ss"),
        metros_filter: filters.metro,
        nccs_filter: filters.nccs,
        gender_filter: filters.gender,
        age_group_filter: filters.ageGroup
      }
    })
      .then(resultSet => resultSet.json())

    const parsed = data.map((row, index) => {
      let logo = row['logo'] || ''
      if (logo !== '') {
        logo = `${logo}/tr:w-256,h-256`
      }

      return {
        rank: index,
        label: row['category'],
        metric: row['pct_share'] + '%',
        change: 0,
        logo: logo
      }
    })

    setTopTrendingCategories(parsed)
  }, [filters])

  const loadMetroDistribution = useCallback(async () => {
    const metrosFilter = filters.metro !== "All Metros" ? " AND proj.center = {metros_filter: String} " : "";
    const nccsFilter = filters.nccs !== "All NCCS" ? " AND proj.sec = {nccs_filter: String} " : "";
    const genderFilter = filters.gender !== "All Genders" ? " AND proj.gender = {gender_filter: String}" : "";
    const ageGroupFilter = filters.ageGroup !== "All Ages" ? " AND proj.age_group = {age_group_filter: String}" : "";

    const q = `
      WITH unique_devices AS (
        SELECT 
            aus.token,
            proj.projection_factor,
            proj.center
        FROM prod.app_usage_stat AS aus
        INNER JOIN prod.sdk_device_projections AS proj
            ON aus.token = proj.device_id
        WHERE 
          aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
          ${metrosFilter}
          ${nccsFilter}
          ${genderFilter}
          ${ageGroupFilter}
        GROUP BY aus.token, proj.projection_factor, proj.center
      )
      SELECT
          center AS metro,
          SUM(projection_factor) AS reach,
          ROUND(100.0 * SUM(projection_factor) / SUM(SUM(projection_factor)) OVER (), 2) AS percentage
      FROM unique_devices
      GROUP BY center
      ORDER BY percentage DESC`

    const data = await client.query({
      query: q,
      format: 'JSONEachRow',
      query_params: {
        var_starttime: filters.dateRange.start.format("YYYY-MM-DD HH:mm:ss"),
        var_endtime: filters.dateRange.end.format("YYYY-MM-DD HH:mm:ss"),
        metros_filter: filters.metro,
        nccs_filter: filters.nccs,
        gender_filter: filters.gender,
        age_group_filter: filters.ageGroup
      }
    })
      .then(resultSet => resultSet.json())


    const parsed = data.map((row, index) => {
      return {
        label: row['metro'],
        value: row['percentage'],
        color: SColors[index]
      }
    })

    setMetroDistribution(parsed)
  }, [filters])

  const loadGenderSummary = useCallback(async () => {
    const metrosFilter = filters.metro !== "All Metros" ? " AND proj.center = {metros_filter: String} " : "";
    const nccsFilter = filters.nccs !== "All NCCS" ? " AND proj.sec = {nccs_filter: String} " : "";
    const genderFilter = filters.gender !== "All Genders" ? " AND proj.gender = {gender_filter: String}" : "";
    const ageGroupFilter = filters.ageGroup !== "All Ages" ? " AND proj.age_group = {age_group_filter: String}" : "";

    const q = `
    WITH total AS (
      SELECT SUM(projection_factor) AS total_reach
      FROM (
          SELECT DISTINCT aus.token, proj.projection_factor AS projection_factor
          FROM prod.app_usage_stat AS aus
          INNER JOIN prod.sdk_device_projections AS proj
              ON aus.token = proj.device_id
          LEFT JOIN prod.sdk_app_meta AS meta
              ON aus.package = meta.package
          WHERE 
            aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
            ${metrosFilter}
            ${nccsFilter}
            ${genderFilter}
            ${ageGroupFilter}
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
        LEFT JOIN prod.sdk_app_meta AS meta
            ON aus.package = meta.package
        WHERE 
          aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
          ${metrosFilter}
          ${nccsFilter}
          ${genderFilter}
          ${ageGroupFilter}
    ) AS unique_devices
    JOIN total ON 1 = 1
    GROUP BY gender, total.total_reach
    ORDER BY reach_percentage DESC`

    const data = await client.query({
      query: q,
      format: 'JSONEachRow',
      query_params: {
        var_starttime: filters.dateRange.start.format("YYYY-MM-DD HH:mm:ss"),
        var_endtime: filters.dateRange.end.format("YYYY-MM-DD HH:mm:ss"),
        metros_filter: filters.metro,
        nccs_filter: filters.nccs,
        gender_filter: filters.gender,
        age_group_filter: filters.ageGroup
      }
    })
      .then(resultSet => resultSet.json())


    const parsed = data.map((row, index) => {
      return {
        label: row['gender'],
        value: row['reach_percentage'],
        color: SColors[index]
      }
    })

    setGenderDistribution(parsed)
  }, [filters])

  // 
  useDeepCompareEffect(() => {
    loadDauMauWau()
    loadTopReachedApps()
    loadTopUsedApps()
    loadTopTrendingCategories()
    loadMetroDistribution()
    loadGenderSummary()
  }, [filters])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AppHeader
        breadcrumbs={["Dashboard"]}
      />

      <PrimaryNavTabs
        activeTab="home"
        onTabChange={(tab) => console.log(`Switched to ${tab}`)}
      />

      <UniversalFilterBar
        onFiltersChange={setFilters}
      />

      <main className="p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpiData.map((kpi) => (
            <KpiCard
              key={kpi.headline}
              item={kpi}

              onClick={() => handleKpiClick(kpi.headline)}
            />
          ))}
        </div>

        {/* Main Grid */}
        <div className="space-y-6">
          {/* Row 1: Top Apps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RankedList
              title={
                <div className="flex items-center gap-2">
                  <span>Top Most Reached Apps</span>
                  <div className="flex items-center gap-1 bg-[#3F5BF6]/10 px-2 py-1 rounded-full">
                    <Eye className="w-3 h-3 text-[#3F5BF6]" />
                    <span className="text-xs text-[#64748B]">Opens</span>
                  </div>
                </div>
              }
              data={topOpenedApps}
              onItemClick={handleAppClick}
            />
            <RankedList
              title={
                <div className="flex items-center gap-2">
                  <span>Top Most Frequently Opened Apps</span>
                  <div className="flex items-center gap-1 bg-[#F43F5E]/10 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3 text-[#F43F5E]" />
                    <span className="text-xs text-[#64748B]">Time</span>
                  </div>
                </div>
              }
              data={topUsedApps}
              onItemClick={handleAppClick}
            />
          </div>

          {/* Row 2: Categories and Metro Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RankedList
              title="Top 3 Trending Categories"
              data={trendingCategories}
              onItemClick={handleAppClick}
            />
            <BarChart
              title="Metro-wise Distribution"
              data={metroDistribution}
            />
          </div>

          {/* Row 3: Gender Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DonutChart
              title="Gender Distribution Summary"
              segments={genderDistribution}
            />
            <div></div> {/* Empty space for future expansion */}
          </div>
        </div>
      </main>

      {/* <ExportButton onExport={handleExport} /> */}
    </div>
  );
};

export default SnapshotDashboard;
