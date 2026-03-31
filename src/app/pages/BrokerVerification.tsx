import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Search, 
  Filter, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Star,
  Building2,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  DollarSign,
  FileCheck,
  Clock,
  Users,
  X,
  Award,
  ShieldCheck,
  ShieldAlert,
  FileText,
  Calendar,
  Download,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock broker data
const mockBrokers = [
  {
    id: 'BRK-001',
    name: 'FreightWorks LLC',
    logo: 'FW',
    status: 'verified',
    riskLevel: 'low',
    creditScore: 785,
    daysToPayAvg: 18,
    totalLoads: 1247,
    activeLoads: 34,
    rating: 4.8,
    reviewCount: 142,
    establishedYear: 2018,
    mcNumber: 'MC-123456',
    dotNumber: 'DOT-789012',
    address: '123 Logistics Ave, Chicago, IL 60601',
    phone: '(555) 123-4567',
    email: 'contact@freightworks.com',
    website: 'www.freightworks.com',
    paymentHistory: {
      onTime: 87,
      late: 10,
      disputed: 3,
    },
    monthlyPayments: [
      { month: 'Jan', onTime: 95, late: 5 },
      { month: 'Feb', onTime: 92, late: 8 },
      { month: 'Mar', onTime: 88, late: 12 },
      { month: 'Apr', onTime: 90, late: 10 },
      { month: 'May', onTime: 85, late: 15 },
      { month: 'Jun', onTime: 87, late: 13 },
    ],
    recentReviews: [
      {
        carrier: 'Swift Transport',
        rating: 5,
        date: 'Mar 10, 2026',
        comment: 'Excellent communication and quick payment. Highly professional.',
      },
      {
        carrier: 'Road Masters LLC',
        rating: 4,
        date: 'Mar 8, 2026',
        comment: 'Good experience overall. Payment took 20 days but no issues.',
      },
      {
        carrier: 'National Freight Co',
        rating: 5,
        date: 'Mar 5, 2026',
        comment: 'Very reliable broker. Always clear on expectations and pays on time.',
      },
    ],
    credentials: [
      { name: 'FMCSA Registered', verified: true },
      { name: 'Insurance Verified', verified: true },
      { name: 'Bond Verified', verified: true },
      { name: 'TIA Member', verified: true },
    ],
  },
  {
    id: 'BRK-002',
    name: 'Global Logistics Partners',
    logo: 'GL',
    status: 'verified',
    riskLevel: 'medium',
    creditScore: 645,
    daysToPayAvg: 35,
    totalLoads: 523,
    activeLoads: 12,
    rating: 3.9,
    reviewCount: 67,
    establishedYear: 2020,
    mcNumber: 'MC-654321',
    dotNumber: 'DOT-210987',
    address: '456 Commerce Blvd, Atlanta, GA 30301',
    phone: '(555) 234-5678',
    email: 'info@globallogistics.com',
    website: 'www.globallogistics.com',
    paymentHistory: {
      onTime: 65,
      late: 28,
      disputed: 7,
    },
    monthlyPayments: [
      { month: 'Jan', onTime: 70, late: 30 },
      { month: 'Feb', onTime: 68, late: 32 },
      { month: 'Mar', onTime: 72, late: 28 },
      { month: 'Apr', onTime: 65, late: 35 },
      { month: 'May', onTime: 60, late: 40 },
      { month: 'Jun', onTime: 65, late: 35 },
    ],
    recentReviews: [
      {
        carrier: 'Express Carriers',
        rating: 3,
        date: 'Mar 9, 2026',
        comment: 'Payment was delayed by 45 days. Had to follow up multiple times.',
      },
      {
        carrier: 'Midwest Transport',
        rating: 4,
        date: 'Mar 2, 2026',
        comment: 'Decent broker. Communication could be better.',
      },
    ],
    credentials: [
      { name: 'FMCSA Registered', verified: true },
      { name: 'Insurance Verified', verified: true },
      { name: 'Bond Verified', verified: false },
      { name: 'TIA Member', verified: false },
    ],
  },
];

type RiskLevel = 'low' | 'medium' | 'high';

const getRiskConfig = (level: RiskLevel) => {
  switch (level) {
    case 'low':
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: ShieldCheck,
        label: 'Low Risk',
      };
    case 'medium':
      return {
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        icon: Shield,
        label: 'Medium Risk',
      };
    case 'high':
      return {
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: ShieldAlert,
        label: 'High Risk',
      };
  }
};

const getCreditScoreConfig = (score: number) => {
  if (score >= 750) {
    return { color: 'text-green-600', label: 'Excellent', bgColor: 'bg-green-100' };
  } else if (score >= 700) {
    return { color: 'text-blue-600', label: 'Good', bgColor: 'bg-blue-100' };
  } else if (score >= 650) {
    return { color: 'text-yellow-600', label: 'Fair', bgColor: 'bg-yellow-100' };
  } else {
    return { color: 'text-red-600', label: 'Poor', bgColor: 'bg-red-100' };
  }
};

export function BrokerVerification() {
  const [selectedBrokerId, setSelectedBrokerId] = useState('BRK-001');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedBroker = mockBrokers.find(b => b.id === selectedBrokerId) || mockBrokers[0];
  const riskConfig = getRiskConfig(selectedBroker.riskLevel as RiskLevel);
  const creditConfig = getCreditScoreConfig(selectedBroker.creditScore);
  const RiskIcon = riskConfig.icon;

  const paymentChartData = [
    { name: 'On Time', value: selectedBroker.paymentHistory.onTime, color: '#10B981' },
    { name: 'Late', value: selectedBroker.paymentHistory.late, color: '#F59E0B' },
    { name: 'Disputed', value: selectedBroker.paymentHistory.disputed, color: '#EF4444' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Broker Verification
        </h1>
        <p className="text-gray-600">
          View broker credentials, payment history, and carrier reviews
        </p>
      </div>

      {/* Search and Broker List */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search brokers by name, MC number, or DOT number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockBrokers.map((broker) => {
            const brokerRiskConfig = getRiskConfig(broker.riskLevel as RiskLevel);
            return (
              <button
                key={broker.id}
                onClick={() => setSelectedBrokerId(broker.id)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
                  selectedBrokerId === broker.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {broker.logo}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{broker.name}</div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`${brokerRiskConfig.color} font-medium`}>
                        {brokerRiskConfig.label}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">Score: {broker.creditScore}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Broker Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-semibold">
              {selectedBroker.logo}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold text-gray-900">{selectedBroker.name}</h2>
                {selectedBroker.status === 'verified' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {selectedBroker.mcNumber}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {selectedBroker.dotNumber}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Est. {selectedBroker.establishedYear}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(selectedBroker.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {selectedBroker.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({selectedBroker.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <FileText className="w-4 h-4" />
              Total Loads
            </div>
            <div className="text-2xl font-semibold text-gray-900">{selectedBroker.totalLoads.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <TrendingUp className="w-4 h-4" />
              Active Loads
            </div>
            <div className="text-2xl font-semibold text-gray-900">{selectedBroker.activeLoads}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Clock className="w-4 h-4" />
              Avg Days to Pay
            </div>
            <div className="text-2xl font-semibold text-gray-900">{selectedBroker.daysToPayAvg} days</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Users className="w-4 h-4" />
              Carrier Reviews
            </div>
            <div className="text-2xl font-semibold text-gray-900">{selectedBroker.reviewCount}</div>
          </div>
        </div>
      </div>

      {/* Risk & Credit Score Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Risk Level */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <RiskIcon className={`w-5 h-5 ${riskConfig.color}`} />
            Risk Assessment
          </h3>
          
          <div className="flex items-center justify-center mb-6">
            <div className={`w-32 h-32 rounded-full ${riskConfig.bgColor} flex items-center justify-center`}>
              <div className="text-center">
                <RiskIcon className={`w-12 h-12 ${riskConfig.color} mx-auto mb-2`} />
                <div className={`text-xl font-semibold ${riskConfig.color}`}>
                  {riskConfig.label}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Payment Reliability</span>
              <span className="font-medium text-gray-900">
                {selectedBroker.paymentHistory.onTime}% on time
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Credit Score</span>
              <span className={`font-medium ${creditConfig.color}`}>
                {selectedBroker.creditScore} - {creditConfig.label}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg Payment Time</span>
              <span className={`font-medium ${
                selectedBroker.daysToPayAvg <= 20 ? 'text-green-600' : 
                selectedBroker.daysToPayAvg <= 30 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {selectedBroker.daysToPayAvg} days
              </span>
            </div>
          </div>
        </div>

        {/* Credit Score */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Credit Score
          </h3>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <svg className="w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke={creditConfig.color.replace('text-', '#')}
                  strokeWidth="12"
                  strokeDasharray={`${(selectedBroker.creditScore / 850) * 553} 553`}
                  strokeLinecap="round"
                  transform="rotate(-90 96 96)"
                  className={creditConfig.color === 'text-green-600' ? 'stroke-green-600' : 
                            creditConfig.color === 'text-blue-600' ? 'stroke-blue-600' :
                            creditConfig.color === 'text-yellow-600' ? 'stroke-yellow-600' :
                            'stroke-red-600'}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-4xl font-bold text-gray-900">{selectedBroker.creditScore}</div>
                <div className={`text-sm font-medium ${creditConfig.color}`}>{creditConfig.label}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div>
              <div className="font-medium text-gray-900">300-579</div>
              <div className="text-red-600">Poor</div>
            </div>
            <div>
              <div className="font-medium text-gray-900">580-669</div>
              <div className="text-yellow-600">Fair</div>
            </div>
            <div>
              <div className="font-medium text-gray-900">670-739</div>
              <div className="text-blue-600">Good</div>
            </div>
            <div>
              <div className="font-medium text-gray-900">740-850</div>
              <div className="text-green-600">Excellent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Payment Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Payment Distribution
          </h3>
          
          <div className="flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">On Time</span>
              </div>
              <span className="font-medium text-gray-900">{selectedBroker.paymentHistory.onTime}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-600">Late (1-30 days)</span>
              </div>
              <span className="font-medium text-gray-900">{selectedBroker.paymentHistory.late}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">Disputed</span>
              </div>
              <span className="font-medium text-gray-900">{selectedBroker.paymentHistory.disputed}%</span>
            </div>
          </div>
        </div>

        {/* Payment Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            6-Month Payment Trend
          </h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={selectedBroker.monthlyPayments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar key="onTime" dataKey="onTime" stackId="a" fill="#10B981" name="On Time" />
              <Bar key="late" dataKey="late" stackId="a" fill="#F59E0B" name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Credentials & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Credentials */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Credentials & Compliance
          </h3>
          
          <div className="space-y-3">
            {selectedBroker.credentials.map((cred, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{cred.name}</span>
                {cred.verified ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                    <XCircle className="w-4 h-4" />
                    Not Verified
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <strong>Verification Status:</strong> All required credentials have been verified by our compliance team.
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            Contact Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Address</div>
                <div className="text-sm text-gray-600">{selectedBroker.address}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Phone</div>
                <a href={`tel:${selectedBroker.phone}`} className="text-sm text-blue-600 hover:underline">
                  {selectedBroker.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Email</div>
                <a href={`mailto:${selectedBroker.email}`} className="text-sm text-blue-600 hover:underline">
                  {selectedBroker.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Website</div>
                <a href={`https://${selectedBroker.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  {selectedBroker.website}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => {
                toast.success(`Opening contact form for ${selectedBroker.name}`);}
              }
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Contact Broker
            </button>
            <button 
              onClick={() => {
                toast.success(`${selectedBroker.name} saved to contacts`);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Save Contact
            </button>
          </div>
        </div>
      </div>

      {/* Carrier Reviews */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-blue-600" />
          Recent Carrier Reviews
        </h3>
        
        <div className="space-y-4">
          {selectedBroker.recentReviews.map((review, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium text-gray-900 mb-1">{review.carrier}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
          View All {selectedBroker.reviewCount} Reviews
        </button>
      </div>
    </div>
  );
}