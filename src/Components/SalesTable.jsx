import { Calendar } from 'lucide-react';

const SalesTable = ({ 
  filteredData, 
  salesData, 
  filters, 
  searchTerm,
  isDarkMode
}) => {
  return (
    <>
      {/* Table Card */}
      <div className={`mt-10 rounded-xl shadow-lg border overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 shadow-gray-900/50' 
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        <div className={`p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={isDarkMode ? "text-xl font-semibold text-gray-100" : "text-xl font-semibold text-gray-800"}>
              Recent Sales
            </h2>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                {filteredData.length} records found
              </span>
              {filteredData.length > 10 && (
                <button className={`text-sm font-medium hover:underline transition-all ${
                  isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                }`}>
                  View All →
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}>
              <tr>
                <th className={`py-4 px-6 text-left text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Date
                </th>
                <th className={`py-4 px-6 text-left text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Customer
                </th>
                <th className={`py-4 px-6 text-left text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Product
                </th>
                <th className={`py-4 px-6 text-left text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Region
                </th>
                <th className={`py-4 px-6 text-left text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isDarkMode ? "divide-gray-700" : "divide-gray-200"
            }`}>
              {filteredData.slice(0, 10).map((sale) => (
                <tr 
                  key={sale.id} 
                  className={`hover:${
                    isDarkMode ? "bg-gray-700/50" : "bg-gray-50/50"
                  } transition-colors cursor-pointer`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {sale.date}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={isDarkMode ? "font-medium text-gray-100" : "font-medium text-gray-900"}>
                      {sale.customer}
                    </div>
                    <div className={isDarkMode ? "text-sm text-gray-500" : "text-sm text-gray-500"}>
                      {sale.country}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={isDarkMode ? "font-medium text-gray-100" : "font-medium text-gray-900"}>
                      {sale.product}
                    </div>
                    <div className={isDarkMode ? "text-sm text-gray-500" : "text-sm text-gray-500"}>
                      {sale.category}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isDarkMode 
                        ? "bg-blue-900/50 text-blue-300 border border-blue-800/50" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {sale.region}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className={isDarkMode ? "font-semibold text-gray-100" : "font-semibold text-gray-900"}>
                      ${sale.revenue.toLocaleString()}
                    </div>
                    <div className={isDarkMode ? "text-sm text-gray-500" : "text-sm text-gray-500"}>
                      {sale.quantity} units
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="py-12 text-center">
            <div className={isDarkMode ? "text-gray-500 mb-2" : "text-gray-400 mb-2"}>
              No sales records found
            </div>
            <p className={isDarkMode ? "text-sm text-gray-500" : "text-sm text-gray-500"}>
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <div className={`flex flex-wrap items-center justify-center gap-4 text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          <span className={`px-4 py-2 rounded-lg border shadow-sm ${
            isDarkMode 
              ? "bg-gray-800 border-gray-700 text-gray-400" 
              : "bg-white border-gray-200"
          }`}>
            Showing <span className={isDarkMode ? "font-semibold text-gray-200" : "font-semibold text-gray-900"}>
              {filteredData.length}
            </span> of{' '}
            <span className={isDarkMode ? "font-semibold text-gray-200" : "font-semibold text-gray-900"}>
              {salesData.length}
            </span> total records
          </span>
          
          {(filters.region !== 'all' || filters.category !== 'all' || searchTerm) && (
            <>
              <span className="hidden md:inline">•</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className={`font-medium ${
                  isDarkMode ? "text-gray-300" : ""
                }`}>
                  Active filters:
                </span>
                {filters.region !== 'all' && (
                  <span className={`px-3 py-1.5 rounded-lg text-sm border ${
                    isDarkMode 
                      ? "bg-blue-900/30 text-blue-300 border-blue-800/50" 
                      : "bg-blue-50 text-blue-700 border border-blue-100"
                  }`}>
                    Region: {filters.region}
                  </span>
                )}
                {filters.category !== 'all' && (
                  <span className={`px-3 py-1.5 rounded-lg text-sm border ${
                    isDarkMode 
                      ? "bg-green-900/30 text-green-300 border-green-800/50" 
                      : "bg-green-50 text-green-700 border border-green-100"
                  }`}>
                    Category: {filters.category}
                  </span>
                )}
                {searchTerm && (
                  <span className={`px-3 py-1.5 rounded-lg text-sm border ${
                    isDarkMode 
                      ? "bg-purple-900/30 text-purple-300 border-purple-800/50" 
                      : "bg-purple-50 text-purple-700 border border-purple-100"
                  }`}>
                    Search: "{searchTerm}"
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SalesTable;
