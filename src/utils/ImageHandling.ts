import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebaseInit.tsx";

export const sendImageToModel = async (image_url:string)=>{
    const resp = await fetch('https://apple-7ygq.onrender.com/check-apples/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'no-cors'
        },
        body: JSON.stringify({
            image_path:image_url
        }),
    })
    console.log("await",await resp.json())
    return await resp.json();
}

export const getAllPosts = async (collectionName: string, currentUserEmail: string) => {
    try {
        const q = query(
            collection(db, collectionName),
            where("uploaded_by", "!=", currentUserEmail) // Exclude current user
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(data)
        return data;

    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
};
const addData = async (qul_list: string[], qunt:number, img_url: string,currentUser:string,productName:string) =>{
    // console.log( user.currentUser?.email)
    try {
        const docRef = await addDoc(collection(db, "Posts"),{
            img_url: img_url,
            qul_list: qul_list,
            qunt: qunt,
            productName: productName,
            uploaded_by: currentUser
        });
    }catch (error){
        console.error("Error adding document: ", error);
    }
}