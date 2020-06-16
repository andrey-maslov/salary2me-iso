import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withTranslation} from '@i18n';
import UserResults from "./user-results/UserResults";

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
                    <div className="container">
                        <div className="row center-xs">
                            <div className="col-xl-10">
                                <UserResults/>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('results')(Results);