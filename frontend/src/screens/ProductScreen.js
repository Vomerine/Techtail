import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useEffect, useState } from 'react';
import { detailsProduct } from '../actions/productAction';
import { addToCart } from '../actions/cartActions';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    const [qty, setQty] = useState(1);
    
    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch, productId])

    const addToCartHandler = () => {
        dispatch(addToCart(productId, qty));
        props.history.push(`/cart/`);
    };
    
    return (
        <div className = "ProductScreen">
            {loading ? (<LoadingBox></LoadingBox>) // Show loading
            :error? (<MessageBox variant = "error">{error}</MessageBox>) // Show error message
            : (<div>
                <div className = "back">
                <Link to = "/" className = "back">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    Back to homepage
                </Link>
                </div>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name}></img>
                    </div>

                    <div className="col-2">
                        <div className = "name">{product.name}</div>
                        <div className = "content">
                            <ul>
                                <li><Rating rating={product.rating} numReview={product.numReviews}></Rating></li>
                                <li>Brand: {product.brand}</li>
                                <li>Price: ${product.price}</li>
                                <li>Description:<p>{product.description}</p></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-1">
                        <div className = "card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div> Price</div>
                                        <div className = "price">${product.price}</div>
                                    </div>
                                </li>

                                <li>
                                    <div className= "row">
                                        <div>Status:</div>
                                        <div>
                                            {product.countInStock > 0 ? (<span className = "success"> In Stock</span>):
                                            (<span className = "error"> Unavailable</span>)}
                                        </div>
                                    </div>
                                </li>

                                {
                                    product.countInStock > 0 &&(
                                        <>
                                    <li>
                                        <div className="row">
                                        <div>Qty</div>
                                        <div>
                                            <select
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            >
                                            {[...Array(product.countInStock).keys()].map(
                                                (x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                                )
                                            )}
                                            </select>
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button
                                        onClick={addToCartHandler}
                                        className="primary block"
                                        >
                                        Add to Cart
                                        </button>
                                    </li>
                                    </>
                                    
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div> )} 
        </div>  
    )
}