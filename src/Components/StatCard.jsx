import { TrendingUp, TrendingDown, LineChart as LineChartIcon, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';

const StatCard = ({ icon, title, value, change, color = 'blue', loading = false, chartType = null }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200'
  };

  return (
    <div className={`p-6 rounded-xl border ${colorClasses[color]} transition-all hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color].split(' ')[0]}`}>
          <icon size={24} />
        </div>
        <div className="flex items-center gap-2">
          {chartType === 'line' && <LineChartIcon size={18} className="text-gray-400" />}
          {chartType === 'bar' && <BarChartIcon size={18} className="text-gray-400" />}
          {chartType === 'pie' && <PieChartIcon size={18} className="text-gray-400" />}
          {change !== undefined && (
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {change >= 0 ? <TrendingUp size={14} className="inline mr-1" /> : <TrendingDown size={14} className="inline mr-1" />}
              {Math.abs(change)}%
            </span>
          )}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-1">
        {loading ? (
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
        ) : value}
      </h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};

export default StatCard;
