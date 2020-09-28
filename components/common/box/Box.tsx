import React from 'react'
import style from './box.module.scss'

const Box: React.FC<any> = ({...props}) => {

    let addClassNames = props.className ? props.className : ''

    return (
        <div {...props} className={`${style.wrapper} ${addClassNames}`}>
            {props.children}
        </div>
    )
}

export default Box