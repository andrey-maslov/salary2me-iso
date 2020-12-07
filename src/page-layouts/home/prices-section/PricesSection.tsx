import { Link, withTranslation } from '@i18n'
import { FiExternalLink } from 'react-icons/fi'
import style from './prices.module.scss'

interface IPricesSection {
    t: any
}

const PricesSection: React.FC<IPricesSection> = ({ t }) => {

    return (
        <div className={`${style.wrapper}`}>
            <div className="container">
                <div className="row between-xs">
                    <div className="col-lg-6">
                        <section className="section">
                            <div className={`section-headline ${style.headline}`}>
                                <h2 className="section-title">{t('main:prices.title')}</h2>
                                <p className="section-desc">{t('main:prices.desc')}</p>
                            </div>
                            <Link href="/">
                                <a className="btn btn-accent">{t('main:prices.btn_cta')}</a>
                            </Link>
                        </section>
                    </div>
                    <div className="col-lg-5">
                        <div className={style.imgWrapper} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('main')(PricesSection)
