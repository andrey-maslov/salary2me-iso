import Head from 'next/head'
import { withTranslation } from '@i18n'
import Layout from '../../components/layout/Layout'
import CVEstimation from './cv-estimation/CVEstimation'
import { SVGSource } from '../../components/common/media/svgflag/SVGFlag'

type ResultsType = {
    t: any
}

const Estimation: React.FC<ResultsType> = ({ t }) => {
    return (
        <>
            <Head>
                <meta name="description" content={t('meta.description')} />
                <title>{t('meta.title')}</title>
            </Head>
            <div className="page-estimation page bg-grey">
                <Layout>
                    <section>
                        <CVEstimation />
                    </section>
                </Layout>
            </div>
            <SVGSource />
        </>
    )
}

export default withTranslation('estimation')(Estimation)