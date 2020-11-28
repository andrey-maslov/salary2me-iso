import Head from 'next/head'
import Layout from '../../../components/layout/Layout'
import Test from './Test'

const TestQuestionsLayout: React.FC = () => {
    return (
        <>
            <Head>
                <meta name="description" content="" />
                <title>Вопросы - психологический тест</title>
            </Head>
            <div className="page-test-questions">
                <Layout>
                    <section className="section">
                        <div className="container">
                            <div className="row center-xs">
                                <div className="col-lg-9">
                                    <Test />
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
