export interface Item {
    price: number;
    expirationDate: string;
    quality: string;
    imgUrl: string;
}

export default function ItemCard({
    imgUrl,
    productName,
    price,
    expirationDate,
    quality}: Item) {

    return (
        <div className="card d-flex flex-column align-items-center">
            {imgUrl && <img src={imgUrl} alt={productName} className="card-image" width={100} />}
            <div className="card-content">
                <h3 className="card-title">{productName}</h3>
                <p className="card-text">Price: ${price}</p>
                <p className="card-text">Expiration Date: {expirationDate}</p>
                <p className="card-text">Quality: {quality}</p>
            </div>
        </div>
    );
}