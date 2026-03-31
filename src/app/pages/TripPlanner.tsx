import { useState } from 'react';
import { 
  MapPin,
  Navigation,
  Plus,
  Trash2,
  Clock,
  Fuel,
  Coffee,
  Package,
  CheckCircle,
  Send,
  Route,
  Maximize2,
  Calendar,
  User,
  Settings,
  ArrowUp,
  ArrowDown,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

type StopType = 'pickup' | 'delivery' | 'fuel' | 'rest';

interface Stop {
  id: string;
  type: StopType;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  estimatedArrival: string;
  duration: number; // minutes
  notes?: string;
}

const initialStops: Stop[] = [
  {
    id: 'stop-1',
    type: 'pickup',
    name: 'Origin Warehouse',
    address: '123 Logistics Ave',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    lat: 34.0522,
    lng: -118.2437,
    estimatedArrival: 'Mar 14, 2026 08:00 AM',
    duration: 30,
    notes: 'Dock 5, bring BOL',
  },
  {
    id: 'stop-2',
    type: 'fuel',
    name: 'Pilot Flying J',
    address: '456 Highway 40',
    city: 'Flagstaff',
    state: 'AZ',
    zip: '86001',
    lat: 35.1983,
    lng: -111.6513,
    estimatedArrival: 'Mar 14, 2026 02:30 PM',
    duration: 45,
  },
  {
    id: 'stop-3',
    type: 'rest',
    name: 'Rest Area',
    address: 'I-40 Mile Marker 234',
    city: 'Albuquerque',
    state: 'NM',
    zip: '87102',
    lat: 35.0844,
    lng: -106.6504,
    estimatedArrival: 'Mar 14, 2026 08:00 PM',
    duration: 600, // 10 hour rest
  },
  {
    id: 'stop-4',
    type: 'delivery',
    name: 'Destination Facility',
    address: '456 Freight St',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    lat: 41.8781,
    lng: -87.6298,
    estimatedArrival: 'Mar 17, 2026 05:00 PM',
    duration: 45,
    notes: 'Appointment required, call ahead',
  },
];

const mockDrivers = [
  { id: 'DRV-001', name: 'John Martinez', truck: 'T-1247', hoursAvailable: 8.5 },
  { id: 'DRV-002', name: 'Sarah Johnson', truck: 'T-1348', hoursAvailable: 10 },
  { id: 'DRV-003', name: 'Mike Thompson', truck: 'T-1449', hoursAvailable: 6.5 },
];

const getStopIcon = (type: StopType) => {
  switch (type) {
    case 'pickup':
      return Package;
    case 'delivery':
      return MapPin;
    case 'fuel':
      return Fuel;
    case 'rest':
      return Coffee;
  }
};

const getStopColor = (type: StopType) => {
  switch (type) {
    case 'pickup':
      return { bg: 'bg-green-100', text: 'text-green-700', icon: 'text-green-600', border: 'border-green-300' };
    case 'delivery':
      return { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'text-blue-600', border: 'border-blue-300' };
    case 'fuel':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'text-yellow-600', border: 'border-yellow-300' };
    case 'rest':
      return { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'text-purple-600', border: 'border-purple-300' };
  }
};

export function TripPlanner() {
  const [stops, setStops] = useState<Stop[]>(initialStops);
  const [selectedDriver, setSelectedDriver] = useState('DRV-001');
  const [showAddStop, setShowAddStop] = useState(false);

  const driver = mockDrivers.find(d => d.id === selectedDriver) || mockDrivers[0];
  
  // Calculate totals
  const totalDistance = 2015; // miles
  const totalTime = 32.5; // hours
  const drivingTime = 28.5; // hours
  const restTime = 10; // hours
  const fuelStops = stops.filter(s => s.type === 'fuel').length;
  const restStops = stops.filter(s => s.type === 'rest').length;

  const handleRemoveStop = (id: string) => {
    setStops(stops.filter(s => s.id !== id));
  };

  const handleMoveStop = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === stops.length - 1)
    ) {
      return;
    }

    const newStops = [...stops];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newStops[index], newStops[targetIndex]] = [newStops[targetIndex], newStops[index]];
    setStops(newStops);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Trip Planning
        </h1>
        <p className="text-gray-600">
          Plan and optimize routes for efficient freight delivery
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Trip Planning Controls */}
        <div className="space-y-6">
          {/* Driver Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Driver Assignment
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Driver
                </label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {mockDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.truck} ({driver.hoursAvailable}h available)
                    </option>
                  ))}
                </select>
              </div>

              {/* Hours of Service */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Hours of Service</span>
                  <span className={`text-sm font-semibold ${
                    driver.hoursAvailable >= 8 ? 'text-green-600' : 
                    driver.hoursAvailable >= 5 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {driver.hoursAvailable} / 11 hours
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      driver.hoursAvailable >= 8 ? 'bg-green-600' : 
                      driver.hoursAvailable >= 5 ? 'bg-yellow-600' : 
                      'bg-red-600'
                    }`}
                    style={{ width: `${(driver.hoursAvailable / 11) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  {driver.hoursAvailable >= 8 ? (
                    <span className="flex items-center gap-1 text-green-700">
                      <CheckCircle className="w-3 h-3" />
                      Sufficient time for this route
                    </span>
                  ) : driver.hoursAvailable >= 5 ? (
                    <span className="flex items-center gap-1 text-yellow-700">
                      <AlertCircle className="w-3 h-3" />
                      Additional rest stop recommended
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-700">
                      <AlertCircle className="w-3 h-3" />
                      Insufficient hours - requires rest period
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Route Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Route className="w-5 h-5 text-blue-600" />
              Route Summary
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalDistance}</div>
                  <div className="text-xs text-gray-600">Total Miles</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalTime}h</div>
                  <div className="text-xs text-gray-600">Total Time</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{drivingTime}h</div>
                  <div className="text-xs text-gray-600">Driving Time</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{restTime}h</div>
                  <div className="text-xs text-gray-600">Rest Time</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fuel Stops:</span>
                  <span className="font-medium text-gray-900">{fuelStops}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rest Stops:</span>
                  <span className="font-medium text-gray-900">{restStops}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Stops:</span>
                  <span className="font-medium text-gray-900">{stops.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stops List */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Route className="w-5 h-5 text-blue-600" />
                Trip Stops ({stops.length})
              </h2>
              <button
                onClick={() => setShowAddStop(!showAddStop)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Stop
              </button>
            </div>

            {showAddStop && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-gray-900 mb-3">Add New Stop</div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Package className="w-4 h-4 text-green-600" />
                    Pickup
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Delivery
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Fuel className="w-4 h-4 text-yellow-600" />
                    Fuel Stop
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Coffee className="w-4 h-4 text-purple-600" />
                    Rest Stop
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {stops.map((stop, index) => {
                const StopIcon = getStopIcon(stop.type);
                const colors = getStopColor(stop.type);

                return (
                  <div
                    key={stop.id}
                    className={`p-4 rounded-lg border-2 ${colors.border} ${colors.bg} relative`}
                  >
                    {/* Stop Number Badge */}
                    <div className="absolute -left-3 -top-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>

                    {/* Stop Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 border-2 ${colors.border}`}>
                          <StopIcon className={`w-5 h-5 ${colors.icon}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{stop.name}</span>
                            <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded-full text-xs font-medium capitalize border ${colors.border}`}>
                              {stop.type}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700">{stop.address}</div>
                          <div className="text-sm text-gray-600">
                            {stop.city}, {stop.state} {stop.zip}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveStop(index, 'up')}
                          disabled={index === 0}
                          className={`p-1.5 rounded hover:bg-white transition-colors ${
                            index === 0 ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                        >
                          <ArrowUp className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleMoveStop(index, 'down')}
                          disabled={index === stops.length - 1}
                          className={`p-1.5 rounded hover:bg-white transition-colors ${
                            index === stops.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                        >
                          <ArrowDown className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleRemoveStop(stop.id)}
                          className="p-1.5 rounded hover:bg-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* Stop Details */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{stop.estimatedArrival}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          {stop.duration >= 60 
                            ? `${Math.floor(stop.duration / 60)}h ${stop.duration % 60}m` 
                            : `${stop.duration}m`}
                        </span>
                      </div>
                    </div>

                    {/* Notes */}
                    {stop.notes && (
                      <div className="p-2 bg-white rounded border border-gray-200">
                        <div className="text-xs text-gray-600 mb-1">Notes:</div>
                        <div className="text-sm text-gray-700">{stop.notes}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-3">
              <button
                onClick={() => {
                  toast.success(`Route sent to ${driver.name}`, {
                    description: `Trip details sent to truck ${driver.truck}`,
                  });
                }}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Route to Driver
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    toast.info('Trip settings opened');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    toast.success('Route exported successfully', {
                      description: 'Route details downloaded as PDF',
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Route Map
              </h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Maximize2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Map Visualization */}
            <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg relative overflow-hidden">
              {/* Route Path */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="#3B82F6" />
                  </marker>
                </defs>
                <path
                  d="M 100 150 L 200 120 L 350 140 L 500 100 L 650 130"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                  markerEnd="url(#arrowhead)"
                />
              </svg>

              {/* Stop Markers */}
              <div className="relative h-full" style={{ zIndex: 2 }}>
                {stops.map((stop, index) => {
                  const colors = getStopColor(stop.type);
                  const StopIcon = getStopIcon(stop.type);
                  const positions = [
                    { left: '10%', top: '25%' },
                    { left: '25%', top: '18%' },
                    { left: '45%', top: '23%' },
                    { left: '65%', top: '15%' },
                    { left: '85%', top: '20%' },
                  ];
                  const position = positions[index] || positions[0];

                  return (
                    <div
                      key={stop.id}
                      className="absolute"
                      style={{
                        left: position.left,
                        top: position.top,
                      }}
                    >
                      {/* Marker Pin */}
                      <div className="relative">
                        <div className={`w-12 h-12 ${colors.bg} rounded-full border-4 ${colors.border} flex items-center justify-center shadow-lg relative`}>
                          <StopIcon className={`w-6 h-6 ${colors.icon}`} />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                        </div>

                        {/* Stop Label */}
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <div className="bg-white border-2 border-gray-300 rounded-lg px-3 py-2 shadow-lg">
                            <div className="text-xs font-medium text-gray-900">{stop.name}</div>
                            <div className="text-xs text-gray-600">{stop.city}, {stop.state}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              ETA: {stop.estimatedArrival.split(' ').slice(-2).join(' ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3" style={{ zIndex: 3 }}>
                <div className="text-xs font-medium text-gray-900 mb-2">Stop Types</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                    <span className="text-xs text-gray-700">Pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
                    <span className="text-xs text-gray-700">Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                    <span className="text-xs text-gray-700">Fuel Stop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 border-2 border-purple-300 rounded"></div>
                    <span className="text-xs text-gray-700">Rest Stop</span>
                  </div>
                </div>
              </div>

              {/* Distance Indicator */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3" style={{ zIndex: 3 }}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{totalDistance}</div>
                  <div className="text-xs text-gray-600">Total Miles</div>
                </div>
              </div>
            </div>

            {/* Map Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-bold text-gray-900">{stops.length}</div>
                <div className="text-xs text-gray-600">Stops</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-bold text-gray-900">{totalTime}h</div>
                <div className="text-xs text-gray-600">Duration</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-bold text-gray-900">{Math.round(totalDistance / totalTime)}</div>
                <div className="text-xs text-gray-600">Avg MPH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
