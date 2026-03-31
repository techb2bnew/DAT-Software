import { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { GeoJsonProperties, Geometry, Feature } from 'geojson';


// import logoImage from 'figma:asset/cb58bb46a685f1b1151d0794d1b8491d596ef660.png';

const logoImage = 'https://via.placeholder.com/150x40?text=Truckadium+Logo';
const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

type TimeFrame = 0 | 1 | 2 | 3 | 4;
type ViewType = 'INBOUND' | 'OUTBOUND';

export function MarketConditions() {
  const [leftEquipment, setLeftEquipment] = useState('VAN');
  const [rightEquipment, setRightEquipment] = useState('VAN');
  const [leftTimeFrame, setLeftTimeFrame] = useState<TimeFrame>(2);
  const [rightTimeFrame, setRightTimeFrame] = useState<TimeFrame>(2);
  const [leftView, setLeftView] = useState<ViewType>('INBOUND');
  const [rightView, setRightView] = useState<ViewType>('OUTBOUND');
  const [leftLocation, setLeftLocation] = useState('');
  const [rightLocation, setRightLocation] = useState('');

  const timeFrameLabels = ['Prior 30\nDays', 'Prior 8\nDays', 'Prior Biz\nDay', 'Current\nDay', '8 Day\nForecast'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Market Conditions</h1>
        <img src={logoImage} alt="Truckadium" className="h-8" />
      </div>

      {/* Main Content - Two Panels */}
      <div className="grid grid-cols-2 gap-0">
        {/* Left Panel */}
        <div className="bg-white border-r border-gray-300">
          <div className="p-6">
            {/* Equipment Dropdown */}
            <div className="mb-6">
              <div className="relative inline-block">
                <select
                  value={leftEquipment}
                  onChange={(e) => setLeftEquipment(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="VAN">VAN</option>
                  <option value="REEFER">REEFER</option>
                  <option value="FLATBED">FLATBED</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Time Frame */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  TIMEFRAME
                </label>
                <div className="flex items-center gap-1 text-blue-600 cursor-pointer">
                  <span className="text-xs font-medium">UPGRADE</span>
                  <Info className="w-3 h-3" />
                </div>
              </div>

              <div className="relative mb-6">
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={leftTimeFrame}
                  onChange={(e) => setLeftTimeFrame(parseInt(e.target.value) as TimeFrame)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${leftTimeFrame * 25}%, #E5E7EB ${leftTimeFrame * 25}%, #E5E7EB 100%)`
                  }}
                />
                <div className="flex items-center justify-between mt-2">
                  {timeFrameLabels.map((label, idx) => (
                    <div
                      key={idx}
                      className={`text-xs text-center leading-tight ${
                        idx === leftTimeFrame ? 'text-blue-600 font-semibold' : 'text-gray-500'
                      }`}
                      style={{ width: '20%' }}
                    >
                      {label.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inbound/Outbound Toggle */}
            <div className="mb-6">
              <div className="inline-flex items-center bg-white border-2 border-blue-600 rounded-full p-0.5">
                <button
                  onClick={() => setLeftView('INBOUND')}
                  className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    leftView === 'INBOUND'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  INBOUND
                </button>
                <button
                  onClick={() => setLeftView('OUTBOUND')}
                  className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    leftView === 'OUTBOUND'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  OUTBOUND
                </button>
              </div>
            </div>

            {/* Area Section */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                AREA
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  Country
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  Region
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  State
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  Extended Market
                </button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700">
                  Market
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  3-Digit Zip
                </button>
              </div>
            </div>

            {/* Panel Title */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-900">
                {leftView === 'OUTBOUND' ? 'Outbound' : 'Inbound'} | Van | Prior Business Day
              </h2>
              <div className="text-gray-400 text-sm mt-1">--</div>
            </div>

            {/* Market Conditions Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    MARKET CONDITIONS INDEX
                  </h3>
                  <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    MCI SEARCHES
                  </div>
                  <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    L/T RATIO
                  </div>
                </div>
              </div>

              <div className="text-sm text-blue-600 mb-4">
                Select an area on the map or enter a location to see results.
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Loads</span>
                  <span className="text-gray-400">--</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Trucks</span>
                  <span className="text-gray-400">--</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative bg-white border border-gray-300 rounded overflow-hidden" style={{ height: '400px' }}>
              {/* MCI Legend */}
              <div className="absolute top-3 left-3 bg-gray-800 bg-opacity-90 text-white px-3 py-2 rounded text-xs z-10">
                <div className="font-semibold mb-1">MCI - Vans</div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-4 h-3 bg-red-600"></div>
                  <span>Very Hot</span>
                </div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-4 h-3 bg-orange-500"></div>
                  <span>Hot</span>
                </div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-4 h-3 bg-yellow-300"></div>
                  <span>Warm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-blue-500"></div>
                  <span>Cold</span>
                </div>
              </div>

              <ComposableMap
                projection="geoAlbersUsa"
                projectionConfig={{ scale: 800 }}
                className="w-full h-full"
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }: { geographies: Feature[] }) =>
                    geographies.map((geo) => {
                      const colors = ['#DC2626', '#F97316', '#FDE047', '#3B82F6'];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      
                      return (
                        <Geography
                          key={(geo as any).rsmKey}
                          geography={geo}
                          fill={randomColor}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: '#6B7280', outline: 'none', cursor: 'pointer' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
          </div>
        </div>

        {/* Right Panel - Identical structure */}
        <div className="bg-white">
          <div className="p-6">
            {/* Equipment Dropdown */}
            <div className="mb-6">
              <div className="relative inline-block">
                <select
                  value={rightEquipment}
                  onChange={(e) => setRightEquipment(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="VAN">VAN</option>
                  <option value="REEFER">REEFER</option>
                  <option value="FLATBED">FLATBED</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Time Frame */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  TIMEFRAME
                </label>
                <div className="flex items-center gap-1 text-blue-600 cursor-pointer">
                  <span className="text-xs font-medium">UPGRADE</span>
                  <Info className="w-3 h-3" />
                </div>
              </div>

              <div className="relative mb-6">
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={rightTimeFrame}
                  onChange={(e) => setRightTimeFrame(parseInt(e.target.value) as TimeFrame)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${rightTimeFrame * 25}%, #E5E7EB ${rightTimeFrame * 25}%, #E5E7EB 100%)`
                  }}
                />
                <div className="flex items-center justify-between mt-2">
                  {timeFrameLabels.map((label, idx) => (
                    <div
                      key={idx}
                      className={`text-xs text-center leading-tight ${
                        idx === rightTimeFrame ? 'text-blue-600 font-semibold' : 'text-gray-500'
                      }`}
                      style={{ width: '20%' }}
                    >
                      {label.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inbound/Outbound Toggle */}
            <div className="mb-6">
              <div className="inline-flex items-center bg-white border-2 border-blue-600 rounded-full p-0.5">
                <button
                  onClick={() => setRightView('INBOUND')}
                  className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    rightView === 'INBOUND'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  INBOUND
                </button>
                <button
                  onClick={() => setRightView('OUTBOUND')}
                  className={`px-6 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    rightView === 'OUTBOUND'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  OUTBOUND
                </button>
              </div>
            </div>

            {/* Area Section */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 block">
                AREA
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  Country
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  Region
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  State
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  Extended Market
                </button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700">
                  Market
                </button>
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                  3-Digit Zip
                </button>
              </div>
            </div>

            {/* Panel Title */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-900">
                {rightView === 'OUTBOUND' ? 'Outbound' : 'Inbound'} | Van | Prior Business Day
              </h2>
              <div className="text-gray-400 text-sm mt-1">--</div>
            </div>

            {/* Market Conditions Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    MARKET CONDITIONS INDEX
                  </h3>
                  <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    MCI SEARCHES
                  </div>
                  <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    L/T RATIO
                  </div>
                </div>
              </div>

              <div className="text-sm text-blue-600 mb-4">
                Select an area on the map or enter a location to see results.
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Loads</span>
                  <span className="text-gray-400">--</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Trucks</span>
                  <span className="text-gray-400">--</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative bg-white border border-gray-300 rounded overflow-hidden" style={{ height: '400px' }}>
              {/* MCI Legend */}
              <div className="absolute top-3 left-3 bg-gray-800 bg-opacity-90 text-white px-3 py-2 rounded text-xs z-10">
                <div className="font-semibold mb-1">MCI - Vans</div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-4 h-3 bg-red-600"></div>
                  <span>Very Hot</span>
                </div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-4 h-3 bg-orange-500"></div>
                  <span>Hot</span>
                </div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-4 h-3 bg-yellow-300"></div>
                  <span>Warm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-blue-500"></div>
                  <span>Cold</span>
                </div>
              </div>

              <ComposableMap
                projection="geoAlbersUsa"
                projectionConfig={{ scale: 800 }}
                className="w-full h-full"
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }: { geographies: Feature[] }) =>
                    geographies.map((geo) => {
                      const colors = ['#DC2626', '#F97316', '#FDE047', '#3B82F6'];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      
                      return (
                        <Geography
                          key={(geo as any).rsmKey}
                          geography={geo}
                          fill={randomColor}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: '#6B7280', outline: 'none', cursor: 'pointer' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}