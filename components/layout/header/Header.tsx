import {connect} from 'react-redux';
import {useMediaPredicate} from 'react-media-hook';
import {UserDataType} from '../../../reducers/userData'
import {clearUserData, setLoginModal} from '../../../actions/actionCreator';
import MobiHeader from '../../../components/mobi/header/MobiHeader';
import WebHeader from '../../../components/web/header/WebHeader';

import {Media} from "../../../media"

type HeaderProps = {
    isLoggedIn: boolean
    setLoginModal: (bool: boolean) => {}
    userEmail: string
    clearUserData: () => {}
}

const Header: React.FC<HeaderProps> = ({isLoggedIn, setLoginModal, userEmail, clearUserData}) => {

    const isTablet = useMediaPredicate('(max-width: 992px)');

    // isLoggedIn = true;
    // userEmail = 'test@mail'

    const handleLoginBtn = () => {
        if (isLoggedIn) {
            clearUserData();
        } else {
            console.log('xc')
        }
    };

    return (
        <>
            <Media greaterThanOrEqual="md">
                <WebHeader
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={userEmail}
                />
            </Media>
            <Media at="xs">
                <MobiHeader
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={userEmail}
                />
            </Media>
        </>
    );

};

interface HeaderState {
    userData: UserDataType
}

export default connect((state: HeaderState) => ({
    userEmail: state.userData.info.email,
    isLoggedIn: state.userData.auth.isLoggedIn,
}), {setLoginModal, clearUserData})(Header);