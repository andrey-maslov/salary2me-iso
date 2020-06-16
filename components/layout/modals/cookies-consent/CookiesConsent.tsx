import {Link} from "@i18n";
import style from './cookies-consent.module.scss';
import Button from "../../../common/buttons/button/Button";

const cookiesConsentText = 'We care about your data, and we\'d use cookies only to improve your experience. Privacy settings & policy.';

interface CookiesConsentProps {
    isVisible: boolean
    handleCookies: () => void
}

export const CookiesConsent: React.FC<CookiesConsentProps> = ({isVisible, handleCookies}) => {

    if (!isVisible) {
        return null
    }

    return (
        <div className={style.popup}>
            <div className={style.content}>
                <p>{cookiesConsentText}</p>
                <Link href={'/cookie-policy'}>
                    <a className={style.policyLink}>Cookie Policy</a>
                </Link>
                <Button
                    title="I Agree"
                    btnClass="btn-accent btn"
                    handle={handleCookies}
                />
            </div>
        </div>
    )
};
