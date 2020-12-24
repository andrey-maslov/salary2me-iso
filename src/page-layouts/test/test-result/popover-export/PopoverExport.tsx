import React, { useState } from 'react'
import { withTranslation } from '@i18n'
import OutsideClickHandler from 'react-outside-click-handler'
import { DecodedDataType } from 'psychology/build/main/types/types'
import ExportResult from '../export-result/ExportResult'
import style from './popover-export.module.scss'
import ButtonMore from '../../../../components/common/buttons/button-more/ButtonMore'
import { encodeData } from '../../../../helper/helper'

type PopoverExportProps = {
    t: any
    fullResult: DecodedDataType
}

const PopoverExport: React.FC<PopoverExportProps> = ({ t, fullResult }) => {
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
                    <ExportResult data={encodeData(fullResult)} />
                </div>
            )}
        </OutsideClickHandler>
    )
}

export default withTranslation('test')(PopoverExport)
