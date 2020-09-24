import Layout from "../components/layout/Layout"
import Head from "next/head"


const ContentLayout: React.FC<{ content: any }> = ({content}) => {
    return (
        <>
            <Head>
                <meta name="description" content={''}/>
                <title>{'some title'}</title>
            </Head>
            <div className="page-content">
                <Layout>
                    <div className="container">
                        <div className="section" dangerouslySetInnerHTML={{__html: content}}/>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default ContentLayout