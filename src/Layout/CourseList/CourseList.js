import React from 'react';
import './CourseList.scss';
import data from '../../JSON/course.json';
import database from '../../JSON/database.json';
import CourseDetail from './CourseDetail';
import { useDispatch, useSelector } from 'react-redux';
import { KIND, ACTIVE_PAGE } from '../../Action/Type.js';
import { createAction } from '../../Action/createAction.js';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

export default function CourseList() {
    const course = useSelector(state => state.CourseReducer.course);
    const totalItem = useSelector(state => state.CourseReducer.totalItem);
    const kind = useSelector(state => state.CourseReducer.kind);
    const activePage = useSelector(state => state.CourseReducer.activePage);

    const dispatch = useDispatch();
    const getKind = (e) => {
        dispatch(createAction(KIND, e))
    }
    const renderCategories = () => {
        let start = (activePage - 1) * 20;
        let end = (activePage - 1) * 20 + 20;
        if (kind === "all") {
            return data.course.map((item, index) => {
                return (
                    <div className="col-lg-3 col-md-4 col-sm-6 itemCourse" key={index}>
                        <CourseDetail course={item} />
                    </div>
                )
            }).slice(start, end);
        }
        else {
            let newarray = course.filter(item => item.kind === kind);
            return newarray.map((item, index) => {
                return (
                    <div className="col-lg-3 col-md-4 col-sm-6 itemCourse" key={index}>
                        <CourseDetail course={item} />
                    </div>
                )
            }).slice(start, end);
        }
    }
    const renderTitleCategoriesDiv = () => {
        return database.categories.map((item, index) => {
            return (
                <div className="medium__course" key={index}>
                    <Link className="mediumScreenCourse" id={item.id} to={`/course/${item.id}`} onClick={() => getKind(`${item.id}`)} key={index}>{item.title}</Link>
                </div>
            )
        })
    }
    const renderTitleCategories = () => {
        return database.categories.map((item, index) => {
            return (
                <Link className="course__categories" id={item.id} to={`/course/${item.id}`} onClick={() => getKind(`${item.id}`)} key={index}>{item.title}</Link>
            )
        })
    }
    const handlePageChange = (pageNumber) => {
        dispatch(createAction(ACTIVE_PAGE, pageNumber))
    }
    return (
        <div className="container-fluid courseList">
            <div className="top">
                <div className="layer"></div>
                <div className="content">
                    <h3>Cour<span>sea</span></h3>
                    <p>Academy</p>
                </div>
            </div>
            <div className="courseDetail">
                <div className="title">
                    <h2 className="title__categories">All categories</h2>
                </div>
                <div className="list__course">
                    <div className="course__categories__screen row">
                        {renderTitleCategories().slice(1, 9)}
                    </div>
                    <div className="row mediumCategories">
                        <div className="medium__content__categories ">
                            {renderTitleCategoriesDiv().slice(1, 9)}
                        </div>

                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {renderCategories()}
                    </div>
                </div>
            </div>
            <div className="pagination__course">
                <Pagination itemClass="page-item" linkClass="page-link"
                    activePage={activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={totalItem}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}
