import React from 'react'
import { Link, withTranslation } from '@i18n'
import Head from 'next/head'
import style from './error.module.scss'
import Layout from '../../components/layout/Layout'
import { SITE_TITLE } from '../../constants/constants'

function NotFoundLayout({ t }) {
    return (
        <>
            <Head>
                <title>{`${t('common:errorPage.not_found')} - ${SITE_TITLE}`}</title>
            </Head>
            <Layout>
                <div className={`${style.wrapper} pt-lg pb-lg`}>
                    <p className={style.title}>{t('common:errorPage.oops')}</p>
                    <div>
                        <div className={style.subtitle}>{t('common:errorPage.not_found')}</div>
                        <div className={style.img}>
                            <img src="/img/404.png" className="img-fluid" alt="error 404" />
                        </div>
                    </div>
                    <Link href="/">
                        <a className="btn btn-accent">{t('common:buttons.to_main')}</a>
                    </Link>
                </div>
            </Layout>
        </>
    )
}

export default withTranslation('common')(NotFoundLayout)
