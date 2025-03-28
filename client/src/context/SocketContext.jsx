import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_SOCKET_BASE_URL || "https://godrive-h55q.onrender.com", {
    transports: ["websocket"], // 🔥 Critical for Render deployment
  });

const SocketProvider = ({ children }) => {
    useEffect(() => {

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);
    

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
