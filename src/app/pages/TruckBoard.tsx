import React, { useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { 
  Search, 
  ChevronDown,
  ArrowRight,
  MoreVertical,
  CalendarIcon
} from 'lucide-react';
import { toast } from 'sonner';

type LoadType = 'Full' | 'Partial';
type EquipmentType = 'Flatbed' | 'Reefer' | 'Dry Van';

interface Load {
  id: string; // e.g. LD-4000
  loadNumber: string;
  origin: string;
  destination: string;
  distanceMiles: number;
  equipmentType: EquipmentType;
  loadType: LoadType;
  lengthFt: number;
  weightLbs: number;
  pickupDate: string; // e.g. "Mar 12, 2026"
  rateTotal: number; // lane total $
  ratePerMile: number; // $/mi
}

const mockLoads: Load[] = [
  { id: 'LD-4000', loadNumber: 'LD-4000', origin: 'Memphis, TN', destination: 'Louisville, KY', distanceMiles: 1019, equipmentType: 'Flatbed', loadType: 'Full', lengthFt: 48, weightLbs: 28140, pickupDate: 'Mar 12, 2026', rateTotal: 3485, ratePerMile: 3.42 },
  { id: 'LD-4001', loadNumber: 'LD-4001', origin: 'San Francisco, CA', destination: 'Fresno, CA', distanceMiles: 1769, equipmentType: 'Flatbed', loadType: 'Full', lengthFt: 53, weightLbs: 26536, pickupDate: 'Mar 16, 2026', rateTotal: 5944, ratePerMile: 3.36 },
  { id: 'LD-4002', loadNumber: 'LD-4002', origin: 'Colorado Springs, CO', destination: 'Columbus, OH', distanceMiles: 1731, equipmentType: 'Reefer', loadType: 'Full', lengthFt: 48, weightLbs: 35121, pickupDate: 'Mar 14, 2026', rateTotal: 6162, ratePerMile: 3.56 },
  { id: 'LD-4003', loadNumber: 'LD-4003', origin: 'El Paso, TX', destination: 'Philadelphia, PA', distanceMiles: 2365, equipmentType: 'Flatbed', loadType: 'Full', lengthFt: 53, weightLbs: 30367, pickupDate: 'Mar 16, 2026', rateTotal: 5369, ratePerMile: 2.27 },
  { id: 'LD-4004', loadNumber: 'LD-4004', origin: 'Virginia Beach, VA', destination: 'New York, NY', distanceMiles: 1941, equipmentType: 'Dry Van', loadType: 'Partial', lengthFt: 48, weightLbs: 35141, pickupDate: 'Mar 17, 2026', rateTotal: 7065, ratePerMile: 3.64 },
  { id: 'LD-4005', loadNumber: 'LD-4005', origin: 'Boston, MA', destination: 'Minneapolis, MN', distanceMiles: 410, equipmentType: 'Reefer', loadType: 'Full', lengthFt: 48, weightLbs: 43433, pickupDate: 'Mar 14, 2026', rateTotal: 1394, ratePerMile: 3.4 },
  { id: 'LD-4006', loadNumber: 'LD-4006', origin: 'Miami, FL', destination: 'Boston, MA', distanceMiles: 927, equipmentType: 'Flatbed', loadType: 'Full', lengthFt: 48, weightLbs: 23597, pickupDate: 'Mar 13, 2026', rateTotal: 2290, ratePerMile: 2.47 },
  { id: 'LD-4007', loadNumber: 'LD-4007', origin: 'Tucson, AZ', destination: 'Portland, OR', distanceMiles: 532, equipmentType: 'Reefer', loadType: 'Full', lengthFt: 48, weightLbs: 30151, pickupDate: 'Mar 17, 2026', rateTotal: 1176, ratePerMile: 2.21 },
  { id: 'LD-4008', loadNumber: 'LD-4008', origin: 'El Paso, TX', destination: 'Dallas, TX', distanceMiles: 2343, equipmentType: 'Reefer', loadType: 'Full', lengthFt: 48, weightLbs: 40985, pickupDate: 'Mar 14, 2026', rateTotal: 6818, ratePerMile: 2.91 },
  { id: 'LD-4009', loadNumber: 'LD-4009', origin: 'Kansas City, MO', destination: 'Memphis, TN', distanceMiles: 717, equipmentType: 'Reefer', loadType: 'Partial', lengthFt: 48, weightLbs: 24290, pickupDate: 'Mar 17, 2026', rateTotal: 2474, ratePerMile: 3.45 },
  { id: 'LD-4010', loadNumber: 'LD-4010', origin: 'San Jose, CA', destination: 'Boston, MA', distanceMiles: 1872, equipmentType: 'Dry Van', loadType: 'Full', lengthFt: 48, weightLbs: 24707, pickupDate: 'Mar 15, 2026', rateTotal: 4643, ratePerMile: 2.48 },
  { id: 'LD-4011', loadNumber: 'LD-4011', origin: 'Jacksonville, FL', destination: 'Portland, OR', distanceMiles: 796, equipmentType: 'Dry Van', loadType: 'Partial', lengthFt: 53, weightLbs: 27664, pickupDate: 'Mar 15, 2026', rateTotal: 1902, ratePerMile: 2.39 },
  { id: 'LD-4012', loadNumber: 'LD-4012', origin: 'Las Vegas, NV', destination: 'Jacksonville, FL', distanceMiles: 496, equipmentType: 'Flatbed', loadType: 'Partial', lengthFt: 48, weightLbs: 39191, pickupDate: 'Mar 13, 2026', rateTotal: 1359, ratePerMile: 2.74 },
  { id: 'LD-4013', loadNumber: 'LD-4013', origin: 'Louisville, KY', destination: 'Memphis, IN', distanceMiles: 1579, equipmentType: 'Reefer', loadType: 'Partial', lengthFt: 53, weightLbs: 32156, pickupDate: 'Mar 17, 2026', rateTotal: 3711, ratePerMile: 2.35 },
  { id: 'LD-4014', loadNumber: 'LD-4014', origin: 'Chicago, IL', destination: 'Las Vegas, NV', distanceMiles: 1832, equipmentType: 'Reefer', loadType: 'Full', lengthFt: 53, weightLbs: 41441, pickupDate: 'Mar 14, 2026', rateTotal: 5954, ratePerMile: 3.25 },
  { id: 'LD-4015', loadNumber: 'LD-4015', origin: 'Nashville, TN', destination: 'San Antonio, TX', distanceMiles: 1485, equipmentType: 'Dry Van', loadType: 'Full', lengthFt: 53, weightLbs: 29711, pickupDate: 'Mar 16, 2026', rateTotal: 5049, ratePerMile: 3.4 },
  { id: 'LD-4016', loadNumber: 'LD-4016', origin: 'Philadelphia, PA', destination: 'Miami, FL', distanceMiles: 1924, equipmentType: 'Reefer', loadType: 'Full', lengthFt: 53, weightLbs: 42439, pickupDate: 'Mar 15, 2026', rateTotal: 6657, ratePerMile: 3.46 },
  { id: 'LD-4017', loadNumber: 'LD-4017', origin: 'Kansas City, MO', destination: 'Dallas, TX', distanceMiles: 1251, equipmentType: 'Reefer', loadType: 'Partial', lengthFt: 53, weightLbs: 41568, pickupDate: 'Mar 17, 2026', rateTotal: 3077, ratePerMile: 3.62 },
  { id: 'LD-4018', loadNumber: 'LD-4018', origin: 'Louisville, KY', destination: 'Tucson, AZ', distanceMiles: 2675, equipmentType: 'Flatbed', loadType: 'Partial', lengthFt: 48, weightLbs: 32446, pickupDate: 'Mar 15, 2026', rateTotal: 9684, ratePerMile: 3.2 },
  { id: 'LD-4019', loadNumber: 'LD-4019', origin: 'Washington, DC', destination: 'New York, NY', distanceMiles: 1655, equipmentType: 'Flatbed', loadType: 'Partial', lengthFt: 48, weightLbs: 41791, pickupDate: 'Mar 16, 2026', rateTotal: 5726, ratePerMile: 3.46 },
  { id: 'LD-4020', loadNumber: 'LD-4020', origin: 'San Francisco, CA', destination: 'Albuquerque, NM', distanceMiles: 1906, equipmentType: 'Flatbed', loadType: 'Full', lengthFt: 53, weightLbs: 31322, pickupDate: 'Mar 16, 2026', rateTotal: 4212, ratePerMile: 2.21 },
  { id: 'LD-4021', loadNumber: 'LD-4021', origin: 'Cleveland, OH', destination: 'Kansas City, MO', distanceMiles: 1029, equipmentType: 'Dry Van', loadType: 'Partial', lengthFt: 48, weightLbs: 36748, pickupDate: 'Mar 16, 2026', rateTotal: 3797, ratePerMile: 3.69 },
  { id: 'LD-4022', loadNumber: 'LD-4022', origin: 'San Francisco, CA', destination: 'Atlanta, GA', distanceMiles: 1907, equipmentType: 'Reefer', loadType: 'Partial', lengthFt: 48, weightLbs: 44223, pickupDate: 'Mar 13, 2026', rateTotal: 7247, ratePerMile: 3.8 },
  { id: 'LD-4023', loadNumber: 'LD-4023', origin: 'Nashville, TN', destination: 'Phoenix, AZ', distanceMiles: 2577, equipmentType: 'Dry Van', loadType: 'Full', lengthFt: 53, weightLbs: 29821, pickupDate: 'Mar 15, 2026', rateTotal: 9664, ratePerMile: 3.75 },
  { id: 'LD-4024', loadNumber: 'LD-4024', origin: 'Baltimore, MD', destination: 'Mesa, AZ', distanceMiles: 2608, equipmentType: 'Flatbed', loadType: 'Partial', lengthFt: 48, weightLbs: 44794, pickupDate: 'Mar 13, 2026', rateTotal: 9884, ratePerMile: 3.79 },
  { id: 'LD-4025', loadNumber: 'LD-4025', origin: 'Memphis, TN', destination: 'Jacksonville, FL', distanceMiles: 1284, equipmentType: 'Reefer', loadType: 'Partial', lengthFt: 48, weightLbs: 24281, pickupDate: 'Mar 16, 2026', rateTotal: 4610, ratePerMile: 3.59 },
  { id: 'LD-4026', loadNumber: 'LD-4026', origin: 'Sacramento, CA', destination: 'Louisville, KY', distanceMiles: 1912, equipmentType: 'Flatbed', loadType: 'Full', lengthFt: 53, weightLbs: 28197, pickupDate: 'Mar 14, 2026', rateTotal: 5048, ratePerMile: 2.64 },
  { id: 'LD-4027', loadNumber: 'LD-4027', origin: 'Omaha, NE', destination: 'Sacramento, CA', distanceMiles: 1767, equipmentType: 'Dry Van', loadType: 'Partial', lengthFt: 53, weightLbs: 41791, pickupDate: 'Mar 14, 2026', rateTotal: 6662, ratePerMile: 3.77 },
  { id: 'LD-4028', loadNumber: 'LD-4028', origin: 'Kansas City, MO', destination: 'Indianapolis, IN', distanceMiles: 2083, equipmentType: 'Flatbed', loadType: 'Full', lengthFt: 48, weightLbs: 30805, pickupDate: 'Mar 16, 2026', rateTotal: 4833, ratePerMile: 2.32 },
  { id: 'LD-4029', loadNumber: 'LD-4029', origin: 'Milwaukee, WI', destination: 'Fresno, CA', distanceMiles: 216, equipmentType: 'Flatbed', loadType: 'Partial', lengthFt: 48, weightLbs: 39101, pickupDate: 'Mar 15, 2026', rateTotal: 618, ratePerMile: 2.86 },
];

export function TruckBoard() {
  const [origin, setOrigin] = useState('');
  const [originRadius, setOriginRadius] = useState('150');
  const [destination, setDestination] = useState('');
  const [destinationRadius, setDestinationRadius] = useState('150');
  const [equipmentType, setEquipmentType] = useState<'All Equipment' | EquipmentType>('All Equipment');
  const [loadType, setLoadType] = useState('Full & Partial');
  const [lengthFt, setLengthFt] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [pickupRange, setPickupRange] = useState<DateRange | undefined>(undefined);
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [selectedTrucks, setSelectedTrucks] = useState<string[]>([]);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const parseDate = (value: string): Date | null => {
    const v = value.trim();
    if (!v) return null;

    // Supports formats like "Mar 12, 2026" without timezone surprises.
    const monthMatch = v.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
    if (monthMatch) {
      const monthKey = monthMatch[1].toLowerCase().slice(0, 3);
      const monthMap: Record<string, number> = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11,
      };
      const monthIndex = monthMap[monthKey];
      const day = Number(monthMatch[2]);
      const year = Number(monthMatch[3]);
      if (monthIndex !== undefined && !Number.isNaN(day) && !Number.isNaN(year)) {
        return new Date(year, monthIndex, day);
      }
    }

    // Supports formats like "Mar 12, 2026" and also "7/3/2024"
    const direct = new Date(v);
    if (!Number.isNaN(direct.getTime())) return direct;

    const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) {
      const month = Number(m[1]);
      const day = Number(m[2]);
      const year = Number(m[3]);
      const d = new Date(year, month - 1, day);
      if (!Number.isNaN(d.getTime())) return d;
    }
    return null;
  };

  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

  useEffect(() => {
    if (!showPickupDatePicker) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!datePickerRef.current) return;
      if (datePickerRef.current.contains(event.target as Node)) return;
      setShowPickupDatePicker(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPickupDatePicker]);

  const filteredLoads = useMemo(() => {
    const originNeedle = origin.trim() ? normalize(origin) : '';
    const destinationNeedle = destination.trim() ? normalize(destination) : '';

    const minLength = lengthFt.trim() ? Number(lengthFt) : null;
    const minWeight = weightLbs.trim() ? Number(weightLbs) : null;

    const equipmentNeedle = equipmentType;

    const loadTypeFilter =
      loadType === 'Full Only'
        ? ('Full' as LoadType)
        : loadType === 'Partial Only'
          ? ('Partial' as LoadType)
          : null;

    const toStartOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const toEndOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime();

    return mockLoads.filter((load) => {
      if (originNeedle && !normalize(load.origin).includes(originNeedle)) return false;
      if (destinationNeedle && !normalize(load.destination).includes(destinationNeedle)) return false;

      if (equipmentNeedle !== 'All Equipment' && load.equipmentType !== equipmentNeedle) return false;

      if (loadTypeFilter && load.loadType !== loadTypeFilter) return false;

      if (minLength !== null && !Number.isNaN(minLength) && load.lengthFt < minLength) return false;
      if (minWeight !== null && !Number.isNaN(minWeight) && load.weightLbs < minWeight) return false;

      const pickup = parseDate(load.pickupDate);
      if (!pickup) return false;

      if (pickupRange?.from && pickupRange?.to) {
        const fromTs = toStartOfDay(pickupRange.from);
        const toTs = toEndOfDay(pickupRange.to);
        const t = pickup.getTime();
        if (t < fromTs || t > toTs) return false;
      }

      // originRadius/destinationRadius are UI-only for now (no geo calc in mock data).
      void originRadius;
      void destinationRadius;
      return true;
    });
  }, [
    destination,
    destinationRadius,
    pickupRange,
    equipmentType,
    lengthFt,
    loadType,
    origin,
    originRadius,
    weightLbs,
  ]);

  const clearFilters = () => {
    setOrigin('');
    setOriginRadius('150');
    setDestination('');
    setDestinationRadius('150');
    setEquipmentType('All Equipment');
    setLoadType('Full & Partial');
    setLengthFt('');
    setWeightLbs('');
    setPickupRange(undefined);
    setShowPickupDatePicker(false);
    setSelectedTrucks([]);
    toast.success('Filters cleared');
  };

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
            <div className="col-span-3">
              <label className="block text-xs text-gray-600 mb-1">Equipment Type</label>
              <select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value as 'All Equipment' | EquipmentType)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All Equipment">All Equipment</option>
                <option>Flatbed</option>
                <option>Reefer</option>
                <option>Dry Van</option>
              </select>
            </div>

            {/* Load Type */}
            <div className="col-span-3">
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
            {/* <div className="col-span-2 flex items-end gap-2">
              <button
                onClick={() => {
                  toast.success(`Found ${filteredLoads.length} results`);
                }}
                className="flex-1 px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                SEARCH
              </button>
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                CLEAR
              </button> 
            </div> */}
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

            {/* Pickup Date Range */}
            <div className="col-span-3" ref={datePickerRef}>
              <label className="block text-xs text-gray-600 mb-1">Pickup Dates</label>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPickupDatePicker((v) => !v)}
                    className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-left"
                  >
                    {pickupRange?.from && pickupRange?.to
                      ? `${format(pickupRange.from, 'MMM d, yyyy')} - ${format(
                          pickupRange.to,
                          'MMM d, yyyy'
                        )}`
                      : 'Select date range'}
                  </button>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-5 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    CLEAR
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.success(`Found ${filteredLoads.length} results`)}
                    className="px-5 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    SEARCH
                  </button>
                </div>

                {showPickupDatePicker && (
                  <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded shadow-lg p-2">
                    <DayPicker
                      mode="range"
                      selected={pickupRange}
                      onSelect={(range) => setPickupRange(range ?? undefined)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        {/* <div className="border-t border-gray-200 px-4 py-2 flex items-center gap-4 text-xs">
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
        </div> */}
      </div>

      {/* Results Header */}
      <div className="bg-white border border-gray-300 border-b-0 rounded-t-lg px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{filteredLoads.length} Results</span>
            {/* <button className="text-xs text-blue-600 hover:underline">
              +189 Similar Results
            </button> */}
            {/* <select className="ml-4 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Sort by Age - Newest</option>
              <option>Sort by Age - Oldest</option>
            </select> */}
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
                  LOAD #
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  ORIGIN ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  DESTINATION ▲
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  DISTANCE (MI)
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  EQUIPMENT
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  LOAD TYPE
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  LENGTH (FT)
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  WEIGHT (LBS)
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  PICKUP DATE
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  RATE ($)
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  RATE ($/MI)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLoads.length === 0 ? (
                <tr>
                  <td className="px-3 py-6 text-center text-sm text-gray-600" colSpan={12}>
                    No results. Adjust filters and try again.
                  </td>
                </tr>
              ) : (
                filteredLoads.map((load, index) => {
                  const isSelected = selectedTrucks.includes(load.id);
                const isBlueRow = index % 2 === 0;
                return (
                  <tr
                    key={load.id}
                    className={`border-b border-gray-200 ${
                      isBlueRow ? 'bg-blue-50' : 'bg-white'
                    } hover:bg-blue-100 transition-colors cursor-pointer`}
                  >
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleTruckSelection(load.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.loadNumber}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.origin}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <ArrowRight className="w-3 h-3 text-blue-600" />
                        <span className="text-sm text-gray-900">{load.destination}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.distanceMiles.toLocaleString()}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.equipmentType}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.loadType}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.lengthFt}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{load.weightLbs.toLocaleString()}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.pickupDate}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.rateTotal.toLocaleString()}</td>
                    <td className="px-3 py-3 text-sm text-gray-900">{load.ratePerMile.toFixed(2)}</td>
                  </tr>
                );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
