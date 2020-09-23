import Hero from '../components/common/hero/Hero'
import Layout from "../components/layout/Layout"
import Content from "../components/common/content-blocks/content/Content"
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
                    <main className="section">
                        <Hero content={t('main:title')}/>
                    </main>
                    <div className={`section`}>
                        <Content content={t('main:content')}/>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('main')(Home)