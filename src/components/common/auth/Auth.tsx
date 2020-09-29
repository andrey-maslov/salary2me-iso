import React, {useRef, useEffect, useState} from 'react'
import {Link, withTranslation} from '@i18n'
import {useRouter} from 'next/router'
import Login, {ILoginForm} from "./Login"
import Registration, {ISignUpForm} from "./Registration"
import {useDispatch, useSelector} from "react-redux"
// import {authUser, sendForgotEmail, sendNewPassword} from "../../../actions/actionCreator"
import {SET_ERROR} from "../../../actions/actionTypes"
import Forgot, {IForgotForm} from "./Forgot"
import Reset, {IResetForm} from "./Reset"
import {authModes} from "../../../constants/constants"
import style from './auth.module.scss'
import ForgotSuccess from "./ForgotSuccess"
import {getQueryFromURL} from "../../../helper/helper"
import {globalStoreType} from "../../../typings/types"


type AuthProps = {
    t: any
}

const Auth: React.FC<AuthProps> = ({t}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const agreement = useRef<HTMLDivElement>(null)
    const {isLoggedIn} = useSelector((state: globalStoreType) => state.user)
    const {loading, apiErrorMsg} = useSelector((state: globalStoreType) => state.app)

    const page = router.pathname.replace('/', '') ?? ''

    useEffect(() => {

        if (isLoggedIn) {
            router.push('/team')
        }

        let termsLink: Element | null
        let privacyLink: Element | null
        if (agreement) {
            const el = agreement.current
            termsLink = el ? el.children[0] : null
            privacyLink = el ? el.children[1] : null
            termsLink && termsLink.addEventListener('click', toTerms)
            privacyLink && privacyLink.addEventListener('click', toPrivacy)
        }

        function toTerms() {
            router.push('/terms')
        }

        function toPrivacy() {
            router.push('/privacy-policy')
        }

        return function cleanupListener() {
            termsLink && termsLink.removeEventListener('click', toTerms)
            privacyLink && privacyLink.removeEventListener('click', toPrivacy)
        }
    }, [agreement, isLoggedIn])

    console.log(router)

    const Form = () => {
        switch (page) {
            case authModes[0] :
                return (
                    <>
                        <Login
                            isLoading={loading}
                            errorApiMessage={apiErrorMsg}
                            submitHandle={logIn}
                            clearApiError={clearApiError}
                        />
                        <Link href="/login/forgot-password">
                            <a>{t('login:forgot_pwd_question')}</a>
                        </Link>
                    </>
                )
            case authModes[1] :
                return (
                    <Registration
                        isLoading={loading}
                        errorApiMessage={apiErrorMsg}
                        submitHandle={signUp}
                        clearApiError={clearApiError}
                    />
                )
            case authModes[2] :
                return (
                    <>
                        <Forgot
                            isLoading={loading}
                            errorApiMessage={apiErrorMsg}
                            submitHandle={forgotHandle}
                            clearApiError={clearApiError}
                        />
                        <Link href="/login">
                            <a>{t('login:ready_to_login')}</a>
                        </Link>
                    </>
                )
            case authModes[3] :
                return (
                    <>
                        <Reset
                            isLoading={loading}
                            errorApiMessage={apiErrorMsg}
                            submitHandle={resetHandle}
                            clearApiError={clearApiError}
                        />
                        <Link href="/login">
                            <a>{t('login:ready_to_login')}</a>
                        </Link>
                    </>
                )
            case authModes[4] :
                return (
                    <>
                        <ForgotSuccess />
                        <Link href="/login">
                            <a>{t('login:ready_to_login')}</a>
                        </Link>
                    </>
                )
            default :
                return null
        }
    }

    return (
        <div>
            <div className={style.wrapper}>
                {/*<h1 className={style.title}>{t(`login:${page}`)}</h1>*/}
                <h1 className={style.title}>{page}</h1>
                <Form/>
            </div>
            <div
                ref={agreement}
                className={style.agreement}
                dangerouslySetInnerHTML={{__html: t('login:agreement', {button: t('login.signup')})}}
            />
        </div>
    )

    function logIn(data: ILoginForm): void {
        // dispatch(authUser(data, 'login'))
        console.log('auth user')
    }

    function forgotHandle(data: IForgotForm): void {
        // dispatch(sendForgotEmail(data.email))
        console.log('forgot email')
    }

    function resetHandle(data: IResetForm): void {
        //TODO fix this
        const code = getQueryFromURL(location.search, 'code')
        const newData = {
            code,
            password: data.password,
            passwordConfirmation: data.passwordConfirm,
        }
        // dispatch(sendNewPassword(newData))
        console.log('send new password')
    }

    function signUp(data: ISignUpForm): void {
        const userData = {
            username: data.name,
            email: data.email,
            password: data.password,
        }
        // dispatch(authUser(userData, 'signup'))
        console.log('register')
    }



    function clearApiError() {
        // console.log('asdasd')
        // dispatch({type: SET_ERROR, errorApiMessage: ''})
    }

}

export default withTranslation(['common', 'login'])(Auth)