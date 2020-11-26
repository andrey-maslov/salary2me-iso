import { Link, withTranslation } from '@i18n'
import { FiExternalLink } from 'react-icons/fi'
import style from './prices.module.scss'

interface IPricesSection {
    t: any
}

const PricesSection: React.FC<IPricesSection> = ({ t }) => {
    const desc =
        'Использование этого сервиса совершенно бесплатно. Однако, если Вы не хотите, чтобы Ваше резюме находилось в открытом доступе, то нужно оплатить годовую подписку в размере $2.99'

    return (
        <div className={`${style.wrapper}`}>
            <div className="container">
                <div className="row between-xs">
                    <div className="col-lg-6">
                        <section className="section">
                            <div className={`section-headline ${style.headline}`}>
                                <h2 className="section-title">Ценовая политика</h2>
                                <p className="section-desc">{desc}</p>
                            </div>
                            <Link href="/">
                                <a className="btn btn-accent">Купить подписку</a>
                            </Link>
                        </section>
                    </div>
                    <div className="col-lg-5">
                        <div className={style.imgWrapper} />
                        {/* <img */}
                        {/*    className={`img-fluid ${style.image}`} */}
                        {/*    srcSet="/img/landing/robot_happy@2x.png 2x" */}
                        {/*    src="/img/landing/robot_happy.png" */}
                        {/*    alt="test result" */}
                        {/* /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('common', 'main')(PricesSection)
