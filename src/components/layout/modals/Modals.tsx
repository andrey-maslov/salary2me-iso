import {useEffect} from 'react'
import {clearErrors, setLoginModal} from '../../../actions/actionCreator'
import {useSelector, useDispatch} from 'react-redux'
import ParsingModal from "./parsing-modal/ParsingModal"
import LoginModal from "./login-modal/LoginModal"
import CookieConsent from "./cookie-consent/CookieConsent"
import {globalStoreType} from "../../../typings/types"
import {PARSING_MODAL} from "../../../actions/actionTypes"


const Modals: React.FC = () => {

    const {isLoginModal, isParsingModal} = useSelector((state: globalStoreType) => state.modals)
    const {processFailed} = useSelector((state: globalStoreType) => state.app)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    const closeModal = () => {
        setLoginModal(false)
    }

    const showLoginModal = () => {
        setLoginModal(true)
    }

    const closeParsingModal = () => {
        dispatch({type: PARSING_MODAL, isParsingModal: false})
    }

    const tryMore = () => {
        dispatch({type: PARSING_MODAL, isParsingModal: false})
        dispatch(clearErrors())
    }


    return (
        <>
            {isLoginModal && <LoginModal
                isModalShown={isLoginModal}
                closeModal={closeModal}
            />}
            {isParsingModal && <ParsingModal
                isModalShown={isParsingModal}
                closeModal={tryMore}
                isParsingError={processFailed}
                tryMore={tryMore}
            />}

            <CookieConsent/>

        </>
    );
};


export default Modals