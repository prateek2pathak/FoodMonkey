import React, { useState } from 'react';
import Cookies from "js-cookie";
import { io } from 'socket.io-client';
import { useEffect, useRef } from 'react';

function ChatWindow({ onClose }) {
    const [room, setRoom] = useState('general');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const previousRoomRef = useRef('general');
    const socket = io(`${process.env.REACT_APP_LINK}`);

    const rooms = ['general', 'street-food', 'quick-meals', 'midnight-cravings'];
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const prevRoom = previousRoomRef.current;

        // leaving old room
        socket.emit('leave_room', prevRoom);

        // clear previous listener
        socket.off('receive_message');

        // join new room
        socket.emit('join_room', room);
        previousRoomRef.current = room;

        fetch(`${process.env.REACT_APP_LINK}/api/messages?room=${room}`)
            .then(res => res.json())
            .then(data => setMessages(data.messages || []))
            .catch(err => console.error("Failed to load messages : ", err.message));

        // listen for new messages
        socket.on('receive_message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        // Cleanup when room changes again
        return () => {
            socket.off('receive_message');
        };
    }, [room]);



    const handleSend = () => {

        if (message.trim()) {

            const msgData = {
                room,
                username: localStorage.getItem("username"),
                message,
                time: new Date().toLocaleTimeString()
            }

            socket.emit('send_message', msgData);
            setMessage('');
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <div className="fixed bottom-24 right-5 w-80 h-[460px] bg-white rounded-xl shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="flex justify-between items-center bg-orange-500 text-black px-4 py-2 rounded-t-xl">
                <span className="font-semibold">🍽️ Food Chat</span>
                <button onClick={onClose} className="text-lg font-bold hover:text-gray-300">×</button>
            </div>

            {/* Room selector */}
            <div className="flex flex-wrap gap-2 p-3 bg-orange-300">
                {rooms.map((r) => (
                    <button
                        key={r}
                        onClick={() => setRoom(r)}
                        className={`px-3 py-1 text-sm rounded-full transition ${room === r ? 'bg-orange-500 text-black' : 'bg-gray-200 text-black'
                            }`}
                    >
                        #{r}
                    </button>
                ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className="bg-gray-200 rounded-lg px-3 py-2 text-sm text-black">
                        <strong>{msg.username}</strong>: {msg.message}
                        <div className="text-[10px] text-gray-500 text-right">{msg.time}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {
                Cookies.get("authToken") && <div className="flex items-center gap-2 px-3 py-2 border-t">
                    <input
                        type="text"
                        className="flex-1 p-2 border border-zinc-700 rounded-md text-sm focus:outline-none text-black bg-zinc-300"
                        placeholder={`Message #${room}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600"
                    >
                        Send
                    </button>
                </div>
            }

        </div>
    );
}

export default ChatWindow;
