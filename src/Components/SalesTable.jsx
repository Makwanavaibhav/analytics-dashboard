import { Calendar } from 'lucide-react';

const SalesTable = ({ filteredData, salesData, filters, searchTerm }) => {
  return (
    <>
      <div className="mt-10 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Recent Sales</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{filteredData.length} records found</span>
              {filteredData.length > 10 && (
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All →
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Region</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.slice(0, 10).map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700 font-medium">{sale.date}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{sale.customer}</div>
                    <div className="text-sm text-gray-500">{sale.country}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{sale.product}</div>
                    <div className="text-sm text-gray-500">{sale.category}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {sale.region}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">${sale.revenue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{sale.quantity} units</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-2">No sales records found</div>
            <p className="text-sm text-gray-500">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <span className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            Showing <span className="font-semibold text-gray-900">{filteredData.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{salesData.length}</span> total records
          </span>
          {(filters.region !== 'all' || filters.category !== 'all' || searchTerm) && (
            <>
              <span className="hidden md:inline">•</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="font-medium">Active filters:</span>
                {filters.region !== 'all' && (
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
                    Region: {filters.region}
                  </span>
                )}
                {filters.category !== 'all' && (
                  <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm border border-green-100">
                    Category: {filters.category}
                  </span>
                )}
                {searchTerm && (
                  <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm border border-purple-100">
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
