import React, { useState, useRef } from 'react';
import { URL, customStyles } from "../constants";
import Modal from "react-modal";

export default function UploadPortfolio({ accessToken, isOpen, onClose }) {
    
    const [portName, setPortName] = useState("Type portfolio name here");
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const onFileChange = (e) => {
        if(e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const onUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                await fetch(`${URL}/portfolios/upload`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        PortName: portName
                    }
                });
                onClose();
            } catch (error) {
                alert('Fetch Error: ' + error.message);
            }
        } else {
            alert('Please select a file before uploading.');
        }
    };

    const onButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div>
                <div className="p-4">
                    <label htmlFor="portfolioName" className="block font-semibold text-zinc-900 sm:text-sm md:text-md lg:text-xl">Portfolio Name: </label>
                    <input
                        type="text"
                        id="portfolioName"
                        name="portfolioName"
                        value={portName}
                        onChange={(e) => setPortName(e.target.value)}
                        className="mt-1 p-2 w-86/100 w-full block border border-zinc-300 rounded-md bg-white focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm md:text-md lg:text-base"
                    />
                </div>
                <br />
                <button onClick={onButtonClick} className="w-5/10 bg-zinc-50 ml-5 py-1.2 px-2 rounded-sm text-zinc-800 hover:bg-zinc-200 border border-zinc-800 sm:text-sm md:text-md lg:text-base">
                    Select File
                </button>

                {selectedFile && (
                    <span className='ml-5 text-sm'>
                        {selectedFile.name}
                    </span>
                )}

                {Array(2).fill(<br />)}
                <button onClick={onUpload} className="ml-5 py-1.5 px-4 w-7/10 bg-zinc-600 rounded-sm text-white hover:text-zinc-50 hover:bg-zinc-600">
                    Upload Portfolio
                </button>

                <input
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    type="file"
                    onChange={onFileChange}
                />
                
            </div>
        </Modal>
    );
    
}