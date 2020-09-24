import React from "react"
import PageContent from "../../components/common/page-content/PageContent"

function PrivacyPolicy() {

    return (
        <PageContent />
    )
}

PrivacyPolicy.getInitialProps = async () => {
    return {
        namespacesRequired: ['common']
    }
}

export default PrivacyPolicy