import {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { LANGS } from '../../../../constants/constants';
import { SVGFlag } from '../../media/svgflag/SVGFlag';
import { Popover } from '../../popovers/Popover';
import { i18n } from '@i18n';
import {UserDataType} from '../../../../reducers/userData'
import style from './lang-switcher.module.scss';

interface LangSwitcherProps {
    fetchTerms: (language: string) => {}
}

const LangSwitcher: React.FC<LangSwitcherProps> = () => {

    const [isOpen, setIsOpen] = useState(false);

    const outsideClickHandler = () => {
        if (isOpen) {
            setIsOpen(false)
        }
    }

    const currentLang = i18n.language;

    const changeLanguage = (lng: any) => {

        i18n.changeLanguage(lng)
            .then(res => {
                if (isOpen) {
                    setIsOpen(false)
                }
            })
    };

    const currLang = i18n.language;

    // useEffect(() => {
    //     let lng = currentLang === 'ru' ? 'ru' : 'en'
    // }, [])


    return (
        <OutsideClickHandler
            onOutsideClick={outsideClickHandler}
        >
            <div className={style.wrapper}>
                <div
                    className={style.btn}
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                    suppressHydrationWarning={true}
                >
                    <SVGFlag id={currLang} tagClass={style.flag}/>
                    {currLang}
                </div>

                <Popover isVisible={isOpen} className='lang-popover'>
                    <ul className={style.links}>
                        {LANGS.map(lang => {
                            let activeClass = '';
                            if (lang === currLang) {
                                activeClass = 'current';
                            }
                            return <li key={lang} className={`${style.item} ${activeClass ? style[activeClass] : ''}`}>
                                <a className={style.switcher}
                                    // href={`?lng=${lang}`}
                                    onClick={()=> {changeLanguage(lang)}}
                                >
                                    <SVGFlag id={lang} tagClass={style.flag}/>
                                    {lang}
                                </a>
                            </li>
                        })}
                    </ul>
                </Popover>
            </div>
        </OutsideClickHandler>
    );
}

interface LangSwitcherState {
    userData: UserDataType
}

export default connect((state: LangSwitcherState) => ({
    // currentLang: state.userData.language
}), {})(LangSwitcher);