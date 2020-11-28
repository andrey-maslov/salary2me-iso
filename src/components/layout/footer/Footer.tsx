import { withTranslation } from '@i18n'
import style from './footer.module.scss'

const Footer: React.FC<{ t: any }> = ({ t }) => {

    return (
        <footer className={`${style.footer}`}>
            <div className="container">
                <div className={style.copy}>
                    © {new Date().getFullYear()} | {t('footer.copy')}
                </div>
            </div>
        </footer>
    )
}

export default withTranslation('common')(Footer)
