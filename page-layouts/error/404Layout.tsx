import React from 'react'
import style from './error.module.scss'
import {Link, withTranslation} from "@i18n"
import Layout from "../../components/layout/Layout"

function NotFoundLayout() {

    const ClientError = () => (
        <div>
            <div className={style.subtitle}>page not found</div>
            <div className={style.img}>
                <img src="/img/404.png" className="img-fluid" alt="error 404"/>
            </div>
        </div>
    )

    return (
        <Layout>
            <div className="container">
                <div className={`${style.wrapper} text-center`}>
                    <p className={style.title}>Ooooops...</p>
                    <ClientError/>
                    <Link href="/">
                        <a className="btn btn-accent">Go home</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default NotFoundLayout