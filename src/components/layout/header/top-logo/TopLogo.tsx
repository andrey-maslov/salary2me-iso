import style from './top-logo.module.scss'
import {Link} from "@i18n"

export default function TopLogo() {

    return (
        <div className={style.logo}>
            <Link href="/">
                <a>
                    <img
                        srcSet={"/img/salary-logo@2x.png 2x"}
                        src={"/img/salary-logo.png"}
                        alt="results"
                    />
                </a>
            </Link>
        </div>
    )
}