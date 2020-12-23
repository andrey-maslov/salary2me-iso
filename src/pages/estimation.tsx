import { EstimationLayout } from '../page-layouts'

function Estimation(props) {
    return <EstimationLayout {...props} />
}

Estimation.getInitialProps = async () => ({
    namespacesRequired: ['estimation', 'common']
})

export default Estimation
