import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  MapPin,
  Calendar,
  Package,
  Truck,
  DollarSign,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Navigation,
  Weight,
  Ruler,
  Box,
  Phone,
  Mail,
  Building,
  Save,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1: Route Details
  originCity: string;
  originState: string;
  originZip: string;
  destinationCity: string;
  destinationState: string;
  destinationZip: string;
  pickupDate: string;
  pickupTime: string;
  deliveryDate: string;
  deliveryTime: string;
  
  // Step 2: Load Details
  equipmentType: string;
  loadWeight: string;
  trailerLength: string;
  commodity: string;
  commodityDescription: string;
  specialRequirements: string;
  
  // Step 3: Rate Information
  rateType: 'fixed' | 'bid';
  rateAmount: string;
  currency: string;
  
  // Step 4: Contact Information
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  additionalNotes: string;
}

export function PostLoad() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    originCity: '',
    originState: '',
    originZip: '',
    destinationCity: '',
    destinationState: '',
    destinationZip: '',
    pickupDate: '',
    pickupTime: '',
    deliveryDate: '',
    deliveryTime: '',
    equipmentType: 'dry-van',
    loadWeight: '',
    trailerLength: '53',
    commodity: '',
    commodityDescription: '',
    specialRequirements: '',
    rateType: 'fixed',
    rateAmount: '',
    currency: 'USD',
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    additionalNotes: '',
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.originCity && 
          formData.originState && 
          formData.destinationCity && 
          formData.destinationState && 
          formData.pickupDate && 
          formData.deliveryDate
        );
      case 2:
        return !!(
          formData.equipmentType && 
          formData.loadWeight && 
          formData.commodity
        );
      case 3:
        return formData.rateType === 'bid' || !!(formData.rateAmount);
      case 4:
        return !!(
          formData.contactName && 
          formData.companyName && 
          formData.email && 
          formData.phone
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1) as Step);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as Step);
  };

  const handleSaveDraft = () => {
    toast.success('Load saved as draft');
  };

  const handleSubmit = () => {
    if (!validateStep(4)) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Load posted successfully to the load board!');
    setTimeout(() => {
      navigate('/load-board');
    }, 1500);
  };

  const steps = [
    { number: 1, title: 'Route Details', icon: MapPin },
    { number: 2, title: 'Load Details', icon: Package },
    { number: 3, title: 'Rate Info', icon: DollarSign },
    { number: 4, title: 'Contact Info', icon: User },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Post a New Load
        </h1>
        <p className="text-sm text-gray-600">
          Fill out the details to publish your shipment to the load board
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-green-500 border-green-500'
                        : isActive
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <StepIcon
                        className={`w-5 h-5 ${
                          isActive ? 'text-white' : 'text-gray-400'
                        }`}
                      />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`text-xs font-medium ${
                        isActive ? 'text-gray-900' : 'text-gray-600'
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {/* Step 1: Route Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Route Information
              </h2>
            </div>

            {/* Origin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Origin (Pickup Location)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.originCity}
                    onChange={(e) => updateFormData('originCity', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.originState}
                    onChange={(e) => updateFormData('originState', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.originZip}
                    onChange={(e) => updateFormData('originZip', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                Destination (Delivery Location)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.destinationCity}
                    onChange={(e) => updateFormData('destinationCity', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.destinationState}
                    onChange={(e) => updateFormData('destinationState', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.destinationZip}
                    onChange={(e) => updateFormData('destinationZip', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Pickup & Delivery Schedule
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => updateFormData('pickupDate', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => updateFormData('pickupTime', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Date <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => updateFormData('deliveryDate', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="time"
                      value={formData.deliveryTime}
                      onChange={(e) => updateFormData('deliveryTime', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Load Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Load Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-500" />
                  Equipment Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.equipmentType}
                  onChange={(e) => updateFormData('equipmentType', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="dry-van">Dry Van</option>
                  <option value="reefer">Reefer (Refrigerated)</option>
                  <option value="flatbed">Flatbed</option>
                  <option value="step-deck">Step Deck</option>
                  <option value="lowboy">Lowboy</option>
                  <option value="tanker">Tanker</option>
                  <option value="box-truck">Box Truck</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  Trailer Length
                </label>
                <select
                  value={formData.trailerLength}
                  onChange={(e) => updateFormData('trailerLength', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="20">20 ft</option>
                  <option value="40">40 ft</option>
                  <option value="45">45 ft</option>
                  <option value="48">48 ft</option>
                  <option value="53">53 ft</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Weight className="w-4 h-4 text-gray-500" />
                  Load Weight (lbs) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 45000"
                  value={formData.loadWeight}
                  onChange={(e) => updateFormData('loadWeight', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Box className="w-4 h-4 text-gray-500" />
                  Commodity Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Electronics, Food, Machinery"
                  value={formData.commodity}
                  onChange={(e) => updateFormData('commodity', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commodity Description
              </label>
              <textarea
                placeholder="Provide additional details about the commodity..."
                value={formData.commodityDescription}
                onChange={(e) => updateFormData('commodityDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements
              </label>
              <textarea
                placeholder="Team drivers required, hazmat certified, temperature control, etc."
                value={formData.specialRequirements}
                onChange={(e) => updateFormData('specialRequirements', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        )}

        {/* Step 3: Rate Information */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Rate Information
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pricing Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => updateFormData('rateType', 'fixed')}
                  className={`p-4 border-2 rounded-lg transition-all text-left ${
                    formData.rateType === 'fixed'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.rateType === 'fixed'
                          ? 'border-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {formData.rateType === 'fixed' && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Fixed Rate</div>
                      <div className="text-xs text-gray-600">
                        Set a specific price for this load
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateFormData('rateType', 'bid')}
                  className={`p-4 border-2 rounded-lg transition-all text-left ${
                    formData.rateType === 'bid'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.rateType === 'bid'
                          ? 'border-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {formData.rateType === 'bid' && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Open to Bids</div>
                      <div className="text-xs text-gray-600">
                        Let carriers submit their bids
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {formData.rateType === 'fixed' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Amount <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <select
                    value={formData.currency}
                    onChange={(e) => updateFormData('currency', e.target.value)}
                    className="w-24 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </select>
                  <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.rateAmount}
                      onChange={(e) => updateFormData('rateAmount', e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Enter the total rate for this shipment
                </p>
              </div>
            )}

            {formData.rateType === 'bid' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">
                      Bidding Mode Enabled
                    </h4>
                    <p className="text-xs text-blue-700">
                      Carriers will be able to submit their bids for this load. You'll receive
                      notifications when new bids are submitted and can review them in your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Contact Information */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.contactName}
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Company LLC"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                placeholder="Any additional information for carriers..."
                value={formData.additionalNotes}
                onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Summary Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Load Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Route:</span>{' '}
                  <span className="font-medium text-gray-900">
                    {formData.originCity}, {formData.originState} → {formData.destinationCity},{' '}
                    {formData.destinationState}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Pickup:</span>{' '}
                  <span className="font-medium text-gray-900">{formData.pickupDate || 'Not set'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Equipment:</span>{' '}
                  <span className="font-medium text-gray-900 capitalize">
                    {formData.equipmentType.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Weight:</span>{' '}
                  <span className="font-medium text-gray-900">
                    {formData.loadWeight ? `${formData.loadWeight} lbs` : 'Not set'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Commodity:</span>{' '}
                  <span className="font-medium text-gray-900">{formData.commodity || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Rate:</span>{' '}
                  <span className="font-medium text-gray-900">
                    {formData.rateType === 'bid'
                      ? 'Open to Bids'
                      : formData.rateAmount
                      ? `$${formData.rateAmount}`
                      : 'Not set'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Send className="w-4 h-4" />
              Publish to Load Board
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
