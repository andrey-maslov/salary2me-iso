import React from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { withTranslation } from '@i18n'
import Button from '../buttons/button/Button'
import style from './auth.module.scss'
import { ISignin } from './Signin'
import { globalStoreType } from '../../../typings/types'

export interface IForgotForm {
    email: string
    form?: unknown
}

const Forgot: React.FC<ISignin<IForgotForm>> = ({
    isLoading,
    errorApiMessage,
    submitHandle,
    t
}) => {
    const { isEmailSent } = useSelector((state: globalStoreType) => state.app)
    const { register, handleSubmit, errors, setError, clearErrors } = useForm<IForgotForm>()

    return (
        <>
            <div className={style.desc}>{t('signin:forgot_explanation')}</div>
            <form onSubmit={handleSubmit(data => submitHandle(data, setError))}>
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                    <label>
                        <span>Email</span>
                        <input
                            className={style.input}
                            name="email"
                            autoComplete="off"
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
                        handle={() => clearErrors()}
                        btnClass="btn btn-accent btn-loader"
                    />
                    {errors.form && (
                        <div className="item-explain api-error">{errors.form.message}</div>
                    )}
                    {isEmailSent && (
                        <div className="item-explain api-success">{t('signin:email_sent')}</div>
                    )}
                </div>
            </form>
        </>
    )
}

export default withTranslation(['common', 'signin'])(Forgot)
