import {useState} from 'react'
import {setLoginModal, setParsingModal} from '../../../actions/actionCreator'
import {useSelector, useDispatch} from 'react-redux'
import ParsingModal from "./parsing-modal/ParsingModal"
import LoginModal from "./login-modal/LoginModal"
import CookieConsent from "./cookie-consent/CookieConsent"
import {globalStoreType} from "../../../typings/types";

interface ModalsProps {
    isLoginModalOpen: boolean
    isParsingModalOpen: boolean
    isParsingError: boolean
    setLoginModal: (bool: boolean) => {}
    setParsingModal: (bool: boolean) => {}
}

const Modals: React.FC<ModalsProps> = (props) => {

    const {
        isParsingError,
        setLoginModal,
        setParsingModal,
    } = props

    const {isLoginModal, isParsingModal} = useSelector((state: globalStoreType) => state.modals)

    const closeModal = () => {
        setLoginModal(false)
    }

    const showLoginModal = () => {
        setLoginModal(true)
    }

    const closeParsingModal = () => {
        setParsingModal(false)
    }

    const tryMore = () => {
        setParsingModal(false)
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
                isParsingError={isParsingError}
                tryMore={tryMore}
            />}

            <CookieConsent/>

        </>
    );
};


export default Modals