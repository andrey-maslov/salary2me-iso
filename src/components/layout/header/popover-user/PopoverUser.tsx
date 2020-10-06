import {useState} from 'react'
import {FiUser, FiUserCheck, FiLogOut, FiChevronDown, FiSettings} from "react-icons/fi"
import {Popover} from "../../../common/popovers/Popover"
import OutsideClickHandler from 'react-outside-click-handler'
import {Link} from '@i18n'
import style from "./popover-user.module.scss"

interface PopoverUserProps {
    userEmail: string
    logoutHandle: () => void
}

const PopoverUser: React.FC<PopoverUserProps> = ({userEmail, logoutHandle}) => {

    const [isOpen, setIsOpen] = useState(false)

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

                    <div className={`${style.top} ${style.item}`}>
                        <FiUserCheck/>
                        <span>{userEmail}</span>
                    </div>

                    <ul className={style.links}>
                        <li>
                            <Link href={'/profile'}>
                                <a className={`${style.item} ${style.creds}`}>
                                    <FiSettings/>
                                    <span>Account settings</span>
                                </a>
                            </Link>
                        </li>
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

export default PopoverUser