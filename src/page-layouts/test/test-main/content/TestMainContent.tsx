import { Link, withTranslation } from '@i18n'
import { useMediaPredicate } from 'react-media-hook'
import style from './main.module.scss'
import RobotQuestion from '../../../../components/common/media/robots/robot-question/RobotQuestion'

const TestMainContent: React.FC<{ t }> = ({ t }) => {
    const isDesktop = useMediaPredicate('(min-width: 1360px)')

    return (
        <div className="pt-lg pb-lg">
            <div className="container">
                <div className="row middle-xs">
                    <div className="col-xl-5">
                        <div className="robot">{isDesktop && <RobotQuestion />}</div>
                    </div>
                    <div className="col-xl-7">
                        <div className={style.content}>
                            <p className={style.pretitle}>{t('test:page.pretitle')}</p>
                            <h1>{t('test:page.title')}</h1>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: t('test:page.content', { returnObjects: true })
                                }}
                            />
                        </div>
                        <Link href="/test/questions">
                            <a className="btn btn-accent">{t('common:buttons.start_test')}</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('test')(TestMainContent)
