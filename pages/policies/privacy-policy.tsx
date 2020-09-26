import React from "react"
import PageContent from "../../components/common/page-content/PageContent"
import {fetchPageContent} from "../../helper/helper";

function PrivacyPolicy({content}) {

    return (
        <PageContent content={content} />
    )
}

PrivacyPolicy.getInitialProps = async () => {
    const content = await fetchPageContent('privacy-policy')

    return {
        namespacesRequired: ['common'],
        content
    }
}

export default PrivacyPolicy