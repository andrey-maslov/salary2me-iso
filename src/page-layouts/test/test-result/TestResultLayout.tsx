import Layout from "../../../components/layout/Layout"
import Head from "next/head"
import Result from "./Result"


const TestResultLayout: React.FC = () => {
    return (
        <>
            <Head>
                <meta name="description" content={''}/>
                <title>{'some title'}</title>
            </Head>
            <div className="page-test-result bg-grey">
                <Layout>
                    <section className="section">
                        <div className="container">
                            <Result/>
                        </div>
                    </section>
                </Layout>
            </div>
        </>
    )
}

export default TestResultLayout