import React from 'react';
import style from './test.module.scss';
import burnoutImg from '../../../../assets/img/burnout.png';
import {useMediaPredicate} from "react-media-hook";
import {useHistory} from 'react-router-dom';

import {BURNOUT_TEST_LINK} from "../../../../constants";

const Test = () => {

    const moreThan768 = useMediaPredicate("(min-width: 768px)");

    return (
        <div className={`${style.wrapper} bg-accent`}>
            <div className="container">
                <div className="row align-items-center">
                    {moreThan768 && <div className="col-md-4">
                        <img src={burnoutImg} alt="professional burnout"/>
                    </div>}
                    <div className="col-md-8">
                        <div className={style.title}>Пройди тест и узнай</div>
                        <div className={style.subtitle}>Есть ли у тебя <strong>эмоциональное выгорание</strong></div>
                        <a className={'btn-white btn btn-lg'} href={BURNOUT_TEST_LINK} target="_blank">Пройти тест</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Test;