import { withTranslation } from '@i18n'
import Head from 'next/head'
import Hero from './hero/Hero'
import Layout from '../../components/layout/Layout'
import AboutSection from './about-section/AboutSection'
import CVSection from './cv-section/CVSection'
import PricesSection from './prices-section/PricesSection'
import TestSection from './test-section/TestSection'
import { SITE_TITLE } from '../../constants/constants'
import { anyType } from '../../typings/types'

const Home: React.FC<{ t: anyType }> = ({ t }) => {
    return (
        <>
            <Head>
                <title>{`${t('common:meta.title')} - ${SITE_TITLE}`}</title>
            </Head>
            <div className="home page landing">
                <Layout>
                    <Hero />
                    {/* <CVSection /> */}
                    <TestSection />
                    {/* <PricesSection /> */}
                    <AboutSection />
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('common')(Home)
