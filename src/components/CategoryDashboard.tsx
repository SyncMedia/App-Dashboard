import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Users, Film, ShoppingCart } from "lucide-react";
import AppHeader from "./AppHeader";
import PrimaryNavTabs from "./PrimaryNavTabs";
import UniversalFilterBar, { loadFilters } from "./UniversalFilterBar";
import KpiCard, { KpiDataItemType } from "./KpiCard";
import RankedList, { RankedItem } from "./RankedList";
import LineChart, { LineData } from "./LineChart";
import BarChart, { BarData } from "./BarChart";
import DonutChart, { DonutSegment } from "./DonutChart";
import ExportButton from "./ExportButton";
import CategoryBreadcrumb from "./CategoryBreadcrumb";
import { useDeepCompareEffect } from "@/utils";
import { loadDatewiseReach, loadGenderDistribution, loadMetroDistribution, loadTopAppsByCategory, loadTopRow, loadTotalUsers } from "@/data/category";
import { loadClickhouseClient } from "@/utils/general";

const CategoryDashboard = () => {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>();
  const [filters, setFilters] = useState(loadFilters)

  // Category data based on slug

  // Sample KPI data for category - reduced to 4 metrics
  const [categoryKpis, setCategoryKpis] = useState<KpiDataItemType[]>([])
  const [trendData, setTrendData] = useState<LineData[]>([])
  const [topApps, setTopApps] = useState<RankedItem[]>([])

  // Metro distribution
  const [metroDistribution, setMetroDistribution] = useState<BarData[]>([])

  // Demographics
  const [genderDistribution, setGenderDistribution] = useState<DonutSegment[]>([])

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
    console.log(`Exporting category ${slug} as ${format}`);
  };

  const handleAppClick = (item: RankedItem) => {
    console.log(`Navigating to app: ${item}`, item);
    navigate(`/app/${item.label.toLowerCase()}`);
  };

  const client = useMemo(loadClickhouseClient, []);

  useDeepCompareEffect(() => {
    loadTopRow(client, filters, slug).then((data) => {
      setCategoryKpis(
        [{
          headline: "Total Users",
          value: data.tau + "M",
        },
        {
          headline: "WAU",
          value: data.wau + "M",
        },
        {
          headline: "MAU",
          value: data.mau + "M",
        },
        {
          headline: "Avg Sessions",
          value: data.avg_sess,
        }])
    })

    loadDatewiseReach(client, filters, slug).then((data) => setTrendData(data))
    loadTopAppsByCategory(client, filters, slug).then((data) => setTopApps(data))
    loadMetroDistribution(client, filters, slug).then((data) => setMetroDistribution(data))
    loadGenderDistribution(client, filters, slug).then((data) => setGenderDistribution(data))
  }, [filters])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AppHeader
        breadcrumbs={["Category", slug]}
      />

      <PrimaryNavTabs
        activeTab="category"
        onTabChange={(tab) => console.log(`Switched to ${tab}`)}
      />

      <UniversalFilterBar
        onFiltersChange={setFilters}
      />

      <main className="p-6 space-y-6">
        {/* Category Header */}
        <CategoryBreadcrumb
          category={{ name: slug }}
        />

        {/* KPI Strip - Single row of 4 metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categoryKpis.map((kpi) => (
            <KpiCard
              key={kpi.headline}
              item={kpi}
              onClick={() => console.log(`KPI clicked: ${kpi.headline}`)}
            />
          ))}
        </div>

        {/* Daily Trend Chart - Full Width */}
        <div className="w-full">
          <LineChart
            title={getTrendTitle()}
            data={trendData}
            currentCategory={slug}
          />
        </div>

        {/* Core Grid - Apps List and Lower Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <RankedList
              title="Top Apps by DAU"
              data={topApps}
              onItemClick={handleAppClick}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart
                title="Metro-wise Distribution"
                data={metroDistribution}
              />
              <DonutChart
                title="Gender Distribution"
                segments={genderDistribution}
              />
            </div>
          </div>
        </div>
      </main>

      {/* <ExportButton onExport={handleExport} /> */}
    </div>
  );
};

export default CategoryDashboard;
