import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { withTranslation } from '@i18n'
import { useSelector } from 'react-redux'
import Button from '../buttons/button/Button'
import style from './auth.module.scss'
import ResetSuccess from './ResetSuccess'
import { ISignin } from './Signin'
import { globalStoreType } from '../../../typings/types'

export interface IResetForm {
    password: string
    passwordConfirm: string
    email: string
}

const Reset: React.FC<ISignin<IResetForm>> = ({
    isLoading,
    errorApiMessage,
    submitHandle,
    t
}) => {
    const { register, handleSubmit, reset, getValues, errors } = useForm<IResetForm>()
    const { isPwdChanged } = useSelector((state: globalStoreType) => state.app)

    if (isPwdChanged) {
        return <ResetSuccess />
    }

    return (
        <form onSubmit={handleSubmit(submitHandle)}>
            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <label>
                    <span>{t('signin:new_pwd')}</span>
                    <input
                        className={style.input}
                        type="password"
                        name="password"
                        ref={register({
                            required: `${t('common:errors.required')}`,
                            minLength: { value: 3, message: `${t('common:errors.short_pwd')}` }
                        })}
                    />
                </label>
                {errors.password && <div className="item-explain">{errors.password.message}</div>}
            </div>

            <div className={`form-group ${errors.passwordConfirm ? 'has-error' : ''}`}>
                <label>
                    <span>{t('signin:repeat_pwd')}</span>
                    <input
                        className={style.input}
                        type="password"
                        name="passwordConfirm"
                        ref={register({
                            required: `${t('common:errors.confirm_pwd')}`,
                            validate: {
                                matchesPreviousPassword: value => {
                                    const { password } = getValues()
                                    return (
                                        password === value || `${t('common:errors.pwd_mismatch')}`
                                    )
                                }
                            }
                        })}
                    />
                </label>
                {errors.passwordConfirm && (
                    <div className="item-explain">{errors.passwordConfirm.message}</div>
                )}
            </div>

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

            <div className={`form-group ${errorApiMessage ? 'has-error' : ''}`}>
                <Button
                    title={t('common:buttons.send')}
                    startIcon={isLoading && <AiOutlineLoading />}
                    handle={null}
                    btnClass="btn btn-outlined btn-loader"
                />
                {errorApiMessage && <div className="item-explain">{errorApiMessage}</div>}
            </div>
        </form>
    )
}

export default withTranslation(['common', 'signin'])(Reset)
