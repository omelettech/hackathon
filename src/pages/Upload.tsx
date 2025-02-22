import React, { useState } from "react";
import { Client, Storage } from "appwrite";
import {c} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

const client = new Client().setProject("67b9e650002a4536f7db");
const storage = new Storage(client);
const BUCKET_ID = '67b9ec75001b90f35dbe';

const Upload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target?.files[0] === null || event.target?.files[0] === undefined){
            setMessage("Something went wrong")
        }
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target?.files[0]);
        } else {
            setMessage("No file selected");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setProgress(0);
        setMessage("");

        try {
            const response = await storage.createFile(BUCKET_ID, file.name, file);
            setMessage("File uploaded successfully!");
        } catch (error) {
            setMessage("Failed to upload file.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading || !file}>
                {uploading ? `Uploading ${progress}%` : "Upload"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Upload;