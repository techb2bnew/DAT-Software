import { useState,useEffect } from "react";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Truck,
  Mail,
  Phone,
  MapPin,
  Building2,
  Save,
  Key,
  Globe,
  Palette,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    // { id: 'company', label: 'Company', icon: Building2 },
    // { id: 'notifications', label: 'Notifications', icon: Bell },
    // { id: 'security', label: 'Security', icon: Shield },
    // { id: 'billing', label: 'Billing', icon: CreditCard },
    // { id: 'preferences', label: 'Preferences', icon: Palette },
  ];
  const [student,setStudent]=useState({
    "name":"",
    "email":""
  })

  const fetchProfile = async (id: string) => {
    const res = await fetch(
      `http://localhost:3000/api/student/profile?id=${id}`,
    );
    const profileData = await res.json();
    // console.log("Full Student Profile:", profileData);
    setStudent(profileData);
  };

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      fetchProfile(studentId);
    }
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Profile Information
              </h2>

              <div className="space-y-6">
                {/* <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    JD
                  </div>
                  <div>
                    <button
                      onClick={() => toast.info('Photo upload dialog opened')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF, max 2MB</p>
                  </div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                     Name
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={`${student?.name}`}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Dispatcher"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div> */}

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                  disabled
                    type="email"
                    defaultValue={`${student?.email}`}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
{/* 
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="(555) 123-4567"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    defaultValue="Lead Dispatcher"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div> */}

                {/* <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => toast.info("Changes cancelled")}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      toast.success("Profile updated successfully")
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div> */}

              </div>
            </div>
          )}

          {/* {activeTab === 'company' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue="FreightCo Logistics"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MC Number
                    </label>
                    <input
                      type="text"
                      defaultValue="MC-123456"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DOT Number
                    </label>
                    <input
                      type="text"
                      defaultValue="DOT-789012"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue="123 Logistics Blvd"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      defaultValue="Chicago"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      defaultValue="IL"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      defaultValue="60601"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Truck className="w-4 h-4 inline mr-2" />
                    Fleet Size
                  </label>
                  <input
                    type="number"
                    defaultValue="45"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => toast.info('Changes cancelled')}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => toast.success('Company information updated successfully')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'load-assignments', label: 'Load Assignments', description: 'Get notified when loads are assigned' },
                      { id: 'payment-alerts', label: 'Payment Alerts', description: 'Receive payment and invoice notifications' },
                      { id: 'rate-changes', label: 'Rate Changes', description: 'Updates on market rate fluctuations' },
                      { id: 'new-loads', label: 'New Loads', description: 'Alerts for new loads matching your criteria' },
                    ].map((item) => (
                      <label key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{item.label}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Push Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      { id: 'urgent-alerts', label: 'Urgent Alerts', description: 'Critical updates requiring immediate attention' },
                      { id: 'driver-updates', label: 'Driver Updates', description: 'Real-time driver status changes' },
                      { id: 'delivery-confirmations', label: 'Delivery Confirmations', description: 'Notifications when loads are delivered' },
                    ].map((item) => (
                      <label key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{item.label}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => toast.info('Changes cancelled')}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => toast.success('Notification preferences saved successfully')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      onClick={() => toast.success('Password updated successfully')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Enable 2FA</div>
                      <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                    </div>
                    <button
                      onClick={() => toast.success('Two-factor authentication enabled')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Enable
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Chrome on Windows</div>
                        <div className="text-sm text-gray-500">Chicago, IL • Active now</div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Current
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing & Subscription</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Pro Plan</h3>
                      <p className="text-gray-600">Unlimited loads and drivers</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">$299</div>
                      <div className="text-gray-600">per month</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-blue-200">
                    <span className="text-gray-600">Next billing date: Apr 13, 2026</span>
                    <button
                      onClick={() => toast.info('Plan management opened')}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                      Manage Plan
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                        <div className="text-sm text-gray-500">Expires 12/2027</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toast.info('Payment method update opened')}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Billing History</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {[
                          { date: 'Mar 13, 2026', description: 'Pro Plan - Monthly', amount: '$299.00', status: 'Paid' },
                          { date: 'Feb 13, 2026', description: 'Pro Plan - Monthly', amount: '$299.00', status: 'Paid' },
                          { date: 'Jan 13, 2026', description: 'Pro Plan - Monthly', amount: '$299.00', status: 'Paid' },
                        ].map((invoice, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{invoice.date}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{invoice.description}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{invoice.amount}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {invoice.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Display Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Time Zone
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>(UTC-06:00) Central Time (US & Canada)</option>
                    <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                    <option>(UTC-07:00) Mountain Time (US & Canada)</option>
                    <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance Unit
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Miles</option>
                    <option>Kilometers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>USD ($)</option>
                    <option>CAD (C$)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Dashboard Preferences</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'default-map', label: 'Show map by default on Load Board' },
                      { id: 'auto-refresh', label: 'Auto-refresh data every 30 seconds' },
                      { id: 'compact-view', label: 'Use compact table view' },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-900">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => toast.info('Preferences reset to default')}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Reset to Default
                  </button>
                  <button
                    onClick={() => toast.success('Display preferences saved successfully')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
