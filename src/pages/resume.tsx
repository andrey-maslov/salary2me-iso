import { ResumeLayout } from '../page-layouts'
// import {initializeStore} from "../store"

function Resume() {
    return <ResumeLayout />
}

Resume.getInitialProps = async () => {
    return { namespacesRequired: ['common'] }
}

export default Resume
