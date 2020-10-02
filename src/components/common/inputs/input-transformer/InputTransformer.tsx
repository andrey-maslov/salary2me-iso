import React, {useState} from "react"
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import style from './input-t.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'

interface IForm {
    value: string
}

interface IInputTransformer {
    initValue: string
    rules: object
    handler: (value: string) => void
}

const InputTransformer: React.FC<IInputTransformer> = ({initValue, rules, handler, ...props}) => {

    const [isEdit, setEdit] = useState(false)
    // const dispatch = useDispatch()
    const {register, handleSubmit, errors, reset} = useForm<IForm>({
        defaultValues: {
            value: initValue
        }
    })

    return (
        <div className={style.wrapper}>
            {isEdit ?
                <OutsideClickHandler
                    onOutsideClick={() => setEdit(!isEdit)}
                >
                    <form onSubmit={handleSubmit(submit)}>
                        <div className={`form-group ${errors.value ? 'has-error' : ''} ${style.group}`}>
                            <input
                                name="value"
                                className={style.input}
                                // onFocus={(e: any) => e.target.select()}
                                ref={register(rules)}
                                {...props}
                                // autoFocus={true}
                            />
                            {errors.value && errors.value.type === 'duplicatevalue' && (
                                <div className={`item-explain floating`}>error</div>
                            )}
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

    function submit(formData: IForm): void {

        // dispatch()
        handler(formData.value)
        setEdit(!isEdit)

        reset()
    }

}

export default InputTransformer