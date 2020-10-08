import React from 'react'
import PopoverExport from '../popover-export/PopoverExport'
import PopoverMore from '../popover-more/PopoverMore'

import style from './top-bar.module.scss'
import PopoverSharing from "../popover-sharing/PopoverSharing";

interface TopBarProps {
    title: string
    userResult: [string, number][]
    details: string[]
}

const TopBar: React.FC<TopBarProps> = ({title, userResult, details}) => {

  return (
      <div className={style.top}>
          <h4 className={style.title}>{title}</h4>
          <PopoverMore userResult={userResult} details={details}/>
          {/*<PopoverExport/>*/}
          <PopoverSharing/>
      </div>
  )
}

export default TopBar