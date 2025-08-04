import { useState } from "react";
import { useParams } from "react-router-dom";
import { Users, Film, ShoppingCart } from "lucide-react";
import AppHeader from "./AppHeader";
import PrimaryNavTabs from "./PrimaryNavTabs";
import UniversalFilterBar from "./UniversalFilterBar";
import KpiCard from "./KpiCard";
import RankedList from "./RankedList";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import ExportButton from "./ExportButton";
import CategoryBreadcrumb from "./CategoryBreadcrumb";

const CategoryDashboard = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filters, setFilters] = useState({
    dateRange: "Last 7 days",
    metro: "All Metros",
    nccs: "All NCCS",
    gender: "All Genders",
    ageGroup: "All Ages"
  });

  // Category data based on slug
  const categoryData = {
    social: {
      name: "Social Media",
      subtitle: "Messaging & Social Networking"
    },
    entertainment: {
      name: "Entertainment",
      subtitle: "Video & Music Streaming"
    },
    shopping: {
      name: "Shopping",
      subtitle: "E-commerce & Retail"
    }
  };

  const currentCategory = categoryData[slug as keyof typeof categoryData] || categoryData.social;

  // Sample KPI data for category - reduced to 4 metrics
  const categoryKpis = [
    {
      headline: "Total Users",
      value: "12.4M",
      delta: { value: 8.3, period: "vs last week" },
      trend: [15, 18, 22, 25, 28, 24, 30]
    },
    {
      headline: "WAU",
      value: "28.7M",
      delta: { value: 6.4, period: "vs last week" },
      trend: [25, 26, 27, 28, 29, 28, 30]
    },
    {
      headline: "MAU",
      value: "68.5M",
      delta: { value: 4.2, period: "vs last month" },
      trend: [60, 62, 64, 66, 68, 67, 69]
    },
    {
      headline: "Avg Sessions",
      value: "18m",
      delta: { value: -1.5, period: "vs last week" },
      trend: [20, 19, 18, 17, 16, 18, 17]
    }
  ];

  // Sample apps for this category
  const topApps = [
    { rank: 1, label: "WhatsApp", subtitle: "Meta", metric: "8.2M", change: 5.2, logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
    { rank: 2, label: "Instagram", subtitle: "Meta", metric: "6.8M", change: 12.3, logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
    { rank: 3, label: "Facebook", subtitle: "Meta", metric: "5.4M", change: -2.1, logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
    { rank: 4, label: "Telegram", subtitle: "Telegram", metric: "3.2M", change: 18.7 },
    { rank: 5, label: "Twitter", subtitle: "X Corp", metric: "2.9M", change: -5.4 },
    { rank: 6, label: "LinkedIn", subtitle: "Microsoft", metric: "2.1M", change: 8.9 },
    { rank: 7, label: "Snapchat", subtitle: "Snap Inc", metric: "1.8M", change: 15.2 },
    { rank: 8, label: "TikTok", subtitle: "ByteDance", metric: "1.6M", change: 25.8 },
    { rank: 9, label: "Discord", subtitle: "Discord Inc", metric: "1.4M", change: 19.3 },
    { rank: 10, label: "Pinterest", subtitle: "Pinterest", metric: "1.2M", change: 11.7 },
    { rank: 11, label: "Reddit", subtitle: "Reddit Inc", metric: "1.0M", change: 14.2 },
    { rank: 12, label: "Skype", subtitle: "Microsoft", metric: "0.8M", change: -7.5 },
    { rank: 13, label: "Viber", subtitle: "Rakuten", metric: "0.6M", change: -3.8 },
    { rank: 14, label: "Signal", subtitle: "Signal Foundation", metric: "0.4M", change: 22.1 },
    { rank: 15, label: "WeChat", subtitle: "Tencent", metric: "0.3M", change: 8.9 }
  ];

  // Generate daily trend data based on selected date range
  const generateDailyTrendData = () => {
    const dateRange = filters.dateRange.toLowerCase();
    if (dateRange.includes('7 days')) {
      return [
        { date: "Mon", value: 8.2 },
        { date: "Tue", value: 9.1 },
        { date: "Wed", value: 10.4 },
        { date: "Thu", value: 11.8 },
        { date: "Fri", value: 12.4 },
        { date: "Sat", value: 11.9 },
        { date: "Sun", value: 10.6 }
      ];
    } else if (dateRange.includes('30 days')) {
      return [
        { date: "Week 1", value: 8.2 },
        { date: "Week 2", value: 9.1 },
        { date: "Week 3", value: 10.4 },
        { date: "Week 4", value: 12.4 }
      ];
    } else if (dateRange.includes('90 days')) {
      return [
        { date: "Month 1", value: 7.8 },
        { date: "Month 2", value: 9.2 },
        { date: "Month 3", value: 12.4 }
      ];
    }
    // Default to daily for last 7 days
    return [
      { date: "Mon", value: 8.2 },
      { date: "Tue", value: 9.1 },
      { date: "Wed", value: 10.4 },
      { date: "Thu", value: 11.8 },
      { date: "Fri", value: 12.4 },
      { date: "Sat", value: 11.9 },
      { date: "Sun", value: 10.6 }
    ];
  };

  const trendData = generateDailyTrendData();

  // Sample comparison data for different categories with daily format
  const categoryTrendData = {
    social: generateDailyTrendData(),
    entertainment: [
      { date: "Mon", value: 6.8 },
      { date: "Tue", value: 7.2 },
      { date: "Wed", value: 8.1 },
      { date: "Thu", value: 8.9 },
      { date: "Fri", value: 9.5 },
      { date: "Sat", value: 9.1 },
      { date: "Sun", value: 8.7 }
    ],
    shopping: [
      { date: "Mon", value: 4.5 },
      { date: "Tue", value: 5.1 },
      { date: "Wed", value: 5.8 },
      { date: "Thu", value: 6.0 },
      { date: "Fri", value: 6.2 },
      { date: "Sat", value: 5.9 },
      { date: "Sun", value: 5.4 }
    ]
  };

  // Metro distribution
  const metroDistribution = [
    { label: "Mumbai", value: 32, color: "#32F594" },
    { label: "Delhi", value: 28, color: "#38BDF8" },
    { label: "Bangalore", value: 22, color: "#7C3AED" },
    { label: "Chennai", value: 18, color: "#32F594" }
  ];

  // Demographics
  const genderDistribution = [
    { label: "Male", value: 58, color: "#32F594" },
    { label: "Female", value: 42, color: "#38BDF8" }
  ];

  // Generate dynamic title based on date filter
  const getTrendTitle = () => {
    const dateRange = filters.dateRange.toLowerCase();
    if (dateRange.includes('7 days')) {
      return 'Daily Active Users - Last 7 Days';
    } else if (dateRange.includes('30 days')) {
      return 'Weekly Active Users - Last 30 Days';
    } else if (dateRange.includes('90 days')) {
      return 'Monthly Active Users - Last 90 Days';
    } else if (dateRange.includes('custom')) {
      return 'Daily Active Users - Custom Range';
    }
    return 'Daily Active Users - Last 7 Days';
  };

  const handleExport = (format: string) => {
    console.log(`Exporting category ${slug} as ${format}`);
  };

  const handleAppClick = (item: any) => {
    console.log(`Navigating to app: ${item.label}`);
    // Will navigate to /app/:id when implemented
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AppHeader 
        breadcrumbs={["Dashboard", "Category", currentCategory.name]}
      />
      
      <PrimaryNavTabs 
        activeTab="category"
        onTabChange={(tab) => console.log(`Switched to ${tab}`)}
      />
      
      <UniversalFilterBar 
        filters={filters}
        onFiltersChange={setFilters}
      />

      <main className="p-6 space-y-6">
        {/* Category Header */}
        <CategoryBreadcrumb
          category={currentCategory}
        />

        {/* KPI Strip - Single row of 4 metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categoryKpis.map((kpi) => (
            <KpiCard
              key={kpi.headline}
              headline={kpi.headline}
              value={kpi.value}
              delta={kpi.delta}
              trend={kpi.trend}
              onClick={() => console.log(`KPI clicked: ${kpi.headline}`)}
            />
          ))}
        </div>

        {/* Daily Trend Chart - Full Width */}
        <div className="w-full">
          <LineChart
            title={getTrendTitle()}
            data={trendData}
            comparisonData={categoryTrendData}
            currentCategory={slug || 'social'}
            categoryNames={categoryData}
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

      <ExportButton onExport={handleExport} />
    </div>
  );
};

export default CategoryDashboard;
