import React, {useState} from 'react'
import style from './popover-info.module.scss'
import {FiExternalLink, FiMoreVertical} from 'react-icons/fi'
import OutsideClickHandler from 'react-outside-click-handler'

interface IPopoverInfo {
    contentList: {url: string, label: string}[]
}

const PopoverInfo: React.FC<IPopoverInfo> = ({contentList}) => {

    const [isOpen, setOpen] = useState(false)

    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className={style.btn}>
                <button
                    onClick={() => setOpen(!isOpen)}
                    aria-label="info"
                >
                    <FiMoreVertical/>
                </button>
            </div>
            {isOpen &&
            <div className={`${style.container}`}>
                <div className={style.item}>
                    <FiExternalLink/>
                    <a href="" target="_blank" rel="noopener noreferrer">{contentList[0].label}</a>
                </div>
                <div className={style.item}>
                    <FiExternalLink/>
                    <a href="" target="_blank" rel="noopener noreferrer">{contentList[1].label}</a>
                </div>
            </div>
            }
        </OutsideClickHandler>
    )
}

export default PopoverInfo