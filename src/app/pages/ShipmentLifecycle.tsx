import { useState } from 'react';
import { 
  Search,
  Filter,
  Download,
  Eye,
  MapPin,
  Truck,
  Package,
  CheckCircle,
  Clock,
  X,
  Upload,
  FileText,
  Calendar,
  ChevronRight,
  Navigation,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

// Mock shipment data
const mockShipments = [
  {
    id: 'SHP-78912',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    carrier: 'Western Express LLC',
    pickupDate: 'Mar 14, 2026',
    deliveryDate: 'Mar 17, 2026',
    status: 'in-transit',
    commodity: 'Electronics',
    weight: '45,000 lbs',
    equipment: 'Dry Van',
    rate: '$4,935',
    driver: 'John Martinez',
    loadId: 'LD-3891',
  },
  {
    id: 'SHP-78913',
    origin: 'Phoenix, AZ',
    destination: 'Denver, CO',
    carrier: 'Cold Chain Transport',
    pickupDate: 'Mar 13, 2026',
    deliveryDate: 'Mar 15, 2026',
    status: 'delivered',
    commodity: 'Perishable Goods',
    weight: '38,500 lbs',
    equipment: 'Reefer',
    rate: '$3,850',
    driver: 'Sarah Johnson',
    loadId: 'LD-3892',
  },
  {
    id: 'SHP-78914',
    origin: 'Dallas, TX',
    destination: 'Atlanta, GA',
    carrier: 'Flatbed Pros Inc',
    pickupDate: 'Mar 15, 2026',
    deliveryDate: 'Mar 18, 2026',
    status: 'booked',
    commodity: 'Construction Materials',
    weight: '42,000 lbs',
    equipment: 'Flatbed',
    rate: '$4,200',
    driver: 'Mike Thompson',
    loadId: 'LD-3893',
  },
  {
    id: 'SHP-78915',
    origin: 'Seattle, WA',
    destination: 'Miami, FL',
    carrier: 'Pacific Cold Haul',
    pickupDate: 'Mar 16, 2026',
    deliveryDate: 'Mar 21, 2026',
    status: 'pending',
    commodity: 'Frozen Foods',
    weight: '40,000 lbs',
    equipment: 'Reefer',
    rate: '$8,450',
    driver: 'David Park',
    loadId: 'LD-3894',
  },
  {
    id: 'SHP-78916',
    origin: 'Atlanta, GA',
    destination: 'Boston, MA',
    carrier: 'Southern Transport',
    pickupDate: 'Mar 13, 2026',
    deliveryDate: 'Mar 16, 2026',
    status: 'in-transit',
    commodity: 'Retail Goods',
    weight: '36,500 lbs',
    equipment: 'Dry Van',
    rate: '$3,650',
    driver: 'Lisa Anderson',
    loadId: 'LD-3895',
  },
  {
    id: 'SHP-78917',
    origin: 'Chicago, IL',
    destination: 'New York, NY',
    carrier: 'Midwest Freight Co',
    pickupDate: 'Mar 12, 2026',
    deliveryDate: 'Mar 14, 2026',
    status: 'delivered',
    commodity: 'Furniture',
    weight: '48,000 lbs',
    equipment: 'Dry Van',
    rate: '$2,950',
    driver: 'Robert Chen',
    loadId: 'LD-3896',
  },
  {
    id: 'SHP-78918',
    origin: 'Denver, CO',
    destination: 'Los Angeles, CA',
    carrier: 'Mountain Heavy Haul',
    pickupDate: 'Mar 17, 2026',
    deliveryDate: 'Mar 19, 2026',
    status: 'pending',
    commodity: 'Heavy Machinery',
    weight: '52,000 lbs',
    equipment: 'Flatbed',
    rate: '$5,200',
    driver: 'James Wilson',
    loadId: 'LD-3897',
  },
  {
    id: 'SHP-78919',
    origin: 'Miami, FL',
    destination: 'Dallas, TX',
    carrier: 'Sunshine Logistics',
    pickupDate: 'Mar 14, 2026',
    deliveryDate: 'Mar 17, 2026',
    status: 'booked',
    commodity: 'Beverages',
    weight: '44,000 lbs',
    equipment: 'Dry Van',
    rate: '$4,100',
    driver: 'Maria Garcia',
    loadId: 'LD-3898',
  },
];

type TabType = 'pending' | 'booked' | 'in-transit' | 'delivered';

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pending':
      return { label: 'Pending', color: 'bg-amber-100 text-amber-800', icon: Clock };
    case 'booked':
      return { label: 'Booked', color: 'bg-blue-100 text-blue-800', icon: Calendar };
    case 'in-transit':
      return { label: 'In Transit', color: 'bg-green-100 text-green-800', icon: Truck };
    case 'delivered':
      return { label: 'Delivered', color: 'bg-gray-100 text-gray-800', icon: CheckCircle };
    default:
      return { label: status, color: 'bg-gray-100 text-gray-800', icon: Package };
  }
};

export function ShipmentLifecycle() {
  const [activeTab, setActiveTab] = useState<TabType>('in-transit');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [originFilter, setOriginFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');

  const filteredShipments = mockShipments
    .filter(shipment => {
      // Tab filter
      if (shipment.status !== activeTab) return false;
      
      // Search filter
      const matchesSearch = searchQuery === '' || 
        shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shipment.carrier.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Origin filter
      const matchesOrigin = originFilter === '' || 
        shipment.origin.toLowerCase().includes(originFilter.toLowerCase());
      
      // Destination filter
      const matchesDestination = destinationFilter === '' || 
        shipment.destination.toLowerCase().includes(destinationFilter.toLowerCase());
      
      // Carrier filter
      const matchesCarrier = carrierFilter === '' || 
        shipment.carrier.toLowerCase().includes(carrierFilter.toLowerCase());
      
      return matchesSearch && matchesOrigin && matchesDestination && matchesCarrier;
    });

  const clearFilters = () => {
    setOriginFilter('');
    setDestinationFilter('');
    setCarrierFilter('');
    setDateFromFilter('');
    setDateToFilter('');
    setSearchQuery('');
  };

  const hasActiveFilters = originFilter || destinationFilter || carrierFilter || 
    dateFromFilter || dateToFilter || searchQuery;

  const getTabCount = (tab: TabType) => {
    return mockShipments.filter(s => s.status === tab).length;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Shipment Management
        </h1>
        <p className="text-sm text-gray-600">
          Track and manage shipments throughout their lifecycle
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'pending'
                ? 'border-amber-500 text-amber-700 bg-amber-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Pending</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'pending' ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {getTabCount('pending')}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('booked')}
            className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'booked'
                ? 'border-blue-500 text-blue-700 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Booked</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'booked' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {getTabCount('booked')}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('in-transit')}
            className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'in-transit'
                ? 'border-green-500 text-green-700 bg-green-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-4 h-4" />
              <span>In Transit</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'in-transit' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {getTabCount('in-transit')}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'delivered'
                ? 'border-slate-500 text-slate-700 bg-slate-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Delivered</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'delivered' ? 'bg-slate-200 text-slate-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {getTabCount('delivered')}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by shipment ID, origin, destination, or carrier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors text-sm font-medium ${
              showFilters 
                ? 'bg-slate-50 border-slate-300 text-slate-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 bg-slate-600 text-white text-xs rounded-full">
                {[originFilter, destinationFilter, carrierFilter, dateFromFilter, dateToFilter, searchQuery].filter(Boolean).length}
              </span>
            )}
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Filter Shipments</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Origin Location
              </label>
              <input
                type="text"
                placeholder="City, State"
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Destination Location
              </label>
              <input
                type="text"
                placeholder="City, State"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Carrier Name
              </label>
              <input
                type="text"
                placeholder="Carrier"
                value={carrierFilter}
                onChange={(e) => setCarrierFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Pickup Date From
              </label>
              <input
                type="date"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Pickup Date To
              </label>
              <input
                type="date"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium text-gray-900">{filteredShipments.length}</span> shipments
        </p>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Shipment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Origin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Carrier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Pickup Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredShipments.map((shipment) => {
                const statusConfig = getStatusConfig(shipment.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-blue-600">{shipment.id}</div>
                        <div className="text-xs text-gray-500">Load: {shipment.loadId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{shipment.origin}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{shipment.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{shipment.carrier}</div>
                        <div className="text-xs text-gray-500">{shipment.driver}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shipment.pickupDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shipment.deliveryDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/shipment-tracking"
                          className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                          title="Track Shipment"
                        >
                          <Truck className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            toast.success(`Viewing details for ${shipment.id}`);
                          }}
                          className="p-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            toast.success('Document upload dialog opened');
                          }}
                          className="p-2 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                          title="Upload Documents"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredShipments.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No shipments found</h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredShipments.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Shipments</p>
                <p className="text-2xl font-semibold text-gray-900">{filteredShipments.length}</p>
              </div>
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Weight</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round(filteredShipments.reduce((sum, s) => 
                    sum + parseInt(s.weight.replace(/[^0-9]/g, '')), 0) / 1000)}k
                </p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${Math.round(filteredShipments.reduce((sum, s) => 
                    sum + parseInt(s.rate.replace(/[^0-9]/g, '')), 0) / 1000)}k
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg. Rate/Mile</p>
                <p className="text-2xl font-semibold text-gray-900">$2.45</p>
              </div>
              <Truck className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
