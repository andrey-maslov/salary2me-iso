import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { withTranslation } from '@i18n'
import Button from '../buttons/button/Button'
import style from './auth.module.scss'
import Password from '../inputs/password/Password'

export interface ISigninForm {
    username: string
    password: string
    form?: unknown
}

export interface ISignin<T> {
    isLoading: boolean
    errorApiMessage: string
    submitHandle: (data: T, setError) => void
    t?: any
}

const Signin: React.FC<ISignin<ISigninForm>> = ({
    isLoading,
    errorApiMessage,
    submitHandle,
    t
}) => {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm<ISigninForm>()

    return (
        <form onSubmit={handleSubmit(data => submitHandle(data, setError))}>
            <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
                <label>
                    <span>Email</span>
                    <input
                        className={style.input}
                        name="username"
                        ref={register({
                            required: `${t('common:errors.required')}`,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: `${t('common:errors.invalid_email')}`
                            }
                        })}
                    />
                </label>
                {errors.username && <div className="item-explain">{errors.username.message}</div>}
            </div>
            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <Password
                    label={t('signin:pwd')}
                    innerRef={register({
                        required: `${t('common:errors.required')}`
                    })}
                    name="password"
                />
                {errors.password && <div className="item-explain">{errors.password.message}</div>}
            </div>

            <div className={`form-group ${errorApiMessage ? 'has-error' : ''}`}>
                <Button
                    title={t('signin:sign_in')}
                    startIcon={isLoading && <AiOutlineLoading />}
                    handle={() => clearErrors()}
                    btnClass="btn btn-accent btn-loader"
                />
                {errors.form && <div className="item-explain api-error">{errors.form.message}</div>}
            </div>
        </form>
    )
}

export default withTranslation(['common', 'signin'])(Signin)
