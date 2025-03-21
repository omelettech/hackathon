import React, {useState} from "react";
import {Client, Storage} from "appwrite";
import {addDoc, collection} from 'firebase/firestore'
import {db} from "../firebase/firebaseInit.tsx";
import {useLocation} from "react-router-dom";
import {sendImageToModel} from "../utils/ImageHandling.ts";
import FloatingButton from "../components/FloatingButton.tsx";

const client = new Client().setProject("67b9e650002a4536f7db");
const storage = new Storage(client);
const BUCKET_ID = '67b9ec75001b90f35dbe';

const Upload = () => {
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [message, setMessage] = useState("");

    const onFileSelected = async (file: File) => {
        try {
            const response = await storage.createFile(BUCKET_ID, file.name + "__" + Date.now(), file);
            const url = storage.getFilePreview(BUCKET_ID, response.$id)

            console.log("Sending to model");
            setUploading(true);
            const data = await sendImageToModel(url)

            const confirmed = confirm(`Estimated expiration date: ${data.expiration_day}, Price: ${data.price}`);

            if (!confirmed) return;

            const docRef = await addDoc(collection(db, "Posts"),
                {
                    expirationDate: data.expiration_day,
                    imgUrl: url,
                    price: data.price,
                    quality: data.quality_name
                });

        } catch (e) {
            console.error(e)
        } finally {
            setUploading(false);
            setUploaded(true);
        }
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

                </>}
            {message && <p>{message}</p>}

        </div>
    );
};

export default Upload;