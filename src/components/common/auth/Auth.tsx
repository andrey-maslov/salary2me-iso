import React, { useEffect, useRef } from 'react'
import { Link, withTranslation } from '@i18n'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Signin, { ISigninForm } from './Signin'
import Registration, { ISignUpForm } from './Registration'
import { sendForgotEmail, sendNewPassword, authUser } from '../../../actions/actionCreator'
import Forgot, { IForgotForm } from './Forgot'
import Reset, { IResetForm } from './Reset'
import { authModes, SERVICE } from '../../../constants/constants'
import style from './auth.module.scss'
import ForgotSuccess from './ForgotSuccess'
import { getQueryFromURL } from '../../../helper/helper'
import { globalStoreType } from '../../../typings/types'
import SocialAuth from './social-auth/SocialAuth'

type AuthProps = {
    t: any
}

const Auth: React.FC<AuthProps> = ({ t }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const agreement = useRef<HTMLDivElement>(null)
    const { isLoggedIn } = useSelector((state: globalStoreType) => state.user)
    const { accountApiErrorMsg, redirectUrl } = useSelector((state: globalStoreType) => state.app)
    const page = getAuthPage(router.pathname)

    // useEffect(() => {
    //     console.log('in use effect')
    //     window.addEventListener('storage', function (event) {
    //         console.log(event.key, event.newValue)
    //     })
    // })

    useEffect(() => {
        let termsLink: Element | null
        let privacyLink: Element | null
        if (agreement) {
            const el = agreement.current
            termsLink = el ? el.children[0] : null
            privacyLink = el ? el.children[1] : null
            if (termsLink) {
                termsLink.addEventListener('click', toTerms)
            }
            if (privacyLink) {
                privacyLink.addEventListener('click', toPrivacy)
            }
        }

        function toTerms() {
            router.push('/terms')
        }

        function toPrivacy() {
            router.push('/policies/privacy-policy')
        }

        return function cleanupListener() {
            if (termsLink) {
                termsLink.removeEventListener('click', toTerms)
            }
            if (privacyLink) {
                privacyLink.removeEventListener('click', toPrivacy)
            }
        }
    }, [agreement, router])

    useEffect(() => {
        if (isLoggedIn) {
            router.push(redirectUrl || '/')
        }
    }, [isLoggedIn])

    const Form = () => {
        switch (page) {
            case authModes[0]:
                return (
                    <>
                        <Signin
                            isLoading={false}
                            errorApiMessage={accountApiErrorMsg}
                            submitHandle={signIn}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link href="/signin/forgot-password">
                                <a>{t('signin:forgot_pwd_question')}</a>
                            </Link>
                            <Link href="/registration">
                                <a>{t('signin:sign_up')}</a>
                            </Link>
                        </div>
                        <SocialAuth />
                    </>
                )
            case authModes[1]:
                return (
                    <>
                        <Registration
                            isLoading={false}
                            errorApiMessage={accountApiErrorMsg}
                            submitHandle={signUp}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Link href="/signin">
                                <a>{t('signin:sign_in')}</a>
                            </Link>
                        </div>
                        <SocialAuth />
                    </>
                )
            case authModes[2]:
                return (
                    <>
                        <Forgot
                            isLoading={false}
                            errorApiMessage={accountApiErrorMsg}
                            submitHandle={forgotHandle}
                        />
                        <Link href="/signin">
                            <a>{t('signin:ready_to_signin')}</a>
                        </Link>
                    </>
                )
            case authModes[3]:
                return (
                    <>
                        <Reset
                            isLoading={false}
                            errorApiMessage={accountApiErrorMsg}
                            submitHandle={resetHandle}
                        />
                        <Link href="/signin">
                            <a>{t('signin:ready_to_signin')}</a>
                        </Link>
                    </>
                )
            case authModes[4]:
                return (
                    <>
                        <ForgotSuccess msg={t('signin:forgot_success')} />
                        <Link href="/signin">
                            <a>{t('signin:ready_to_signin')}</a>
                        </Link>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="container">
            <div className={style.wrapper}>
                <h1 className={style.title}>{t(`signin:${page}`)}</h1>
                <Form />
            </div>
            <div
                ref={agreement}
                className={style.agreement}
                dangerouslySetInnerHTML={{
                    __html: t('signin:agreement', { button: `"${t('signin:sign_up')}"` })
                }}
            />
        </div>
    )

    function signIn(data: ISigninForm, setError) {
        dispatch(authUser(data, 'signin', setError))
    }

    function signUp(data: ISignUpForm, setError): void {
        const userData = {
            firstName: '',
            lastName: '',
            city: {
                id: 0,
                name: 'city'
            },
            service: SERVICE,
            ...data
        }
        dispatch(authUser(userData, 'registration', setError))
    }

    function forgotHandle(data: IForgotForm, setError): void {
        dispatch(sendForgotEmail(data.email, setError))
    }

    function resetHandle(data: IResetForm, setError): void {
        // TODO fix this
        const code = getQueryFromURL(window.location.search, 'code')
        const newData = {
            code,
            newPassword: data.password,
            email: data.email
        }
        dispatch(sendNewPassword(newData, setError))
    }

    function getAuthPage(pathname: string): string {
        if (!pathname) {
            return ''
        }
        return pathname.split('/').slice(-1)[0]
    }
}

export default withTranslation(['common', 'signin'])(Auth)
