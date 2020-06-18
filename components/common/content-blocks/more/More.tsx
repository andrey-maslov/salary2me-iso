import React from 'react';
import hrImg from '../../../../assets/img/busy.png';
import style from './more.module.scss';
import Button from "../../buttons/button/Button";
import {Media} from "../../../../media";

const moreContent = {
    title: 'Are you HR?',
    description: 'If you are HR specialist in IT command, you can help us and help yourself',
    btnTitle: 'press here',
};


const More = () => {

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
            <Media greaterThanOrEqual="md">
                <img className={`${style.img} img-fluid`} src={hrImg} alt=""/>
            </Media>
        </div>
    )

};

export default More;