import React from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { withTranslation } from '@i18n'

interface IResetSuccess {
    t: any
}

const ResetSuccess: React.FC<IResetSuccess> = ({ t }) => {
    return (
        <div>
            <div className="auth-icon-success">
                <FiCheckSquare />
            </div>
            <p>{t('signin:reset_success')}</p>
            <p />
        </div>
    )
}

export default withTranslation(['signin'])(ResetSuccess)
