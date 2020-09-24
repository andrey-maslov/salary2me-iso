import React from "react"
import PageContent from "../components/common/page-content/PageContent"

function Terms() {

    return (
        <PageContent />
    )
}

Terms.getInitialProps = async () => {
    return {
        namespacesRequired: ['common']
    }
}

export default Terms