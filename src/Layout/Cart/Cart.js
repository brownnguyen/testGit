import React from 'react'
import { useSelector } from 'react-redux';
import './Cart.scss';

export default function Cart() {
    const cart = useSelector(state=>state.CartReducer.cart);
    const renderCart = () => {
        return cart.map((item, index) => {
            return (
                <div className="row shopCart__details mx-auto pl-2" key={index}>
                    <div className="col-4 pz-3 p-0 img__shopCart">
                        <img src={item.image} alt={item.kind} />
                    </div>
                    <div className="col-8 px-3 p-0">
                        <h5>{item.courseName}</h5>
                        <p>{item.mentor}</p>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="shopCart">
            <div className="shopCart__content">
                {renderCart()}
            </div>
        </div>
    )
}
