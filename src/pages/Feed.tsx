import {useEffect, useState} from "react";
import Loading from "../components/Loading.tsx";
import ItemCard, {Item} from "../components/ItemCard.tsx";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebaseInit.tsx";

export const getAllPosts = async (collectionName: string) => {
    try {
        const q = query(
            collection(db, collectionName),
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return data;
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
};

const Feed = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        getAllPosts("Posts")
            .then(setItems)
            .catch(console.error);
    }, []);

    return (
    <div className="feed-container">
        {items.length === 0
            ? <Loading />
            : items.map((item, i) => <ItemCard
                key={i}
                imgUrl={item.imgUrl}
                price={item.price}
                expirationDate={item.expirationDate}
                quality={item.quality} />)}
    </div>);
};

export default Feed;