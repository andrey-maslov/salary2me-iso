import { HomeLayout } from '../page-layouts'

function Home(props) {
    return <HomeLayout {...props} />
}

Home.getInitialProps = async () => ({
    namespacesRequired: ['main', 'common']
})

export default Home
