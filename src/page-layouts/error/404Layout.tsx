import React from 'react'
import style from './error.module.scss'
import {Link, withTranslation} from "@i18n"
import Layout from "../../components/layout/Layout"

function NotFoundLayout({t}) {

    const ClientError = () => (
        <div>
            <div className={style.subtitle}>{t('common:errorPage.not_found')}</div>
            <div className={style.img}>
                <img src="/img/404.png" className="img-fluid" alt="error 404"/>
            </div>
        </div>
    )

    return (
        <Layout>
            <div className={`${style.wrapper} pt-lg pb-lg`}>
                <p className={style.title}>{t('common:errorPage.oops')}</p>
                <ClientError/>
                <Link href="/">
                    <a className="btn btn-accent">{t('common:buttons.to_main')}</a>
                </Link>
            </div>
        </Layout>
    )
}

export default withTranslation('common')(NotFoundLayout)