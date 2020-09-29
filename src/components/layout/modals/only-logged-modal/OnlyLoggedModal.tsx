import Rodal from "rodal";
import {FaExclamationCircle} from 'react-icons/fa';
import style from "./alert-only-logged.module.scss";
import {IModalProps} from '../../../../typings/types'

interface IOnlyLoggedModalProps extends IModalProps {
    showLoginModal: () => void
}

export const OnlyLoggedModal: React.FC<IOnlyLoggedModalProps> = ({isModalShown, closeModal, showLoginModal}) => {

    const handleLoginBtn = () => {
        closeModal();
        showLoginModal();
    };

    return (
        <Rodal
            className='only-login-modal'
            visible={isModalShown}
            onClose={() => {closeModal()}}
        >
            <div className={style.content}>
                <div className={style.iconWrap}>
                    <FaExclamationCircle className={style.icon}/>
                </div>
                <p>This feature is only available for authorised&nbsp;users.<br/>
                <span onClick={handleLoginBtn}>Login</span>
                </p>
            </div>
        </Rodal>
    )
};
