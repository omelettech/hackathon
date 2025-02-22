import React, { useState, useEffect } from 'react';
// import './Feed.css'; // Import your CSS file

const Feed = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Track if there are more items to load

    const generateItems = (count) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            title: `Card ${i + 1}`,
            content: `This is the content of card ${i + 1}.  It can be any text or even other components.`,
            imageUrl: `https://source.unsplash.com/random/300x200/?${i}`, // Random image URL
        }));
    };

    const loadMoreItems = async () => {
        if (loading || !hasMore) return; // Don't load if already loading or no more items

        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const newItems = generateItems(10); // Load 10 more items
            setItems([...items, ...newItems]);
            setLoading(false);

            if (newItems.length < 10) { // Check if the API returned fewer items than requested
                setHasMore(false); // No more items to load
            }
        }, 1000); // Simulate 1-second delay
    };


    useEffect(() => {
        loadMoreItems(); // Load initial items when the component mounts

        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.scrollingElement.scrollHeight - 100 // Trigger load a bit before reaching the bottom
            ) {
                loadMoreItems();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Clean up event listener
    }, []); // Empty dependency array ensures this runs only once on mount and unmount


    return (

        <div className="feed-container">
            {items.map((item) => (

                <div key={item.id} className="card">
                    {/*{item.imageUrl && <img src={item.imageUrl} alt={item.title} className="card-image" />}*/}
                     <img src="src/assets/Img/Wab.png" height={100} width={100} alt={item.title} className="card-image" />
                    <div className="card-content">
                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-text">{item.content}</p>
                    </div>
                </div>
            ))}
            {loading && <div className="loading">Loading...</div>}
            {!hasMore && <div className="no-more">No more items to load.</div>}
        </div>
    );


};

export default Feed;