import {Link, withTranslation} from '@i18n'
import style from './main.module.scss'
import RobotQuestion from "../../../../components/common/media/robots/robot-question/RobotQuestion"


const TestMainContent: React.FC<{ t }> = ({t}) => {

    return (
        <div className={style.wrapper}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="robot">
                            <RobotQuestion/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className={style.content}>
                            <p>{t('test:page.pretitle')}</p>
                            <h1>{t('test:page.title')}</h1>
                            <div
                                dangerouslySetInnerHTML={{__html: t('test:page.content',  { returnObjects: true})}}
                            />
                        </div>
                        <Link href='/test/questions'>
                            <a className={`btn btn-accent`}>{t('common:buttons.start_test')}</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('test')(TestMainContent)