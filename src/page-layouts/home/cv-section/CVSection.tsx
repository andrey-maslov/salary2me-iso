import { Link, withTranslation } from '@i18n'
import style from './cv-section.module.scss'

interface ICVSection {
    t: any
}

const CVSection: React.FC<ICVSection> = ({ t }) => {
    return (
        <section className={`${style.wrapper} section`}>
            <div className="container">
                <h2>Оценка резюме</h2>
                <div className="row between-xs middle-xs">
                    <div className="col-lg-7">
                        CV Section
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withTranslation('common', 'main')(CVSection)
