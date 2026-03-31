import { useState } from 'react';
import { 
  Search,
  Filter,
  Star,
  Phone,
  Mail,
  MapPin,
  Building,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Shield,
  Award,
  Eye,
  X,
  FileText,
  Truck,
  Package
} from 'lucide-react';
import { toast } from 'sonner';

type CompanyType = 'all' | 'broker' | 'carrier' | 'shipper';

interface Company {
  id: string;
  name: string;
  type: 'broker' | 'carrier' | 'shipper';
  mcNumber: string;
  dotNumber: string;
  location: string;
  phone: string;
  email: string;
  creditScore: number;
  daysToPay: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  insuranceVerified: boolean;
  yearsInBusiness: number;
  specialties: string[];
  description: string;
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'FreightWorks Logistics LLC',
    type: 'broker',
    mcNumber: 'MC-789456',
    dotNumber: 'DOT-1234567',
    location: 'Chicago, IL',
    phone: '(555) 234-5678',
    email: 'contact@freightworks.com',
    creditScore: 85,
    daysToPay: 30,
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    insuranceVerified: true,
    yearsInBusiness: 12,
    specialties: ['Dry Van', 'Reefer', 'Full Truckload'],
    description: 'Full-service freight brokerage specializing in nationwide transportation',
  },
  {
    id: '2',
    name: 'Western Express Transport',
    type: 'carrier',
    mcNumber: 'MC-456123',
    dotNumber: 'DOT-2345678',
    location: 'Los Angeles, CA',
    phone: '(555) 345-6789',
    email: 'dispatch@westernexpress.com',
    creditScore: 92,
    daysToPay: 15,
    rating: 4.9,
    reviewCount: 243,
    verified: true,
    insuranceVerified: true,
    yearsInBusiness: 18,
    specialties: ['Dry Van', 'Flatbed', 'West Coast'],
    description: 'Reliable carrier with over 500 trucks serving the western United States',
  },
  {
    id: '3',
    name: 'Cold Chain Solutions Inc',
    type: 'carrier',
    mcNumber: 'MC-234567',
    dotNumber: 'DOT-3456789',
    location: 'Phoenix, AZ',
    phone: '(555) 456-7890',
    email: 'info@coldchain.com',
    creditScore: 88,
    daysToPay: 21,
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    insuranceVerified: true,
    yearsInBusiness: 9,
    specialties: ['Reefer', 'Temperature Control', 'Food Grade'],
    description: 'Temperature-controlled freight specialists for perishable goods',
  },
  {
    id: '4',
    name: 'National Food Distributors',
    type: 'shipper',
    mcNumber: 'N/A',
    dotNumber: 'N/A',
    location: 'Dallas, TX',
    phone: '(555) 567-8901',
    email: 'shipping@nationalfood.com',
    creditScore: 95,
    daysToPay: 45,
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    insuranceVerified: false,
    yearsInBusiness: 25,
    specialties: ['Perishable Goods', 'Food Distribution', 'Nationwide'],
    description: 'Major food distributor with high-volume shipping needs',
  },
  {
    id: '5',
    name: 'Flatbed Pros Transportation',
    type: 'carrier',
    mcNumber: 'MC-345678',
    dotNumber: 'DOT-4567890',
    location: 'Atlanta, GA',
    phone: '(555) 678-9012',
    email: 'loads@flatbedpros.com',
    creditScore: 79,
    daysToPay: 25,
    rating: 4.4,
    reviewCount: 98,
    verified: true,
    insuranceVerified: true,
    yearsInBusiness: 7,
    specialties: ['Flatbed', 'Step Deck', 'Heavy Haul'],
    description: 'Specialized flatbed carrier for oversized and heavy equipment',
  },
  {
    id: '6',
    name: 'Prime Freight Solutions',
    type: 'broker',
    mcNumber: 'MC-567890',
    dotNumber: 'DOT-5678901',
    location: 'Houston, TX',
    phone: '(555) 789-0123',
    email: 'sales@primefreight.com',
    creditScore: 82,
    daysToPay: 35,
    rating: 4.5,
    reviewCount: 134,
    verified: true,
    insuranceVerified: true,
    yearsInBusiness: 10,
    specialties: ['Full Truckload', 'LTL', 'Expedited'],
    description: 'Technology-driven freight brokerage with nationwide carrier network',
  },
  {
    id: '7',
    name: 'Midwest Heavy Haul LLC',
    type: 'carrier',
    mcNumber: 'MC-678901',
    dotNumber: 'DOT-6789012',
    location: 'Kansas City, MO',
    phone: '(555) 890-1234',
    email: 'dispatch@midwestheavy.com',
    creditScore: 86,
    daysToPay: 18,
    rating: 4.8,
    reviewCount: 76,
    verified: true,
    insuranceVerified: true,
    yearsInBusiness: 15,
    specialties: ['Heavy Haul', 'Lowboy', 'Specialized'],
    description: 'Expert heavy haul carrier for construction and industrial equipment',
  },
  {
    id: '8',
    name: 'Tech Manufacturing Corp',
    type: 'shipper',
    mcNumber: 'N/A',
    dotNumber: 'N/A',
    location: 'Austin, TX',
    phone: '(555) 901-2345',
    email: 'logistics@techmanuf.com',
    creditScore: 91,
    daysToPay: 30,
    rating: 4.7,
    reviewCount: 112,
    verified: true,
    insuranceVerified: false,
    yearsInBusiness: 8,
    specialties: ['Electronics', 'High-Value Goods', 'JIT Delivery'],
    description: 'Electronics manufacturer requiring secure and timely freight services',
  },
  {
    id: '9',
    name: 'Reliable Routes Brokerage',
    type: 'broker',
    mcNumber: 'MC-789012',
    dotNumber: 'DOT-7890123',
    location: 'Denver, CO',
    phone: '(555) 012-3456',
    email: 'info@reliableroutes.com',
    creditScore: 74,
    daysToPay: 40,
    rating: 4.2,
    reviewCount: 65,
    verified: true,
    insuranceVerified: true,
    yearsInBusiness: 5,
    specialties: ['Regional', 'Dry Van', 'LTL'],
    description: 'Regional freight broker serving the mountain west states',
  },
  {
    id: '10',
    name: 'Swift Reefer Lines',
    type: 'carrier',
    mcNumber: 'MC-890123',
    dotNumber: 'DOT-8901234',
    location: 'Miami, FL',
    phone: '(555) 123-4567',
    email: 'operations@swiftreefer.com',
    creditScore: 90,
    daysToPay: 20,
    rating: 4.9,
    reviewCount: 187,
    verified: true,
    insuranceVerified: true,
    yearsInBusiness: 14,
    specialties: ['Reefer', 'Pharmaceuticals', 'Food Grade'],
    description: 'Premium temperature-controlled transportation for sensitive cargo',
  },
];

export function CompanyDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [companyTypeFilter, setCompanyTypeFilter] = useState<CompanyType>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [minCreditScore, setMinCreditScore] = useState('');
  const [maxDaysToPay, setMaxDaysToPay] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');

  const filteredCompanies = mockCompanies.filter(company => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.mcNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Type filter
    const matchesType = companyTypeFilter === 'all' || company.type === companyTypeFilter;

    // Credit score filter
    const matchesCreditScore = minCreditScore === '' || company.creditScore >= parseInt(minCreditScore);

    // Days to pay filter
    const matchesDaysToPay = maxDaysToPay === '' || company.daysToPay <= parseInt(maxDaysToPay);

    // Verified filter
    const matchesVerified = !verifiedOnly || company.verified;

    // Location filter
    const matchesLocation = locationFilter === '' || 
      company.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesType && matchesCreditScore && matchesDaysToPay && 
           matchesVerified && matchesLocation;
  });

  const clearFilters = () => {
    setMinCreditScore('');
    setMaxDaysToPay('');
    setVerifiedOnly(false);
    setLocationFilter('');
    setSearchQuery('');
  };

  const hasActiveFilters = minCreditScore || maxDaysToPay || verifiedOnly || locationFilter || searchQuery;

  const getCreditScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'broker':
        return Building;
      case 'carrier':
        return Truck;
      case 'shipper':
        return Package;
      default:
        return Building;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'broker':
        return 'bg-blue-100 text-blue-800';
      case 'carrier':
        return 'bg-purple-100 text-purple-800';
      case 'shipper':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const typeStats = {
    all: mockCompanies.length,
    broker: mockCompanies.filter(c => c.type === 'broker').length,
    carrier: mockCompanies.filter(c => c.type === 'carrier').length,
    shipper: mockCompanies.filter(c => c.type === 'shipper').length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Company Directory
        </h1>
        <p className="text-sm text-gray-600">
          Search and connect with verified brokers, carriers, and shippers
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company name, MC number, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors text-sm font-medium ${
              showFilters 
                ? 'bg-slate-50 border-slate-300 text-slate-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 bg-slate-600 text-white text-xs rounded-full">
                {[minCreditScore, maxDaysToPay, verifiedOnly, locationFilter, searchQuery].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Advanced Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Location
              </label>
              <input
                type="text"
                placeholder="City, State"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Min. Credit Score
              </label>
              <input
                type="number"
                placeholder="e.g., 80"
                value={minCreditScore}
                onChange={(e) => setMinCreditScore(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Max. Days to Pay
              </label>
              <input
                type="number"
                placeholder="e.g., 30"
                value={maxDaysToPay}
                onChange={(e) => setMaxDaysToPay(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Verified Only</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Company Type Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setCompanyTypeFilter('all')}
            className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              companyTypeFilter === 'all'
                ? 'border-slate-500 text-slate-700 bg-slate-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Building className="w-4 h-4" />
              <span>All Companies</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                companyTypeFilter === 'all' ? 'bg-slate-200 text-slate-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {typeStats.all}
              </span>
            </div>
          </button>
          <button
            onClick={() => setCompanyTypeFilter('broker')}
            className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              companyTypeFilter === 'broker'
                ? 'border-blue-500 text-blue-700 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Building className="w-4 h-4" />
              <span>Brokers</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                companyTypeFilter === 'broker' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {typeStats.broker}
              </span>
            </div>
          </button>
          <button
            onClick={() => setCompanyTypeFilter('carrier')}
            className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              companyTypeFilter === 'carrier'
                ? 'border-purple-500 text-purple-700 bg-purple-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Carriers</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                companyTypeFilter === 'carrier' ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {typeStats.carrier}
              </span>
            </div>
          </button>
          <button
            onClick={() => setCompanyTypeFilter('shipper')}
            className={`flex-1 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              companyTypeFilter === 'shipper'
                ? 'border-green-500 text-green-700 bg-green-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-4 h-4" />
              <span>Shippers</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                companyTypeFilter === 'shipper' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {typeStats.shipper}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium text-gray-900">{filteredCompanies.length}</span> {filteredCompanies.length === 1 ? 'company' : 'companies'}
        </p>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => {
          const TypeIcon = getTypeIcon(company.type);
          
          return (
            <div 
              key={company.id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-gray-900">
                      {company.name}
                    </h3>
                    {company.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-500" title="Verified Company" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(company.type)}`}>
                      <TypeIcon className="w-3 h-3" />
                      {company.type.charAt(0).toUpperCase() + company.type.slice(1)}
                    </span>
                    {company.insuranceVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <Shield className="w-3 h-3" />
                        Insured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-2 mb-4 text-sm">
                {company.mcNumber !== 'N/A' && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span>{company.mcNumber}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{company.phone}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Credit Score</div>
                  <div className={`text-lg font-semibold px-2 py-0.5 rounded inline-block ${getCreditScoreColor(company.creditScore)}`}>
                    {company.creditScore}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Days to Pay</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {company.daysToPay}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-600 mb-1">Customer Rating</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{company.rating}</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      ({company.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {company.specialties.slice(0, 3).map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => toast.success(`Viewing profile for ${company.name}`)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                View Full Profile
              </button>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCompanies.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 py-12 text-center">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No companies found</h3>
          <p className="text-sm text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
