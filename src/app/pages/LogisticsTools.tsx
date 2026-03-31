import { useState } from 'react';
import { 
  Calculator,
  MapPin,
  Fuel,
  Route,
  TrendingUp,
  DollarSign,
  Navigation,
  Truck,
  ArrowRight,
  Info,
  Compass,
  Gauge,
  Target,
  Percent
} from 'lucide-react';

export function LogisticsTools() {
  // Freight Rate Calculator
  const [rateOrigin, setRateOrigin] = useState('');
  const [rateDestination, setRateDestination] = useState('');
  const [rateDistance, setRateDistance] = useState('');
  const [ratePerMile, setRatePerMile] = useState('');
  const [calculatedRate, setCalculatedRate] = useState<number | null>(null);

  // Distance Calculator
  const [distOrigin, setDistOrigin] = useState('');
  const [distDestination, setDistDestination] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

  // Fuel Cost Estimator
  const [fuelDistance, setFuelDistance] = useState('');
  const [fuelMPG, setFuelMPG] = useState('6');
  const [fuelPrice, setFuelPrice] = useState('3.75');
  const [calculatedFuelCost, setCalculatedFuelCost] = useState<number | null>(null);
  const [gallonsNeeded, setGallonsNeeded] = useState<number | null>(null);

  // Route Planner
  const [routeOrigin, setRouteOrigin] = useState('');
  const [routeDestination, setRouteDestination] = useState('');
  const [routeStops, setRouteStops] = useState('');
  const [plannedRoute, setPlannedRoute] = useState<any | null>(null);

  // Profit Calculator
  const [profitRate, setProfitRate] = useState('');
  const [profitFuelCost, setProfitFuelCost] = useState('');
  const [profitDriverPay, setProfitDriverPay] = useState('');
  const [profitOtherCosts, setProfitOtherCosts] = useState('');
  const [calculatedProfit, setCalculatedProfit] = useState<number | null>(null);
  const [profitMargin, setProfitMargin] = useState<number | null>(null);

  const calculateFreightRate = () => {
    const distance = parseFloat(rateDistance);
    const perMile = parseFloat(ratePerMile);
    if (distance && perMile) {
      setCalculatedRate(distance * perMile);
    }
  };

  const calculateDistance = () => {
    // Simulate distance calculation
    // In real app, this would use a mapping API
    if (distOrigin && distDestination) {
      const mockDistance = Math.floor(Math.random() * 2000) + 500;
      setCalculatedDistance(mockDistance);
      setEstimatedTime(Math.round(mockDistance / 55)); // Assuming 55 mph average
    }
  };

  const calculateFuelCost = () => {
    const distance = parseFloat(fuelDistance);
    const mpg = parseFloat(fuelMPG);
    const price = parseFloat(fuelPrice);
    
    if (distance && mpg && price) {
      const gallons = distance / mpg;
      const cost = gallons * price;
      setGallonsNeeded(Math.round(gallons * 10) / 10);
      setCalculatedFuelCost(Math.round(cost * 100) / 100);
    }
  };

  const planRoute = () => {
    if (routeOrigin && routeDestination) {
      setPlannedRoute({
        distance: Math.floor(Math.random() * 2000) + 500,
        duration: Math.floor(Math.random() * 30) + 10,
        tollCost: Math.floor(Math.random() * 100) + 20,
        stops: routeStops ? routeStops.split(',').length : 0,
      });
    }
  };

  const calculateProfit = () => {
    const rate = parseFloat(profitRate);
    const fuel = parseFloat(profitFuelCost);
    const driver = parseFloat(profitDriverPay);
    const other = parseFloat(profitOtherCosts);
    
    if (rate && fuel !== undefined && driver !== undefined && other !== undefined) {
      const totalCosts = fuel + driver + other;
      const profit = rate - totalCosts;
      const margin = (profit / rate) * 100;
      
      setCalculatedProfit(Math.round(profit * 100) / 100);
      setProfitMargin(Math.round(margin * 10) / 10);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Logistics Tools
        </h1>
        <p className="text-sm text-gray-600">
          Quick access calculators and planning tools for dispatchers and brokers
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Freight Rate Calculator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900">Freight Rate Calculator</h2>
              <p className="text-xs text-gray-600">Calculate total freight charges</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Origin
              </label>
              <input
                type="text"
                placeholder="Los Angeles, CA"
                value={rateOrigin}
                onChange={(e) => setRateOrigin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                placeholder="Chicago, IL"
                value={rateDestination}
                onChange={(e) => setRateDestination(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Distance (mi)
                </label>
                <input
                  type="number"
                  placeholder="2015"
                  value={rateDistance}
                  onChange={(e) => setRateDistance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Rate/Mile ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="2.50"
                  value={ratePerMile}
                  onChange={(e) => setRatePerMile(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <button
              onClick={calculateFreightRate}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Calculate Rate
            </button>

            {calculatedRate !== null && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-xs text-blue-700 mb-1">Total Freight Rate</div>
                <div className="text-2xl font-bold text-blue-900">
                  ${calculatedRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Distance and Mileage Calculator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900">Distance Calculator</h2>
              <p className="text-xs text-gray-600">Calculate route distance and time</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Origin City
              </label>
              <input
                type="text"
                placeholder="New York, NY"
                value={distOrigin}
                onChange={(e) => setDistOrigin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Destination City
              </label>
              <input
                type="text"
                placeholder="Los Angeles, CA"
                value={distDestination}
                onChange={(e) => setDistDestination(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            <button
              onClick={calculateDistance}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Calculate Distance
            </button>

            {calculatedDistance !== null && (
              <div className="space-y-2">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-purple-700">Total Distance</div>
                    <Compass className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {calculatedDistance.toLocaleString()} mi
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="text-xs text-purple-700 mb-1">Estimated Drive Time</div>
                  <div className="text-lg font-semibold text-purple-900">
                    {estimatedTime} hours
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fuel Cost Estimator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Fuel className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900">Fuel Cost Estimator</h2>
              <p className="text-xs text-gray-600">Estimate fuel expenses for trip</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Trip Distance (mi)
              </label>
              <input
                type="number"
                placeholder="1500"
                value={fuelDistance}
                onChange={(e) => setFuelDistance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  MPG
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="6.0"
                  value={fuelMPG}
                  onChange={(e) => setFuelMPG(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Fuel Price ($/gal)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="3.75"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Average truck fuel efficiency is 6-7 MPG. Current national average diesel price is ~$3.75/gal.
                </p>
              </div>
            </div>

            <button
              onClick={calculateFuelCost}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
            >
              Calculate Fuel Cost
            </button>

            {calculatedFuelCost !== null && (
              <div className="space-y-2">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-orange-700">Total Fuel Cost</div>
                    <DollarSign className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-900">
                    ${calculatedFuelCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="text-xs text-orange-700 mb-1">Gallons Required</div>
                  <div className="text-lg font-semibold text-orange-900">
                    {gallonsNeeded} gal
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Route Planner */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Route className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900">Route Planner</h2>
              <p className="text-xs text-gray-600">Plan optimal delivery routes</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Starting Point
              </label>
              <input
                type="text"
                placeholder="Dallas, TX"
                value={routeOrigin}
                onChange={(e) => setRouteOrigin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Final Destination
              </label>
              <input
                type="text"
                placeholder="Miami, FL"
                value={routeDestination}
                onChange={(e) => setRouteDestination(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Stops (Optional, comma-separated)
              </label>
              <input
                type="text"
                placeholder="Houston TX, New Orleans LA"
                value={routeStops}
                onChange={(e) => setRouteStops(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>

            <button
              onClick={planRoute}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Plan Route
            </button>

            {plannedRoute && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-green-200">
                  <span className="text-xs font-medium text-green-700">Route Summary</span>
                  <Navigation className="w-4 h-4 text-green-600" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-green-700">Distance</div>
                    <div className="font-semibold text-green-900">{plannedRoute.distance} mi</div>
                  </div>
                  <div>
                    <div className="text-green-700">Duration</div>
                    <div className="font-semibold text-green-900">{plannedRoute.duration} hrs</div>
                  </div>
                  <div>
                    <div className="text-green-700">Toll Costs</div>
                    <div className="font-semibold text-green-900">${plannedRoute.tollCost}</div>
                  </div>
                  <div>
                    <div className="text-green-700">Stops</div>
                    <div className="font-semibold text-green-900">{plannedRoute.stops}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Load Profit Calculator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900">Load Profit Calculator</h2>
              <p className="text-xs text-gray-600">Calculate net profit and margins</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Freight Rate ($)
              </label>
              <input
                type="number"
                placeholder="5000"
                value={profitRate}
                onChange={(e) => setProfitRate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="space-y-2 bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-xs font-medium text-gray-700 mb-2">Operating Costs</div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Fuel Cost ($)
                </label>
                <input
                  type="number"
                  placeholder="800"
                  value={profitFuelCost}
                  onChange={(e) => setProfitFuelCost(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Driver Pay ($)
                </label>
                <input
                  type="number"
                  placeholder="1200"
                  value={profitDriverPay}
                  onChange={(e) => setProfitDriverPay(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Other Costs (tolls, permits, etc.) ($)
                </label>
                <input
                  type="number"
                  placeholder="150"
                  value={profitOtherCosts}
                  onChange={(e) => setProfitOtherCosts(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <button
              onClick={calculateProfit}
              className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Calculate Profit
            </button>

            {calculatedProfit !== null && (
              <div className="space-y-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-emerald-700">Net Profit</div>
                    <Target className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className={`text-2xl font-bold ${calculatedProfit >= 0 ? 'text-emerald-900' : 'text-red-600'}`}>
                    ${calculatedProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-emerald-700">Profit Margin</div>
                    <Percent className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className={`text-lg font-semibold ${profitMargin && profitMargin >= 0 ? 'text-emerald-900' : 'text-red-600'}`}>
                    {profitMargin}%
                  </div>
                  {profitMargin !== null && profitMargin < 10 && profitMargin >= 0 && (
                    <div className="text-xs text-yellow-700 mt-1">
                      ⚠️ Low margin - industry standard is 10-15%
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Reference Card */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border border-slate-600 p-6 shadow-sm text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Gauge className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold">Industry Benchmarks</h2>
              <p className="text-xs text-slate-300">Quick reference metrics</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-slate-300 mb-1">Average Rate Per Mile</div>
              <div className="text-lg font-semibold">$2.00 - $3.50</div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-slate-300 mb-1">Truck Fuel Efficiency</div>
              <div className="text-lg font-semibold">6-7 MPG</div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-slate-300 mb-1">Target Profit Margin</div>
              <div className="text-lg font-semibold">10-15%</div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-slate-300 mb-1">Avg. Drive Speed</div>
              <div className="text-lg font-semibold">55 MPH</div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-slate-300 mb-1">Driver Pay (% of Rate)</div>
              <div className="text-lg font-semibold">25-35%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
