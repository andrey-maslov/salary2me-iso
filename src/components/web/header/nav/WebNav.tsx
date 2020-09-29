import {useState, useEffect} from 'react'
import {FiLogIn} from 'react-icons/fi'
import {Link, withTranslation} from "@i18n"
import {useRouter} from "next/router"
import style from './web-nav.module.scss'
import PopoverUser from '../../../layout/header/popover-user/PopoverUser'
import LangSwitcher from '../../../common/buttons/lang-switcher/LangSwitcher'

export type Navigation = {
    handleLoginBtn: () => void
    isLoggedIn: boolean
    userEmail: string
    t: any
}

const WebNav = ({handleLoginBtn, isLoggedIn, userEmail, t}: Navigation) => {

    const router = useRouter()
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        setLogged(isLoggedIn)
    }, [isLoggedIn])

    const MainNav = () => {
        return (
            <nav className={style.nav}>
                <ul>
                    <li className={router.pathname == "/" ? style.active : ""}>
                        <Link href="/">
                            <a>{t('common:nav.home')}</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/test" ? style.active : ""}>
                        <Link href="/test">
                            <a>{t('common:nav.test')}</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }

    return (
        <div className={style.wrapper}>
            <MainNav/>
            <LangSwitcher/>
            {logged ?
                <PopoverUser
                    userEmail={userEmail}
                    logoutHandle={handleLoginBtn}
                /> :
                <ul className={`${style.list} ${style.auth}`}>
                    <li>
                        <Link href="/login">
                            <a className={style.link}>{t('common:buttons.signin')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/registration">
                            <a className={style.link}>{t('common:buttons.signup')}</a>
                        </Link>
                    </li>
                </ul>
            }
        </div>
    )
}

export default withTranslation('common')(WebNav)