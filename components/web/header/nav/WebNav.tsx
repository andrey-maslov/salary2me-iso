import { FiLogIn } from 'react-icons/fi'
import {Link, withTranslation} from "@i18n"
import { useRouter } from "next/router"
import Button from '../../../common/buttons/button/Button'
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

    console.log(router)

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

    if (isLoggedIn) {
        return (
            <div className={style.wrapper}>
                <MainNav/>
                <LangSwitcher/>
                <PopoverUser
                    userEmail={userEmail}
                    logoutHandle={handleLoginBtn}
                />
            </div>
        )
    }

    return (
        <div className={style.nav}>
            <MainNav/>
            <LangSwitcher/>
            <Button
                handle={handleLoginBtn}
                btnClass='btn-accent'
                title={t('buttons.login')}
                startIcon={<FiLogIn/>}
            />
        </div>
    )
}

export default withTranslation('common')(WebNav)