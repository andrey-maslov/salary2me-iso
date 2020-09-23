import {useState} from 'react';
import {
    setCookiesConsent,
    setOnlyLoggedModal,
    setLoginModal,
    setParsingModal,
    predictionsRequestError
} from '../../../actions/actionCreator';
import {connect} from 'react-redux';
import ParsingModal from "./parsing-modal/ParsingModal";
import {OnlyLoggedModal} from "./only-logged-modal/OnlyLoggedModal";
import {UserDataType} from "../../../reducers/userData";
import {AppReducerType} from "../../../reducers/appReducer";
import LoginModal from "./login-modal/LoginModal";
import {CookiesConsent} from "./cookies-consent/CookiesConsent";

interface ModalsProps {
    isCookiesConsented: boolean
    isLoginModalOpen: boolean
    isOnlyLoggedModal: boolean
    isParsingModalOpen: boolean
    isParsingError: boolean
    setOnlyLoggedModal: (bool: boolean) => {}
    setLoginModal: (bool: boolean) => {}
    setCookiesConsent: (bool: boolean) => {}
    setParsingModal: (bool: boolean) => {}
    predictionsRequestError: (bool: boolean) => {}
}

const Modals: React.FC<ModalsProps> = (props) => {

    const {
        isCookiesConsented,
        isLoginModalOpen,
        isOnlyLoggedModal,
        isParsingModalOpen,
        isParsingError,
        setOnlyLoggedModal,
        setLoginModal,
        setCookiesConsent,
        setParsingModal,
        predictionsRequestError,
    } = props

    const closeModal = () => {
        setLoginModal(false);
        setOnlyLoggedModal(false);
    };

    const handleCookies = () => {
        setCookiesConsent(true);
    };

    const showLoginModal = () => {
        setLoginModal(true);
    };

    const closeParsingModal = () => {
        setParsingModal(false)
    };

    const tryMore = () => {
        setParsingModal(false);
        predictionsRequestError(false);
    };


    return (
        <>
            <>
                {isLoginModalOpen && <LoginModal
                    isModalShown={isLoginModalOpen}
                    closeModal={closeModal}
                />}
                {isOnlyLoggedModal && <OnlyLoggedModal
                    isModalShown={isOnlyLoggedModal}
                    closeModal={closeModal}
                    showLoginModal={showLoginModal}
                />}
                {isParsingModalOpen && <ParsingModal
                    isModalShown={isParsingModalOpen}
                    closeModal={tryMore}
                    isParsingError={isParsingError}
                    tryMore={tryMore}
                />}
                <CookiesConsent
                    isVisible={!isCookiesConsented}
                    handleCookies={handleCookies}
                />
            </>
        </>
    );
};

interface ModalsState {
    userData: UserDataType
    appReducer: AppReducerType
    predictionsRequestHasErrored: boolean
}

export default connect((state: ModalsState) => ({
    isCookiesConsented: state.userData.isCookiesConsented,
    isLoginModalOpen: state.appReducer.isLoginModalOpen,
    isOnlyLoggedModal: state.appReducer.isOnlyLoggedModal,
    isParsingModalOpen: state.appReducer.isParsingModal,
    isParsingError: state.predictionsRequestHasErrored,
}), {setOnlyLoggedModal, setLoginModal, setCookiesConsent, setParsingModal, predictionsRequestError})(Modals);