import Layout from "../components/layout/Layout"
import Head from "next/head"


const ContentLayout: React.FC<{ content: any }> = ({content}) => {
    return (
        <>
            <Head>
                <meta name="description" content={''}/>
                <title>{'some title'}</title>
            </Head>
            <Layout>
                <div dangerouslySetInnerHTML={{__html: content}}/>
            </Layout>
        </>
    )
}

export default ContentLayout