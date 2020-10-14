import React from 'react'
import { TestQuestionsLayout } from '../../page-layouts'

function Test() {
    return <TestQuestionsLayout />
}

Test.getInitialProps = async () => {
    return {
        namespacesRequired: ['questions']
    }
}

export default Test
