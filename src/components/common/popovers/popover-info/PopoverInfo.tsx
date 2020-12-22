import React, { useState } from 'react'
import { FiExternalLink, FiMoreVertical } from 'react-icons/fi'
import OutsideClickHandler from 'react-outside-click-handler'
import style from './popover-info.module.scss'

interface IPopoverInfo {
    contentList: { title: string; url: string }[]
}

const PopoverInfo: React.FC<IPopoverInfo> = ({ contentList }) => {
    const [isOpen, setOpen] = useState(false)

    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className={style.btn}>
                <button onClick={() => setOpen(!isOpen)} aria-label="info">
                    <FiMoreVertical />
                </button>
            </div>
            {isOpen && (
                <div className={`${style.container}`}>
                    <div className={style.item}>
                        <FiExternalLink />
                        <a href={contentList[0].url} target="_blank" rel="noopener noreferrer">
                            {contentList[0].title}
                        </a>
                    </div>
                    <div className={style.item}>
                        <FiExternalLink />
                        <a href={contentList[1].url} target="_blank" rel="noopener noreferrer">
                            {contentList[1].title}
                        </a>
                    </div>
                </div>
            )}
        </OutsideClickHandler>
    )
}

export default PopoverInfo
