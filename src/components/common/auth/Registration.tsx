import style from "./auth.module.scss"
import Button from "../buttons/button/Button"
import {useForm} from 'react-hook-form'
import {AiOutlineLoading} from 'react-icons/ai'
import {withTranslation} from "@i18n"
import {ISignin} from "./Signin"

export interface ISignUpForm {
    firstName: string,
    lastName: string,
    email: string
    password: string
    passwordConfirm: string
    errors: any
}

const Registration: React.FC<ISignin<ISignUpForm>> = ({isLoading, errorApiMessage, submitHandle, clearApiError, t}) => {

    const {register, handleSubmit, reset, getValues, errors} = useForm<ISignUpForm>()

    return (
        <form onSubmit={handleSubmit(submitHandle)}>
            
            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label>
                    <span>Email</span>
                    <input
                        className={style.input}
                        name="email"
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
                {errors.email && <div className={`item-explain`}>{errors.email.message}</div>}
            </div>

            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <label>
                    <span>{t('signin:pwd')}</span>
                    <input
                        className={style.input}
                        type="password"
                        name="password"
                        onFocus={clearApiError}
                        ref={register({
                            required: `${t('common:errors.required')}`,
                            minLength: {value: 3, message: `${t('signin:short_pwd')}`}
                        })}
                    />
                </label>
                {errors.password && <div className={`item-explain`}>{errors.password.message}</div>}
            </div>

            <div className={`form-group ${errors.passwordConfirm ? 'has-error' : ''}`}>
                <label>
                    <span>{t('signin:confirm_pwd')}</span>
                    <input
                        className={style.input}
                        type="password"
                        name="passwordConfirm"
                        onFocus={clearApiError}
                        ref={register({
                            required: `${t('signin:confirm_pwd')}`,
                            validate: {
                                matchesPreviousPassword: value => {
                                    const {password} = getValues();
                                    return password === value || `${t('signin:pwd_mismatch')}`;
                                }
                            }
                        })}
                    />
                </label>
                {errors.passwordConfirm && <div className={`item-explain`}>{errors.passwordConfirm.message}</div>}
            </div>

            <div className={`form-group ${errorApiMessage ? 'has-error' : ''}`}>
                <Button
                    title={t('signin:sign_up')}
                    startIcon={isLoading && <AiOutlineLoading/>}
                    handle={() => void (0)}
                    btnClass={'btn-accent btn-loader'}
                />
                {errorApiMessage && <div className={`item-explain`}>{errorApiMessage}</div>}
            </div>
        </form>
    )
}

export default withTranslation(['common', 'signin'])(Registration)