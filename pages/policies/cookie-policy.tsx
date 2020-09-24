import React from "react"
import PageContent from "../../components/common/page-content/PageContent"

function CookiePolicy() {

    return (
        <PageContent />
    )
}

CookiePolicy.getInitialProps = async () => {
    return {
        namespacesRequired: ['common']
    }
}

export default CookiePolicy