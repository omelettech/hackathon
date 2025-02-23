export interface Item {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
}

export default function ItemCard({id, title, content, imageUrl}: Item) {
    const downloadImage = (id: string) => {
        return id:
    };

    return (
        <div className="card" key={id}>
            <img src={imageUrl} alt={title} className="card-image"/>
            <img src={downloadImage(item.$id)} height={100} width={100} alt={item.title}
                 className="card-image"/>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{content}</p>
            </div>
        </div>
    );
}