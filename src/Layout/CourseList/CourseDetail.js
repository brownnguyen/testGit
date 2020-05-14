import React from 'react'
import './CourseDetail.scss';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_CART, COURSE__DETAIL } from '../../Action/Type';
import { createAction } from '../../Action/createAction';
import { Link } from 'react-router-dom';
import ModalCourse from '../ModalCourse/ModalCourse';
import { useState } from 'react';

export default function CourseDetail(props) {
    const cart = useSelector(state => state.CartReducer.cart);
    let { image, courseName, id, mentor, price } = props.course;
    const [isHovering, setIsHovering] = useState(false);
    const dispatch = useDispatch();
    const addCart = item => {
        const cartItem = { ...item, quantity: 1 }
        dispatch(createAction(ADD_CART, cartItem));
    }
    const addCourseDetail = item => {
        dispatch(createAction(COURSE__DETAIL, item));
        console.log(item)
    }
    const renderButton = () => {
        let item = cart.find(item => item.id === id);
        if (item) {
            return (
                <Link to="/shoppingCart" className="btn goToCart">Go to cart</Link>
            )
        } else {
            return (
                <button className="btn add__course" onClick={() => addCart(props.course)}>Add to cart</button>
            )
        }
    }
    return (
        <>
            <div onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}>
                <Link to={`/detailPage/${id}`} className="course__detail"
                    onClick={() => addCourseDetail(props.course)}>
                    <div className="card courseDetail">
                        <div className="card__img">
                            <img className="card-img-top image" src={image} alt={courseName} />
                            <div className="layer"></div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{courseName}</h5>
                            <p className="card-text">{mentor}</p>
                            <p className="price text-right">{price} $</p>
                        </div>
                    </div>
                </Link>
                {
                    isHovering &&
                    <div className="content__modal">
                        <ModalCourse course={props.course} />
                        {renderButton()}
                    </div>
                }
            </div>
        </>
    );
}
