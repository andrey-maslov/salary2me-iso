import React from "react"
import style from './famous.module.scss'

interface IFamous {
    person: string | null
    desc: string | null
}

export default function Famous({person, desc}: IFamous) {

    return (
        <div className={style.wrapper}>
            <img
                className={style.img}
                src={'/img/leto.jpg'}
                srcSet={'/img/leto@2x.jpg 2x'}
                alt={person || 'famous person'}
            />
            <div className={style.person}>{person}</div>
            <div className={style.desc}>
                {desc}
            </div>
        </div>
    )
}