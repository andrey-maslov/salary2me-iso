import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { withTranslation } from '@i18n'
import Button from '../buttons/button/Button'
import style from './auth.module.scss'
import Password from '../inputs/password/Password'

export interface ISigninForm {
    username: string
    password: string
}

export interface ISignin<T> {
    isLoading: boolean
    errorApiMessage: string
    submitHandle: (data: T) => void
    clearApiError: () => void
    t?: any
}

const Signin: React.FC<ISignin<ISigninForm>> = ({
    isLoading,
    errorApiMessage,
    submitHandle,
    clearApiError,
    t
}) => {
    const { register, handleSubmit, errors } = useForm<ISigninForm>()

    return (
        <form onSubmit={handleSubmit(submitHandle)}>
            <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
                <label>
                    <span>Email</span>
                    <input
                        className={style.input}
                        name="username"
                        onFocus={clearApiError}
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
                    clearApiError={clearApiError}
                    name="password"
                />
                {errors.password && <div className="item-explain">{errors.password.message}</div>}
            </div>

            <div className={`form-group ${errorApiMessage ? 'has-error' : ''}`}>
                <Button
                    title={t('signin:sign_in')}
                    startIcon={isLoading && <AiOutlineLoading />}
                    handle={() => void 0}
                    btnClass="btn btn-accent btn-loader"
                />
                {errorApiMessage && <div className="item-explain">{errorApiMessage}</div>}
            </div>
        </form>
    )
}

export default withTranslation(['common', 'signin'])(Signin)
