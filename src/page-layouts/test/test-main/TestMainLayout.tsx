import Layout from "../../../components/layout/Layout"
import Head from "next/head"
import TestMainContent from "./content/TestMainContent"


const TestMainLayout: React.FC = () => {
    return (
        <>
            <Head>
                <meta name="description" content={''}/>
                <title>{'some title'}</title>
            </Head>
            <div className="page-test-main main">
                <Layout>
                    <TestMainContent/>
                </Layout>
            </div>
        </>
    )
}

export default TestMainLayout