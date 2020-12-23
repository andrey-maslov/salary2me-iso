import React, { useState } from 'react'
import { withTranslation } from '@i18n'
import OutsideClickHandler from 'react-outside-click-handler'
import { useSelector } from 'react-redux'
import style from '../popover-export/popover-export.module.scss'
import ButtonMore from '../../../../components/common/buttons/button-more/ButtonMore'
import { globalStoreType } from '../../../../typings/types'
import SocialSharing from '../../../../components/common/buttons/social-sharing/SocialSharing'
import { encodeDataForURL } from '../../../../helper/helper'

type PopoverSharingProps = {
    t: any
}

const PopoverSharing: React.FC<PopoverSharingProps> = ({ t }) => {
    const { personalInfo, testData } = useSelector((state: globalStoreType) => state.test)
    const encData = encodeDataForURL([personalInfo, testData])
    const [isOpen, setOpen] = useState(false)
    const host = typeof window !== 'undefined' ? window.location.host : ''

    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className={style.moreBtn}>
                <ButtonMore handler={() => setOpen(!isOpen)} isOpened={isOpen} title="Share" />
            </div>
            {isOpen && (
                <div className={`${style.body} ${style.sharing}`}>
                    <div className={style.desc}>Share result with your friends</div>
                    <SocialSharing url={`${host}/test/result?encdata=${encData}`} />
                </div>
            )}
        </OutsideClickHandler>
    )
}

export default withTranslation('test')(PopoverSharing)
