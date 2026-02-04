import { Filter } from 'lucide-react';
import StatCard from './StatCard';
import { DollarSign, ShoppingBag, Users, BarChart3, LineChartIcon, PieChartIcon, BarChartIcon } from 'lucide-react';

const ControlsSection = ({ 
  activeChart, 
  onChartChange, 
  filters, 
  regions, 
  categories, 
  onFiltersChange, 
  onClearFilters,
  totalRevenue, 
  averageOrderValue, 
  uniqueCustomers, 
  totalOrders, 
  isLoading 
}) => {
  const chartTypes = [
    { id: 'all', label: 'All Charts', icon: BarChartIcon },
    { id: 'bar', label: 'Bar Charts', icon: BarChartIcon },
    { id: 'line', label: 'Line Charts', icon: LineChartIcon },
    { id: 'pie', label: 'Pie Charts', icon: PieChartIcon },
  ];

  return (
    <>
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChartChange(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeChart === type.id
                ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md'
            }`}
          >
            <type.icon size={18} />
            <span className="text-sm font-medium">{type.label}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <h3 className="font-semibold text-gray-800">Filters</h3>
          </div>
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
          >
            Clear All Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={filters.region}
              onChange={(e) => onFiltersChange({...filters, region: e.target.value})}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => onFiltersChange({...filters, category: e.target.value})}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => onFiltersChange({...filters, dateRange: e.target.value})}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Time</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="last365">Last 365 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={12.5}
          color="green"
          loading={isLoading}
          chartType="line"
        />
        <StatCard
          icon={ShoppingBag}
          title="Average Order Value"
          value={`$${Math.round(averageOrderValue).toLocaleString()}`}
          change={8.2}
          color="blue"
          loading={isLoading}
          chartType="bar"
        />
        <StatCard
          icon={Users}
          title="Unique Customers"
          value={uniqueCustomers.toString()}
          change={5.7}
          color="purple"
          loading={isLoading}
          chartType="line"
        />
        <StatCard
          icon={BarChart3}
          title="Total Orders"
          value={totalOrders.toString()}
          change={15.3}
          color="orange"
          loading={isLoading}
          chartType="bar"
        />
      </div>
    </>
  );
};

export default ControlsSection;
