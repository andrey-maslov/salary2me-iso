import Layout from "../../../components/layout/Layout"
import Head from "next/head"


const TestResultLayout: React.FC = () => {
    return (
        <>
            <Head>
                <meta name="description" content={''}/>
                <title>{'some title'}</title>
            </Head>
            <div className="page-test-result">
                <Layout>
                    <h1>Test result</h1>
                </Layout>
            </div>
        </>
    )
}

export default TestResultLayout