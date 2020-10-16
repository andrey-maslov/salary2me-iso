import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import OutsideClickHandler from 'react-outside-click-handler'
import { i18n } from '@i18n'
import { LANGS } from '../../../../constants/constants'
import { SVGFlag } from '../../media/svgflag/SVGFlag'
import { Popover } from '../../popovers/Popover'
import style from './lang-switcher.module.scss'
import { fetchContent, fetchTerms } from '../../../../actions/actionCreator'

const LangSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const { language } = i18n

    const outsideClickHandler = () => {
        if (isOpen) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        dispatch(fetchTerms(language))
        dispatch(fetchContent(language))
    }, [dispatch, language])

    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng).then(res => {
            dispatch(fetchTerms(lng))
            dispatch(fetchContent(lng))
            if (isOpen) {
                setIsOpen(false)
            }
        })
    }

    return (
        <OutsideClickHandler onOutsideClick={outsideClickHandler}>
            <div className={style.wrapper}>
                <button
                    className={`${style.btn} lang-btn`}
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                    suppressHydrationWarning>
                    <SVGFlag id={language} tagClass={style.flag} />
                    {language}
                </button>

                <Popover isVisible={isOpen} className="lang-popover">
                    <ul className={style.links}>
                        {LANGS.map(lang => {
                            let activeClass = ''
                            if (lang === language) {
                                activeClass = 'current'
                            }
                            return (
                                <li
                                    key={lang}
                                    className={`${style.item} ${
                                        activeClass ? style[activeClass] : ''
                                    }`}>
                                    <button
                                        className={style.switcher}
                                        onClick={() => {
                                            changeLanguage(lang)
                                        }}>
                                        <SVGFlag id={lang} tagClass={style.flag} />
                                        {lang}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </Popover>
            </div>
        </OutsideClickHandler>
    )
}

export default LangSwitcher
