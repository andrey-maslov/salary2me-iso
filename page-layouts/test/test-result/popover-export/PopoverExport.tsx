import React, { useState } from 'react'
import ExportResult from '../export-result/ExportResult'
import style from './popover-export.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import ButtonMore from "../../../../components/common/buttons/button-more/ButtonMore";

const PopoverExport: React.FC = () => {

    const {t} = useTranslation()
    const personalInfo = useSelector((state: any) => state.userData.personalInfo)
    const testData = useSelector((state: any) => state.userData.testData)
    const fullResult = [personalInfo, testData]
    const [state, setState] = useState({isOpen: false})

    const closeMore = () => {
        setState({...state, isOpen: false})
    }

    const btnMoreHandler = () => {
        if (state.isOpen) {
            closeMore()
        } else {
            setState({...state, isOpen: true})
        }
    }

    const outsideMoreHandler = () => {
        if (state.isOpen) {
            closeMore()
        }
    }

    return (
        <OutsideClickHandler onOutsideClick={outsideMoreHandler}>
            <div className={style.moreBtn}>
                <ButtonMore
                    handler={btnMoreHandler}
                    isOpened={state.isOpen}
                    title={t('common:result_page.export')}
                />
            </div>
            <div className={`${style.body} ${state.isOpen ? style.opened : ''}`}>
                <ExportResult
                    data={btoa(JSON.stringify(fullResult))}
                />
            </div>
        </OutsideClickHandler>
    )
}

export default PopoverExport