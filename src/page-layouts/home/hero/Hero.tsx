import { Link, withTranslation } from '@i18n'
import RobotWide from '../../../components/common/media/robots/robot-wide/RobotWide'
import RobotTall from '../../../components/common/media/robots/robot-tall/RobotTall'
import Dropzone from '../../../components/common/dropzone/Dropzone'

import style from './hero.module.scss'

type HeroType = {
    t: any
}

const Hero: React.FC<HeroType> = ({ t }) => {
    return (
        <div className={`${style.wrapper} pt-lg pb-lg`}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col-xl-7 col-lg-9 text-center">
                        <div className={style.headline}>
                            <h1
                                className={style.title}
                                dangerouslySetInnerHTML={{ __html: t('main:hero.title') }}
                            />
                            <p className={style.desc}>{t('main:hero.subtitle')}</p>
                            <Link href="/registration">
                                <a className={`btn btn-accent ${style.btn}`}>
                                    {t('main:hero.btn_cta')}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row between-xs bottom-xs">
                    <div className="col-lg-6">
                        <div className={style.dropzone} id="upload">
                            <div className={style.desc}>
                                <p>{t('main:dropzone.desc')}</p>
                            </div>
                            <Dropzone />
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6">
                        <div className={style.robots}>
                            <RobotWide />
                            <RobotTall />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('main')(Hero)
