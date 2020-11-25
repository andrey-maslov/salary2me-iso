import { withTranslation } from '@i18n'
import style from './about.module.scss'

type AboutSectionType = {
    t: any
}

const AboutSection: React.FC<AboutSectionType> = ({ t }) => {
    return (
        <section className={`${style.wrapper} section`}>
            <div className="container">
                <div className="row between-xs middle-xs">
                    <div className="col-lg-7">
                        <img
                            className={`img-fluid ${style.image}`}
                            srcSet="/img/macbook@2x.png 2x"
                            src="/img/macbook.png"
                            alt="results"
                        />
                    </div>
                    <div className="col-lg-5">
                        <div
                            className="fade-in"
                            dangerouslySetInnerHTML={{ __html: t('main:content') }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withTranslation('main')(AboutSection)
