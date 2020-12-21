import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from '@i18n'
import { useRouter } from 'next/router'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import Layout from '../../components/layout/Layout'
import { getQueryFromURL, isBrowser } from '../../helper/helper'
import { sendEmailConfirmation } from '../../actions/api/accountAPI'
import style from './confirm.module.scss'
import { globalStoreType } from '../../typings/types'

const ConfirmEmailLayot = ({ t }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { isEmailConfirmed, isLoading, accountApiErrorMsg, apiErrorMsg } = useSelector(
        (state: globalStoreType) => state.app
    )
    useEffect(() => {
        if (isBrowser) {
            const query = window.location.search
            const userId = getQueryFromURL(query, 'userId')
            const code = getQueryFromURL(query, 'code')
            const email = getQueryFromURL(query, 'email')
            if (userId && code && email) {
                dispatch(sendEmailConfirmation({ userId, code, email }))
            } else if (userId && code && !email) {
                dispatch(sendEmailConfirmation({ userId, code }))
            }
        }
    }, [ dispatch ])

    useEffect(() => {
        if (isEmailConfirmed) {
            router.push('/profile')
        }
    }, [ isEmailConfirmed ])

    return (
        <div className="page-confirm page bg-grey">
            <Layout>
                <section className="section text-center">
                    {isLoading && <span>loading...</span>}
                    {isEmailConfirmed && (
                        <div className="success">
                            <div className={style.icon}>
                                <FiCheckCircle />
                            </div>
                            <div className={style.desc}>{t('profile:email_confirm_success')}</div>
                        </div>
                    )}
                    {apiErrorMsg && (
                        <div className="danger">
                            <div className={style.icon}>
                                <FiAlertCircle />
                            </div>
                            <div className={style.desc}>{apiErrorMsg}</div>
                        </div>
                    )}
                </section>
            </Layout>
        </div>
    )
}

export default withTranslation('profile')(ConfirmEmailLayot)