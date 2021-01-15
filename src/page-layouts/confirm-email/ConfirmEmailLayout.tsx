import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from '@i18n'
import { useRouter } from 'next/router'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import { getQueryFromURL, isBrowser } from '../../helper/helper'
import { sendEmailConfirmation } from '../../actions/api/accountAPI'
import style from './confirm.module.scss'
import { globalStoreType } from '../../typings/types'
import { SITE_TITLE } from '../../constants/constants'

type ConfMode = 'confirm-email' | 'confirm-email-change' | null

const ConfirmEmailLayot = ({ t }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { isEmailConfirmed, isLoading, apiErrorMsg } = useSelector(
        (state: globalStoreType) => state.app
    )

    const [confirmationMode, setConformationMode] = useState<ConfMode>(null)

    useEffect(() => {
        if (isBrowser) {
            const query = window.location.search
            const userId = getQueryFromURL(query, 'userId')
            const code = getQueryFromURL(query, 'code')
            const email = getQueryFromURL(query, 'email')
            if (userId && code && email) {
                setConformationMode('confirm-email-change')
                dispatch(sendEmailConfirmation({ userId, code, email }))
                return
            }
            setConformationMode('confirm-email')
            dispatch(sendEmailConfirmation({ code, userId }))
        }
    }, [dispatch])

    // useEffect(() => {
    //     if (isEmailConfirmed) {
    //         router.push('/profile')
    //     }
    // }, [isEmailConfirmed, router])

    return (
        <div className="page-confirm page bg-grey">
            <Head>
                <title>{`${t('profile:confirm_email')} - ${SITE_TITLE}`}</title>
            </Head>
            <Layout>
                <section className="section text-center">
                    {isLoading && <span>loading...</span>}
                    {isEmailConfirmed && (
                        <div className="success">
                            <div className={style.icon}>
                                <FiCheckCircle />
                            </div>
                            <div className={style.desc}>
                                {confirmationMode === 'confirm-email'
                                    ? t('profile:email_confirm_success')
                                    : t('common:profile.change_email_confirm_success')}
                            </div>
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
