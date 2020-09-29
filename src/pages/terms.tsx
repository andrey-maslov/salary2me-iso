import React from "react"
import PageContent from "../components/common/page-content/PageContent"
import {fetchPageContent} from "../helper/helper"

function Terms({content}) {

    return (
        <PageContent content={content} />
    )
}

Terms.getInitialProps = async () => {

    const content = await fetchPageContent('terms')

    return {
        namespacesRequired: ['common'],
        content
    }
}

export default Terms