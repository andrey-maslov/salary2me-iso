import { Link, withTranslation } from '@i18n'
import style from './features.module.scss'

interface IFeaturesSection {
    t: any
}

const FeaturesSection: React.FC<IFeaturesSection> = ({ t }) => {
    return (
        <div className={`${style.wrapper} pb-lg pt-sm`}>
            <div className="container">
                <div className="row between-xs middle-xs">
                    <div className="col-lg-7">
                        Features Section
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('common', 'main')(FeaturesSection)
