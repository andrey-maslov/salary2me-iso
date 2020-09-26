import React from "react"
import PageContent from "../../components/common/page-content/PageContent"
import {fetchPageContent} from "../../helper/helper";

function CookiePolicy({content}) {

    return (
        <PageContent content={content} />
    )
}

CookiePolicy.getInitialProps = async () => {
    const content = await fetchPageContent('cookie-policy')

    return {
        namespacesRequired: ['common'],
        content
    }
}

export default CookiePolicy