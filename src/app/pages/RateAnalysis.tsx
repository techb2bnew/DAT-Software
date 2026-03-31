import { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  BarChart3,
  Download,
  Calendar,
  ArrowRight,
  MapPin
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock historical rate data for a lane
const generateHistoricalData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map((month, index) => ({
    id: `month-${index}`,
    month,
    spotRate: 2.45 + Math.random() * 0.8 - 0.4,
    contractRate: 2.20 + Math.random() * 0.4 - 0.2,
    supply: 120 + Math.floor(Math.random() * 80),
    demand: 100 + Math.floor(Math.random() * 100),
    avgRate: 2.35 + Math.random() * 0.6 - 0.3,
  }));
};

// Mock data for different lanes
const laneData = {
  'Los Angeles, CA to Chicago, IL': {
    avgRate: 2.45,
    currentSpot: 2.65,
    currentContract: 2.30,
    trend: 'up',
    change: 0.15,
    percentChange: 6.0,
    historicalData: generateHistoricalData(),
  },
  'Houston, TX to Atlanta, GA': {
    avgRate: 2.80,
    currentSpot: 2.95,
    currentContract: 2.65,
    trend: 'down',
    change: -0.10,
    percentChange: -3.5,
    historicalData: generateHistoricalData(),
  },
  'Seattle, WA to Phoenix, AZ': {
    avgRate: 3.00,
    currentSpot: 3.20,
    currentContract: 2.85,
    trend: 'up',
    change: 0.25,
    percentChange: 8.5,
    historicalData: generateHistoricalData(),
  },
};

// Historical rate table data
const historicalRateTable = [
  {
    id: 'rate-1',
    date: 'Mar 12, 2026',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    avgRate: '$2.45',
    spotRate: '$2.65',
    contractRate: '$2.30',
    loadCount: 145,
    equipment: 'Dry Van',
  },
  {
    id: 'rate-2',
    date: 'Mar 11, 2026',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    avgRate: '$2.40',
    spotRate: '$2.60',
    contractRate: '$2.28',
    loadCount: 138,
    equipment: 'Dry Van',
  },
  {
    id: 'rate-3',
    date: 'Mar 10, 2026',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    avgRate: '$2.38',
    spotRate: '$2.55',
    contractRate: '$2.25',
    loadCount: 152,
    equipment: 'Dry Van',
  },
  {
    id: 'rate-4',
    date: 'Mar 9, 2026',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    avgRate: '$2.42',
    spotRate: '$2.62',
    contractRate: '$2.27',
    loadCount: 148,
    equipment: 'Dry Van',
  },
  {
    id: 'rate-5',
    date: 'Mar 8, 2026',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    avgRate: '$2.35',
    spotRate: '$2.50',
    contractRate: '$2.22',
    loadCount: 141,
    equipment: 'Dry Van',
  },
  {
    id: 'rate-6',
    date: 'Mar 12, 2026',
    origin: 'Houston, TX',
    destination: 'Atlanta, GA',
    avgRate: '$2.80',
    spotRate: '$2.95',
    contractRate: '$2.65',
    loadCount: 89,
    equipment: 'Reefer',
  },
  {
    id: 'rate-7',
    date: 'Mar 11, 2026',
    origin: 'Houston, TX',
    destination: 'Atlanta, GA',
    avgRate: '$2.85',
    spotRate: '$3.00',
    contractRate: '$2.70',
    loadCount: 95,
    equipment: 'Reefer',
  },
  {
    id: 'rate-8',
    date: 'Mar 12, 2026',
    origin: 'Seattle, WA',
    destination: 'Phoenix, AZ',
    avgRate: '$3.00',
    spotRate: '$3.20',
    contractRate: '$2.85',
    loadCount: 67,
    equipment: 'Flatbed',
  },
];

export function RateAnalysis() {
  const [origin, setOrigin] = useState('Los Angeles, CA');
  const [destination, setDestination] = useState('Chicago, IL');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [dateRange, setDateRange] = useState('12months');

  const currentLane = `${origin} to ${destination}`;
  const laneStats = laneData[currentLane as keyof typeof laneData] || laneData['Los Angeles, CA to Chicago, IL'];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Rate Analysis
        </h1>
        <p className="text-gray-600">
          Track freight rates, analyze market trends, and compare spot vs contract pricing
        </p>
      </div>

      {/* Lane Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          Lane Search
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origin
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="City, State"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="City, State"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment Type
            </label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Equipment</option>
              <option value="dry-van">Dry Van</option>
              <option value="reefer">Reefer</option>
              <option value="flatbed">Flatbed</option>
            </select>
          </div>
        </div>

        <button className="mt-4 w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
          <Search className="w-4 h-4" />
          Analyze Lane
        </button>
      </div>

      {/* Selected Lane Info */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-900">
              <span className="font-medium">{origin}</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
              <span className="font-medium">{destination}</span>
            </div>
            <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
              Dry Van
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg Rate/Mile</h3>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold text-gray-900">
              ${laneStats.avgRate.toFixed(2)}
            </p>
            <div className={`flex items-center gap-1 text-sm font-medium mb-1 ${
              laneStats.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {laneStats.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(laneStats.percentChange)}%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">vs last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Spot Rate</h3>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold text-gray-900">
              ${laneStats.currentSpot.toFixed(2)}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">current market rate</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Contract Rate</h3>
            <BarChart3 className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold text-gray-900">
              ${laneStats.currentContract.toFixed(2)}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">avg contract pricing</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Rate Spread</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold text-gray-900">
              ${(laneStats.currentSpot - laneStats.currentContract).toFixed(2)}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">spot vs contract</p>
        </div>
      </div>

      {/* Rate Trends Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-medium text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Rate Trends Over Time
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
        
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={laneStats.historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="avgRate" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Average Rate"
              dot={{ fill: '#3B82F6', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="spotRate" 
              stroke="#F59E0B" 
              strokeWidth={2}
              name="Spot Rate"
              dot={{ fill: '#F59E0B', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="contractRate" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Contract Rate"
              dot={{ fill: '#10B981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Spot vs Contract Rates Comparison */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Spot vs Contract Rates
        </h2>
        
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={laneStats.historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Area 
              type="monotone" 
              dataKey="spotRate" 
              stackId="1"
              stroke="#F59E0B" 
              fill="#FEF3C7"
              name="Spot Rate"
            />
            <Area 
              type="monotone" 
              dataKey="contractRate" 
              stackId="2"
              stroke="#10B981" 
              fill="#D1FAE5"
              name="Contract Rate"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Supply vs Demand */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Supply vs Demand Analysis
        </h2>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={laneStats.historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar 
              dataKey="supply" 
              fill="#3B82F6" 
              name="Available Trucks"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="demand" 
              fill="#10B981" 
              name="Available Loads"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Historical Rate Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-medium text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Historical Rate Data
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Lane
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Avg Rate/Mi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Spot Rate/Mi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Contract Rate/Mi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Load Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Equipment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historicalRateTable.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{row.origin}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-900">{row.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{row.avgRate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-orange-600">{row.spotRate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">{row.contractRate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.loadCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {row.equipment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}