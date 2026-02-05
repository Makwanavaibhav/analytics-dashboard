import { TrendingUp, TrendingDown, LineChart as LineChartIcon, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';

const StatCard = ({ 
  icon, 
  title, 
  value, 
  change, 
  color = 'blue', 
  loading = false, 
  chartType = null,
  isDarkMode = false 
}) => {
  const colorClasses = {
    blue: isDarkMode 
      ? 'bg-blue-900/20 text-blue-400 border-blue-800/30' 
      : 'bg-blue-50 text-blue-600 border-blue-200',
    green: isDarkMode 
      ? 'bg-green-900/20 text-green-400 border-green-800/30' 
      : 'bg-green-50 text-green-600 border-green-200',
    purple: isDarkMode 
      ? 'bg-purple-900/20 text-purple-400 border-purple-800/30' 
      : 'bg-purple-50 text-purple-600 border-purple-200',
    orange: isDarkMode 
      ? 'bg-orange-900/20 text-orange-400 border-orange-800/30' 
      : 'bg-orange-50 text-orange-600 border-orange-200'
  };

  const iconBgClass = colorClasses[color]?.split(' ')[0] || 'bg-blue-50';

  return (
    <div className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700 shadow-gray-900/30 backdrop-blur-sm' 
        : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconBgClass}`}>
          <icon size={24} />
        </div>
        
        {/* Chart type */}
        <div className="flex items-center gap-2">
          {chartType === 'line' && (
            <LineChartIcon size={18} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
          )}
          {chartType === 'bar' && (
            <BarChartIcon size={18} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
          )}
          {chartType === 'pie' && (
            <PieChartIcon size={18} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
          )}
          
          {change !== undefined && (
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              change >= 0 
                ? (isDarkMode ? 'bg-green-900/30 text-green-400 border border-green-800/50' : 'bg-green-100 text-green-700')
                : (isDarkMode ? 'bg-red-900/30 text-red-400 border border-red-800/50' : 'bg-red-100 text-red-700')
            }`}>
              {change >= 0 ? (
                <TrendingUp size={14} className="inline mr-1" />
              ) : (
                <TrendingDown size={14} className="inline mr-1" />
              )}
              {Math.abs(change)}%
            </span>
          )}
        </div>
      </div>
      
      {/* Value */}
      <h3 className={`text-2xl font-bold mb-1 ${
        isDarkMode ? "text-gray-100" : ""
      }`}>
        {loading ? (
          <div className={`h-8 w-32 animate-pulse rounded ${
            isDarkMode ? "bg-gray-700" : "bg-gray-200"
          }`}></div>
        ) : value}
      </h3>
      
      {/* Title */}
      <p className={`text-sm ${
        isDarkMode ? "text-gray-400" : "text-gray-600"
      }`}>
        {title}
      </p>
    </div>
  );
};

export default StatCard;
