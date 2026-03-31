import { useState } from 'react';
import { 
  Search,
  Truck,
  Package,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Navigation,
  Weight,
  Ruler,
  Star,
  Send,
  X
} from 'lucide-react';

// Mock available loads
const mockLoads = [
  {
    id: 'LD-3891',
    origin: 'Los Angeles, CA',
    originAddress: '123 Logistics Ave, Los Angeles, CA 90001',
    destination: 'Chicago, IL',
    destinationAddress: '456 Freight St, Chicago, IL 60601',
    pickupDate: 'Mar 14, 2026',
    pickupTime: '08:00 AM',
    deliveryDate: 'Mar 17, 2026',
    deliveryTime: '05:00 PM',
    distance: '2,015 mi',
    rate: '$4,935',
    ratePerMile: '$2.45',
    equipment: 'Dry Van',
    weight: '45,000 lbs',
    dimensions: '53ft x 8.5ft x 9ft',
    commodity: 'Electronics',
    broker: 'FreightWorks LLC',
    brokerPhone: '(555) 234-5678',
    specialInstructions: 'Handle with care. Requires signature upon delivery.',
    status: 'unassigned',
  },
  {
    id: 'LD-3892',
    origin: 'Houston, TX',
    originAddress: '789 Port Rd, Houston, TX 77001',
    destination: 'Atlanta, GA',
    destinationAddress: '321 Commerce Blvd, Atlanta, GA 30301',
    pickupDate: 'Mar 13, 2026',
    pickupTime: '10:00 AM',
    deliveryDate: 'Mar 15, 2026',
    deliveryTime: '02:00 PM',
    distance: '789 mi',
    rate: '$2,209',
    ratePerMile: '$2.80',
    equipment: 'Reefer',
    weight: '38,500 lbs',
    dimensions: '53ft x 8.5ft x 9ft',
    commodity: 'Produce',
    broker: 'Chill Transport Co',
    brokerPhone: '(555) 345-6789',
    specialInstructions: 'Temperature must be maintained at 34°F. Time-sensitive delivery.',
    status: 'unassigned',
  },
];

// Mock available trucks
const mockTrucks = [
  {
    id: 'TRK-5471',
    truckNumber: 'T-1247',
    equipment: 'Dry Van',
    location: 'Los Angeles, CA',
    driver: {
      name: 'John Martinez',
      phone: '(555) 123-4567',
      email: 'j.martinez@email.com',
      license: 'CDL-CA-123456',
      rating: 4.9,
    },
    carrier: 'Western Express LLC',
    capacity: '53 ft',
    maxWeight: '48,000 lbs',
    status: 'available',
    nextAvailable: 'Now',
    currentLoads: 0,
  },
  {
    id: 'TRK-5472',
    truckNumber: 'T-1348',
    equipment: 'Reefer',
    location: 'Houston, TX',
    driver: {
      name: 'Sarah Johnson',
      phone: '(555) 234-5678',
      email: 's.johnson@email.com',
      license: 'CDL-TX-789012',
      rating: 4.8,
    },
    carrier: 'Cold Chain Transport',
    capacity: '53 ft',
    maxWeight: '45,000 lbs',
    status: 'available',
    nextAvailable: 'Now',
    currentLoads: 0,
  },
  {
    id: 'TRK-5473',
    truckNumber: 'T-1449',
    equipment: 'Dry Van',
    location: 'Dallas, TX',
    driver: {
      name: 'Mike Thompson',
      phone: '(555) 345-6789',
      email: 'm.thompson@email.com',
      license: 'CDL-TX-345678',
      rating: 4.7,
    },
    carrier: 'Midwest Freight Co',
    capacity: '53 ft',
    maxWeight: '48,000 lbs',
    status: 'available',
    nextAvailable: 'Tomorrow',
    currentLoads: 0,
  },
  {
    id: 'TRK-5474',
    truckNumber: 'T-1550',
    equipment: 'Flatbed',
    location: 'Phoenix, AZ',
    driver: {
      name: 'Robert Chen',
      phone: '(555) 456-7890',
      email: 'r.chen@email.com',
      license: 'CDL-AZ-901234',
      rating: 4.9,
    },
    carrier: 'Flatbed Pros Inc',
    capacity: '48 ft',
    maxWeight: '48,000 lbs',
    status: 'available',
    nextAvailable: 'Now',
    currentLoads: 0,
  },
];

export function Dispatch() {
  const [selectedLoadId, setSelectedLoadId] = useState(mockLoads[0].id);
  const [selectedTruckId, setSelectedTruckId] = useState('');
  const [dispatchInstructions, setDispatchInstructions] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const selectedLoad = mockLoads.find(l => l.id === selectedLoadId) || mockLoads[0];
  const selectedTruck = mockTrucks.find(t => t.id === selectedTruckId);

  // Filter trucks by equipment type
  const compatibleTrucks = mockTrucks.filter(
    truck => truck.equipment === selectedLoad.equipment && truck.status === 'available'
  );

  const handleDispatch = () => {
    if (selectedTruckId) {
      setShowConfirmation(true);
      // In a real app, this would make an API call to assign the load
      setTimeout(() => {
        setShowConfirmation(false);
        // Reset form
        setSelectedTruckId('');
        setDispatchInstructions('');
      }, 2000);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Load Assignment & Dispatch
        </h1>
        <p className="text-gray-600">
          Assign available loads to trucks and dispatch drivers
        </p>
      </div>

      {/* Success Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Load Dispatched Successfully!
              </h3>
              <p className="text-gray-600 mb-1">
                Load <span className="font-medium text-gray-900">{selectedLoad.id}</span> has been assigned to
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">{selectedTruck?.driver.name}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Available Loads */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Available Loads ({mockLoads.length})
            </h2>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search loads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {mockLoads.map((load) => (
                <button
                  key={load.id}
                  onClick={() => setSelectedLoadId(load.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedLoadId === load.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-blue-600">{load.id}</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {load.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{load.origin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{load.destination}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{load.equipment}</span>
                      <span className="text-sm font-medium text-gray-900">{load.rate}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Load Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Load Details
            </h2>

            {/* Load ID and Status */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Load ID</div>
                  <div className="text-xl font-semibold text-gray-900">{selectedLoad.id}</div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Available
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Equipment Type</div>
                  <div className="text-sm font-medium text-gray-900">{selectedLoad.equipment}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Distance</div>
                  <div className="text-sm font-medium text-gray-900">{selectedLoad.distance}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Rate</div>
                  <div className="text-sm font-medium text-green-600">{selectedLoad.rate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Per Mile</div>
                  <div className="text-sm font-medium text-gray-900">{selectedLoad.ratePerMile}</div>
                </div>
              </div>
            </div>

            {/* Pickup Details */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Pickup Details
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Location</div>
                  <div className="text-sm font-medium text-gray-900">{selectedLoad.origin}</div>
                  <div className="text-xs text-gray-500 mt-1">{selectedLoad.originAddress}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Date
                    </div>
                    <div className="text-sm font-medium text-gray-900">{selectedLoad.pickupDate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Time
                    </div>
                    <div className="text-sm font-medium text-gray-900">{selectedLoad.pickupTime}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                Delivery Details
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Location</div>
                  <div className="text-sm font-medium text-gray-900">{selectedLoad.destination}</div>
                  <div className="text-xs text-gray-500 mt-1">{selectedLoad.destinationAddress}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Date
                    </div>
                    <div className="text-sm font-medium text-gray-900">{selectedLoad.deliveryDate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Time
                    </div>
                    <div className="text-sm font-medium text-gray-900">{selectedLoad.deliveryTime}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cargo Information */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Cargo Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    Commodity
                  </div>
                  <div className="text-sm font-medium text-gray-900">{selectedLoad.commodity}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Weight className="w-3 h-3" />
                    Weight
                  </div>
                  <div className="text-sm font-medium text-gray-900">{selectedLoad.weight}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Ruler className="w-3 h-3" />
                    Dimensions
                  </div>
                  <div className="text-sm font-medium text-gray-900">{selectedLoad.dimensions}</div>
                </div>
              </div>
            </div>

            {/* Broker Information */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Broker Contact</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-600">Company: </span>
                  <span className="font-medium text-gray-900">{selectedLoad.broker}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Phone: </span>
                  <a href={`tel:${selectedLoad.brokerPhone}`} className="font-medium text-blue-600 hover:underline">
                    {selectedLoad.brokerPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Assignment Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              Assign Truck & Driver
            </h2>

            {/* Truck Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Truck
              </label>
              <select
                value={selectedTruckId}
                onChange={(e) => setSelectedTruckId(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a truck...</option>
                {compatibleTrucks.map((truck) => (
                  <option key={truck.id} value={truck.id}>
                    {truck.truckNumber} - {truck.driver.name} ({truck.location})
                  </option>
                ))}
              </select>
              {selectedTruckId === '' && (
                <p className="mt-2 text-xs text-gray-500">
                  {compatibleTrucks.length} compatible {selectedLoad.equipment} trucks available
                </p>
              )}
            </div>

            {/* Driver Information */}
            {selectedTruck && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Driver Information
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {selectedTruck.driver.name}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(selectedTruck.driver.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">
                          {selectedTruck.driver.rating}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {selectedTruck.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${selectedTruck.driver.phone}`} className="text-blue-600 hover:underline">
                        {selectedTruck.driver.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${selectedTruck.driver.email}`} className="text-blue-600 hover:underline">
                        {selectedTruck.driver.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{selectedTruck.driver.license}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-blue-300 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Carrier</div>
                      <div className="font-medium text-gray-900">{selectedTruck.carrier}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Truck</div>
                      <div className="font-medium text-gray-900">{selectedTruck.truckNumber}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Capacity</div>
                      <div className="font-medium text-gray-900">{selectedTruck.capacity}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Max Weight</div>
                      <div className="font-medium text-gray-900">{selectedTruck.maxWeight}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Special Instructions from Load */}
            {selectedLoad.specialInstructions && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Special Instructions
                    </div>
                    <div className="text-sm text-gray-700">
                      {selectedLoad.specialInstructions}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dispatch Instructions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dispatch Instructions (Optional)
              </label>
              <textarea
                value={dispatchInstructions}
                onChange={(e) => setDispatchInstructions(e.target.value)}
                placeholder="Add any additional instructions for the driver..."
                rows={4}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                {dispatchInstructions.length} / 500 characters
              </p>
            </div>

            {/* Assignment Summary */}
            {selectedTruckId && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Assignment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Load:</span>
                    <span className="font-medium text-gray-900">{selectedLoad.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Truck:</span>
                    <span className="font-medium text-gray-900">{selectedTruck?.truckNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Driver:</span>
                    <span className="font-medium text-gray-900">{selectedTruck?.driver.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium text-gray-900">{selectedLoad.distance}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="text-gray-900 font-medium">Total Rate:</span>
                    <span className="font-semibold text-green-600">{selectedLoad.rate}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDispatch}
                disabled={!selectedTruckId}
                className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                  selectedTruckId
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
                Confirm Dispatch
              </button>
              
              <button
                onClick={() => {
                  setSelectedTruckId('');
                  setDispatchInstructions('');
                }}
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
