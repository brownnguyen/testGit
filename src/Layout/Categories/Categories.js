import React from 'react'
import data from '../../JSON/database.json';
import './Categories.scss';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAction } from '../../Action/createAction';
import { KIND } from '../../Action/Type';

export default function Categories() {
    const dispatch = useDispatch();
    const getKind = (id) => {
        dispatch(createAction(KIND,id))
    }
    const renderCategories = () => {
        return data.categories.map((item, index) => {
            return (
                <Link to={`/course/${item.id}`} href="google.com" onClick={()=> getKind(item.id)} id={item.id}
                 className="col-lg-3 col-md-4 col-sm-6 categories__content" key={index}>
                    <div className="card">
                        <div className="card__img">
                        <img className="card-img-top" src={item.image} width={270} height={312} alt={item.title} />
                        <div className="card__categories"></div>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{item.title}</h4>
                        </div>
                    </div>
                </Link>
            )
        }).slice(1,9)
    }
    return (
        <div className="container categories">
        <h3>Top categories</h3>
        <div className="row">
            {renderCategories()}
        </div>
    </div>
    )
}
