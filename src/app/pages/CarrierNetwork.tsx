import { useState } from 'react';
import { 
  Search,
  MoreVertical,
  CheckCircle,
  Lock,
  Info,
  ShieldCheck,
  Plus,
  X,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

type TabType = 'contacts' | 'groups';

interface Contact {
  id: string;
  authority: string;
  authorityType: 'MC' | 'DOT' | 'OR';
  contact: string;
  company: string;
  email: string;
  phone: string;
  affiliateId?: string;
  isDatCustomer: boolean;
  verified: boolean;
}

interface Group {
  id: string;
  name: string;
  contactCount: number;
  lastModified: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    authority: 'MC 93345\nDOT 2977708',
    authorityType: 'MC',
    contact: 'Alycia',
    company: 'DAT',
    email: 'alycia.chambon@dat.com',
    phone: '(800) 551-8847',
    isDatCustomer: true,
    verified: true,
  },
  {
    id: '2',
    authority: 'MC 98752',
    authorityType: 'MC',
    contact: 'Amy Agarwal',
    company: 'Avg Test Company',
    email: 'avg.agarwal@dat.com',
    phone: '(888) 888-8888',
    isDatCustomer: true,
    verified: true,
  },
  {
    id: '3',
    authority: 'MC 954321',
    authorityType: 'MC',
    contact: 'Brooke',
    company: 'rk/srk/sjrk',
    email: 'brooke.hammer@dat.com',
    phone: '(336) 216-5465',
    isDatCustomer: true,
    verified: true,
  },
  {
    id: '4',
    authority: 'MC 552798',
    authorityType: 'MC',
    contact: 'Christy King',
    company: 'DAT',
    email: 'christy.king@dat.com',
    phone: '',
    isDatCustomer: false,
    verified: false,
  },
  {
    id: '5',
    authority: 'DOT 5218934',
    authorityType: 'DOT',
    contact: 'Darren Filippo',
    company: 'CH Robinson',
    email: 'Darren.Filippo@chrobinson.com',
    phone: '',
    isDatCustomer: true,
    verified: true,
  },
  {
    id: '6',
    authority: 'OR / 12344\nMC 1240',
    authorityType: 'OR',
    contact: 'Dave McClure',
    company: 'DAT Solutions',
    email: 'dave.mcclure@dat.com',
    phone: '(503) 707-4594',
    isDatCustomer: true,
    verified: true,
  },
  {
    id: '7',
    authority: 'MC 310857',
    authorityType: 'MC',
    contact: 'David Martin',
    company: "David's Trucking LLC",
    email: 'David.martin@dat.com',
    phone: '(800) 555-5555',
    isDatCustomer: false,
    verified: false,
  },
  {
    id: '8',
    authority: 'MC 148754',
    authorityType: 'MC',
    contact: 'Ellie Coop',
    company: 'DAT',
    email: 'ellie.cooper@dat.com',
    phone: '(800) 555-5555',
    isDatCustomer: true,
    verified: true,
  },
  {
    id: '9',
    authority: 'MC 387325',
    authorityType: 'MC',
    contact: 'Jason Templeton',
    company: "Jason's Trucking",
    email: 'jason.templeton@dat.com',
    phone: '(800) 555-5555',
    isDatCustomer: true,
    verified: true,
  },
  {
    id: '10',
    authority: 'MC 396640',
    authorityType: 'MC',
    contact: 'Mark Prochaske',
    company: '',
    email: 'mark@wearticn.com',
    phone: '',
    isDatCustomer: true,
    verified: true,
  },
];

const mockGroups: Group[] = [
  { id: '1', name: 'Gaxes Test', contactCount: 1, lastModified: '5/10/2022' },
  { id: '2', name: 'Galen Test', contactCount: 1, lastModified: '5/20/2022' },
  { id: '3', name: "Julie's group", contactCount: 1, lastModified: '11a/2021' },
  { id: '4', name: 'Killas', contactCount: 1, lastModified: '6/6/2022' },
  { id: '5', name: 'nnnnnnah', contactCount: 1, lastModified: '3/9/2022' },
  { id: '6', name: 'RESTful test group', contactCount: 0, lastModified: '11/2/2021' },
  { id: '7', name: 'Rsu test', contactCount: 1, lastModified: '2/2/2022' },
  { id: '8', name: 'TestHistoryGroup1', contactCount: 0, lastModified: '2/10/2022' },
  { id: '9', name: 'Tier 1', contactCount: 4, lastModified: '11/16/2021' },
  { id: '10', name: 'Tier 2', contactCount: 3, lastModified: '8/16/2021' },
  { id: '11', name: 'Tier 3', contactCount: 2, lastModified: '8/16/2021' },
  { id: '12', name: 'Tier 4', contactCount: 1, lastModified: '5/18/2022' },
];

export function CarrierNetwork() {
  const [activeTab, setActiveTab] = useState<TabType>('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroupContacts, setSelectedGroupContacts] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredContacts = mockContacts.filter(contact => {
    if (searchQuery === '') return true;
    const query = searchQuery.toLowerCase();
    return (
      contact.contact.toLowerCase().includes(query) ||
      contact.company.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.authority.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === paginatedContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(paginatedContacts.map(c => c.id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Private Network</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          ADD CONTACT
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-lg border border-gray-200 border-b-0">
        <div className="flex items-center gap-8 px-6 pt-4">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'contacts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            ALL CONTACTS
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'groups'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            GROUPS
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg border border-gray-200">
        {activeTab === 'contacts' ? (
          <>
            {/* Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Contacts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Search name, email, authority, company, or affiliate ID
              </p>
            </div>

            {/* Info Messages */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>DAT customers will view your private load/truck posts</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Multi-user DAT accounts and non-DAT customers will <strong>not</strong> see your private load or truck posts</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedContacts.length === paginatedContacts.length && paginatedContacts.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VIEW
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AUTHORITY
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CONTACT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      COMPANY
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      EMAIL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PHONE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AFFILIATE ID
                    </th>
                    <th className="w-12 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedContacts.map((contact, index) => {
                    const isSelected = selectedContacts.includes(contact.id);
                    return (
                      <tr
                        key={contact.id}
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } hover:bg-blue-50 transition-colors`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleContactSelection(contact.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          {contact.isDatCustomer ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-pre-line">
                          {contact.authority}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {contact.contact}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {contact.company}
                        </td>
                        <td className="px-4 py-3 text-sm text-blue-600">
                          {contact.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {contact.phone}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {contact.affiliateId || ''}
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">rows per page</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Groups View */}
            <div className="p-6">
              {!showAddGroupForm ? (
                <>
                  {/* Add Group Button */}
                  <button
                    onClick={() => setShowAddGroupForm(true)}
                    className="w-full max-w-2xl mx-auto mb-8 py-3 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    ADD GROUP
                  </button>

                  {/* Groups Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            GROUP
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CONTACTS
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            LAST MODIFIED
                          </th>
                          <th className="w-12 px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockGroups.map((group) => (
                          <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-900">{group.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center text-sm text-gray-900">
                              {group.contactCount}
                            </td>
                            <td className="px-4 py-4 text-center text-sm text-gray-900">
                              {group.lastModified}
                            </td>
                            <td className="px-4 py-4">
                              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-400" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  {/* New Group Form */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">New Group</h2>
                      <button
                        onClick={() => {
                          setShowAddGroupForm(false);
                          setNewGroupName('');
                          setSelectedGroupContacts([]);
                          setSearchQuery('');
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    {/* Group Name Field */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter a name for your group"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Select Contacts Section */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          Select contacts to add to your group
                        </h3>
                        <span className="text-sm text-gray-600">
                          {selectedGroupContacts.length} selected
                        </span>
                      </div>

                      {/* Search Contacts */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search Contacts"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>

                      {/* Info Messages */}
                      <div className="mb-4 space-y-2 bg-gray-50 p-3 rounded-md">
                        <div className="flex items-start gap-2 text-xs text-gray-600">
                          <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                          <span>DAT customers will view your private load/truck posts</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-gray-600">
                          <ShieldCheck className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                          <span>Multi-user DAT accounts and non-DAT customers will <strong>not</strong> see your private load or truck posts</span>
                        </div>
                      </div>

                      {/* Contacts Table */}
                      <div className="overflow-x-auto border border-gray-200 rounded-md">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="w-12 px-4 py-3"></th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                VIEW
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                AUTHORITY
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                CONTACT
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                COMPANY
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                EMAIL
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                PHONE
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                AFFILIATE ID
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {mockContacts
                              .filter(contact => {
                                if (searchQuery === '') return true;
                                const query = searchQuery.toLowerCase();
                                return (
                                  contact.contact.toLowerCase().includes(query) ||
                                  contact.company.toLowerCase().includes(query) ||
                                  contact.email.toLowerCase().includes(query) ||
                                  contact.authority.toLowerCase().includes(query)
                                );
                              })
                              .map((contact, index) => {
                                const isSelected = selectedGroupContacts.includes(contact.id);
                                return (
                                  <tr
                                    key={contact.id}
                                    className={`${
                                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } hover:bg-blue-50 transition-colors`}
                                  >
                                    <td className="px-4 py-3">
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => {
                                          setSelectedGroupContacts(prev =>
                                            prev.includes(contact.id)
                                              ? prev.filter(id => id !== contact.id)
                                              : [...prev, contact.id]
                                          );
                                        }}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                      />
                                    </td>
                                    <td className="px-4 py-3">
                                      {contact.isDatCustomer ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                      ) : (
                                        <Lock className="w-5 h-5 text-gray-400" />
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-pre-line">
                                      {contact.authority}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                      {contact.contact}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                      {contact.company}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-blue-600">
                                      {contact.email}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                      {contact.phone}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                      {contact.affiliateId || ''}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                      <button
                        onClick={() => {
                          setShowAddGroupForm(false);
                          setNewGroupName('');
                          setSelectedGroupContacts([]);
                          setSearchQuery('');
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (newGroupName.trim()) {
                            toast.success(`Group "${newGroupName}" created with ${selectedGroupContacts.length} contact(s)!`);
                            setShowAddGroupForm(false);
                            setNewGroupName('');
                            setSelectedGroupContacts([]);
                            setSearchQuery('');
                          } else {
                            toast.error('Please enter a group name');
                          }
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Save Group
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add Contact to Private Network</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  placeholder="Enter contact name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MC Number
                </label>
                <input
                  type="text"
                  placeholder="MC 123456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(800) 555-5555"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Contact added successfully!');
                    setShowAddModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Create New Group</h2>
              <button
                onClick={() => setShowAddGroupModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  placeholder="Enter group name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Add a description for this group..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setShowAddGroupModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Group created successfully!');
                    setShowAddGroupModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}