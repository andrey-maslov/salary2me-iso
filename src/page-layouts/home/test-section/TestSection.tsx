import { Link, withTranslation } from '@i18n'
import style from './test-section.module.scss'

interface ITestSection {
    t: any
}

const TestSection: React.FC<ITestSection> = ({ t }) => {
    const items = t('main:test.features_list', { returnObjects: true })

    return (
        <div className={`${style.wrapper} section`}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col-lg-7">
                        <div className="section-headline">
                            <h2 className="text-center section-title">{t('main:test.title')}</h2>
                            <p className="section-desc">{t('main:test.desc')}</p>
                        </div>
                    </div>
                </div>
                <div className="row between-xs middle-xs">
                    <div className="col-lg-6">
                        <div className={style.images}>
                            <img
                                className={`img-fluid ${style.image}`}
                                srcSet="/img/landing/test_result@2x.png 2x"
                                src="/img/landing/test_result.png"
                                alt={t('main:test.title')}
                            />
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <h3>{t('main:test.features_title')}</h3>
                        <ul className={style.list}>
                            {Array.isArray(items) &&
                                items.map((item, i) => (
                                    <li key={`${i}`} className={style.item}>
                                        <p>{item}</p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('main')(TestSection)
