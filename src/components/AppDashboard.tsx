import { useState } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "./AppHeader";
import PrimaryNavTabs from "./PrimaryNavTabs";
import UniversalFilterBar from "./UniversalFilterBar";
import KpiCard from "./KpiCard";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import HeatmapChart from "./HeatmapChart";
import ExportButton from "./ExportButton";
import { Card, CardContent } from "@/components/ui/card";

const AppDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [filters, setFilters] = useState({
    dateRange: "Last 7 days",
    metro: "All Metros",
    nccs: "All NCCS",
    gender: "All Genders"
  });

  const [userRole, setUserRole] = useState("Executive");

  // Mock app data based on ID
  const appData = {
    instagram: {
      name: "Instagram",
      publisher: "Meta",
      category: "Social Media",
      avatar: "📷"
    },
    whatsapp: {
      name: "WhatsApp", 
      publisher: "Meta",
      category: "Social Media",
      avatar: "💬"
    },
    youtube: {
      name: "YouTube",
      publisher: "Google",
      category: "Entertainment", 
      avatar: "📺"
    },
    facebook: {
      name: "Facebook",
      publisher: "Meta", 
      category: "Social Media",
      avatar: "📘"
    },
    telegram: {
      name: "Telegram",
      publisher: "Telegram",
      category: "Social Media", 
      avatar: "✈️"
    },
    netflix: {
      name: "Netflix",
      publisher: "Netflix",
      category: "Entertainment",
      avatar: "🎬"
    }
  };

  const currentApp = appData[id as keyof typeof appData] || appData.instagram;

  // Sample KPI data for app - expanded with all metrics
  const appKpis = [
    {
      headline: "Total Users",
      value: "8.2M",
      delta: { value: 5.2, period: "vs last week" },
      trend: [18, 20, 22, 24, 26, 25, 28]
    },
    {
      headline: "Active Users",
      value: "6.8M",
      delta: { value: 12.3, period: "vs last day" },
      trend: [22, 24, 26, 28, 30, 29, 32]
    },
    {
      headline: "WAU",
      value: "18.5M",
      delta: { value: 8.7, period: "vs last week" },
      trend: [15, 16, 17, 18, 19, 18, 20]
    },
    {
      headline: "MAU",
      value: "45.2M",
      delta: { value: 3.4, period: "vs last month" },
      trend: [40, 41, 42, 43, 44, 43, 45]
    },
    {
      headline: "Retention Rate",
      value: "78.5%",
      delta: { value: 3.4, period: "vs last week" },
      trend: [75, 76, 77, 78, 79, 78, 80]
    },
    {
      headline: "Avg Session",
      value: "24m",
      delta: { value: -2.1, period: "vs last week" },
      trend: [25, 24, 26, 23, 22, 24, 21]
    }
  ];

  // Generate daily trend data based on filter selection
  const generateTrendData = () => {
    const dateRange = filters.dateRange.toLowerCase();
    
    if (dateRange.includes('7 days')) {
      return [
        { date: "Dec 4", value: 7.8 },
        { date: "Dec 5", value: 8.1 },
        { date: "Dec 6", value: 7.9 },
        { date: "Dec 7", value: 8.3 },
        { date: "Dec 8", value: 8.5 },
        { date: "Dec 9", value: 8.2 },
        { date: "Dec 10", value: 8.6 }
      ];
    } else if (dateRange.includes('30 days')) {
      return [
        { date: "Nov 11", value: 6.8 },
        { date: "Nov 13", value: 6.9 },
        { date: "Nov 15", value: 7.1 },
        { date: "Nov 17", value: 7.0 },
        { date: "Nov 19", value: 7.3 },
        { date: "Nov 21", value: 7.2 },
        { date: "Nov 23", value: 7.5 },
        { date: "Nov 25", value: 7.4 },
        { date: "Nov 27", value: 7.6 },
        { date: "Nov 29", value: 7.8 },
        { date: "Dec 1", value: 7.7 },
        { date: "Dec 3", value: 8.0 },
        { date: "Dec 5", value: 8.1 },
        { date: "Dec 7", value: 8.3 },
        { date: "Dec 9", value: 8.2 },
        { date: "Dec 10", value: 8.6 }
      ];
    } else if (dateRange.includes('90 days')) {
      return [
        { date: "Sep 12", value: 5.8 },
        { date: "Sep 19", value: 6.0 },
        { date: "Sep 26", value: 6.2 },
        { date: "Oct 3", value: 6.1 },
        { date: "Oct 10", value: 6.4 },
        { date: "Oct 17", value: 6.6 },
        { date: "Oct 24", value: 6.8 },
        { date: "Oct 31", value: 6.9 },
        { date: "Nov 7", value: 7.1 },
        { date: "Nov 14", value: 7.3 },
        { date: "Nov 21", value: 7.5 },
        { date: "Nov 28", value: 7.7 },
        { date: "Dec 5", value: 8.1 },
        { date: "Dec 10", value: 8.6 }
      ];
    }
    
    // Default/custom range
    return [
      { date: "Dec 7", value: 8.3 },
      { date: "Dec 8", value: 8.5 },
      { date: "Dec 9", value: 8.2 },
      { date: "Dec 10", value: 8.6 }
    ];
  };

  // Generate comparison data for apps based on current filter
  const generateComparisonData = () => {
    const dateRange = filters.dateRange.toLowerCase();
    const trendData = generateTrendData();
    
    const baseData: { [key: string]: any[] } = {};
    
    // Generate comparison data for each app with similar pattern but different values
    Object.keys(appData).forEach(appKey => {
      if (appKey !== id) {
        baseData[appKey] = trendData.map((point, index) => {
          const multiplier = appKey === 'whatsapp' ? 1.4 : 
                           appKey === 'youtube' ? 1.1 : 
                           appKey === 'facebook' ? 0.7 : 
                           appKey === 'telegram' ? 0.4 : 0.8;
          
          return {
            date: point.date,
            value: parseFloat((point.value * multiplier + (Math.random() - 0.5) * 0.3).toFixed(1))
          };
        });
      }
    });
    
    return baseData;
  };

  // Expanded hourly heatmap data with all 24 hours
  const hourlyHeatmapData = [
    // Monday - all 24 hours
    { hour: "00", day: "Mon", value: 1.8 },
    { hour: "01", day: "Mon", value: 1.2 },
    { hour: "02", day: "Mon", value: 0.8 },
    { hour: "03", day: "Mon", value: 0.6 },
    { hour: "04", day: "Mon", value: 0.9 },
    { hour: "05", day: "Mon", value: 1.4 },
    { hour: "06", day: "Mon", value: 3.2 },
    { hour: "07", day: "Mon", value: 5.1 },
    { hour: "08", day: "Mon", value: 6.8 },
    { hour: "09", day: "Mon", value: 7.2 },
    { hour: "10", day: "Mon", value: 6.9 },
    { hour: "11", day: "Mon", value: 6.5 },
    { hour: "12", day: "Mon", value: 7.1 },
    { hour: "13", day: "Mon", value: 6.8 },
    { hour: "14", day: "Mon", value: 6.2 },
    { hour: "15", day: "Mon", value: 6.8 },
    { hour: "16", day: "Mon", value: 7.5 },
    { hour: "17", day: "Mon", value: 8.9 },
    { hour: "18", day: "Mon", value: 10.5 },
    { hour: "19", day: "Mon", value: 11.2 },
    { hour: "20", day: "Mon", value: 12.4 },
    { hour: "21", day: "Mon", value: 13.2 },
    { hour: "22", day: "Mon", value: 9.8 },
    { hour: "23", day: "Mon", value: 7.8 },
    // Tuesday
    { hour: "00", day: "Tue", value: 2.1 },
    { hour: "01", day: "Tue", value: 1.5 },
    { hour: "02", day: "Tue", value: 1.1 },
    { hour: "03", day: "Tue", value: 0.8 },
    { hour: "04", day: "Tue", value: 1.2 },
    { hour: "05", day: "Tue", value: 1.8 },
    { hour: "06", day: "Tue", value: 3.8 },
    { hour: "07", day: "Tue", value: 5.6 },
    { hour: "08", day: "Tue", value: 7.2 },
    { hour: "09", day: "Tue", value: 7.8 },
    { hour: "10", day: "Tue", value: 7.5 },
    { hour: "11", day: "Tue", value: 7.1 },
    { hour: "12", day: "Tue", value: 8.4 },
    { hour: "13", day: "Tue", value: 8.1 },
    { hour: "14", day: "Tue", value: 7.4 },
    { hour: "15", day: "Tue", value: 7.8 },
    { hour: "16", day: "Tue", value: 8.5 },
    { hour: "17", day: "Tue", value: 9.8 },
    { hour: "18", day: "Tue", value: 12.2 },
    { hour: "19", day: "Tue", value: 13.1 },
    { hour: "20", day: "Tue", value: 14.5 },
    { hour: "21", day: "Tue", value: 15.6 },
    { hour: "22", day: "Tue", value: 11.2 },
    { hour: "23", day: "Tue", value: 8.9 },
    // Add similar data for other days...
    // Wednesday
    { hour: "00", day: "Wed", value: 1.9 },
    { hour: "06", day: "Wed", value: 3.5 },
    { hour: "12", day: "Wed", value: 8.1 },
    { hour: "18", day: "Wed", value: 11.8 },
    { hour: "21", day: "Wed", value: 14.9 },
    { hour: "23", day: "Wed", value: 8.6 },
    // Thursday
    { hour: "00", day: "Thu", value: 2.3 },
    { hour: "06", day: "Thu", value: 4.1 },
    { hour: "12", day: "Thu", value: 9.2 },
    { hour: "18", day: "Thu", value: 13.5 },
    { hour: "21", day: "Thu", value: 16.8 },
    { hour: "23", day: "Thu", value: 9.4 },
    // Friday
    { hour: "00", day: "Fri", value: 2.8 },
    { hour: "06", day: "Fri", value: 4.6 },
    { hour: "12", day: "Fri", value: 10.1 },
    { hour: "18", day: "Fri", value: 14.7 },
    { hour: "21", day: "Fri", value: 18.2 },
    { hour: "23", day: "Fri", value: 12.3 },
    // Saturday
    { hour: "00", day: "Sat", value: 3.2 },
    { hour: "06", day: "Sat", value: 2.9 },
    { hour: "12", day: "Sat", value: 11.5 },
    { hour: "18", day: "Sat", value: 16.1 },
    { hour: "21", day: "Sat", value: 19.8 },
    { hour: "23", day: "Sat", value: 14.6 },
    // Sunday
    { hour: "00", day: "Sun", value: 2.6 },
    { hour: "06", day: "Sun", value: 2.4 },
    { hour: "12", day: "Sun", value: 9.8 },
    { hour: "18", day: "Sun", value: 13.9 },
    { hour: "21", day: "Sun", value: 17.2 },
    { hour: "23", day: "Sun", value: 11.7 }
  ];

  // Age distribution
  const ageDistribution = [
    { label: "18-24", value: 35, color: "#3F5BF6" },
    { label: "25-34", value: 28, color: "#38BDF8" },
    { label: "35-44", value: 22, color: "#7C3AED" },
    { label: "45+", value: 15, color: "#F59E0B" }
  ];

  // Gender distribution
  const genderDistribution = [
    { label: "Male", value: 52, color: "#3F5BF6" },
    { label: "Female", value: 48, color: "#38BDF8" }
  ];

  // Generate dynamic title based on date filter
  const getTrendTitle = () => {
    const dateRange = filters.dateRange.toLowerCase();
    if (dateRange.includes('7 days')) {
      return 'Daily Active Users - Last 7 Days';
    } else if (dateRange.includes('30 days')) {
      return 'Daily Active Users - Last 30 Days';
    } else if (dateRange.includes('90 days')) {
      return 'Daily Active Users - Last 90 Days';
    } else if (dateRange.includes('custom')) {
      return 'Daily Active Users - Custom Range';
    }
    return 'Daily Active Users Trend';
  };

  const handleExport = (format: string) => {
    console.log(`Exporting app ${id} as ${format}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AppHeader 
        breadcrumbs={["Dashboard", "Category", currentApp.category, currentApp.name]}
      />
      
      <PrimaryNavTabs 
        activeTab="app"
        onTabChange={(tab) => console.log(`Switched to ${tab}`)}
      />
      
      <UniversalFilterBar 
        filters={filters}
        onFiltersChange={setFilters}
      />

      <main className="p-6 space-y-6">
        {/* App Header Card */}
        <Card className="bg-white border border-[#E2E8F0] shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#3F5BF6] to-[#38BDF8] rounded-xl flex items-center justify-center text-3xl">
                {currentApp.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A]">{currentApp.name}</h1>
                <p className="text-[#64748B]">{currentApp.publisher} • {currentApp.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Strip - 3x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appKpis.map((kpi) => (
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

        {/* Daily Trend - Full Width with dynamic data */}
        <div className="w-full">
          <LineChart
            title={getTrendTitle()}
            data={generateTrendData()}
            comparisonData={generateComparisonData()}
            currentCategory={id || 'instagram'}
            categoryNames={appData}
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

      <ExportButton onExport={handleExport} />
    </div>
  );
};

export default AppDashboard;
