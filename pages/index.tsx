import {HomeLayout} from '../page-layouts';
import {withTranslation} from '@i18n';

function Home({...props}) {

    // console.log({props})

    return (
        <>
            <HomeLayout {...props} />
        </>
    )
}

export async function getServerSideProps({req}) {

    let userAgent;
    if (req) {
        userAgent = req.headers['user-agent']
    } else {
        userAgent = navigator.userAgent
    }

    let isMobile;

    isMobile = Boolean(userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))

    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: {
            isMobile,
        }
    }
}

export default withTranslation('common')(Home)
