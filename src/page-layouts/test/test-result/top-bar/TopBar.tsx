import PopoverExport from '../popover-export/PopoverExport'
import PopoverMore from '../popover-more/PopoverMore'

import style from './top-bar.module.scss'

interface TopBarProps {
    title: string
    userResult: [string, number][]
    details: string[]
    isLoggedIn: boolean
}

const TopBar: React.FC<TopBarProps> = ({ title, userResult, details, isLoggedIn }) => {
    return (
        <div className={style.top}>
            <h4 className={style.title}>{title}</h4>
            <PopoverMore userResult={userResult} details={details} />
            {isLoggedIn && <PopoverExport />}
        </div>
    )
}

export default TopBar
