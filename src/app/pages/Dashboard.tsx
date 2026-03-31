import { KPICards } from '../components/KPICards';
import { LoadMap } from '../components/LoadMap';
import { RecentLoads } from '../components/RecentLoads';
import { AlertsPanel } from '../components/AlertsPanel';

export function Dashboard() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Monitor loads, track trucks, and manage dispatches in real-time
        </p>
      </div>
      
      {/* KPI Cards */}
      <div className="mb-6">
        <KPICards />
      </div>
      
      {/* Map and Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <LoadMap />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>
      
      {/* Recent Loads Table */}
      <div>
        <RecentLoads />
      </div>
    </div>
  );
}