import { FiMail, FiMapPin } from 'react-icons/fi'
import { Link, withTranslation } from '@i18n'
import { HOST, SITE_TITLE } from '../../../constants/constants'
import SocialSharing from '../../common/buttons/social-sharing/SocialSharing'
import style from './footer.module.scss'

const Footer: React.FC<{ t: any }> = ({ t }) => {
    const links = [
        {
            link: '/policies/privacy-policy',
            title: t('common:nav.privacy_policy')
        },
        {
            link: '/terms',
            title: t('common:nav.terms')
        },
        {
            link: '/policies/cookie-policy',
            title: t('common:nav.cookie')
        }
    ]

    return (
        <footer className={`${style.footer} pt-lg`}>
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-4">
                        <div className={style.widget}>
                            <h5 className={style.title}>{SITE_TITLE}</h5>
                            <p className={style.content}>{t('footer.sharing_text')}</p>
                            <div className={style.sharing}>
                                <SocialSharing url={HOST} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 offset-xl-1">
                        <div className={style.widget}>
                            <h5 className={style.title}>{t('common:footer.info')}</h5>
                            <ul className={style.list}>
                                {links.map(({ link, title }) => (
                                    <li className={style.item} key={title}>
                                        <Link href={link}>
                                            <a>{title}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className={`${style.widget} ${style.contacts}`}>
                            <h5 className={style.title}>{t('common:footer.contacts')}</h5>
                            <ul className={style.list}>
                                <li className={style.item}>
                                    <a href="mailto:contact@salary2.me" className={style.email}>
                                        <FiMail />
                                        contact@salary2.me
                                    </a>
                                </li>
                                <li className={style.item}>
                                    <address className={style.address}>
                                        <FiMapPin />
                                        {t('footer.address')}
                                    </address>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={style.copy}>
                    © {new Date().getFullYear()} | {t('footer.copy')}
                </div>
            </div>
        </footer>
    )
}

export default withTranslation('common')(Footer)
