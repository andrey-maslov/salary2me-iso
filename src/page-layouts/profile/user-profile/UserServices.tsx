import { Link, withTranslation } from '@i18n'
import { useSelector } from 'react-redux'
import { RiQrCodeLine } from 'react-icons/ri'
import { FiExternalLink } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import style from './profile.module.scss'
import Service from './service/Service'
import CodeBox from '../../../components/common/code-box/CodeBox'
import Button from '../../../components/common/buttons/button/Button'
import { globalStoreType } from '../../../typings/types'
import { COOP_URL, TGB_URL } from '../../../constants/constants'
import { fetchUsersBillingData } from '../../../actions/api/subscriptionsAPI'
import { encodeDataForURL, encodeData } from "../../../helper/helper";

const UserServices = ({ t }) => {
    const [isQRCode, setQRCode] = useState(false)
    const [usersTariffs, setUsersTariffs] = useState({
        tgb: null,
        tc: null
    })
    const { personalInfo, testData } = useSelector((state: globalStoreType) => state.test)

    const host = typeof window !== 'undefined' ? window.location.host : ''

    useEffect(() => {
        let tgb = '';
        let tc = '';
        fetchUsersBillingData().then(data => {
            data.forEach(item => {
                if (item?.membershipPlan?.service === 0 || item?.membershipPlan?.service === 1) {
                    tgb = item.membershipPlan.title
                } else if (item?.membershipPlan?.service === 2) {
                    tc = item.membershipPlan.title
                }
            })
            setUsersTariffs({ tgb, tc })
        })
    }, [])

    const isTestPassed = testData && personalInfo
    const encData: string | null = isTestPassed ? encodeData([personalInfo, testData]) : null
    const encDataForUrl: string | null = isTestPassed ? encodeDataForURL([personalInfo, testData]) : null

    const pairLink = `${COOP_URL}/pair${isTestPassed ? `?encdata=${encDataForUrl}` : ''}`
    const QRValue = `https://${host}/test/result?encdata=${encDataForUrl}`

    return (
        <div className={`${style.box} ${style.services}`}>
            <h5 className={style.box_title}>{t('profile:services')}</h5>
            <Service
                service={{ title: 'salary2me', link: '/' }}
                ancillaryLinks={null}
                tariff={t('profile:billing.free')}>
                {/* TODO will be used with the next iteration */}
                {/* <div className={`${style.item} flex between-xs`}> */}
                {/*    <Link href="/resume"> */}
                {/*        <a>{t('profile:cv')}</a> */}
                {/*    </Link> */}
                {/*    <FaFilePdf /> */}
                {/* </div> */}
                <div className={`${style.item} flex between-xs`}>
                    <h4 className={style.itemTitle}>{t('profile:cv_est')}</h4>
                    <Link href="/estimation">
                        <a>{t('profile:cv_est_cities')}</a>
                    </Link>
                </div>
                <div className={`${style.item}`}>
                    <h4 className={style.itemTitle}>{t('profile:psycho_profile')}</h4>
                    {isTestPassed && (
                        <>
                            <p style={{ marginBottom: '1rem' }}>{t('profile:enc_result')}</p>
                            <div style={{ marginBottom: '1rem' }}>
                                <CodeBox content={encData} />
                            </div>
                        </>
                    )}
                    {isTestPassed ? (
                        <div className={style.goToProfile}>
                            {!isQRCode ? (
                                <div>
                                    <Link href={`/test/result?encdata=${encDataForUrl}`}>
                                        <a>{t('profile:go_to_psycho_profile')}</a>
                                    </Link>
                                </div>
                            ) : (
                                <div className={style.qr}>
                                    <QRCode value={QRValue} size={160} />
                                </div>
                            )}
                            <Button
                                title=""
                                btnClass="btn btn-outlined"
                                startIcon={<RiQrCodeLine />}
                                handle={() => setQRCode(!isQRCode)}
                            />
                        </div>
                    ) : (
                        <Link href="/test">
                            <a>{t('profile:take_the_test')}</a>
                        </Link>
                    )}
                </div>
            </Service>

            <Service
                service={{ title: 'teamconstructor', link: COOP_URL }}
                ancillaryLinks={[
                    { title: t('profile:billing.manage_subscr'), url: `${COOP_URL}/billing` }
                ]}
                tariff={usersTariffs.tc || t('profile:billing.free')}>
                <div className={`${style.item} flex between-xs`}>
                    <a href={pairLink} target="_blank" rel="noopener noreferrer">
                        {t('profile:pair_analysis')}
                    </a>
                    <FiExternalLink />
                </div>
                {usersTariffs.tc && <div className={`${style.item} flex between-xs`}>
                    <a href={`${COOP_URL}/team`} target="_blank" rel="noopener noreferrer">
                        {t('profile:go_to_team')}
                    </a>
                    <FiExternalLink />
                </div>}
            </Service>

            {usersTariffs.tgb && <Service
                service={{ title: 'thegreatbase', link: TGB_URL }}
                ancillaryLinks={[
                    {
                        title: t('profile:billing.manage_subscr'),
                        url: `${TGB_URL}/Voter/MembershipPlans`
                    }
                ]}
                tariff={usersTariffs.tgb || t('profile:billing.free')}>
                <div className={`${style.item} flex between-xs`}>
                    <a href={`${TGB_URL}/Identity/Account/Manage`} target="_blank" rel="noopener noreferrer">
                        {t('profile:go_to_dashboard')}
                    </a>
                    <FiExternalLink />
                </div>
            </Service>}
        </div>
    )
}

export default withTranslation('profile')(UserServices)
