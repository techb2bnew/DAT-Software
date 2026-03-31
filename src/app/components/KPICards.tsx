import { FileText, Truck, DollarSign, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router';

const kpis = [
  {
    title: 'Available Loads',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: FileText,
    color: 'blue',
    link: '/load-board',
  },
  {
    title: 'Active Trucks',
    value: '1,234',
    change: '+5%',
    trend: 'up',
    icon: Truck,
    color: 'green',
    link: '/truck-board',
  },
  {
    title: 'Average Rate per Mile',
    value: '$2.45',
    change: '-2%',
    trend: 'down',
    icon: DollarSign,
    color: 'purple',
    link: '/rate-analysis',
  },
  {
    title: 'Loads Completed Today',
    value: '567',
    change: '+18%',
    trend: 'up',
    icon: CheckCircle,
    color: 'orange',
    link: '/tracking',
  },
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        const trendColor = kpi.trend === 'up' ? 'text-green-600' : 'text-red-600';
        
        return (
          <Link 
            key={kpi.title} 
            to={kpi.link}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[kpi.color as keyof typeof colorClasses]} group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
                <TrendIcon className="w-4 h-4" />
                <span>{kpi.change}</span>
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {kpi.value}
            </div>
            <div className="text-sm text-gray-600">
              {kpi.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
}