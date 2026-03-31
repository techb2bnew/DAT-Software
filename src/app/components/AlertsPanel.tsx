import { TrendingUp, Clock, MapPin, DollarSign } from 'lucide-react';

const alerts = [
  {
    id: 1,
    title: 'High-Paying Load Alert',
    description: 'Seattle, WA → Miami, FL',
    rate: '$8,450',
    ratePerMile: '$3.25/mi',
    equipment: 'Reefer',
    time: '5 min ago',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Premium Rate Available',
    description: 'Denver, CO → Boston, MA',
    rate: '$6,890',
    ratePerMile: '$3.15/mi',
    equipment: 'Dry Van',
    time: '12 min ago',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Hot Load - Immediate Pickup',
    description: 'Phoenix, AZ → Dallas, TX',
    rate: '$2,950',
    ratePerMile: '$2.95/mi',
    equipment: 'Flatbed',
    time: '18 min ago',
    priority: 'medium',
  },
  {
    id: 4,
    title: 'Above Market Rate',
    description: 'Portland, OR → San Diego, CA',
    rate: '$3,240',
    ratePerMile: '$3.05/mi',
    equipment: 'Dry Van',
    time: '25 min ago',
    priority: 'medium',
  },
];

export function AlertsPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">High-Paying Load Alerts</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                alert.priority === 'high' 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                <TrendingUp className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-gray-900">{alert.title}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    alert.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.priority === 'high' ? 'Hot' : 'Priority'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{alert.description}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">{alert.rate}</span>
                    <span className="text-xs text-gray-500">({alert.ratePerMile})</span>
                  </div>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{alert.equipment}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
