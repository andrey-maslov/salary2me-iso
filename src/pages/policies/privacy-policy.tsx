import React from 'react'
import { fetchPageContent } from '../../helper/helper'
import { ContentLayout } from '../../page-layouts'

const page = 'privacy-policy'

function PrivacyPolicy({ content }) {
    return <ContentLayout content={content} page={page} />
}

PrivacyPolicy.getInitialProps = async () => {
    const content = await fetchPageContent(page)

    return {
        namespacesRequired: ['common'],
        content
    }
}

export default PrivacyPolicy
