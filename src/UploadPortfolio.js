import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_URL } from "./constants";
import { io } from "socket.io-client";

export default function UploadPortfolio({portfolio_id}) {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        const socket = io(`${API_URL}`, { autoConnect: false });

        socket.on('connect', () => {
            console.log('Connected to server');
        });
    
        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });
    
        socket.on('disconnect', (reason) => {
            console.log('Disconnected from server, reason:', reason);
        });
        
        socket.on('progress', (data) => {
            setProgress(data.percent);
            setMessage(data.message);
        
            if(data.isCompleted) {
                setTimeout(() => {
                    setProgress(0);
                    setMessage('');
                }, 5000);
            }
        })

        socket.connect();

        return () => {
            console.log('Socket disconnecting...');
            socket.disconnect();
        };
    }, []);

    const onFileChange = (e) => {
        if(e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    const onUpload = async (fileToUpload) => {
        const formData = new FormData();
        formData.append('file', fileToUpload);
        
        try {
            await axios.post(`${API_URL}/${portfolio_id}/upload`, formData);
        } catch (error) {
            alert('Upload Failed');
        }
    };

    const onButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            {progress > 0 && (
                <>
                    {Array(1).fill().map((_, i) => <span key={i}>&nbsp;</span>)}
                    <span>{message}</span>
                    {Array(2).fill().map((_, i) => <span key={i}>&nbsp;</span>)}
                    <progress value={progress} max="100"></progress>
                    {Array(3).fill().map((_, i) => <span key={i}>&nbsp;</span>)}
                </>
            )}
            <button onClick={onButtonClick}>
                Upload Portfolio
            </button>
            <input
                style={{ display: "none" }}
                ref={fileInputRef}
                type="file"
                onChange={onFileChange}
            />
        </div>
    );
}
