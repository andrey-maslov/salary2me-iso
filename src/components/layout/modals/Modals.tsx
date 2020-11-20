import { useSelector, useDispatch } from 'react-redux'
import { setLoginModal } from '../../../actions/actionCreator'
import ParsingModal from './parsing-modal/ParsingModal'
import AuthModal from './auth-modal/AuthModal'
import CookieConsent from './cookie-consent/CookieConsent'
import { globalStoreType } from '../../../typings/types'
import { PARSING_MODAL } from '../../../actions/actionTypes'
import { clearErrors } from '../../../actions/errorHandling'

const Modals: React.FC = () => {
    const { isLoginModal, isParsingModal } = useSelector((state: globalStoreType) => state.modals)
    const { processFailed } = useSelector((state: globalStoreType) => state.app)
    const dispatch = useDispatch()

    const closeModal = () => {
        setLoginModal(false)
    }

    const showLoginModal = () => {
        setLoginModal(true)
    }

    const closeParsingModal = () => {
        dispatch({ type: PARSING_MODAL, isParsingModal: false })
    }

    const tryMore = () => {
        dispatch({ type: PARSING_MODAL, isParsingModal: false })
        dispatch(clearErrors())
    }

    return (
        <>
            {isLoginModal && <AuthModal isModalShown={isLoginModal} closeModal={closeModal} />}
            {isParsingModal && (
                <ParsingModal
                    isModalShown={isParsingModal}
                    closeModal={tryMore}
                    isParsingError={processFailed}
                    tryMore={tryMore}
                />
            )}

            <CookieConsent />
        </>
    )
}

export default Modals
