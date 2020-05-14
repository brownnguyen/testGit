import React, { useEffect } from 'react';
import Header from './Layout/Header/Header.js';
import Home from './Pages/Home.js';
import Footer from './Layout/Footer/Footer.js';
import Course from './Pages/Course.js'
import { BrowserRouter, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import { createAction } from './Action/createAction.js';
import { STATE, CART, DETAIL } from './Action/Type.js';
import { useDispatch } from 'react-redux';
import About from './Pages/About.js';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart.js';
import CourseDetailPage from './Pages/CourseDetailPage/CourseDetailPage.js';
import Login from './Layout/Login/Login.js';
import SignUp from './Layout/SignUp/SignUp.js';

export default function App() {
  const dispatch = useDispatch();
  const getCart = () => {
    const cartStr = localStorage.getItem('cart');
    if (cartStr) {
      dispatch(createAction(CART, JSON.parse(cartStr)))
    }
  }
  const getState = () => {
    const stateStr = localStorage.getItem('state');

    if (stateStr) {
      dispatch(createAction(STATE, JSON.parse(stateStr)));

    }
  }
  const getCourseDetail = () => {
    const detailStr = localStorage.getItem('detail');
    if (detailStr) {
      dispatch(createAction(DETAIL, JSON.parse(detailStr)));
    }
  }
  useEffect(() => getState());
  useEffect(() => getCart());
  useEffect(() => getCourseDetail());
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route path="/course/:courseId" exact component={Course} />
        <ScrollToTop>
          <Route path="/" exact component={Home} />
        </ScrollToTop>
        <Route path="/about" exact component={About} />
        <Route path="/shoppingCart" exact component={ShoppingCart} />
        <Route path="/detailPage/:detailId" exact component={CourseDetailPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Footer />
      </BrowserRouter>
    </div>
  )
}
