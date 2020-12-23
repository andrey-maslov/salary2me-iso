import Head from 'next/head'
import { useSelector } from 'react-redux'
import { withTranslation } from '@i18n'
import Layout from '../../../components/layout/Layout'
import Result from './Result'
import { SITE_TITLE } from '../../../constants/constants'
import { globalStoreType } from '../../../typings/types'

const TestResultLayout: React.FC<{ t: any }> = ({ t }) => {
    const { testData } = useSelector((store: globalStoreType) => store.test)
    const title = testData ? t('test:page.title') : t('test:errors.take_the_test')
    return (
        <>
            <Head>
                <title>{`${title} - ${SITE_TITLE}`}</title>
            </Head>
            <div className="page-test-result">
                <Layout>
                    <section className="pt-lg pb-lg">
                        <div className="container">
                            <Result />
                        </div>
                    </section>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('test')(TestResultLayout)
