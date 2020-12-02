import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { Link, withTranslation } from '@i18n'
import Button from '../../../common/buttons/button/Button'
import style from './cookie-consent.module.scss'

const CookieConsent: React.FC<{ t: any }> = ({ t }) => {
    const [isConsented, setConsented] = useState(false)

    useEffect(() => {
        const consent = Cookie.get('cookie-consent')
        if (consent) {
            setConsented(true)
        }
    }, [])

    if (isConsented) {
        return null
    }

    return (
        <div className={style.popup}>
            <div className={style.content}>
                <p>{t('common:cookie_consent.text')}</p>
                <Link href="/policies/cookie-policy">
                    <a className={style.policyLink}>{t('common:cookie_consent.title')}</a>
                </Link>
                <Button
                    title={t('common:buttons.agree')}
                    btnClass="btn-outlined btn"
                    handle={handleCookiesConsent}
                />
            </div>
        </div>
    )

    function handleCookiesConsent() {
        setConsented(true)
        Cookie.set('cookie-consent', 'OK')
    }
}

export default withTranslation('common')(CookieConsent)
