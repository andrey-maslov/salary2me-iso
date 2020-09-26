import React from "react"
import PageContent from "../components/common/page-content/PageContent"
import axios from "axios"
import {CONTENT_API} from "../constants/constants"
import {fetchPageContent} from "../helper/helper";

function Terms({content}) {

    return (
        <PageContent content={content} />
    )
}

Terms.getInitialProps = async (ctx) => {

    const content = await fetchPageContent('terms')

    return {
        namespacesRequired: ['common'],
        content
    }
}

export default Terms