import React from 'react';
import PropTypes from "prop-types";

import style from './features-item.module.scss';
import Button from "../../../Buttons/MainButton/Button";


const FeaturesItem = ({ title, description, icon }) => {

    return (
        <li className={style.item}>
            <img className={style.img} src={icon} alt=""/>
            <h5 className={style.title}>{title}</h5>
            <div className={style.desc}>{description}</div>
        </li>
    )

};

Button.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
};

Button.defaultProps = {
    title: 'title',
    description: 'desc',
    icon: '',
};

export default FeaturesItem;