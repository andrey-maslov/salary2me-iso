import Head from 'next/head'
import Layout from '../../../components/layout/Layout'
import Result from './Result'

const TestResultLayout: React.FC = () => {
    return (
        <>
            <Head>
                <meta name="description" content="" />
                <title>Результат психологического теста</title>
                <meta name="twitter:description" content="" />
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

export default TestResultLayout
