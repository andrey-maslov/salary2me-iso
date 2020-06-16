import {LoginLayout} from '../page-layouts';
import {withTranslation} from '@i18n';

function Login({...props}) {

    return (
        <>
            <LoginLayout {...props} />
        </>
    )
}

export default withTranslation('login')(Login)