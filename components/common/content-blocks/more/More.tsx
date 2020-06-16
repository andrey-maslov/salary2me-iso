import React from 'react';
import hrImg from '../../../../assets/img/busy.png';
import style from './more.module.scss';
import {useMediaPredicate} from "react-media-hook";
import Button from "../../buttons/button/Button";

const moreContent = {
    title: 'Are you HR?',
    description: 'If you are HR specialist in IT command, you can help us and help yourself',
    btnTitle: 'press here',
};


const More = () => {

    const biggerThan992 = useMediaPredicate("(min-width: 992px)");

    return (
        <div className={`${style.wrapper} align-items-center justify-content-between`}>
            <div className={style.content}>
                <h3>{moreContent.title}</h3>
                <div className={style.desc}
                     dangerouslySetInnerHTML={{__html: moreContent.description}}
                />
                <Button
                    handle={()=>{}}
                    btnClass={'btn-accent2 btn btn-lg'}
                    title={moreContent.btnTitle}
                />
            </div>
            {biggerThan992 && <img className={`${style.img} img-fluid`} src={hrImg} alt=""/>}
        </div>
    )

};

export default More;