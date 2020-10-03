import React, {useState} from "react"
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import style from './input-t.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'
import {IOneFieldForm} from "../../../../typings/types";

interface IInputTransformer {
    initValue: string
    rules: object
    objectKey: string
    handler: (value: IOneFieldForm<string>) => void
}

const InputTransformer: React.FC<IInputTransformer> = ({initValue, rules, objectKey, handler, ...props}) => {

    const [isEdit, setEdit] = useState(false)
    // const dispatch = useDispatch()
    console.log(initValue)
    const {register, handleSubmit, errors, reset} = useForm<IOneFieldForm<string>>()

    return (
        <div className={style.wrapper}>
            {isEdit ?
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setEdit(!isEdit)

                    }}
                >
                    <form onSubmit={handleSubmit(submit)}>
                        <div className={`form-group ${errors.objectKey ? 'has-error' : ''} ${style.group}`}>
                            <input
                                defaultValue={initValue}
                                name={objectKey}
                                className={style.input}
                                onFocus={(e: any) => e.target.select()}
                                autoFocus={true}
                                ref={register(rules)}
                                {...props}
                            />
                            {errors.objectKey && <div className={`item-explain`}>{errors.objectKey.message}</div>}
                        </div>
                    </form>
                </OutsideClickHandler>
                :
                <button
                    className={style.title}
                    onClick={() => setEdit(!isEdit)}
                >
                    {initValue}
                </button>}
        </div>
    )

    function submit(formData: IOneFieldForm<string>): void {
        handler(formData)
        setEdit(!isEdit)
        reset()
    }
}

export default InputTransformer