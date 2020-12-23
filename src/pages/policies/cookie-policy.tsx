import React from 'react'
import { fetchPageContent } from '../../helper/helper'
import { ContentLayout } from '../../page-layouts'

const page = 'cookie-policy'

function CookiePolicy({ content }) {
    return <ContentLayout content={content} page={page} />
}

CookiePolicy.getInitialProps = async () => {
    const content = await fetchPageContent(page)

    return {
        namespacesRequired: ['common'],
        content
    }
}

export default CookiePolicy
