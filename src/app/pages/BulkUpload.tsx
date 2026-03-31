import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { 
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  X,
  Edit2,
  Save,
  Trash2,
  FileText,
  Send,
  Plus,
  RefreshCw,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface ShipmentRow {
  id: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  equipmentType: string;
  weight: string;
  commodity: string;
  rate: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  errors: string[];
  isValid: boolean;
  isEditing?: boolean;
}

export function BulkUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [shipments, setShipments] = useState<ShipmentRow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Sample data for demonstration
  const sampleShipments: ShipmentRow[] = [
    {
      id: '1',
      origin: 'Los Angeles, CA',
      destination: 'Chicago, IL',
      pickupDate: '2026-03-15',
      deliveryDate: '2026-03-18',
      equipmentType: 'Dry Van',
      weight: '45000',
      commodity: 'Electronics',
      rate: '4935',
      contactName: 'John Smith',
      contactPhone: '555-123-4567',
      contactEmail: 'john@company.com',
      errors: [],
      isValid: true,
    },
    {
      id: '2',
      origin: 'Houston, TX',
      destination: 'Atlanta, GA',
      pickupDate: '2026-03-16',
      deliveryDate: '2026-03-19',
      equipmentType: 'Reefer',
      weight: '38500',
      commodity: 'Perishable Goods',
      rate: '3200',
      contactName: 'Sarah Johnson',
      contactPhone: '555-234-5678',
      contactEmail: 'sarah@logistics.com',
      errors: [],
      isValid: true,
    },
    {
      id: '3',
      origin: 'Phoenix, AZ',
      destination: '', // Missing destination - validation error
      pickupDate: '2026-03-14',
      deliveryDate: '2026-03-17',
      equipmentType: 'Flatbed',
      weight: '52000',
      commodity: 'Steel Beams',
      rate: '', // Missing rate - validation error
      contactName: 'Mike Davis',
      contactPhone: '555-345-6789',
      contactEmail: 'invalid-email', // Invalid email - validation error
      errors: ['Missing destination', 'Missing rate', 'Invalid email format'],
      isValid: false,
    },
    {
      id: '4',
      origin: 'Seattle, WA',
      destination: 'Miami, FL',
      pickupDate: '2026-03-20',
      deliveryDate: '2026-03-25',
      equipmentType: 'Reefer',
      weight: '40000',
      commodity: 'Frozen Foods',
      rate: '8450',
      contactName: 'Lisa Anderson',
      contactPhone: '555-456-7890',
      contactEmail: 'lisa@freight.com',
      errors: [],
      isValid: true,
    },
    {
      id: '5',
      origin: 'Denver, CO',
      destination: 'New York, NY',
      pickupDate: '2026-02-28', // Past date - validation error
      deliveryDate: '2026-03-15',
      equipmentType: 'Dry Van',
      weight: '43000',
      commodity: 'Textiles',
      rate: '5600',
      contactName: '',  // Missing contact name - validation error
      contactPhone: '555-567-8901',
      contactEmail: 'contact@shipping.com',
      errors: ['Pickup date is in the past', 'Missing contact name'],
      isValid: false,
    },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      handleFileUpload(file);
    } else {
      toast.error('Please upload a CSV or Excel file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate file processing and use sample data
    setTimeout(() => {
      setShipments(sampleShipments);
      toast.success(`Successfully loaded ${sampleShipments.length} shipments from ${file.name}`);
    }, 1000);
  };

  const downloadTemplate = () => {
    const csvContent = `Origin,Destination,Pickup Date,Delivery Date,Equipment Type,Weight (lbs),Commodity,Rate ($),Contact Name,Contact Phone,Contact Email
Los Angeles CA,Chicago IL,2026-03-15,2026-03-18,Dry Van,45000,Electronics,4935,John Smith,555-123-4567,john@company.com
Houston TX,Atlanta GA,2026-03-16,2026-03-19,Reefer,38500,Perishable Goods,3200,Sarah Johnson,555-234-5678,sarah@logistics.com`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shipment_template.csv';
    a.click();
    toast.success('Template downloaded');
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string) => {
    // Validate the shipment
    const shipment = shipments.find(s => s.id === id);
    if (shipment) {
      const errors: string[] = [];
      
      if (!shipment.origin) errors.push('Missing origin');
      if (!shipment.destination) errors.push('Missing destination');
      if (!shipment.pickupDate) errors.push('Missing pickup date');
      if (!shipment.deliveryDate) errors.push('Missing delivery date');
      if (!shipment.rate) errors.push('Missing rate');
      if (!shipment.contactName) errors.push('Missing contact name');
      if (shipment.contactEmail && !shipment.contactEmail.includes('@')) {
        errors.push('Invalid email format');
      }
      
      setShipments(prev => prev.map(s => 
        s.id === id 
          ? { ...s, errors, isValid: errors.length === 0 }
          : s
      ));
      
      if (errors.length === 0) {
        toast.success('Shipment saved successfully');
      } else {
        toast.error(`Found ${errors.length} validation error(s)`);
      }
    }
    
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setShipments(prev => prev.filter(s => s.id !== id));
    toast.success('Shipment removed');
  };

  const handleFieldChange = (id: string, field: keyof ShipmentRow, value: string) => {
    setShipments(prev => prev.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handlePublish = () => {
    const validShipments = shipments.filter(s => s.isValid);
    const invalidShipments = shipments.filter(s => !s.isValid);
    
    if (invalidShipments.length > 0) {
      toast.error(`Cannot publish: ${invalidShipments.length} shipment(s) have validation errors`);
      return;
    }
    
    if (validShipments.length === 0) {
      toast.error('No valid shipments to publish');
      return;
    }
    
    toast.success(`Successfully published ${validShipments.length} shipments to the marketplace!`);
    setTimeout(() => {
      navigate('/load-board');
    }, 1500);
  };

  const validCount = shipments.filter(s => s.isValid).length;
  const invalidCount = shipments.filter(s => !s.isValid).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Bulk Upload Shipments
        </h1>
        <p className="text-sm text-gray-600">
          Upload multiple shipments at once using CSV or Excel files
        </p>
      </div>

      {/* Upload Section */}
      {shipments.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          {/* Download Template Button */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-1">
                Step 1: Download Template
              </h2>
              <p className="text-xs text-gray-600">
                Start with our sample CSV template to ensure proper formatting
              </p>
            </div>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Step 2: Upload Your File
            </h2>
            
            {/* Drag and Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">
                    Drag and drop your file here
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    or click to browse from your computer
                  </p>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Select File
                  </button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>CSV files</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>Excel files (.xlsx, .xls)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Format Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              File Format Requirements
            </h3>
            <ul className="text-xs text-blue-800 space-y-1 ml-6 list-disc">
              <li>Include all required columns: Origin, Destination, Pickup Date, Delivery Date, Equipment Type, Weight, Commodity, Rate, Contact Name, Contact Phone, Contact Email</li>
              <li>Date format should be YYYY-MM-DD (e.g., 2026-03-15)</li>
              <li>Weight should be in pounds (lbs)</li>
              <li>Rate should be numeric value without currency symbols</li>
              <li>Maximum 1000 rows per upload</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Shipments</p>
                  <p className="text-2xl font-semibold text-gray-900">{shipments.length}</p>
                </div>
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Valid Shipments</p>
                  <p className="text-2xl font-semibold text-green-600">{validCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Errors Found</p>
                  <p className="text-2xl font-semibold text-red-600">{invalidCount}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Value</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${Math.round(shipments.reduce((sum, s) => sum + (parseInt(s.rate) || 0), 0) / 1000)}k
                  </p>
                </div>
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* File Info and Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {uploadedFile?.name || 'sample_shipments.csv'}
                </p>
                <p className="text-xs text-gray-600">
                  {shipments.length} rows loaded
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShipments([]);
                  setUploadedFile(null);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Upload New File
              </button>
            </div>
          </div>

          {/* Shipments Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-12">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Origin
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Pickup Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shipments.map((shipment) => {
                    const isEditing = editingId === shipment.id;
                    
                    return (
                      <tr 
                        key={shipment.id} 
                        className={`${
                          !shipment.isValid ? 'bg-red-50' : 'hover:bg-gray-50'
                        } transition-colors`}
                      >
                        <td className="px-4 py-3">
                          {shipment.isValid ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="relative group">
                              <AlertCircle className="w-5 h-5 text-red-500 cursor-help" />
                              <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-10 w-64 bg-gray-900 text-white text-xs rounded p-2 shadow-lg">
                                <div className="font-medium mb-1">Validation Errors:</div>
                                <ul className="list-disc list-inside space-y-0.5">
                                  {shipment.errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={shipment.origin}
                              onChange={(e) => handleFieldChange(shipment.id, 'origin', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{shipment.origin || <span className="text-red-500">Missing</span>}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={shipment.destination}
                              onChange={(e) => handleFieldChange(shipment.id, 'destination', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{shipment.destination || <span className="text-red-500">Missing</span>}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="date"
                              value={shipment.pickupDate}
                              onChange={(e) => handleFieldChange(shipment.id, 'pickupDate', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{shipment.pickupDate}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <select
                              value={shipment.equipmentType}
                              onChange={(e) => handleFieldChange(shipment.id, 'equipmentType', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="Dry Van">Dry Van</option>
                              <option value="Reefer">Reefer</option>
                              <option value="Flatbed">Flatbed</option>
                              <option value="Step Deck">Step Deck</option>
                            </select>
                          ) : (
                            <span className="text-sm text-gray-900">{shipment.equipmentType}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={shipment.weight}
                              onChange={(e) => handleFieldChange(shipment.id, 'weight', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{shipment.weight} lbs</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={shipment.rate}
                              onChange={(e) => handleFieldChange(shipment.id, 'rate', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{shipment.rate ? `$${shipment.rate}` : <span className="text-red-500">Missing</span>}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <div className="space-y-1">
                              <input
                                type="text"
                                value={shipment.contactName}
                                onChange={(e) => handleFieldChange(shipment.id, 'contactName', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Name"
                              />
                              <input
                                type="email"
                                value={shipment.contactEmail}
                                onChange={(e) => handleFieldChange(shipment.id, 'contactEmail', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Email"
                              />
                            </div>
                          ) : (
                            <div className="text-sm">
                              <div className="text-gray-900">{shipment.contactName || <span className="text-red-500">Missing</span>}</div>
                              <div className={`text-xs ${shipment.contactEmail?.includes('@') ? 'text-gray-500' : 'text-red-500'}`}>
                                {shipment.contactEmail}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            {isEditing ? (
                              <button
                                onClick={() => handleSave(shipment.id)}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Save"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEdit(shipment.id)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(shipment.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setShipments([]);
                setUploadedFile(null);
              }}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>

            <div className="flex items-center gap-3">
              {invalidCount > 0 && (
                <div className="text-sm text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Fix {invalidCount} error{invalidCount !== 1 ? 's' : ''} before publishing
                </div>
              )}
              
              <button
                onClick={handlePublish}
                disabled={invalidCount > 0 || validCount === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  invalidCount > 0 || validCount === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Send className="w-4 h-4" />
                Publish {validCount} Shipment{validCount !== 1 ? 's' : ''} to Marketplace
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
