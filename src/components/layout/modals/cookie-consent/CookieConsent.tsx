import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { Link, withTranslation } from '@i18n'
import Button from '../../../common/buttons/button/Button'
import style from './cookie-consent.module.scss'

const cookiesConsentText =
    "We care about your data, and we'd use cookies only to improve your experience. Privacy settings & policy."

const CookieConsent: React.FC<{ t: any }> = ({ t }) => {
    const [isConsented, setConsented] = useState(false)

    useEffect(() => {
        const consent = Cookie.get('cookie-consent')
        consent && setConsented(true)
    }, [])

    if (isConsented) {
        return null
    }

    return (
        <div className={style.popup}>
            <div className={style.content}>
                {/* <p>{t('common:cookie_consent.text')}</p> */}
                <p>{cookiesConsentText}</p>
                <Link href="/policies/cookie-policy">
                    <a className={style.policyLink}>cookie policy</a>
                </Link>
                <Button
                    // title={t('common:buttons.agree')}
                    title="Agree"
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
