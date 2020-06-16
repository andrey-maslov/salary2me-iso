import {HomeLayout} from '../page-layouts';
import {withTranslation} from '@i18n';

function Home({...props}) {

    return (
        <>
            <HomeLayout {...props} />
        </>
    )
}

export default withTranslation('common')(Home)
