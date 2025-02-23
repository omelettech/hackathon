import React, {useCallback, useEffect, useState} from "react";
import { Client, Storage } from "appwrite";
import {c} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";
import {addDoc, collection} from 'firebase/firestore'
import {db} from "../firebase/firebaseInit.tsx";
import {getAuth} from "firebase/auth";
import {useLocation} from "react-router-dom";
import {sendImageToModel} from "../utils/ImageHandling.ts";
import FloatingButton from "../components/FloatingButton.tsx";

const client = new Client().setProject("67b9e650002a4536f7db");
const storage = new Storage(client);
const BUCKET_ID = '67b9ec75001b90f35dbe';

const Upload = () => {
    const location = useLocation();
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [message, setMessage] = useState("");
    const { e } = location.state || {}; // Handle undefined case

    const onFileSelected = async (file: File) => {
        const response = await storage.createFile(BUCKET_ID, file.name, file);
        const url = storage.getFilePreview(BUCKET_ID,response.$id)
        console.log("Sending to model");
        setUploading(true);
        const data = await sendImageToModel(url)
        console.log("data",data.quality_name,data)

        const confirmed = confirm(`Estimated expiration date: ${data.expiration_day}, Price: ${data.price}`);

        if (!confirmed) return;

        const docRef = await addDoc(collection(db, "Posts"),
        {
            expirationDate: data.expiration_day,
            imgUrl: url,
            price: data.price,
            quality: data.quality_name
        });
        console.log("Added firestore doc",docRef);

        setUploading(false);
        setUploaded(true);
    };

    return (
        <div className="upload-container">
            {uploaded
                ? <h2>Product added to the database. Thank you for your contribution!</h2>
                : <></>}

            {uploading
                ? <h2>Uploading...</h2>
                : <>
                    <FloatingButton onFileSelected={onFileSelected}/>

                    <h2>Upload File</h2>
                    <p>{e}</p>

                    {message && <p>{message}</p>}
                </>}
        </div>
    );
};

export default Upload;