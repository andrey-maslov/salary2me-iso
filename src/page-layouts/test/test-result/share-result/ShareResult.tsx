import { withTranslation, Link } from '@i18n'
import { FiExternalLink } from 'react-icons/fi'
import CodeBox from '../../../../components/common/code-box/CodeBox'
import style from './share.module.scss'
import SocialSharing from '../../../../components/common/buttons/social-sharing/SocialSharing'

interface IShareResult {
    encData: string
    isLoggedIn: boolean
    t: any
}

function ShareResult({ t, encData, isLoggedIn }: IShareResult) {
    return (
        <div className="row">
            <div className="col-sm-6">
                <h4>{t('test:result_page.export_result_title')}</h4>
                <div className={style.desc}>{t('test:result_page.export_result_desc')}</div>
                <div className={style.code}>
                    <CodeBox
                        content={`${process.env.HOST}/test/result?encdata=${encData}`}
                        btnLabel="Скопировать ссылку"
                    />
                </div>
                <div className={style.team}>
                    <p>Здесь Вы можете сразу перейти к оценке эффективности вашей пары</p>
                    <div>
                        <img
                            src="/img/tc-logo.png"
                            srcSet="/img/tc-logo.png 2x"
                            className="img-responsive"
                            alt="teamconstructor"
                        />
                        <a
                            href={`${process.env.COOP_URL}?encdata=${encData}`}
                            className="btn btn-outlined"
                            target="_blank"
                            rel="noopener noreferrer">
                            Перейти
                            <FiExternalLink/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <h4>Поделитесь с друзьями в социальных сетях</h4>
                <div className="result-share">
                    <SocialSharing url={`${process.env.HOST}/test/result?encdata=${encData}`}/>
                </div>
            </div>
            {!isLoggedIn && (
                <div className="col-sm-12">
                    <div className={style.bottom}>
                        <div>
                            *Зарегистрированные пользователи могут сохранить результат в своем
                            личном кабинете и экспортировать его в PDF.
                        </div>
                        <div>
                            Перейти к{' '}
                            <Link href="/registration">
                                <a>Регистрации</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default withTranslation(['test'])(ShareResult)
