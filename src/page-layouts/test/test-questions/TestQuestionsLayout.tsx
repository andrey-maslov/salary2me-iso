import Layout from "../../../components/layout/Layout"
import Head from "next/head"
import Test from "./Test";


const TestQuestionsLayout: React.FC = () => {
    return (
        <>
            <Head>
                <meta name="description" content={''}/>
                <title>{'some title'}</title>
            </Head>
            <div className="page-test-questions">
                <Layout>
                    <section className="section">
                        <div className="container">
                            <div className="row center-xs">
                                <div className="col-lg-9">
                                    <Test/>
                                </div>
                            </div>
                        </div>
                    </section>
                </Layout>
            </div>
        </>
    )
}

export default TestQuestionsLayout