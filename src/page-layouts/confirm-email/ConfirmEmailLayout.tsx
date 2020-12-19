import { useState, useEffect } from 'react'
import { withTranslation } from '@i18n'
import Head from 'next/head'
import style from './confirm.module.scss'
import Layout from '../../components/layout/Layout'
import { getQueryFromURL, isBrowser } from '../../helper/helper'

const ConfirmEmailLayot = ({ t }) => {
    const [data, setData] = useState({
        userId: '',
        code: ''
    })

    useEffect(() => {
        if (isBrowser) {
            const query = window.location.search
            setData({
                userId: getQueryFromURL(query, 'userId'),
                code: getQueryFromURL(query, 'code')
            })
        }
    }, [])

    return (
        <>
            <Head>
                <meta name="description" content={t('meta.description')} />
                <title>{t('meta.title')}</title>
            </Head>
            <div className="page-confirm page bg-grey">
                <Layout>
                    <section className="section">
                        <div className="flex-centered">consirm</div>
                    </section>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('signin')(ConfirmEmailLayot)
