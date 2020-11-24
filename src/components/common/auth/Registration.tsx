import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { withTranslation } from '@i18n'
import Button from '../buttons/button/Button'
import style from './auth.module.scss'
import { ISignin } from './Signin'
import Password from '../inputs/password/Password'

export interface ISignUpForm {
    email: string
    password: string
    passwordConfirm: string
    form?: unknown
}

const Registration: React.FC<ISignin<ISignUpForm>> = ({
    isLoading,
    errorApiMessage,
    submitHandle,
    t
}) => {
    const { register, handleSubmit, getValues, errors, setError, clearErrors } = useForm<ISignUpForm>()

    return (
        <form onSubmit={handleSubmit(data => submitHandle(data, setError))}>
            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label>
                    <span>Email</span>
                    <input
                        className={style.input}
                        name="email"
                        ref={register({
                            required: `${t('common:errors.required')}`,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: `${t('common:errors.invalid_email')}`
                            }
                        })}
                    />
                </label>
                {errors.email && <div className="item-explain">{errors.email.message}</div>}
            </div>

            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <Password
                    label={t('signin:pwd')}
                    innerRef={register({
                        required: `${t('common:errors.required')}`,
                        minLength: { value: 7, message: `${t('signin:short_pwd')}` }
                    })}
                    name="password"
                />
                {errors.password && <div className="item-explain">{errors.password.message}</div>}
            </div>

            <div className={`form-group ${errors.passwordConfirm ? 'has-error' : ''}`}>
                <Password
                    label={t('signin:pwd')}
                    innerRef={register({
                        required: `${t('signin:confirm_pwd')}`,
                        validate: {
                            matchesPreviousPassword: value => {
                                const { password } = getValues()
                                return password === value || `${t('signin:pwd_mismatch')}`
                            }
                        }
                    })}
                    name="passwordConfirm"
                />
                {errors.passwordConfirm && (
                    <div className="item-explain">{errors.passwordConfirm.message}</div>
                )}
            </div>

            <div className={`form-group ${errorApiMessage ? 'has-error' : ''}`}>
                <Button
                    title={t('signin:sign_up')}
                    startIcon={isLoading && <AiOutlineLoading />}
                    handle={() => clearErrors()}
                    btnClass="btn btn-accent btn-loader"
                />
                {errors.form && <div className="item-explain api-error">{errors.form.message}</div>}
            </div>
        </form>
    )
}

export default withTranslation(['common', 'signin'])(Registration)
