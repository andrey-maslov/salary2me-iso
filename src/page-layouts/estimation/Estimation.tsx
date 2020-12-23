import Head from 'next/head'
import { withTranslation } from '@i18n'
import Layout from '../../components/layout/Layout'
import CVEstimation from './cv-estimation/CVEstimation'
import { SVGSource } from '../../components/common/media/svgflag/SVGFlag'
import { SITE_TITLE } from '../../constants/constants'

type ResultsType = {
    t: any
}

const Estimation: React.FC<ResultsType> = ({ t }) => {
    return (
        <>
            <Head>
                <title>{`${t('estimation:title')} - ${SITE_TITLE}`}</title>
            </Head>
            <div className="page-estimation page bg-grey">
                <Layout>
                    <section className="section">
                        <CVEstimation />
                    </section>
                </Layout>
            </div>
            <SVGSource />
        </>
    )
}

export default withTranslation('estimation')(Estimation)
