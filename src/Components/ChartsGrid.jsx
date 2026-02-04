import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import { Globe, PieChart as PieChartIcon, LineChart as LineChartIcon, BarChart as BarChartIcon, Users, TrendingUp } from 'lucide-react';

const ChartsGrid = ({
  activeChart,
  revenueByRegion,
  revenueByCategory,
  regionChartData,
  categoryChartData,
  monthlyChartData,
  topProductsChartData,
  barChartOptions,
  pieChartOptions,
  lineChartOptions,
}) => {
  const getFilteredCharts = () => {
    if (activeChart === 'all') return ['region', 'category', 'monthly', 'products', 'customers', 'radar'];
    if (activeChart === 'bar') return ['region', 'customers'];
    if (activeChart === 'line') return ['monthly'];
    if (activeChart === 'pie') return ['category', 'products'];
    return [];
  };

  const filteredCharts = getFilteredCharts();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
      {filteredCharts.includes('region') && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Globe size={24} className="text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Revenue by Region</h2>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              ${Object.values(revenueByRegion).reduce((a, b) => a + b, 0).toLocaleString()}
            </div>
          </div>
          <div className="h-80">
            <Bar data={regionChartData} options={barChartOptions} />
          </div>
        </div>
      )}

      {filteredCharts.includes('category') && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <PieChartIcon size={24} className="text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Revenue by Category</h2>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              ${Object.values(revenueByCategory).reduce((a, b) => a + b, 0).toLocaleString()}
            </div>
          </div>
          <div className="h-80">
            <Pie data={categoryChartData} options={pieChartOptions} />
          </div>
        </div>
      )}

      {filteredCharts.includes('monthly') && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LineChartIcon size={24} className="text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Monthly Revenue Trend</h2>
            </div>
            <div className="text-sm text-gray-500 font-medium">Last 6 months</div>
          </div>
          <div className="h-80">
            <Line data={monthlyChartData} options={lineChartOptions} />
          </div>
        </div>
      )}

      {filteredCharts.includes('products') && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChartIcon size={24} className="text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-800">Top Selling Products</h2>
            </div>
            <div className="text-sm text-gray-500 font-medium">Top 5 by revenue</div>
          </div>
          <div className="h-80">
            <Doughnut data={topProductsChartData} options={pieChartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsGrid;
