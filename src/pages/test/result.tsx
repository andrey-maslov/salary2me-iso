import React from 'react'
import { TestResultLayout } from '../../page-layouts'

function Test() {
    return <TestResultLayout />
}

Test.getInitialProps = async () => {
    return {
        namespacesRequired: ['test', 'common']
    }
}

export default Test
