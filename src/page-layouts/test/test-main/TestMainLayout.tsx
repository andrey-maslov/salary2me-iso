import Head from 'next/head'
import { withTranslation } from '@i18n'
import Layout from '../../../components/layout/Layout'
import TestMainContent from './content/TestMainContent'
import { SITE_TITLE } from '../../../constants/constants'

const TestMainLayout: React.FC<{ t: any }> = ({ t }) => {
    return (
        <>
            <Head>
                <title>{`${t('test:page.meta_title')} - ${SITE_TITLE}`}</title>
            </Head>
            <div className="page-test-main main">
                <Layout>
                    <TestMainContent />
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('test')(TestMainLayout)
