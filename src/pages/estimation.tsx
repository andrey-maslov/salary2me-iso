import { EstimationLayout } from '../page-layouts'

function Estimation(props) {
    return <EstimationLayout {...props} />
}

Estimation.getInitialProps = async () => ({
    namespacesRequired: ['estimation']
})

export default Estimation
