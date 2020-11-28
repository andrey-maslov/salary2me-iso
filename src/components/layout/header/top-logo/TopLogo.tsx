import { Link } from '@i18n'
import style from './top-logo.module.scss'

export default function TopLogo() {
    return (
        <div className={style.logo}>
            <Link href="/">
                <a>
                    <img srcSet="/img/test_logo@2x.png 2x" src="/img/test_logo.png" alt="results" />
                    <span>PsyTest</span>
                </a>
            </Link>
        </div>
    )
}
