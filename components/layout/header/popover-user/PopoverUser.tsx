import {useState} from 'react';
import {FiUser, FiUserCheck, FiLogOut, FiChevronDown, FiDollarSign} from "react-icons/fi";
import {Popover} from "../../../common/popovers/Popover";
import OutsideClickHandler from 'react-outside-click-handler';
import {Link} from '@i18n';
import style from "./popover-user.module.scss";

interface PopoverUserProps {
    userEmail: string
    logoutHandle: () => void
}

const PopoverUser: React.FC<PopoverUserProps> = ({userEmail, logoutHandle}) => {

    const [isOpen, setIsOpen] = useState(false);

    const outsideClickHandler = () => {
        if (isOpen) {
            setIsOpen(false)
        }
    }

    return (
        <OutsideClickHandler
            onOutsideClick={outsideClickHandler}
        >
            <div className={style.wrapper}>

                <button className={style.btn} onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                    <FiUser/>
                    <FiChevronDown/>
                </button>

                <Popover isVisible={isOpen} className='user-popover'>
                    <ul className={style.links}>
                        <li>
                            <Link href={'/profile'}>
                                <a className={`${style.item} ${style.creds}`}>
                                    <FiUserCheck/>
                                    <span>{userEmail}</span>
                                </a>
                            </Link>
                        </li>
                    </ul>

                    <ul className={style.links}>
                        <li>
                            <Link href={'/results'}>
                                <a className={style.item}>
                                    <FiDollarSign/>
                                    <span>My salaries</span>
                                </a>
                            </Link>
                        </li>
                    </ul>

                    <ul className={style.links}>
                        <li>
                            <div className={style.item} onClick={logoutHandle}>
                                <FiLogOut/>
                                <span>Logout</span>
                            </div>
                        </li>
                    </ul>
                </Popover>
            </div>
        </OutsideClickHandler>
    );
}

export default PopoverUser;