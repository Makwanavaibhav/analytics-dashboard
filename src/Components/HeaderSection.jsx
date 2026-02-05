import { RefreshCw, Download, Search, X, Moon, Sun } from 'lucide-react';

const HeaderSection = ({ 
  searchTerm, 
  onSearchChange, 
  onSearchClear, 
  onRefresh, 
  isLoading, 
  onExport,
  isDarkMode,      
  onToggleDarkMode 
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className={`text-3xl font-bold ${
            isDarkMode 
              ? 'text-gray-100' 
              : 'text-gray-900 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text'
          }`}>
            Sales Analytics Dashboard
          </h1>
          <p className={`mt-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Interactive analytics with Chart.js visualizations
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode
                ? 'bg-linear-to-r from-blue-700 to-blue-800 hover:from-blue-900 hover:to-blue-950'
                : 'bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>

          {/* Export Button */}
          <button
            onClick={onExport}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all shadow-md hover:shadow-lg ${
              isDarkMode
                ? 'bg-linear-to-r from-green-700 to-green-800 hover:from-green-900 hover:to-green-950'
                : 'bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
            }`}
          >
            <Download size={20} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg ${
              isDarkMode
                ? 'bg-linear-to-r from-yellow-500 to-yellow-600 text-gray-900 hover:from-yellow-600 hover:to-yellow-700'
                : 'bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
            }`}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
            <span className="hidden sm:inline text-sm font-medium">
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search 
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`} 
            size={20} 
          />
          <input
            type="text"
            placeholder="Search customers, products, countries, or categories..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500'
                : 'border-gray-300 bg-white'
            }`}
          />
          {searchTerm && (
            <button
              onClick={onSearchClear}
              className={`absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform ${
                isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
