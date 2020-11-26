import { withTranslation } from '@i18n'
import style from './about.module.scss'

type AboutSectionType = {
    t: any
}

const AboutSection: React.FC<AboutSectionType> = ({ t }) => {
    const contentList = t('main:about.content_list', { returnObjects: true })
    
    return (
        <section className={`${style.wrapper} section`}>
            <div className="container">
                <h2 className="section-title">{t('main:about.title')}</h2>
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
                        <div className="fade-in">
                            {Array.isArray(contentList) &&
                                contentList.map((item, i) => <p key={`${i}`}>{item}</p>)}
                            <a href="mailto:contact@salary2.me">contact@salary2.me</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withTranslation('main')(AboutSection)
