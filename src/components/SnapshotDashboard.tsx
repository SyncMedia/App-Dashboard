
import { useEffect, useMemo, useState } from "react";
import { Eye, Clock } from "lucide-react";
import AppHeader from "./AppHeader";
import PrimaryNavTabs from "./PrimaryNavTabs";
import UniversalFilterBar, { loadFilters } from "./UniversalFilterBar";
import KpiCard from "./KpiCard";
import RankedList from "./RankedList";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import ExportButton from "./ExportButton";
import { loadClickhouseClient } from "@/utils/general";

const SnapshotDashboard = () => {
  const [filters, setFilters] = useState(loadFilters)

  // Sample data
  const [kpiData, setKpiData] = useState([
    {
      headline: "Total DAU",
      value: "",
      delta: { value: 0, period: "vs last day" },
      trend: []
    },
    {
      headline: "Total WAU",
      value: "",
      delta: { value: 0, period: "vs last week" },
      trend: []
    },
    {
      headline: "Total MAU",
      value: "24.1M",
      delta: { value: 0, period: "vs last month" },
      trend: []
    }
  ])

  const topOpenedApps = [
    { rank: 1, label: "WhatsApp", subtitle: "Social", metric: "2.1M", change: 5.2, logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
    { rank: 2, label: "Instagram", subtitle: "Social", metric: "1.8M", change: 12.3, logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
    { rank: 3, label: "YouTube", subtitle: "Entertainment", metric: "1.6M", change: -3.1, logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" },
    { rank: 4, label: "Facebook", subtitle: "Social", metric: "1.4M", change: 8.7, logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
    { rank: 5, label: "Telegram", subtitle: "Social", metric: "1.2M", change: 15.4 },
    { rank: 6, label: "Twitter", subtitle: "Social", metric: "1.1M", change: -2.3 },
    { rank: 7, label: "Snapchat", subtitle: "Social", metric: "0.9M", change: 7.8 },
    { rank: 8, label: "TikTok", subtitle: "Entertainment", metric: "0.8M", change: 25.1 },
    { rank: 9, label: "LinkedIn", subtitle: "Professional", metric: "0.7M", change: 4.2 },
    { rank: 10, label: "Pinterest", subtitle: "Social", metric: "0.6M", change: 9.3 },
    { rank: 11, label: "Reddit", subtitle: "Social", metric: "0.5M", change: 12.7 },
    { rank: 12, label: "Discord", subtitle: "Communication", metric: "0.4M", change: 18.9 },
    { rank: 13, label: "Skype", subtitle: "Communication", metric: "0.3M", change: -8.1 },
    { rank: 14, label: "Viber", subtitle: "Communication", metric: "0.2M", change: -5.4 },
    { rank: 15, label: "Signal", subtitle: "Communication", metric: "0.1M", change: 22.6 }
  ];

  const topUsedApps = [
    { rank: 1, label: "YouTube", subtitle: "Entertainment", metric: "3.2hrs", change: 8.1, logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" },
    { rank: 2, label: "Instagram", subtitle: "Social", metric: "2.8hrs", change: 15.2, logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
    { rank: 3, label: "WhatsApp", subtitle: "Social", metric: "2.1hrs", change: 3.4, logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
    { rank: 4, label: "Netflix", subtitle: "Entertainment", metric: "1.9hrs", change: 22.1 },
    { rank: 5, label: "Spotify", subtitle: "Music", metric: "1.7hrs", change: 12.8 },
    { rank: 6, label: "TikTok", subtitle: "Entertainment", metric: "1.5hrs", change: 28.3 },
    { rank: 7, label: "Facebook", subtitle: "Social", metric: "1.3hrs", change: 5.7, logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
    { rank: 8, label: "Telegram", subtitle: "Social", metric: "1.1hrs", change: 11.2 },
    { rank: 9, label: "Twitter", subtitle: "Social", metric: "0.9hrs", change: -4.6 },
    { rank: 10, label: "Amazon Prime", subtitle: "Entertainment", metric: "0.8hrs", change: 19.4 },
    { rank: 11, label: "Disney+", subtitle: "Entertainment", metric: "0.7hrs", change: 31.2 },
    { rank: 12, label: "Snapchat", subtitle: "Social", metric: "0.6hrs", change: 8.9 },
    { rank: 13, label: "LinkedIn", subtitle: "Professional", metric: "0.5hrs", change: 7.3 },
    { rank: 14, label: "Pinterest", subtitle: "Social", metric: "0.4hrs", change: 13.8 },
    { rank: 15, label: "Reddit", subtitle: "Social", metric: "0.3hrs", change: 16.4 }
  ];

  const trendingCategories = [
    { rank: 1, label: "Entertainment", subtitle: "Video & Music", metric: "+18.2%", change: 18.2 },
    { rank: 2, label: "Social", subtitle: "Messaging & Social", metric: "+12.4%", change: 12.4 },
    { rank: 3, label: "Shopping", subtitle: "E-commerce", metric: "+9.7%", change: 9.7 }
  ];

  const metroDistribution = [
    { label: "Mumbai", value: 28, color: "#3F5BF6" },
    { label: "Delhi", value: 24, color: "#F43F5E" },
    { label: "Bangalore", value: 18, color: "#10B981" },
    { label: "Chennai", value: 15, color: "#F59E0B" },
    { label: "Others", value: 15, color: "#64748B" }
  ];

  const genderDistribution = [
    { label: "Male", value: 52, color: "#3F5BF6" },
    { label: "Female", value: 45, color: "#F43F5E" },
    { label: "Other", value: 3, color: "#64748B" }
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting dashboard as ${format}`);
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

  useEffect(() => {
    const metrosFilter = filters.metro !== "All Metros" ? " AND proj.center = {metros_filter: String} " : "";
    const nccsFilter = filters.nccs !== "All NCCS" ? " AND proj.sec = {nccs_filter: String} " : "";
    const genderFilter = filters.gender !== "All Genders" ? " AND proj.gender = {gender_filter: String}" : "";
    const ageGroupFilter = filters.ageGroup !== "All Ages" ? " AND proj.age_group = {age_group_filter: String}" : "";

    const q = `WITH 
    (
        SELECT max(toDate(start_ts)) 
        FROM prod.app_usage_stat
        WHERE start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    ) AS max_date

SELECT
    COUNT(DISTINCT if(toDate(aus.start_ts) = max_date, aus.token, NULL)) AS DAU,
    COUNT(DISTINCT if(toDate(aus.start_ts) BETWEEN (max_date - INTERVAL 1 DAY) AND max_date, aus.token, NULL)) AS LDAU,
    COUNT(DISTINCT if(toDate(aus.start_ts) >= (max_date - INTERVAL 7 DAY), aus.token, NULL)) AS WAU,
    COUNT(DISTINCT if(toDate(aus.start_ts) BETWEEN (max_date - INTERVAL 14 DAY) AND (max_date - INTERVAL 7 DAY), aus.token, NULL)) AS LWAU,
    COUNT(DISTINCT if(toDate(aus.start_ts) >= (max_date - INTERVAL 30 DAY), aus.token, NULL)) AS MAU,
    COUNT(DISTINCT if(toDate(aus.start_ts) BETWEEN (max_date - INTERVAL 60 DAY) AND (max_date - INTERVAL 30 DAY), aus.token, NULL)) AS LMAU
FROM prod.app_usage_stat AS aus
INNER JOIN prod.sdk_device_projections AS proj
    ON aus.token = proj.device_id
WHERE 
    aus.start_ts BETWEEN {var_starttime: DateTime} AND {var_endtime: DateTime}
    ${metrosFilter}
    ${nccsFilter}
    ${genderFilter}
    ${ageGroupFilter}`
    // GROUP BY
    //     proj.center,
    //     proj.sec,
    //     proj.age_group,
    //     proj.gender`


    client.query({
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
      .then(data => {
        console.log("KPI Data:", data);

        //   value: "",
        // delta: { value: 0, period: "vs last day" },

        let newKpidata = JSON.parse(JSON.stringify(kpiData));
        newKpidata = newKpidata.map((kpi, index) => {
          switch (kpi.headline) {
            case "Total DAU":
              return { ...kpi, value: data[0]['DAU'], delta: { ...kpi.delta, value: data[0]['LDAU'] } };
            case "Total WAU":
              return { ...kpi, value: data[0]['WAU'], delta: { ...kpi.delta, value: data[0]['LWAU'] } };
            case "Total MAU":
              return { ...kpi, value: data[0]['MAU'], delta: { ...kpi.delta, value: data[0]['LMAU'] } };
          }
        })

        setKpiData(newKpidata);
      })

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
              headline={kpi.headline}
              value={kpi.value}
              delta={kpi.delta}
              trend={kpi.trend}
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
                  <span>Top 5 Most Reached Apps</span>
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
                  <span>Top 5 Most Frequently Opened Apps</span>
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

      <ExportButton onExport={handleExport} />
    </div>
  );
};

export default SnapshotDashboard;
