import React, { useState } from 'react'
import { withTranslation } from '@i18n'
import OutsideClickHandler from 'react-outside-click-handler'
import { useSelector } from 'react-redux'
import ExportResult from '../export-result/ExportResult'
import style from './popover-export.module.scss'
import ButtonMore from '../../../../components/common/buttons/button-more/ButtonMore'
import { globalStoreType } from '../../../../typings/types'

type PopoverExportProps = {
    t: any
}

const PopoverExport: React.FC<PopoverExportProps> = ({ t }) => {
    const { personalInfo, testData } = useSelector((state: globalStoreType) => state.test)
    const fullResult = [personalInfo, testData]
    const [isOpen, setOpen] = useState(false)

    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className={style.btn}>
                <ButtonMore
                    handler={() => setOpen(!isOpen)}
                    isOpened={isOpen}
                    title={t('test:result_page.export')}
                />
            </div>
            {isOpen && (
                <div className={style.body}>
                    <ExportResult data={btoa(JSON.stringify(fullResult))} />
                </div>
            )}
        </OutsideClickHandler>
    )
}

export default withTranslation('test')(PopoverExport)
