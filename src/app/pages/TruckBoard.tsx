import { useState } from 'react';
import { 
  Search, 
  ChevronDown,
  ArrowRight,
  MoreVertical,
  CalendarIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface Truck {
  id: string;
  age: string;
  rate: string;
  available: string;
  trip: string;
  origin: string;
  originDH: string;
  destination: string;
  destDH: string;
  equipment: string;
  equipmentDetails: string;
  company: string;
}

const mockTrucks: Truck[] = [
  { id: '1', age: '10m', rate: '-', available: '7/1 - 7/3', trip: '1701', origin: 'Ft Worth, TX', originDH: '(34)', destination: 'Sacramento, CA', destDH: '', equipment: 'VA', equipmentDetails: 'Van Air-Ride\n53 ft | 45,000 lbs | Partial', company: '' },
  { id: '2', age: '32m', rate: '-', available: '7/3', trip: '-', origin: 'Arlington, TX', originDH: '(21)', destination: 'Anywhere', destDH: '', equipment: 'VM', equipmentDetails: 'Van w/Team\n53 ft | 45,000 lbs | Full', company: '' },
  { id: '3', age: '36m', rate: '-', available: '7/3', trip: '943', origin: 'Grand Prairie, TX', originDH: '(14)', destination: 'Chicago, IL', destDH: '', equipment: 'VA', equipmentDetails: 'Van Air-Ride\n53 ft | 45,000 lbs | Full', company: '' },
  { id: '4', age: '4h', rate: '-', available: '7/3', trip: '-', origin: 'Alvarado, TX', originDH: '(40)', destination: 'Anywhere', destDH: '', equipment: 'VM', equipmentDetails: 'Van w/Team\n53 ft | 42,000 lbs | Full', company: '' },
  { id: '5', age: '5h', rate: '-', available: '7/3', trip: '-', origin: 'Longview, TX', originDH: '(128)', destination: 'Anywhere', destDH: '', equipment: 'V', equipmentDetails: 'Van\n53 ft | 42,000 lbs | Full', company: '' },
  { id: '6', age: '5h', rate: '-', available: '7/2 - 7/3', trip: '-', origin: 'Keller, TX', originDH: '(37)', destination: 'LA,OK,TX', destDH: '', equipment: 'V', equipmentDetails: 'Van\n53 ft | 45,000 lbs | Full', company: '' },
  { id: '7', age: '5h', rate: '-', available: '7/3', trip: '-', origin: 'Mt Pleasant, TX', originDH: '(118)', destination: 'Z3', destDH: '', equipment: 'VM', equipmentDetails: 'Van w/Team\n53 ft | 44,000 lbs | Full', company: '' },
  { id: '8', age: '6h', rate: '-', available: '7/2 - 7/3', trip: '-', origin: 'Dallas, TX', originDH: '(0)', destination: 'AZ,CA,NM,NV', destDH: '', equipment: 'VR', equipmentDetails: 'Van or Reefer\n53 ft | 45,000 lbs | Full', company: '' },
  { id: '9', age: '6h', rate: '-', available: '7/2 - 7/3', trip: '-', origin: 'Irving, TX', originDH: '(15)', destination: 'Anywhere', destDH: '', equipment: 'V', equipmentDetails: 'Van\n53 ft | 50,000 lbs | Full', company: '' },
  { id: '10', age: '6h', rate: '-', available: '7/2 - 7/3', trip: '-', origin: 'Temple, TX', originDH: '(130)', destination: 'Anywhere', destDH: '', equipment: 'V', equipmentDetails: 'Van\n53 ft | 45,000 lbs | Full', company: '' },
  { id: '11', age: '6h', rate: '-', available: '7/3', trip: '-', origin: 'Dallas, TX', originDH: '(0)', destination: 'Anywhere', destDH: '', equipment: 'V', equipmentDetails: 'Van\n53 ft | 45,000 lbs | Full', company: '' },
  { id: '12', age: '7h', rate: '-', available: '7/3', trip: '-', origin: 'Bogata, TX', originDH: '(124)', destination: 'IL,IN,MI,OH', destDH: '', equipment: 'V', equipmentDetails: 'Van\n53 ft | 44,000 lbs | Full', company: '' },
  { id: '13', age: '8h', rate: '-', available: '7/3', trip: '12/6', origin: 'Dallas, TX', originDH: '(0)', destination: 'Las Vegas, NV', destDH: '', equipment: 'V', equipmentDetails: 'Van\n53 ft | 80,000 lbs | Full', company: '' },
  { id: '14', age: '8h', rate: '-', available: '7/3', trip: '-', origin: 'Denison, TX', originDH: '(74)', destination: 'Anywhere', destDH: '', equipment: 'VM', equipmentDetails: 'Van w/Team\n53 ft | 45,000 lbs | Full', company: '' },
  { id: '15', age: '8h', rate: '-', available: '7/3', trip: '241', origin: 'Dallas, TX', originDH: '(0)', destination: 'Houston, TX', destDH: '', equipment: 'V', equipmentDetails: 'Van\n53 ft | 45,000 lbs | Full', company: '' },
];

export function TruckBoard() {
  const [origin, setOrigin] = useState('Dallas, TX');
  const [originRadius, setOriginRadius] = useState('150');
  const [destination, setDestination] = useState('');
  const [destinationRadius, setDestinationRadius] = useState('150');
  const [equipmentType, setEquipmentType] = useState('Vans (Standard)');
  const [loadType, setLoadType] = useState('Full & Partial');
  const [lengthFt, setLengthFt] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [dateFrom, setDateFrom] = useState('7/3/2024');
  const [dateTo, setDateTo] = useState('7/3/2024');
  const [selectedTrucks, setSelectedTrucks] = useState<string[]>([]);

  const toggleTruckSelection = (truckId: string) => {
    setSelectedTrucks(prev =>
      prev.includes(truckId)
        ? prev.filter(id => id !== truckId)
        : [...prev, truckId]
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Search Panel */}
      <div className="bg-white rounded-lg border border-gray-300 mb-3 shadow-sm">
        <div className="p-4">
          {/* Top Row */}
          <div className="grid grid-cols-12 gap-3 mb-3">
            {/* Origin */}
            <div className="col-span-3">
              <label className="block text-xs text-gray-600 mb-1">Origin</label>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="City, State"
                />
                <div className="flex items-center gap-1 border border-gray-300 rounded px-2 bg-white">
                  <input
                    type="text"
                    value={originRadius}
                    onChange={(e) => setOriginRadius(e.target.value)}
                    className="w-10 text-sm text-center focus:outline-none"
                  />
                  <span className="text-xs text-gray-500">mi</span>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="col-span-3">
              <label className="block text-xs text-gray-600 mb-1">Destination</label>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="City, State"
                />
                <div className="flex items-center gap-1 border border-gray-300 rounded px-2 bg-white">
                  <input
                    type="text"
                    value={destinationRadius}
                    onChange={(e) => setDestinationRadius(e.target.value)}
                    className="w-10 text-sm text-center focus:outline-none"
                  />
                  <span className="text-xs text-gray-500">mi</span>
                </div>
              </div>
            </div>

            {/* Equipment Type */}
            <div className="col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Equipment Type</label>
              <select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>Vans (Standard)</option>
                <option>Flatbed</option>
                <option>Reefer</option>
                <option>All Equipment</option>
              </select>
            </div>

            {/* Load Type */}
            <div className="col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Load Type</label>
              <select
                value={loadType}
                onChange={(e) => setLoadType(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>Full & Partial</option>
                <option>Full Only</option>
                <option>Partial Only</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-span-2 flex items-end gap-2">
              <button
                onClick={() => toast.success('Searching trucks...')}
                className="flex-1 px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                SEARCH
              </button>
              <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-12 gap-3">
            {/* Length ft */}
            <div className="col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Length ft</label>
              <input
                type="text"
                value={lengthFt}
                onChange={(e) => setLengthFt(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Weight lbs */}
            <div className="col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Weight lbs</label>
              <input
                type="text"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Date Range */}
            <div className="col-span-3">
              <label className="block text-xs text-gray-600 mb-1">Date Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="text"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50">
                  <CalendarIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="border-t border-gray-200 px-4 py-2 flex items-center gap-4 text-xs">
          <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <span className="font-medium">TRUCK DETAILS</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="text-gray-700 hover:text-gray-900">
            <span className="font-medium">SEARCH BACK - 24 HRS</span>
          </button>
          <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <span className="font-medium">COMPANY</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-white border border-gray-300 border-b-0 rounded-t-lg px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">130 Results</span>
            <button className="text-xs text-blue-600 hover:underline">
              +189 Similar Results
            </button>
            <select className="ml-4 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Sort by Age - Newest</option>
              <option>Sort by Age - Oldest</option>
            </select>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <span className="font-medium">$ LANE RATE</span>
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <span className="font-medium">🔺 TRI-HAUL (NO ROUTES)</span>
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <span className="font-medium">📊 MARKET CONDITIONS</span>
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <span className="font-medium">🏆 LANEMAKERS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Label */}
      <div className="bg-gray-50 border-l border-r border-gray-300 px-4 py-2">
        <span className="text-sm font-medium text-gray-700">Results</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-300 rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 py-2 text-left w-8">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  AGE ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  RATE ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  AVAILABLE ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  TRIP # ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  ORIGIN ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  DH ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  DESTINATION ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  DH ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  EQUIPMENT
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  COMPANY
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTrucks.map((truck, index) => {
                const isSelected = selectedTrucks.includes(truck.id);
                const isBlueRow = index % 2 === 0;
                return (
                  <tr
                    key={truck.id}
                    className={`border-b border-gray-200 ${
                      isBlueRow ? 'bg-blue-50' : 'bg-white'
                    } hover:bg-blue-100 transition-colors cursor-pointer`}
                  >
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleTruckSelection(truck.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900">{truck.age}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{truck.rate}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{truck.available}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{truck.trip}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{truck.origin}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{truck.originDH}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <ArrowRight className="w-3 h-3 text-blue-600" />
                        <span className="text-sm text-gray-900">{truck.destination}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600">{truck.destDH}</td>
                    <td className="px-3 py-3">
                      <div className="text-sm font-semibold text-gray-900">{truck.equipment}</div>
                      <div className="text-xs text-gray-600 whitespace-pre-line">{truck.equipmentDetails}</div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900">{truck.company}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
