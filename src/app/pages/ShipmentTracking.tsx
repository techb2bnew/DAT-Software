import { useState } from 'react';
import { 
  Search,
  MapPin,
  Truck,
  Package,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Navigation,
  AlertCircle,
  Download,
  MessageSquare,
  Camera,
  FileText,
  Calendar,
  TrendingUp,
  DollarSign,
  User,
  Flag,
  PlayCircle,
  Circle
} from 'lucide-react';

// Mock shipment data
const mockShipments = [
  {
    id: 'SHP-78912',
    loadId: 'LD-3891',
    status: 'in-transit',
    currentLocation: 'Albuquerque, NM',
    currentLocationDetails: '1234 Route 66, Albuquerque, NM 87102',
    origin: 'Los Angeles, CA',
    originAddress: '123 Logistics Ave, Los Angeles, CA 90001',
    destination: 'Chicago, IL',
    destinationAddress: '456 Freight St, Chicago, IL 60601',
    pickupDate: 'Mar 14, 2026',
    pickupTime: '08:15 AM',
    estimatedDelivery: 'Mar 17, 2026',
    estimatedDeliveryTime: '05:00 PM',
    actualPickupTime: 'Mar 14, 2026 08:15 AM',
    totalDistance: '2,015 mi',
    completedDistance: '1,100 mi',
    progressPercentage: 55,
    driver: {
      name: 'John Martinez',
      phone: '(555) 123-4567',
      email: 'j.martinez@email.com',
      truckNumber: 'T-1247',
      license: 'CDL-CA-123456',
    },
    equipment: 'Dry Van',
    commodity: 'Electronics',
    weight: '45,000 lbs',
    rate: '$4,935',
    timeline: [
      {
        status: 'Dispatched',
        timestamp: 'Mar 14, 2026 06:00 AM',
        location: 'Los Angeles, CA',
        completed: true,
        description: 'Load assigned to driver',
      },
      {
        status: 'Picked Up',
        timestamp: 'Mar 14, 2026 08:15 AM',
        location: 'Los Angeles, CA',
        completed: true,
        description: 'Driver confirmed pickup with signature',
      },
      {
        status: 'En Route',
        timestamp: 'Mar 14, 2026 09:30 AM',
        location: 'Los Angeles, CA',
        completed: true,
        description: 'Departed origin facility',
      },
      {
        status: 'Rest Stop',
        timestamp: 'Mar 15, 2026 02:45 PM',
        location: 'Flagstaff, AZ',
        completed: true,
        description: 'Mandatory rest period',
      },
      {
        status: 'In Transit',
        timestamp: 'Mar 15, 2026 08:30 PM',
        location: 'Albuquerque, NM',
        completed: true,
        description: 'Currently on route',
        current: true,
      },
      {
        status: 'Approaching Destination',
        timestamp: 'Mar 17, 2026 02:00 PM',
        location: 'Chicago, IL',
        completed: false,
        description: 'Within 50 miles of destination',
      },
      {
        status: 'Delivered',
        timestamp: 'Mar 17, 2026 05:00 PM',
        location: 'Chicago, IL',
        completed: false,
        description: 'Delivery pending',
      },
    ],
    updates: [
      {
        timestamp: 'Mar 15, 2026 08:30 PM',
        type: 'location',
        message: 'Current location: Albuquerque, NM - On schedule',
      },
      {
        timestamp: 'Mar 15, 2026 02:45 PM',
        type: 'rest',
        message: 'Driver taking mandatory rest break in Flagstaff, AZ',
      },
      {
        timestamp: 'Mar 14, 2026 09:30 AM',
        type: 'departure',
        message: 'Departed Los Angeles facility',
      },
      {
        timestamp: 'Mar 14, 2026 08:15 AM',
        type: 'pickup',
        message: 'Shipment picked up successfully',
      },
    ],
    route: [
      { city: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, completed: true },
      { city: 'Flagstaff, AZ', lat: 35.1983, lng: -111.6513, completed: true },
      { city: 'Albuquerque, NM', lat: 35.0844, lng: -106.6504, completed: true, current: true },
      { city: 'Oklahoma City, OK', lat: 35.4676, lng: -97.5164, completed: false },
      { city: 'Chicago, IL', lat: 41.8781, lng: -87.6298, completed: false },
    ],
  },
  {
    id: 'SHP-78913',
    loadId: 'LD-3892',
    status: 'delivered',
    currentLocation: 'Atlanta, GA',
    currentLocationDetails: '321 Commerce Blvd, Atlanta, GA 30301',
    origin: 'Houston, TX',
    originAddress: '789 Port Rd, Houston, TX 77001',
    destination: 'Atlanta, GA',
    destinationAddress: '321 Commerce Blvd, Atlanta, GA 30301',
    pickupDate: 'Mar 13, 2026',
    pickupTime: '10:00 AM',
    estimatedDelivery: 'Mar 15, 2026',
    estimatedDeliveryTime: '02:00 PM',
    actualDeliveryTime: 'Mar 15, 2026 01:45 PM',
    totalDistance: '789 mi',
    completedDistance: '789 mi',
    progressPercentage: 100,
    driver: {
      name: 'Sarah Johnson',
      phone: '(555) 234-5678',
      email: 's.johnson@email.com',
      truckNumber: 'T-1348',
      license: 'CDL-TX-789012',
    },
    equipment: 'Reefer',
    commodity: 'Produce',
    weight: '38,500 lbs',
    rate: '$2,209',
    deliveryConfirmation: {
      signature: 'Available',
      photos: 2,
      notes: 'All items delivered in good condition. Temperature maintained throughout.',
      receivedBy: 'Michael Davis',
    },
    timeline: [
      {
        status: 'Dispatched',
        timestamp: 'Mar 13, 2026 08:00 AM',
        location: 'Houston, TX',
        completed: true,
      },
      {
        status: 'Picked Up',
        timestamp: 'Mar 13, 2026 10:00 AM',
        location: 'Houston, TX',
        completed: true,
      },
      {
        status: 'In Transit',
        timestamp: 'Mar 13, 2026 11:30 AM',
        location: 'Houston, TX',
        completed: true,
      },
      {
        status: 'Delivered',
        timestamp: 'Mar 15, 2026 01:45 PM',
        location: 'Atlanta, GA',
        completed: true,
        current: true,
      },
    ],
    updates: [
      {
        timestamp: 'Mar 15, 2026 01:45 PM',
        type: 'delivery',
        message: 'Delivery completed successfully - 15 minutes early',
      },
      {
        timestamp: 'Mar 14, 2026 06:30 PM',
        type: 'location',
        message: 'Passed through Jackson, MS - On schedule',
      },
    ],
    route: [
      { city: 'Houston, TX', lat: 29.7604, lng: -95.3698, completed: true },
      { city: 'Beaumont, TX', lat: 30.0860, lng: -94.1018, completed: true },
      { city: 'Jackson, MS', lat: 32.2988, lng: -90.1848, completed: true },
      { city: 'Atlanta, GA', lat: 33.7490, lng: -84.3880, completed: true, current: true },
    ],
  },
];

type ShipmentStatus = 'dispatched' | 'in-transit' | 'delivered' | 'delayed';

const getStatusConfig = (status: ShipmentStatus) => {
  switch (status) {
    case 'dispatched':
      return { color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Dispatched' };
    case 'in-transit':
      return { color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'In Transit' };
    case 'delivered':
      return { color: 'text-green-600', bgColor: 'bg-green-100', label: 'Delivered' };
    case 'delayed':
      return { color: 'text-red-600', bgColor: 'bg-red-100', label: 'Delayed' };
    default:
      return { color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Unknown' };
  }
};

export function ShipmentTracking() {
  const [selectedShipmentId, setSelectedShipmentId] = useState(mockShipments[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedShipment = mockShipments.find(s => s.id === selectedShipmentId) || mockShipments[0];
  const statusConfig = getStatusConfig(selectedShipment.status as ShipmentStatus);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Shipment Tracking
        </h1>
        <p className="text-gray-600">
          Real-time tracking and status updates for active shipments
        </p>
      </div>

      {/* Search and Shipment Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by shipment ID, load ID, or driver name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockShipments.map((shipment) => {
            const shipmentStatusConfig = getStatusConfig(shipment.status as ShipmentStatus);
            return (
              <button
                key={shipment.id}
                onClick={() => setSelectedShipmentId(shipment.id)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
                  selectedShipmentId === shipment.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-left min-w-[250px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{shipment.id}</span>
                    <span className={`px-2 py-1 ${shipmentStatusConfig.bgColor} ${shipmentStatusConfig.color} rounded-full text-xs font-medium`}>
                      {shipmentStatusConfig.label}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {shipment.origin} → {shipment.destination}
                  </div>
                  <div className="text-xs text-gray-500">
                    {shipment.driver.name} • {shipment.driver.truckNumber}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Map and Route */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map Visualization */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Live Route Tracking
              </h2>
              <div className="text-sm text-gray-600">
                {selectedShipment.completedDistance} / {selectedShipment.totalDistance}
              </div>
            </div>

            {/* Stylized Map */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 mb-4 relative overflow-hidden min-h-[400px]">
              {/* Route Line */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                    <stop offset={`${selectedShipment.progressPercentage}%`} style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                    <stop offset={`${selectedShipment.progressPercentage}%`} style={{ stopColor: '#E5E7EB', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#E5E7EB', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 200 Q 200 100, 350 180 T 650 200"
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* Route Points */}
              <div className="relative" style={{ zIndex: 2 }}>
                {selectedShipment.route.map((point, index) => (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: `${10 + (index * 20)}%`,
                      top: `${index % 2 === 0 ? '45%' : '35%'}`,
                    }}
                  >
                    <div className="relative">
                      {/* Point Marker */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                        point.current
                          ? 'bg-blue-600 animate-pulse'
                          : point.completed
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`}>
                        {point.current ? (
                          <Truck className="w-6 h-6 text-white" />
                        ) : point.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-600" />
                        )}
                      </div>

                      {/* City Label */}
                      <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className={`text-xs font-medium px-2 py-1 rounded ${
                          point.current
                            ? 'bg-blue-600 text-white'
                            : point.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {point.city}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{selectedShipment.progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${selectedShipment.progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Current Location */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Current Location</div>
                  <div className="text-sm text-gray-700">{selectedShipment.currentLocation}</div>
                  <div className="text-xs text-gray-500 mt-1">{selectedShipment.currentLocationDetails}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Shipment Timeline
            </h2>

            <div className="space-y-4">
              {selectedShipment.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event.current
                        ? 'bg-blue-600 ring-4 ring-blue-100'
                        : event.completed
                        ? 'bg-green-600'
                        : 'bg-gray-300'
                    }`}>
                      {event.current ? (
                        <PlayCircle className="w-5 h-5 text-white" />
                      ) : event.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    {index < selectedShipment.timeline.length - 1 && (
                      <div className={`w-0.5 h-16 ${
                        event.completed ? 'bg-green-600' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between mb-1">
                      <div className={`font-medium ${
                        event.current ? 'text-blue-600' : event.completed ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {event.status}
                      </div>
                      <div className="text-sm text-gray-500">{event.timestamp}</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{event.location}</div>
                    <div className="text-xs text-gray-500">{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Recent Updates
            </h2>

            <div className="space-y-3">
              {selectedShipment.updates.map((update, index) => (
                <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    update.type === 'delivery' ? 'bg-green-100' :
                    update.type === 'pickup' ? 'bg-blue-100' :
                    update.type === 'rest' ? 'bg-yellow-100' :
                    'bg-gray-100'
                  }`}>
                    {update.type === 'delivery' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : update.type === 'pickup' ? (
                      <Package className="w-4 h-4 text-blue-600" />
                    ) : update.type === 'rest' ? (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <MapPin className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{update.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{update.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Shipment Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-gray-900">Shipment Details</h2>
              <span className={`px-3 py-1 ${statusConfig.bgColor} ${statusConfig.color} rounded-full text-sm font-medium`}>
                {statusConfig.label}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-600 mb-1">Shipment ID</div>
                <div className="text-sm font-medium text-gray-900">{selectedShipment.id}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Load ID</div>
                <div className="text-sm font-medium text-gray-900">{selectedShipment.loadId}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Equipment</div>
                  <div className="text-sm font-medium text-gray-900">{selectedShipment.equipment}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Weight</div>
                  <div className="text-sm font-medium text-gray-900">{selectedShipment.weight}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Commodity</div>
                <div className="text-sm font-medium text-gray-900">{selectedShipment.commodity}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Rate</div>
                <div className="text-sm font-medium text-green-600">{selectedShipment.rate}</div>
              </div>
            </div>
          </div>

          {/* Pickup & Delivery */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4">Pickup & Delivery</h2>

            <div className="space-y-4">
              {/* Pickup */}
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Flag className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Pickup</span>
                  <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                </div>
                <div className="text-xs text-gray-700 mb-1">{selectedShipment.origin}</div>
                <div className="text-xs text-gray-500 mb-2">{selectedShipment.originAddress}</div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedShipment.pickupDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedShipment.actualPickupTime}
                  </span>
                </div>
              </div>

              {/* Delivery */}
              <div className={`p-3 rounded-lg border ${
                selectedShipment.status === 'delivered'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className={`w-4 h-4 ${
                    selectedShipment.status === 'delivered' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                  <span className="text-sm font-medium text-gray-900">Delivery</span>
                  {selectedShipment.status === 'delivered' ? (
                    <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                  ) : (
                    <Clock className="w-4 h-4 text-blue-600 ml-auto" />
                  )}
                </div>
                <div className="text-xs text-gray-700 mb-1">{selectedShipment.destination}</div>
                <div className="text-xs text-gray-500 mb-2">{selectedShipment.destinationAddress}</div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedShipment.estimatedDelivery}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedShipment.status === 'delivered' 
                      ? selectedShipment.actualDeliveryTime 
                      : selectedShipment.estimatedDeliveryTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Driver Contact
            </h2>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-600 mb-1">Driver Name</div>
                <div className="text-sm font-medium text-gray-900">{selectedShipment.driver.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Truck Number</div>
                <div className="text-sm font-medium text-gray-900">{selectedShipment.driver.truckNumber}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">License</div>
                <div className="text-sm font-medium text-gray-900">{selectedShipment.driver.license}</div>
              </div>
              
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <a
                  href={`tel:${selectedShipment.driver.phone}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  {selectedShipment.driver.phone}
                </a>
                <a
                  href={`mailto:${selectedShipment.driver.email}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  {selectedShipment.driver.email}
                </a>
              </div>

              <div className="pt-3 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
                <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Confirmation */}
          {selectedShipment.status === 'delivered' && selectedShipment.deliveryConfirmation && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Delivery Confirmation
              </h2>

              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      Delivered Successfully
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Received by: <span className="font-medium text-gray-900">
                      {selectedShipment.deliveryConfirmation.receivedBy}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <FileText className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Signature</div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedShipment.deliveryConfirmation.signature}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <Camera className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Photos</div>
                    <div className="text-sm font-medium text-gray-900">
                      {selectedShipment.deliveryConfirmation.photos}
                    </div>
                  </div>
                </div>

                {selectedShipment.deliveryConfirmation.notes && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Delivery Notes</div>
                    <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                      {selectedShipment.deliveryConfirmation.notes}
                    </div>
                  </div>
                )}

                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download POD
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          {selectedShipment.status !== 'delivered' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Report Issue
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
