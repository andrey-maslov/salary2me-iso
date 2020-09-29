import React, { useState } from 'react'
import {withTranslation} from "@i18n"
import ExportResult from '../export-result/ExportResult'
import style from './popover-export.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'
import {useSelector} from 'react-redux'
import ButtonMore from "../../../../components/common/buttons/button-more/ButtonMore"
import {globalStoreType} from "../../../../typings/types"

type PopoverExportProps = {
    t: any
}

const PopoverExport: React.FC<PopoverExportProps> = ({t}) => {

    const {personalInfo, testData} = useSelector((state: globalStoreType) => state.test)
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
                    title={t('test:result_page.export')}
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

export default withTranslation('test')(PopoverExport)