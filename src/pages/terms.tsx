import React from 'react'
import { fetchPageContent } from '../helper/helper'
import { ContentLayout } from '../page-layouts'

const page = 'terms'

function Terms({ content }) {
    return <ContentLayout content={content} page={page} />
}

Terms.getInitialProps = async () => {
    const content = await fetchPageContent(page)

    return {
        namespacesRequired: ['common'],
        content
    }
}

export default Terms
