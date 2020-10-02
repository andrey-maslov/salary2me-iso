import {useState} from 'react'
import style from "./password.module.scss"
import ShowPwd from "./show-pwd/ShowPwd"

export default function Password({...props}) {

    const [isVisible, setVisible] = useState(false)

    return (
        <label>
            {props.label && <span>{props.label}</span>}
            <div className={style.focusable}>
                <input
                    className={style.input}
                    type={isVisible ? "text" : "password"}
                    name={props.name}
                    onFocus={props.clearApiError}
                    ref={props.innerRef}
                />
                <div className={style.show}>
                    <ShowPwd handle={() => setVisible(!isVisible)}/>
                </div>
            </div>
        </label>
    )
}