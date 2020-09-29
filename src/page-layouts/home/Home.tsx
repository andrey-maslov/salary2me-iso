import Hero from './hero/Hero'
import Layout from "../../components/layout/Layout"
import HomeContent from "./home-content/HomeContent"
import {withTranslation} from '@i18n'
import Head from "next/head"

type HomeType = {
    t: any
}

const Home = ({t}: HomeType) => {
    return (
        <>
            <Head>
                <meta name="description" content={t('main:meta.description')} />
                <title>{t('main:meta.title')}</title>
            </Head>
            <div className='home page'>
                <Layout>
                    <section className="section">
                        <Hero content={t('main:title')}/>
                    </section>
                    <div className={`section`}>
                        <HomeContent content={t('main:content')}/>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('main')(Home)