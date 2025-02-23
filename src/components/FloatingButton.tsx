import React, {useEffect, useState} from "react";
import { Client, Storage } from "appwrite";
import {c} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";
import "./FloatingButton.css"
import {sendImageToModel} from "../utils/ImageHandling.ts";
import {useNavigate} from "react-router-dom";

const client = new Client().setProject("67b9e650002a4536f7db");
const storage = new Storage(client);
const BUCKET_ID = '67b9ec75001b90f35dbe';


const FloatingButton = ({setFile}:any) => {
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate()
    const handleUpload = async (file:any) => {
        console.log("Sending")
        if (!file) return;
        setUploading(true);
        try {
            const response = await storage.createFile(BUCKET_ID, file.name, file);
            console.log("uploaded",response)
            //TODO: Go to Upload.tsx, with the file object
            //@ts-ignore
            navigate("/upload",{params: response.$id})
            // const model_response = await sendImageToModel(response.$id);
        } catch (error) {
            console.error(error)
        } finally {
            setUploading(false);
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target?.files[0] === null || event.target?.files[0] === undefined){
        }
        if (event.target.files && event.target.files.length > 0) {
            // setFile(event.target?.files[0]);
            // @ts-ignore
            // navigate("/upload",{e: event.target?.files[0]})
            setFile(event.target?.files[0])
        }
    };


    return (

    <div className="floating-button">
        {/* Hidden File Input */}
        <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={handleFileChange}
            className="file-input"
        />

        {/* Camera Icon */}
        <label htmlFor="icon-button-file" className="camera-icon">
            <i className="fas fa-camera"></i>
        </label>
    </div>

    );
};

export default FloatingButton;