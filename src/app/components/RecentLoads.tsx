import { MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const recentLoads = [
  {
    id: 'LD-2847',
    origin: 'Los Angeles, CA',
    destination: 'Chicago, IL',
    weight: '45,000 lbs',
    distance: '2,015 mi',
    rate: '$4,935',
    ratePerMile: '$2.45',
    equipment: 'Dry Van',
    status: 'Available',
    pickupDate: 'Mar 14, 2026',
  },
  {
    id: 'LD-2846',
    origin: 'Houston, TX',
    destination: 'Atlanta, GA',
    weight: '38,500 lbs',
    distance: '789 mi',
    rate: '$2,209',
    ratePerMile: '$2.80',
    equipment: 'Reefer',
    status: 'Available',
    pickupDate: 'Mar 13, 2026',
  },
  {
    id: 'LD-2845',
    origin: 'Seattle, WA',
    destination: 'Phoenix, AZ',
    weight: '42,000 lbs',
    distance: '1,420 mi',
    rate: '$4,260',
    ratePerMile: '$3.00',
    equipment: 'Flatbed',
    status: 'Dispatched',
    pickupDate: 'Mar 13, 2026',
  },
  {
    id: 'LD-2844',
    origin: 'Miami, FL',
    destination: 'New York, NY',
    weight: '35,000 lbs',
    distance: '1,281 mi',
    rate: '$3,971',
    ratePerMile: '$3.10',
    equipment: 'Dry Van',
    status: 'Available',
    pickupDate: 'Mar 14, 2026',
  },
  {
    id: 'LD-2843',
    origin: 'Dallas, TX',
    destination: 'Denver, CO',
    weight: '40,000 lbs',
    distance: '781 mi',
    rate: '$1,952',
    ratePerMile: '$2.50',
    equipment: 'Dry Van',
    status: 'Completed',
    pickupDate: 'Mar 12, 2026',
  },
];

export function RecentLoads() {
  const navigate = useNavigate();

  const handleRowClick = (loadId: string) => {
    // Navigate to tracking page or load details
    navigate('/tracking');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Loads</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Load ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Distance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Equipment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Pickup Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentLoads.map((load) => (
              <tr 
                key={load.id} 
                onClick={() => handleRowClick(load.id)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-blue-600">{load.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-900">{load.origin}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-900">{load.destination}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {load.weight}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {load.distance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{load.rate}</div>
                    <div className="text-xs text-gray-500">{load.ratePerMile}/mi</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {load.equipment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {load.pickupDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      load.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : load.status === 'Dispatched'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {load.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}