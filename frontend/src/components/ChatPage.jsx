import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
  const { onlineUsers, messages } = useSelector(store => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/message/send/${receiverId}`, { textMessage }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    }
  }, [dispatch]);

  return (
    <div className="ml-[260px] w-[calc(100%-260px)] flex h-screen bg-gray-50">
      
      {/* Left Sidebar - Users List */}
      <section className="w-[30%] border-r border-gray-300 overflow-y-auto">
        <h1 className="font-bold mb-4 p-4 text-xl">{user?.username}</h1>
        <hr className="mb-2 border-gray-300" />
        <div className="px-4">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser._id}
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex gap-3 items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Right Chat Section */}
      <section className="w-[70%] flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300 bg-white sticky top-0 z-10">
              <Avatar>
                <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{selectedUser?.username}</span>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4">
              <Messages selectedUser={selectedUser} />
            </div>

            {/* Message Input */}
            <div className="flex items-center p-4 border-t border-gray-300 bg-white">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="flex-1 mr-2 focus-visible:ring-transparent"
                placeholder="Type a message..."
              />
              <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
            <MessageCircleCode className="w-32 h-32 mb-6" />
            <h2 className="text-2xl font-bold">Your messages</h2>
            <p>Send a message to start a chat.</p>
          </div>
        )}
      </section>

    </div>
  );
};

export default ChatPage;
