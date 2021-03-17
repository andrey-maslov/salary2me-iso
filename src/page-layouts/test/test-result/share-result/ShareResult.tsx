import { withTranslation, Link } from '@i18n'
import { FiExternalLink } from 'react-icons/fi'
import CodeBox from '../../../../components/common/code-box/CodeBox'
import style from './share.module.scss'
import SocialSharing from '../../../../components/common/buttons/social-sharing/SocialSharing'
import { COOP_URL, HOST } from '../../../../constants/constants'

interface IShareResult {
    encData: string
    isLoggedIn: boolean
    t: any
}

function ShareResult({ t, encData, isLoggedIn }: IShareResult) {
    const host = typeof window !== 'undefined' ? window.location.host : ''
    return (
        <div className="row">
            <div className="col-sm-6">
                <h4>{t('test:result_page.export_result_title')}</h4>
                <div className={style.desc}>{t('test:result_page.export_result_desc')}</div>
                <div className={style.code}>
                    <CodeBox
                        content={`https://${host}/test/result?encdata=${encData}`}
                        btnLabel={t('test:result_page.copy_link')}
                    />
                </div>
                <div className={style.team}>
                    <p>{t('test:result_page.go_to_pair_coop')}</p>
                    <div>
                        <img
                            src="/img/tc-logo.png"
                            srcSet="/img/tc-logo@2x.png 2x"
                            className="img-responsive"
                            alt="teamconstructor"
                        />
                        <a
                            href={`${COOP_URL}/pair?encdata=${encData}`}
                            className="btn btn-outlined"
                            target="_blank"
                            rel="noopener noreferrer">
                            {t('test:result_page.go')}
                            <FiExternalLink />
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <h4>{t('test:result_page.share_to_social')}</h4>
                <div className="result-share">
                    <SocialSharing url={`https://salary2.me/test/result?encdata=${encData}`} />
                </div>
            </div>
            {!isLoggedIn && (
                <div className="col-sm-12">
                    <div className={style.bottom}>
                        <div>{t('test:result_page.auth_user_possibility')}</div>
                        <div>
                            {t('test:result_page.go_to')}{' '}
                            <Link href="/registration">
                                <a>{t('test:result_page.auth')}</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default withTranslation(['test'])(ShareResult)
