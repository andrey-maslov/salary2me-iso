import React from "react";
import style from './content.module.scss';

type ContentType = {
    content: string
}

const Content: React.FC<ContentType> = ({content}) => {

    return (
        <div className={style.content}>
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-7">
                        <img className={`img-fluid ${style.image}`}
                             srcSet={"/img/macbook@2x.png 2x"}
                             src={"/img/macbook.png"} alt="results"
                        />
                    </div>
                    <div className="col-lg-5">
                        <div className={`fade-in`} dangerouslySetInnerHTML={{__html: content}}/>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Content;


