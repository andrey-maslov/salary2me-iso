import React, {useRef, useEffect} from 'react'
import {Link, withTranslation} from '@i18n'
import {useRouter} from 'next/router'
import Signin, {ISigninForm} from "./Signin"
import Registration, {ISignUpForm} from "./Registration"
import {useDispatch, useSelector} from "react-redux"
import {addAuthData, authUser, sendForgotEmail, sendNewPassword, updateUserData} from "../../../actions/actionCreator"
import Forgot, {IForgotForm} from "./Forgot"
import Reset, {IResetForm} from "./Reset"
import {authModes} from "../../../constants/constants"
import style from './auth.module.scss'
import ForgotSuccess from "./ForgotSuccess"
import {getQueryFromURL} from "../../../helper/helper"
import {globalStoreType} from "../../../typings/types"
import ExtraUserInfo, {IInfoForm} from "./ExtraUserInfo";


type AuthProps = {
    t: any
}

const Auth: React.FC<AuthProps> = ({t}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const agreement = useRef<HTMLDivElement>(null)
    const {isLoggedIn, name} = useSelector((state: globalStoreType) => state.user)
    const {loading, apiErrorMsg} = useSelector((state: globalStoreType) => state.app)

    const page = getAuthPage(router.pathname)

    useEffect(() => {

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

    const Form = () => {
        switch (page) {
            case authModes[0] :
                return (
                    <>
                        <Signin
                            isLoading={loading}
                            errorApiMessage={apiErrorMsg}
                            submitHandle={SignIn}
                            clearApiError={clearApiError}
                        />
                        <Link href={"/signin/forgot-password"}>
                            <a>{t('signin:forgot_pwd_question')}</a>
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
                        <Link href={"/signin"}>
                            <a>{t('signin:ready_to_signin')}</a>
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
                        <Link href={"/signin"}>
                            <a>{t('signin:ready_to_signin')}</a>
                        </Link>
                    </>
                )
            case authModes[4] :
                return (
                    <>
                        <ForgotSuccess msg={t('signin:forgot_success')}/>
                        <Link href={"/signin"}>
                            <a>{t('signin:ready_to_signin')}</a>
                        </Link>
                    </>
                )
            case authModes[5] :
                return (
                    <ExtraUserInfo
                        isLoading={loading}
                        errorApiMessage={apiErrorMsg}
                        submitHandle={addExtraInfo}
                        clearApiError={clearApiError}
                    />
                )
            default :
                return null
        }
    }

    return (
        <div>
            <div className={style.wrapper}>
                <h1 className={style.title}>{t(`signin:${page}`)}</h1>
                <Form/>
            </div>
            <div
                ref={agreement}
                className={style.agreement}
                dangerouslySetInnerHTML={{__html: t('signin:agreement', {button: `"${t('signin:sign_up')}"`})}}
            />
        </div>
    )

    function getAuthPage(pathname: string): string {
        if (!pathname) {
            return ''
        }
        return pathname.split('/').slice(-1)[0]
    }

    function SignIn(data: ISigninForm): void {
        // dispatch(authUser(data, 'signin'))
        dispatch(addAuthData({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@mail.com',
            position: 'freelancer',
            isPublic: true
        }))
        router.push('/profile')

    }

    function forgotHandle(data: IForgotForm): void {
        dispatch(sendForgotEmail(data.email))
        console.log('forgot email')
    }

    function resetHandle(data: IResetForm): void {
        //TODO fix this
        const code = getQueryFromURL(location.search, 'code')
        const newData = {
            code,
            newPassword: data.password,
            email: data.email,
        }
        dispatch(sendNewPassword(newData))
        console.log(newData)
    }

    function signUp(data: ISignUpForm): void {
        const userData = {
            email: data.email,
            password: data.password,
            firstName: 'First',
            lastName: 'Last',
            city: {
                id: 0,
                name: 'city'
            }
        }
        // dispatch(authUser(userData, 'registration'))
        dispatch(addAuthData({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@mail.com',
            position: 'freelancer',
            isPublic: true
        }))
        router.push('/profile')

        console.log('register')
    }

    function addExtraInfo(data: IInfoForm) {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            position: data.position,
        }
        dispatch(updateUserData(userData))
        console.log('extra info', data)
    }


    function clearApiError() {
        // console.log('asdasd')
        // dispatch({type: SET_ERROR, errorApiMessage: ''})
    }

}

export default withTranslation(['common', 'signin'])(Auth)