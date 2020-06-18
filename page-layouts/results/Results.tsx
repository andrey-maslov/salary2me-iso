import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withTranslation} from '@i18n';
import UserResults from "./user-results/UserResults";
import {SVGSource} from "../../components/common/media/svgflag/SVGFlag";

type ResultsType = {
    t: any
}

const Results: React.FC<ResultsType> = ({t}) => {
    return (
        <>
            <Head>
                <meta name="description" content={t('meta.description')}/>
                <title>{t('meta.title')}</title>
            </Head>
            <div className='page-results page bg-grey'>
                <Layout>
                    <UserResults/>
                </Layout>
            </div>
            <SVGSource/>
        </>
    )
}

export default withTranslation('results')(Results);