import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { withTranslation } from '@i18n'
import Button from '../buttons/button/Button'
import style from './auth.module.scss'
import { ISignin } from './Signin'

export interface IForgotForm {
    email: string
}

const Forgot: React.FC<ISignin<IForgotForm>> = ({
    isLoading,
    errorApiMessage,
    submitHandle,
    clearApiError,
    t
}) => {
    const router = useRouter()
    const { isEmailSent } = useSelector((state: any) => state.user)
    const { register, handleSubmit, errors } = useForm<IForgotForm>()

    useEffect(() => {
        if (isEmailSent) {
            router.push('/signin/forgot-password-success')
        }
    }, [isEmailSent, router])

    return (
        <>
            <div className={style.desc}>{t('signin:forgot_explanation')}</div>
            <form onSubmit={handleSubmit(submitHandle)}>
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                    <label>
                        <span>Email</span>
                        <input
                            className={style.input}
                            name="email"
                            onFocus={clearApiError}
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
                        handle={() => void 0}
                        btnClass="btn btn-accent btn-loader"
                    />
                    {errorApiMessage && <div className="item-explain">{errorApiMessage}</div>}
                </div>
            </form>
        </>
    )
}

export default withTranslation(['common', 'signin'])(Forgot)
