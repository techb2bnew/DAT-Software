import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// Sample load locations across the US
const loadMarkers = [
  { name: 'Los Angeles, CA', coordinates: [-118.2437, 34.0522], loads: 45, rate: 2.85 },
  { name: 'Chicago, IL', coordinates: [-87.6298, 41.8781], loads: 38, rate: 2.45 },
  { name: 'Houston, TX', coordinates: [-95.3698, 29.7604], loads: 52, rate: 2.65 },
  { name: 'Atlanta, GA', coordinates: [-84.388, 33.749], loads: 31, rate: 2.35 },
  { name: 'Phoenix, AZ', coordinates: [-112.074, 33.4484], loads: 28, rate: 2.75 },
  { name: 'Dallas, TX', coordinates: [-96.797, 32.7767], loads: 41, rate: 2.55 },
  { name: 'Miami, FL', coordinates: [-80.1918, 25.7617], loads: 24, rate: 2.95 },
  { name: 'Seattle, WA', coordinates: [-122.3321, 47.6062], loads: 19, rate: 3.15 },
  { name: 'Denver, CO', coordinates: [-104.9903, 39.7392], loads: 22, rate: 2.45 },
  { name: 'New York, NY', coordinates: [-74.006, 40.7128], loads: 56, rate: 3.25 },
];

export function LoadMap() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Load Activity Map</h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-600">High Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-gray-600">Medium Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
            <span className="text-gray-600">Low Volume</span>
          </div>
        </div>
      </div>
      
      <div className="relative" style={{ height: '400px' }}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000,
          }}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5E7EB"
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#D1D5DB', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          
          {loadMarkers.map((marker) => {
            const getColor = (loads: number) => {
              if (loads > 40) return '#2563EB';
              if (loads > 25) return '#60A5FA';
              return '#BFDBFE';
            };
            
            return (
              <Marker key={marker.name} coordinates={marker.coordinates as [number, number]}>
                <g>
                  <circle
                    r={6}
                    fill={getColor(marker.loads)}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    className="cursor-pointer"
                  />
                  <circle
                    r={8}
                    fill={getColor(marker.loads)}
                    opacity={0.3}
                    className="animate-ping"
                    style={{
                      animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }}
                  />
                </g>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
}
