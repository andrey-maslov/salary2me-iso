import { useState } from 'react'
import { FiUser, FiUserCheck, FiLogOut, FiChevronDown, FiSettings } from 'react-icons/fi'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link, withTranslation } from '@i18n'
import { Popover } from '../../../common/popovers/Popover'
import style from './popover-user.module.scss'

interface PopoverUserProps {
    userEmail: string
    logoutHandle: () => void
    t: any
}

const PopoverUser: React.FC<PopoverUserProps> = ({ userEmail, logoutHandle, t }) => {
    const [isOpen, setIsOpen] = useState(false)

    const outsideClickHandler = () => {
        if (isOpen) {
            setIsOpen(false)
        }
    }

    return (
        <OutsideClickHandler onOutsideClick={outsideClickHandler}>
            <div className={style.wrapper}>
                <button
                    className={style.btn}
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}>
                    <FiUser />
                    <FiChevronDown />
                </button>

                <Popover isVisible={isOpen} className="user-popover">
                    <div className={`${style.top} ${style.item}`}>
                        <FiUserCheck />
                        <span>{userEmail}</span>
                    </div>

                    <ul className={style.links}>
                        <li>
                            <Link href="/profile">
                                <a className={`${style.item}`}>
                                    <FiSettings />
                                    <span>{t('common:account')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <button className={style.item} onClick={logoutHandle}>
                                <FiLogOut />
                                <span>{t('common:signout')}</span>
                            </button>
                        </li>
                    </ul>
                </Popover>
            </div>
        </OutsideClickHandler>
    )
}

export default withTranslation('common')(PopoverUser)
