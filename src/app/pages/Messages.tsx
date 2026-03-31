import { useState } from 'react';
import { 
  Search,
  Send,
  Phone,
  Video,
  Paperclip,
  Image as ImageIcon,
  File,
  MoreVertical,
  Circle,
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCheck,
  Check,
  Smile,
  X,
  Download,
  Navigation,
  AlertCircle,
  User,
  Users,
  Hash
} from 'lucide-react';

type MessageType = 'text' | 'file' | 'image' | 'system';
type ConversationType = 'driver' | 'team' | 'load';
type DriverStatus = 'online' | 'offline' | 'driving' | 'on-break';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  type: MessageType;
  timestamp: string;
  read: boolean;
  attachment?: {
    name: string;
    size: string;
    type: string;
    url?: string;
  };
}

interface Conversation {
  id: string;
  name: string;
  type: ConversationType;
  avatar?: string;
  status?: DriverStatus;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  truckNumber?: string;
  loadId?: string;
  currentLocation?: string;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    name: 'John Martinez',
    type: 'driver',
    status: 'driving',
    lastMessage: 'Just passed through Phoenix, on schedule',
    lastMessageTime: '2m ago',
    unreadCount: 2,
    truckNumber: 'T-1247',
    loadId: 'LD-3891',
    currentLocation: 'Phoenix, AZ',
    messages: [
      {
        id: 'msg-1',
        senderId: 'dispatcher',
        senderName: 'You',
        content: 'Hey John, how\'s the route looking?',
        type: 'text',
        timestamp: '10:30 AM',
        read: true,
      },
      {
        id: 'msg-2',
        senderId: 'driver-1',
        senderName: 'John Martinez',
        content: 'All good! Traffic is light on I-10',
        type: 'text',
        timestamp: '10:32 AM',
        read: true,
      },
      {
        id: 'msg-3',
        senderId: 'driver-1',
        senderName: 'John Martinez',
        content: 'Just passed through Phoenix, on schedule',
        type: 'text',
        timestamp: '10:45 AM',
        read: false,
      },
      {
        id: 'msg-4',
        senderId: 'driver-1',
        senderName: 'John Martinez',
        content: 'Here\'s a photo of the load secured',
        type: 'image',
        timestamp: '10:46 AM',
        read: false,
        attachment: {
          name: 'load-secured.jpg',
          size: '2.4 MB',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1566746430577-19c60b5c1c1b?w=400',
        },
      },
    ],
  },
  {
    id: 'conv-2',
    name: 'Sarah Johnson',
    type: 'driver',
    status: 'online',
    lastMessage: 'Perfect, thanks for the update',
    lastMessageTime: '15m ago',
    unreadCount: 0,
    truckNumber: 'T-1348',
    loadId: 'LD-3892',
    currentLocation: 'Dallas, TX',
    messages: [
      {
        id: 'msg-5',
        senderId: 'dispatcher',
        senderName: 'You',
        content: 'Sarah, your next load is ready for pickup at 2 PM',
        type: 'text',
        timestamp: '9:15 AM',
        read: true,
      },
      {
        id: 'msg-6',
        senderId: 'driver-2',
        senderName: 'Sarah Johnson',
        content: 'Perfect, thanks for the update',
        type: 'text',
        timestamp: '9:20 AM',
        read: true,
      },
    ],
  },
  {
    id: 'conv-3',
    name: 'LD-3891 - Chicago Delivery',
    type: 'load',
    lastMessage: 'Load status updated to In Transit',
    lastMessageTime: '1h ago',
    unreadCount: 1,
    loadId: 'LD-3891',
    messages: [
      {
        id: 'msg-7',
        senderId: 'system',
        senderName: 'System',
        content: 'Load LD-3891 has been assigned to John Martinez (T-1247)',
        type: 'system',
        timestamp: '8:00 AM',
        read: true,
      },
      {
        id: 'msg-8',
        senderId: 'system',
        senderName: 'System',
        content: 'Load status updated to In Transit',
        type: 'system',
        timestamp: '9:30 AM',
        read: false,
      },
    ],
  },
  {
    id: 'conv-4',
    name: 'Mike Thompson',
    type: 'driver',
    status: 'on-break',
    lastMessage: 'Taking my 30-minute break',
    lastMessageTime: '45m ago',
    unreadCount: 0,
    truckNumber: 'T-1449',
    messages: [
      {
        id: 'msg-9',
        senderId: 'driver-3',
        senderName: 'Mike Thompson',
        content: 'Taking my 30-minute break',
        type: 'text',
        timestamp: '9:50 AM',
        read: true,
      },
    ],
  },
  {
    id: 'conv-5',
    name: 'Dispatch Team',
    type: 'team',
    lastMessage: 'Anyone available for an urgent pickup?',
    lastMessageTime: '2h ago',
    unreadCount: 5,
    messages: [
      {
        id: 'msg-10',
        senderId: 'dispatcher-2',
        senderName: 'Emily Davis',
        content: 'Anyone available for an urgent pickup?',
        type: 'text',
        timestamp: '8:30 AM',
        read: false,
      },
      {
        id: 'msg-11',
        senderId: 'dispatcher-3',
        senderName: 'Robert Chen',
        content: 'I can coordinate that. What\'s the location?',
        type: 'text',
        timestamp: '8:32 AM',
        read: false,
      },
    ],
  },
  {
    id: 'conv-6',
    name: 'Robert Chen',
    type: 'driver',
    status: 'offline',
    lastMessage: 'Delivered successfully, POD uploaded',
    lastMessageTime: '3h ago',
    unreadCount: 0,
    truckNumber: 'T-1550',
    messages: [
      {
        id: 'msg-12',
        senderId: 'driver-4',
        senderName: 'Robert Chen',
        content: 'Delivered successfully, POD uploaded',
        type: 'text',
        timestamp: '7:30 AM',
        read: true,
      },
      {
        id: 'msg-13',
        senderId: 'driver-4',
        senderName: 'Robert Chen',
        content: 'Proof of delivery document',
        type: 'file',
        timestamp: '7:31 AM',
        read: true,
        attachment: {
          name: 'POD-LD3890.pdf',
          size: '1.2 MB',
          type: 'pdf',
        },
      },
    ],
  },
];

const getStatusConfig = (status: DriverStatus) => {
  switch (status) {
    case 'online':
      return { color: 'bg-green-500', label: 'Online' };
    case 'driving':
      return { color: 'bg-blue-500', label: 'Driving' };
    case 'on-break':
      return { color: 'bg-yellow-500', label: 'On Break' };
    case 'offline':
      return { color: 'bg-gray-400', label: 'Offline' };
    default:
      return { color: 'bg-gray-400', label: 'Unknown' };
  }
};

export function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState('conv-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const selectedConversation = mockConversations.find(c => c.id === selectedConversationId) || mockConversations[0];

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.loadId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const getConversationIcon = (type: ConversationType) => {
    switch (type) {
      case 'driver':
        return User;
      case 'team':
        return Users;
      case 'load':
        return Package;
      default:
        return User;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Left Sidebar - Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-3">Messages</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => {
            const ConversationIcon = getConversationIcon(conversation.type);
            const statusConfig = conversation.status ? getStatusConfig(conversation.status) : null;

            return (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversationId(conversation.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                  selectedConversationId === conversation.id ? 'bg-blue-50' : ''
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    conversation.type === 'driver' ? 'bg-blue-100' :
                    conversation.type === 'team' ? 'bg-purple-100' :
                    'bg-green-100'
                  }`}>
                    <ConversationIcon className={`w-6 h-6 ${
                      conversation.type === 'driver' ? 'text-blue-600' :
                      conversation.type === 'team' ? 'text-purple-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  {statusConfig && (
                    <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 ${statusConfig.color} rounded-full border-2 border-white`}></div>
                  )}
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 truncate">{conversation.name}</span>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {conversation.lastMessageTime}
                    </span>
                  </div>
                  
                  {conversation.truckNumber && (
                    <div className="text-xs text-gray-500 mb-1">
                      {conversation.truckNumber} • {conversation.loadId}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate pr-2">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedConversation.type === 'driver' ? 'bg-blue-100' :
                  selectedConversation.type === 'team' ? 'bg-purple-100' :
                  'bg-green-100'
                }`}>
                  {selectedConversation.type === 'driver' ? (
                    <User className="w-5 h-5 text-blue-600" />
                  ) : selectedConversation.type === 'team' ? (
                    <Users className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Package className="w-5 h-5 text-green-600" />
                  )}
                </div>
                {selectedConversation.status && (
                  <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusConfig(selectedConversation.status).color} rounded-full border-2 border-white`}></div>
                )}
              </div>

              {/* Info */}
              <div>
                <h2 className="font-medium text-gray-900">{selectedConversation.name}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {selectedConversation.status && (
                    <span className="flex items-center gap-1">
                      <Circle className={`w-2 h-2 ${getStatusConfig(selectedConversation.status).color}`} />
                      {getStatusConfig(selectedConversation.status).label}
                    </span>
                  )}
                  {selectedConversation.truckNumber && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        {selectedConversation.truckNumber}
                      </span>
                    </>
                  )}
                  {selectedConversation.currentLocation && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedConversation.currentLocation}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {selectedConversation.messages.map((message, index) => {
            const isOwn = message.senderId === 'dispatcher';
            const showAvatar = index === 0 || selectedConversation.messages[index - 1].senderId !== message.senderId;

            return (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                {showAvatar && !isOwn ? (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 flex-shrink-0"></div>
                )}

                {/* Message Bubble */}
                <div className={`max-w-md ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                  {showAvatar && !isOwn && (
                    <span className="text-xs text-gray-600 mb-1 px-3">{message.senderName}</span>
                  )}
                  
                  {message.type === 'system' ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                      <AlertCircle className="w-4 h-4" />
                      <span>{message.content}</span>
                    </div>
                  ) : message.type === 'image' && message.attachment ? (
                    <div className={`rounded-lg overflow-hidden ${isOwn ? 'bg-blue-600' : 'bg-white border border-gray-200'}`}>
                      <img
                        src={message.attachment.url}
                        alt={message.attachment.name}
                        className="max-w-sm rounded-t-lg"
                      />
                      <div className={`p-3 ${isOwn ? 'text-white' : 'text-gray-900'}`}>
                        <div className="text-sm">{message.content}</div>
                        <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                          <span>{message.timestamp}</span>
                          {isOwn && (
                            <CheckCheck className={`w-4 h-4 ${message.read ? 'text-blue-200' : 'text-white'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : message.type === 'file' && message.attachment ? (
                    <div className={`p-4 rounded-lg ${isOwn ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'} min-w-[280px]`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isOwn ? 'bg-blue-500' : 'bg-gray-100'
                        }`}>
                          <File className={`w-5 h-5 ${isOwn ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{message.attachment.name}</div>
                          <div className={`text-xs ${isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
                            {message.attachment.size}
                          </div>
                        </div>
                        <button className={`p-1.5 rounded hover:bg-opacity-80 ${isOwn ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}>
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm mb-2">{message.content}</div>
                      <div className="flex items-center justify-between text-xs opacity-75">
                        <span>{message.timestamp}</span>
                        {isOwn && (
                          <CheckCheck className={`w-4 h-4 ${message.read ? 'text-blue-200' : 'text-white'}`} />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={`px-4 py-2 rounded-lg ${
                      isOwn ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className={`text-xs ${isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </span>
                        {isOwn && (
                          <CheckCheck className={`w-4 h-4 ${message.read ? 'text-blue-200' : 'text-white'}`} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          {/* Attachment Menu */}
          {showAttachmentMenu && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-3 gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>Image</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  <File className="w-4 h-4 text-green-600" />
                  <span>Document</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  <Navigation className="w-4 h-4 text-purple-600" />
                  <span>Location</span>
                </button>
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="flex items-end gap-2">
            <button
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className={`p-2.5 rounded-lg transition-colors flex-shrink-0 ${
                showAttachmentMenu ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {showAttachmentMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Paperclip className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                rows={1}
                className="w-full bg-transparent resize-none focus:outline-none text-gray-900 placeholder-gray-500"
              />
            </div>

            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 flex-shrink-0">
              <Smile className="w-5 h-5" />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className={`p-2.5 rounded-lg transition-colors flex-shrink-0 ${
                messageInput.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-500 px-2">
            Press Enter to send, Shift + Enter for new line
          </div>
        </div>
      </div>

      {/* Right Sidebar - Load/Trip Details (when applicable) */}
      {selectedConversation.loadId && (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h3 className="font-medium text-gray-900 mb-4">Load Details</h3>
            
            <div className="space-y-4">
              {/* Load Info */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Load ID</span>
                </div>
                <div className="text-lg font-semibold text-blue-600 mb-2">
                  {selectedConversation.loadId}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>{selectedConversation.truckNumber}</span>
                </div>
              </div>

              {/* Route */}
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Route</div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-600">Pickup</div>
                      <div className="text-sm font-medium text-gray-900">Los Angeles, CA</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-xs text-gray-600">Delivery</div>
                      <div className="text-sm font-medium text-gray-900">Chicago, IL</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Status</div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">In Transit</span>
                  </div>
                  <div className="text-xs text-yellow-700 mt-1">
                    Currently in {selectedConversation.currentLocation}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Quick Actions</div>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" />
                    View on Map
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Package className="w-4 h-4" />
                    Load Details
                  </button>
                </div>
              </div>

              {/* Files Shared */}
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Files Shared</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-900 truncate">load-secured.jpg</div>
                      <div className="text-xs text-gray-500">2.4 MB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
