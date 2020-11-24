import { useSelector, useDispatch } from 'react-redux'
import ParsingModal from './parsing-modal/ParsingModal'
import CookieConsent from './cookie-consent/CookieConsent'
import { globalStoreType } from '../../../typings/types'
import { DANGER_MODAL, PARSING_MODAL } from '../../../actions/actionTypes'
import { clearErrors } from '../../../actions/errorHandling'
import DangerModal from './danger-modal/DangerModal'

const Modals: React.FC = () => {
    const { isParsingModal, isDangerModal } = useSelector((state: globalStoreType) => state.modals)
    const { processFailed } = useSelector((state: globalStoreType) => state.app)
    const dispatch = useDispatch()

    const tryMore = () => {
        dispatch({ type: PARSING_MODAL, isParsingModal: false })
        clearErrors(dispatch)
    }

    return (
        <>
            {isParsingModal && (
                <ParsingModal
                    isModalShown={isParsingModal}
                    closeModal={tryMore}
                    isParsingError={processFailed}
                    tryMore={tryMore}
                />
            )}
            {isDangerModal && (
                <DangerModal
                    isModalShown={isDangerModal}
                    closeModal={() => {
                        dispatch({ type: DANGER_MODAL, isDangerModal: false })
                    }}
                />
            )}

            <CookieConsent />
        </>
    )
}

export default Modals
