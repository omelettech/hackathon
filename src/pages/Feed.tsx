import {Client, Storage, Models} from 'appwrite'
import {useEffect, useState} from "react";
import Loading from "../components/Loading.tsx";
import ItemCard from "../components/ItemCard.tsx";

const client = new Client().setProject("67b9e650002a4536f7db");// Your project ID;

const storage = new Storage(client);
const BUCKET_ID = '67b9ec75001b90f35dbe';

const Feed = () => {
    const [items, setItems] = useState<Models.File[]>([]);
    // const [loading, setLoading] = useState(false);
    // const [hasMore, setHasMore] = useState(true); // Track if there are more items to load

    // const downloadImage = (id: string) => {
    //     console.log("image asds", storage.getFilePreview(BUCKET_ID, id))
    //     return storage.getFilePreview(BUCKET_ID, id)
    //
    // }
    // const generateItems = (count) => {
    //     var pic = getPicId();
    //     return Array.from({length: count}, (_, i) => ({
    //         id: i + 1,
    //         title: `Card ${i + 1}`,
    //         content: `This is the content of card ${i + 1},  It can be any text or even other components.`,
    //         imageUrl: pic[i], // Random image URL
    //     }));
    // };

    useEffect(() => {
        storage
            .listFiles(BUCKET_ID)
            .then(fileList => setItems(fileList.files));
    }, []);

    // const loadMoreItems = async () => {
    //     if (loading || !hasMore) return; // Don't load if already loading or no more items
    //
    //     setLoading(true);
    //
    //     // Simulate API call delay
    //     setTimeout(() => {
    //         const newItems = generateItems(10); // Load 10 more items
    //         setItems([...items, ...newItems]);
    //         setLoading(false);
    //
    //         if (newItems.length < 10) { // Check if the API returned fewer items than requested
    //             setHasMore(false); // No more items to load
    //         }
    //     }, 1000); // Simulate 1-second delay
    // };


    // useEffect(() => {
    //     getPicId().then(setItems)
    //
    //     const handleScroll = () => {
    //         if (
    //             window.innerHeight + document.documentElement.scrollTop >=
    //             document.scrollingElement.scrollHeight - 100 // Trigger load a bit before reaching the bottom
    //         ) {
    //             loadMoreItems();
    //         }
    //     };
    //
    //     // window.addEventListener('scroll', handleScroll);
    //     // return () => window.removeEventListener('scroll', handleScroll); // Clean up event listener
    // }, []); // Empty dependency array ensures this runs only once on mount and unmount

    return (
    <div className="feed-container">
        {items.length === 0
            ? <Loading />
            : items.map((item) => <ItemCard key={item.$id} item={item}/>
        )}
        {/*{items.map((item) => (*/}

        {/*    <div key={item.$id} className="card">*/}
        {/*        /!*{item.imageUrl && <img src={item.imageUrl} alt={item.title} className="card-image" />}*!/;*/}
        {/*        <img src={downloadImage(item.$id)} height={100} width={100} alt={item.title}*/}
        {/*             className="card-image"/>*/}
        {/*        <div className="card-content">*/}
        {/*            <h3 className="card-title">{item.title}</h3>*/}
        {/*            <p className="card-text">{item.content}</p>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*))}*/}

        {/*{loading && <div className="loading">Loading...</div>}*/}
        {/*{!hasMore && <div className="no-more">No more items to load.</div>}*/}
    </div>);
};

export default Feed;