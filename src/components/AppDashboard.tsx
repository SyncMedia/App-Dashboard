import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "./AppHeader";
import PrimaryNavTabs from "./PrimaryNavTabs";
import UniversalFilterBar, { loadFilters } from "./UniversalFilterBar";
import KpiCard, { KpiDataItemType } from "./KpiCard";
import LineChart, { LineData } from "./LineChart";
import BarChart, { BarData } from "./BarChart";
import DonutChart, { DonutSegment } from "./DonutChart";
import HeatmapChart, { HeatmapData } from "./HeatmapChart";
import ExportButton from "./ExportButton";
import { Card, CardContent } from "@/components/ui/card";
import { useDeepCompareEffect } from "@/utils";
import { loadClickhouseClient } from "@/utils/general";
import { AppMeta, loadAgeDistribution, loadDatewiseReach, loadGenderDistribution, loadHourlyHeatmapData, loadKpis, loadMeta } from "@/data/app";

const AppDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [filters, setFilters] = useState(loadFilters)

  const client = useMemo(loadClickhouseClient, []);

  const [appMeta, setAppMeta] = useState<AppMeta>({ logo: "", package: "", category: "", nickname: "" });

  useEffect(() => {
    loadMeta(client, id).then(data => setAppMeta(data));
  }, [id])


  const [genderDistribution, setGenderDistribution] = useState<DonutSegment[]>([])
  const [ageDistribution, setAgeDistribution] = useState<BarData[]>([])
  const [appKpis, setAppKpis] = useState<KpiDataItemType[]>([]);
  const [trendData, setTrendData] = useState<LineData[]>([]);
  const [hourlyHeatmapData, setHourlyHeatmapData] = useState<HeatmapData[]>([]);

  useEffect(() => {
    if (appMeta.package === "") return

    loadGenderDistribution(client, filters, appMeta).then(setGenderDistribution)
    loadAgeDistribution(client, filters, appMeta).then(setAgeDistribution)
    loadKpis(client, filters, appMeta).then(setAppKpis)
    loadDatewiseReach(client, filters, appMeta).then(setTrendData)
    loadHourlyHeatmapData(client, filters, appMeta).then(setHourlyHeatmapData)
  }, [filters, appMeta])

  // Generate dynamic title based on date filter
  const getTrendTitle = () => {
    const days = filters.dateRange.end.diff(filters.dateRange.start, 'days')

    if (days === 7) {
      return 'Daily Active Users - Last 7 Days';
    }

    if (days === 30) {
      return 'Weekly Active Users - Last 30 Days';
    }

    if (days === 90) {
      return 'Monthly Active Users - Last 90 Days';
    }

    return 'Daily Active Users - Custom Range';
  };


  const handleExport = (format: string) => {
    console.log(`Exporting app ${id} as ${format}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AppHeader
        breadcrumbs={["App", appMeta.category, appMeta.nickname]}
      />

      <PrimaryNavTabs
        activeTab="app"
        onTabChange={(tab) => console.log(`Switched to ${tab}`)}
      />

      <UniversalFilterBar
        onFiltersChange={setFilters}
      />

      <main className="p-6 space-y-6">
        {/* App Header Card */}
        <Card className="bg-white border border-[#E2E8F0] shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#3F5BF6] to-[#38BDF8] rounded-xl flex items-center justify-center text-3xl">
                <img src={appMeta.logo} alt={appMeta.nickname} className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A]">{appMeta.nickname}</h1>
                <p className="text-[#64748B] capitalize">
                  {/* {appMeta.publisher}  • */}
                  {appMeta.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Strip - 3x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appKpis.map((kpi) => (
            <KpiCard
              key={kpi.headline}
              item={kpi}
              onClick={() => console.log(`KPI clicked: ${kpi.headline}`)}
            />
          ))}
        </div>

        {/* Daily Trend - Full Width with dynamic data */}
        <div className="w-full">
          <LineChart
            title={getTrendTitle()}
            data={trendData}
            currentCategory={id}
          />
        </div>

        {/* Core Grid - Hourly Usage Heatmap (Full Width) */}
        <div className="w-full">
          <HeatmapChart
            title="Hourly Usage Pattern"
            data={hourlyHeatmapData}
          />
        </div>

        {/* Lower Grid - Age Distribution and Gender Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart
            title="Age Distribution"
            data={ageDistribution}
          />
          <DonutChart
            title="Gender Distribution"
            segments={genderDistribution}
          />
        </div>
      </main>

      {/* <ExportButton onExport={handleExport} /> */}
    </div>
  );
};

export default AppDashboard;
