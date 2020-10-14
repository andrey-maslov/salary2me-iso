import Head from 'next/head'
import Layout from '../../../components/layout/Layout'
import Result from './Result'
import { HOST } from '../../../constants/constants'

const TestResultLayout: React.FC = () => {
    return (
        <>
            <Head>
                <meta name="description" content="" />
                <title>some title</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Know your market rate - Salary2.me" />
                <meta
                    property="og:site_name"
                    content="Free service of CV instant AI analytics with results for multiple cities. Also service helps you to find a job. Know your resume rate!"
                />
                <meta property="og:url" content={HOST} />
                <meta property="og:image" content="https://localhost:4000/img/social.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Know your market rate - Salary2.me" />
                <meta
                    name="twitter:description"
                    content="Free service of CV instant AI analytics with results for multiple cities. Also service helps you to find a job. Know your resume rate!"
                />
                <meta name="twitter:site" content={HOST} />
                <meta name="twitter:image" content="/img/social.jpg" />
            </Head>
            <div className="page-test-result">
                <Layout>
                    <section className="section">
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
