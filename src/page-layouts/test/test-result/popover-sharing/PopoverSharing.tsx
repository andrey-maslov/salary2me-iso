import React, { useState } from 'react'
import {withTranslation} from "@i18n"
import ExportResult from '../export-result/ExportResult'
import style from '../popover-export/popover-export.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'
import {useSelector} from 'react-redux'
import ButtonMore from "../../../../components/common/buttons/button-more/ButtonMore"
import {globalStoreType} from "../../../../typings/types"
import {HOST} from "../../../../constants/constants";
import SocialSharing from "../../../../components/common/buttons/social-sharing/SocialSharing";

type PopoverSharingProps = {
    t: any
}

const PopoverSharing: React.FC<PopoverSharingProps> = ({t}) => {

    const {personalInfo, testData} = useSelector((state: globalStoreType) => state.test)
    const encData = btoa(JSON.stringify([personalInfo, testData]))
    const [isOpen, setOpen] = useState(false)

    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className={style.moreBtn}>
                <ButtonMore
                    handler={() => setOpen(!isOpen)}
                    isOpened={isOpen}
                    title={'Share'}
                />
            </div>
            {isOpen && <div className={`${style.body} ${style.sharing}`}>
                <div className={style.desc}>Share result with your friends</div>
                <SocialSharing url={`${HOST}/test/result?encdata=${encData}`}/>
            </div>}
        </OutsideClickHandler>
    )
}

export default withTranslation('test')(PopoverSharing)