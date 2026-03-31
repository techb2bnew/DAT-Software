import { useState } from 'react';
import { 
  Lock,
  Share2,
  UserCheck,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  Shield,
  Plus,
  Filter,
  Search,
  X,
  Check,
  Users,
  Package,
  TrendingUp,
  AlertCircle,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

type CarrierGroup = 'all' | 'preferred' | 'active' | 'new';

interface PrivateLoad {
  id: string;
  loadNumber: string;
  origin: string;
  destination: string;
  rate: number;
  pickupDate: string;
  deliveryDate: string;
  weight: number;
  equipmentType: string;
  commodity: string;
  distance: number;
  assignedCarrier: string | null;
  sharedWith: string[]; // carrier group IDs
  viewCount: number;
  status: 'open' | 'assigned' | 'pending';
}

const mockLoads: PrivateLoad[] = [
  {
    id: '1',
    loadNumber: 'PL-2024-001',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    rate: 4850,
    pickupDate: '2026-03-16',
    deliveryDate: '2026-03-19',
    weight: 44000,
    equipmentType: 'Dry Van',
    commodity: 'Electronics',
    distance: 2015,
    assignedCarrier: null,
    sharedWith: ['preferred', 'active'],
    viewCount: 12,
    status: 'open',
  },
  {
    id: '2',
    loadNumber: 'PL-2024-002',
    origin: 'Houston, TX',
    destination: 'Miami, FL',
    rate: 3200,
    pickupDate: '2026-03-17',
    deliveryDate: '2026-03-20',
    weight: 38000,
    equipmentType: 'Reefer',
    commodity: 'Perishable Goods',
    distance: 1189,
    assignedCarrier: 'Swift Transport Solutions',
    sharedWith: ['preferred'],
    viewCount: 8,
    status: 'assigned',
  },
  {
    id: '3',
    loadNumber: 'PL-2024-003',
    origin: 'Phoenix, AZ',
    destination: 'Seattle, WA',
    rate: 3850,
    pickupDate: '2026-03-18',
    deliveryDate: '2026-03-21',
    weight: 42000,
    equipmentType: 'Dry Van',
    commodity: 'Consumer Goods',
    distance: 1420,
    assignedCarrier: null,
    sharedWith: ['preferred', 'active', 'new'],
    viewCount: 18,
    status: 'open',
  },
  {
    id: '4',
    loadNumber: 'PL-2024-004',
    origin: 'Denver, CO',
    destination: 'Atlanta, GA',
    rate: 4200,
    pickupDate: '2026-03-15',
    deliveryDate: '2026-03-18',
    weight: 45000,
    equipmentType: 'Dry Van',
    commodity: 'Industrial Equipment',
    distance: 1398,
    assignedCarrier: 'Reliable Freight Lines',
    sharedWith: ['preferred'],
    viewCount: 5,
    status: 'pending',
  },
  {
    id: '5',
    loadNumber: 'PL-2024-005',
    origin: 'Dallas, TX',
    destination: 'New York, NY',
    rate: 5100,
    pickupDate: '2026-03-19',
    deliveryDate: '2026-03-23',
    weight: 43500,
    equipmentType: 'Reefer',
    commodity: 'Pharmaceuticals',
    distance: 1552,
    assignedCarrier: null,
    sharedWith: ['preferred'],
    viewCount: 15,
    status: 'open',
  },
  {
    id: '6',
    loadNumber: 'PL-2024-006',
    origin: 'Portland, OR',
    destination: 'Boston, MA',
    rate: 6200,
    pickupDate: '2026-03-20',
    deliveryDate: '2026-03-25',
    weight: 40000,
    equipmentType: 'Dry Van',
    commodity: 'Electronics',
    distance: 3043,
    assignedCarrier: null,
    sharedWith: ['preferred', 'active'],
    viewCount: 9,
    status: 'open',
  },
  {
    id: '7',
    loadNumber: 'PL-2024-007',
    origin: 'Kansas City, MO',
    destination: 'Phoenix, AZ',
    rate: 3600,
    pickupDate: '2026-03-17',
    deliveryDate: '2026-03-20',
    weight: 39000,
    equipmentType: 'Flatbed',
    commodity: 'Building Materials',
    distance: 1170,
    assignedCarrier: null,
    sharedWith: ['active'],
    viewCount: 6,
    status: 'open',
  },
  {
    id: '8',
    loadNumber: 'PL-2024-008',
    origin: 'Miami, FL',
    destination: 'Los Angeles, CA',
    rate: 5800,
    pickupDate: '2026-03-21',
    deliveryDate: '2026-03-26',
    weight: 41000,
    equipmentType: 'Reefer',
    commodity: 'Frozen Foods',
    distance: 2733,
    assignedCarrier: 'Cold Chain Express',
    sharedWith: ['preferred', 'active'],
    viewCount: 11,
    status: 'assigned',
  },
];

const carrierGroups = [
  { id: 'preferred', label: 'Preferred', color: 'bg-purple-100 text-purple-800', count: 4 },
  { id: 'active', label: 'Active', color: 'bg-green-100 text-green-800', count: 8 },
  { id: 'new', label: 'New', color: 'bg-blue-100 text-blue-800', count: 3 },
];

const mockCarriers = [
  'Swift Transport Solutions',
  'Reliable Freight Lines',
  'Cold Chain Express',
  'Express Logistics Co',
  'Mountain Haulers LLC',
  'Nationwide Transport Inc',
];

export function PrivateLoadBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState<CarrierGroup>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'assigned' | 'pending'>('all');
  const [selectedLoad, setSelectedLoad] = useState<PrivateLoad | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedCarrier, setSelectedCarrier] = useState<string>('');

  const filteredLoads = mockLoads.filter(load => {
    const matchesSearch = searchQuery === '' || 
      load.loadNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGroup = groupFilter === 'all' || load.sharedWith.includes(groupFilter);
    const matchesStatus = statusFilter === 'all' || load.status === statusFilter;

    return matchesSearch && matchesGroup && matchesStatus;
  });

  const handleShareLoad = (load: PrivateLoad) => {
    setSelectedLoad(load);
    setSelectedGroups(load.sharedWith);
    setShowShareModal(true);
  };

  const handleAssignCarrier = (load: PrivateLoad) => {
    setSelectedLoad(load);
    setSelectedCarrier(load.assignedCarrier || '');
    setShowAssignModal(true);
  };

  const handleRemoveLoad = (loadId: string) => {
    toast.success('Load removed from private board');
  };

  const toggleGroup = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(g => g !== groupId)
        : [...prev, groupId]
    );
  };

  const saveSharing = () => {
    if (selectedGroups.length === 0) {
      toast.error('Please select at least one carrier group');
      return;
    }
    toast.success(`Load shared with ${selectedGroups.length} carrier group${selectedGroups.length > 1 ? 's' : ''}`);
    setShowShareModal(false);
  };

  const saveAssignment = () => {
    if (!selectedCarrier) {
      toast.error('Please select a carrier');
      return;
    }
    toast.success(`Load assigned to ${selectedCarrier}`);
    setShowAssignModal(false);
  };

  const stats = {
    totalLoads: mockLoads.length,
    openLoads: mockLoads.filter(l => l.status === 'open').length,
    assignedLoads: mockLoads.filter(l => l.status === 'assigned').length,
    totalValue: mockLoads.reduce((sum, l) => sum + l.rate, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-semibold text-gray-900">
                Private Load Board
              </h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-md">
                <Lock className="w-3.5 h-3.5 text-purple-700" />
                <span className="text-xs font-medium text-purple-700">Exclusive Network</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Share loads exclusively with your trusted carrier network
            </p>
          </div>
          <button
            onClick={() => toast.success('Add new private load')}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Private Load
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Private Loads</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalLoads}</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Open for Bids</p>
              <p className="text-2xl font-semibold text-green-600">{stats.openLoads}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Assigned</p>
              <p className="text-2xl font-semibold text-blue-600">{stats.assignedLoads}</p>
            </div>
            <UserCheck className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900">${(stats.totalValue / 1000).toFixed(0)}k</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by load number, origin, or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="assigned">Assigned</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Carrier Group Filter */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700 mr-2">Shared With:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setGroupFilter('all')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  groupFilter === 'all'
                    ? 'bg-slate-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Groups
              </button>
              {carrierGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => setGroupFilter(group.id as CarrierGroup)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    groupFilter === group.id
                      ? group.color.replace('100', '600').replace('800', 'white')
                      : `${group.color} hover:opacity-80`
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium text-gray-900">{filteredLoads.length}</span> private {filteredLoads.length === 1 ? 'load' : 'loads'}
        </p>
      </div>

      {/* Loads Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Load ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Origin
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Pickup Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Assigned Carrier
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Shared With
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLoads.map((load) => (
                <tr key={load.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-purple-500" />
                      <span className="text-sm font-medium text-gray-900">{load.loadNumber}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Eye className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{load.viewCount} views</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{load.origin}</div>
                    <div className="text-xs text-gray-500">{load.equipmentType}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{load.destination}</div>
                    <div className="text-xs text-gray-500">{load.distance} mi</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-semibold text-green-600">${load.rate.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">${(load.rate / load.distance).toFixed(2)}/mi</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{load.pickupDate}</div>
                    <div className="text-xs text-gray-500">Del: {load.deliveryDate}</div>
                  </td>
                  <td className="px-4 py-4">
                    {load.assignedCarrier ? (
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-900">{load.assignedCarrier}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Not assigned</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {load.sharedWith.map((groupId) => {
                        const group = carrierGroups.find(g => g.id === groupId);
                        return group ? (
                          <span 
                            key={groupId}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${group.color}`}
                          >
                            {groupId === 'preferred' && <Award className="w-3 h-3" />}
                            {group.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getStatusColor(load.status)}`}>
                      {load.status.charAt(0).toUpperCase() + load.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleShareLoad(load)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Share Load"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAssignCarrier(load)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Assign Carrier"
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveLoad(load.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove Load"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredLoads.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 py-12 text-center mt-4">
          <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No private loads found</h3>
          <p className="text-sm text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Share Load Modal */}
      {showShareModal && selectedLoad && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Share Load</h2>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {selectedLoad.loadNumber}
              </div>
              <div className="text-xs text-gray-600">
                {selectedLoad.origin} → {selectedLoad.destination}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select carrier groups to share with:
              </label>
              <div className="space-y-2">
                {carrierGroups.map(group => (
                  <label 
                    key={group.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(group.id)}
                      onChange={() => toggleGroup(group.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${group.color}`}>
                          {group.id === 'preferred' && <Award className="w-3 h-3" />}
                          {group.label}
                        </span>
                        <span className="text-xs text-gray-500">({group.count} carriers)</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  Only carriers in the selected groups will be able to view and bid on this load
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveSharing}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Share Load
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Carrier Modal */}
      {showAssignModal && selectedLoad && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Assign Carrier</h2>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {selectedLoad.loadNumber}
              </div>
              <div className="text-xs text-gray-600">
                {selectedLoad.origin} → {selectedLoad.destination}
              </div>
              <div className="text-sm font-semibold text-green-600 mt-1">
                ${selectedLoad.rate.toLocaleString()}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select carrier:
              </label>
              <select
                value={selectedCarrier}
                onChange={(e) => setSelectedCarrier(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Choose a carrier...</option>
                {mockCarriers.map(carrier => (
                  <option key={carrier} value={carrier}>{carrier}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveAssignment}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Assign Carrier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
