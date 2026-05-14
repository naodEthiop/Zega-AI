import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Send, Search } from 'lucide-react';
import { apiClient } from '../../api/client';

const Messages: React.FC = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('user_id') || 'current_user';
        const data = await apiClient.getConversations(userId);
        setConversations(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    try {
      await apiClient.sendMessage({
        sender_id: localStorage.getItem('user_id') || 'current_user',
        receiver_id: selectedConversation,
        content: messageText,
      });
      setMessageText('');
      // Refresh messages
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Messages</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card>
          <CardHeader title="Conversations" />
          <CardContent>
            <div className="mb-4">
              <Input placeholder="Search conversations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="space-y-2">
              {conversations.length === 0 ? (
                <p className="text-gray-400 text-sm">No conversations</p>
              ) : (
                conversations.map((conv: any, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedConversation(conv.participant_id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conv.participant_id
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-medium text-sm">{conv.participant_name}</div>
                    <div className="text-xs opacity-75">{conv.last_message?.slice(0, 30)}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Messages View */}
        <div className="md:col-span-2">
          {selectedConversation ? (
            <Card>
              <CardHeader title="Conversation" />
              <CardContent>
                <div className="flex flex-col h-96">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                    {messages.length === 0 && <p className="text-gray-400 text-sm">No messages</p>}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Type a message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                    <Button variant="primary" onClick={handleSendMessage} size="sm">
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <div className="text-center py-12 text-gray-400">Select a conversation to start messaging</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
