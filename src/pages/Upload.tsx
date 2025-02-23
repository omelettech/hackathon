import React, {useEffect, useState} from "react";
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

    const [file,setFile]=useState(null)
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [productName, setproductName] = useState<string>("")
    const { e } = location.state || {}; // Handle undefined case


    const addImageToAppwrite = async () =>{
        console.log("Adding to appwrite",file)
        const response = await storage.createFile(BUCKET_ID, file.name, file);
        // console.log(response)
        const imgUrl = storage.getFilePreview(BUCKET_ID,response.$id)
        return imgUrl
    }

    useEffect(() => {


        if (file){
            (async function() {

                const url=await addImageToAppwrite();
                console.log("Sending to model")
                const data = await sendImageToModel(url)
                console.log("data",data.quality_name,data)

                const docRef = await addDoc(collection(db, "Posts"),
                    {
                        expiration_date: data.expiration_day,
                        img_url: url,
                        price:data.price,
                        productName:productName || "New product",
                        quality:data.quality_name
                    }
                    );
                console.log("Added firestore doc",docRef)

            })();

        }

    }, [file]);

    const user = getAuth();


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target?.files[0] === null || event.target?.files[0] === undefined){
            setMessage("Something went wrong")
        }
        if (event.target.files && event.target.files.length > 0) {
            // setFile(event.target?.files[0]);

        } else {
            setMessage("No file selected");
        }
    };

    const handleUpload = async () => {
        // if (!file) return;

        setUploading(true);
        setMessage("");

        try {
            const response = await sendImageToModel(e)
            // const qualityList = response.quality
            //TODO: add data to firestore

            // {addData([], 3, params)}
            console.log("imagemodel response",response)

        } catch (error) {
            setMessage("Failed to upload file.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <FloatingButton setFile={setFile}/>

            <h2>Upload File</h2>
            <p>{e}</p>
            {/*<input type="file" onChange={handleFileChange} />*/}
            <button onClick={handleUpload} disabled={uploading || !message}>
                {uploading ? `Uploading` : "Upload"}
            </button>
            <input type="text" onChange={(event)=>setproductName(event.target.value)} />

            {message && <p>{message}</p>}
        </div>
    );
};

export default Upload;