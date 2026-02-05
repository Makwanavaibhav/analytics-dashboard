import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { BarChart3, TrendingUp, Users, Globe, ShoppingBag,Calendar, Filter, Download, DollarSign, Search, RefreshCw, PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon, TrendingDown,X } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

import salesData from '../src/data/salesdata.js';
import HeaderSection from './Components/HeaderSection.jsx';
import ControlsSection from './Components/ControlsSection.jsx';
import ChartsGrid from './Components/ChartsGrid.jsx';
import SalesTable from './Components/SalesTable.jsx';

const getTotalRevenue = (data) => {
  return data.reduce((total, sale) => total + sale.revenue, 0);
};

const getRevenueByRegion = (data) => {
  const revenueByRegion = {};
  data.forEach(sale => {
    if (!revenueByRegion[sale.region]) {
      revenueByRegion[sale.region] = 0;
    }
    revenueByRegion[sale.region] += sale.revenue;
  });
  return revenueByRegion;
};

const getRevenueByCategory = (data) => {
  const revenueByCategory = {};
  data.forEach(sale => {
    if (!revenueByCategory[sale.category]) {
      revenueByCategory[sale.category] = 0;
    }
    revenueByCategory[sale.category] += sale.revenue;
  });
  return revenueByCategory;
};

const getMonthlyRevenue = (data) => {
  const monthlyData = {};
  data.forEach(sale => {
    const date = new Date(sale.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    
    if (!monthlyData[key]) {
      monthlyData[key] = 0;
    }
    monthlyData[key] += sale.revenue;
  });
  
  return Object.entries(monthlyData)
    .sort((a, b) => {
      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      return dateA - dateB;
    })
    .slice(-6);
};

const getTopSellingProducts = (data, limit = 5) => {
  const productSales = {};
  data.forEach(sale => {
    if (!productSales[sale.product]) {
      productSales[sale.product] = {
        revenue: 0,
        quantity: 0,
        count: 0
      };
    }
    productSales[sale.product].revenue += sale.revenue;
    productSales[sale.product].quantity += sale.quantity;
    productSales[sale.product].count += 1;
  });

  return Object.entries(productSales)
    .map(([product, data]) => ({ product, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
};

const getCustomerSpending = (data) => {
  const customerData = {};
  data.forEach(sale => {
    if (!customerData[sale.customer]) {
      customerData[sale.customer] = {
        totalSpent: 0,
        orders: 0,
        countries: new Set(),
        categories: new Set()
      };
    }
    customerData[sale.customer].totalSpent += sale.revenue;
    customerData[sale.customer].orders += 1;
    customerData[sale.customer].countries.add(sale.country);
    customerData[sale.customer].categories.add(sale.category);
  });

  return Object.entries(customerData)
    .map(([customer, data]) => ({
      customer,
      totalSpent: data.totalSpent,
      orders: data.orders,
      averageOrderValue: data.totalSpent / data.orders,
      countries: Array.from(data.countries),
      categories: Array.from(data.categories)
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent);
};

const CHART_COLORS = {
  blue: '#3b82f6',
  green: '#10b981',
  purple: '#8b5cf6',
  orange: '#f59e0b',
  red: '#ef4444',
  pink: '#ec4899',
  indigo: '#6366f1',
  teal: '#14b8a6'
};

const CHART_COLORS_ARRAY = [
  '#3b82f6',
  '#10b981', 
  '#8b5cf6',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#6366f1',
  '#14b8a6'
];

const SalesDashboard = () => {
  const [filters, setFilters] = useState({
    region: 'all',
    category: 'all',
    dateRange: 'all'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(salesData);
  const [activeChart, setActiveChart] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const regions = ['all', ...new Set(salesData.map(item => item.region))];
  const categories = ['all', ...new Set(salesData.map(item => item.category))];

  useEffect(() => {
    let data = [...salesData];

    if (filters.region !== 'all') {
      data = data.filter(item => item.region === filters.region);
    }

    if (filters.category !== 'all') {
      data = data.filter(item => item.category === filters.category);
    }

    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      switch (filters.dateRange) {
        case 'last30':
          cutoff.setDate(now.getDate() - 30);
          break;
        case 'last90':
          cutoff.setDate(now.getDate() - 90);
          break;
        case 'last365':
          cutoff.setDate(now.getDate() - 365);
          break;
        default:
          break;
      }
      
      if (filters.dateRange !== 'all') {
        data = data.filter(item => new Date(item.date) >= cutoff);
      }
    }

    if (searchTerm) {
      data = data.filter(item => 
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [filters, searchTerm]);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setIsDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const totalRevenue = getTotalRevenue(filteredData);
  const averageOrderValue = totalRevenue / (filteredData.length || 1);
  const uniqueCustomers = new Set(filteredData.map(item => item.customer)).size;
  const totalOrders = filteredData.length;
  const revenueByRegion = getRevenueByRegion(filteredData);
  const revenueByCategory = getRevenueByCategory(filteredData);
  const monthlyRevenue = getMonthlyRevenue(filteredData);
  const topProducts = getTopSellingProducts(filteredData);
  const topCustomers = getCustomerSpending(filteredData).slice(0, 5);

  const regionChartData = {
    labels: Object.keys(revenueByRegion),
    datasets: [{
      label: 'Revenue by Region',
      data: Object.values(revenueByRegion),
      backgroundColor: [
        CHART_COLORS.blue,
        CHART_COLORS.green,
        CHART_COLORS.purple,
        CHART_COLORS.orange
      ],
      borderColor: [
        CHART_COLORS.blue,
        CHART_COLORS.green,
        CHART_COLORS.purple,
        CHART_COLORS.orange
      ],
      borderWidth: 1,
    }],
  };

  const categoryChartData = {
    labels: Object.keys(revenueByCategory),
    datasets: [{
      label: 'Revenue by Category',
      data: Object.values(revenueByCategory),
      backgroundColor: CHART_COLORS_ARRAY.slice(0, Object.keys(revenueByCategory).length),
      borderWidth: 1,
    }],
  };

  const monthlyChartData = {
    labels: monthlyRevenue.map(item => item[0]),
    datasets: [{
      label: 'Monthly Revenue',
      data: monthlyRevenue.map(item => item[1]),
      borderColor: CHART_COLORS.blue,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      tension: 0.3,
      fill: true,
    }],
  };

  const topProductsChartData = {
    labels: topProducts.map(item => item.product),
    datasets: [{
      label: 'Revenue',
      data: topProducts.map(item => item.revenue),
      backgroundColor: CHART_COLORS_ARRAY.slice(0, topProducts.length),
      borderWidth: 1,
    }],
  };

  const customerSpendingChartData = {
    labels: topCustomers.map(item => item.customer.split(' ')[0]),
    datasets: [{
      label: 'Total Spent',
      data: topCustomers.map(item => item.totalSpent),
      backgroundColor: CHART_COLORS.blue,
      borderColor: CHART_COLORS.blue,
      borderWidth: 2,
    }, {
      label: 'Average Order',
      data: topCustomers.map(item => item.averageOrderValue),
      backgroundColor: CHART_COLORS.green,
      borderColor: CHART_COLORS.green,
      borderWidth: 2,
    }],
  };

  const regionRadarData = {
    labels: Object.keys(revenueByRegion),
    datasets: [{
      label: 'Regional Performance',
      data: Object.values(revenueByRegion),
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: CHART_COLORS.blue,
      pointBackgroundColor: CHART_COLORS.blue,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: CHART_COLORS.blue,
    }],
  };

  // Chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const handleExport = () => {
    const csv = [
      ['Date', 'Region', 'Country', 'Category', 'Product', 'Revenue', 'Quantity', 'Customer'],
      ...filteredData.map(item => [
        item.date,
        item.region,
        item.country,
        item.category,
        item.product,
        item.revenue,
        item.quantity,
        item.customer
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-data.csv';
    a.click();
  };

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const clearFilters = () => {
    setFilters({ region: 'all', category: 'all', dateRange: 'all' });
    setSearchTerm('');
  };

  return (
    <div className={`min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-6 transition-all duration-300 ${
      isDarkMode
      ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-linear-to-br from-gray-50 to-gray-100'
    }`}>
      <HeaderSection 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchClear={() => setSearchTerm('')}
        onRefresh={refreshData}
        isLoading={isLoading}
        onExport={handleExport}
        isDarkMode={isDarkMode}       
        onToggleDarkMode={toggleDarkMode}
      />
      
      <ControlsSection 
        activeChart={activeChart}
        onChartChange={setActiveChart}
        filters={filters}
        regions={regions}
        categories={categories}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
        totalRevenue={totalRevenue}
        averageOrderValue={averageOrderValue}
        uniqueCustomers={uniqueCustomers}
        totalOrders={totalOrders}
        isLoading={isLoading}
        isDarkMode={isDarkMode}
      />
      
      <ChartsGrid 
        activeChart={activeChart}
        revenueByRegion={revenueByRegion}
        revenueByCategory={revenueByCategory}
        monthlyRevenue={monthlyRevenue}
        topProducts={topProducts}
        topCustomers={topCustomers}
        regionChartData={regionChartData}
        categoryChartData={categoryChartData}
        monthlyChartData={monthlyChartData}
        topProductsChartData={topProductsChartData}
        customerSpendingChartData={customerSpendingChartData}
        regionRadarData={regionRadarData}
        barChartOptions={barChartOptions}
        pieChartOptions={pieChartOptions}
        lineChartOptions={lineChartOptions}
        radarChartOptions={radarChartOptions}
        isDarkMode={isDarkMode}
      />
      
      <SalesTable 
        filteredData={filteredData}
        salesData={salesData}
        filters={filters}
        searchTerm={searchTerm}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default SalesDashboard;
