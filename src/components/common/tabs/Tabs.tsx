import React, { useCallback } from 'react'
import style from './tabs.module.scss'
import { TabsDataItem } from '../../../page-layouts/estimation/est-sidebar/EstSidebar'

interface ITabsProps {
    handler: (p: string) => void
    activeValue: string
    data: TabsDataItem[]
}

const Tabs: React.FC<ITabsProps> = ({ handler, activeValue, data = [] }) => {
    const selectValue = useCallback(
        e => {
            handler(e.target.dataset.value.toLowerCase())
        },
        [handler]
    )

    return (
        <div className={style.wrapper}>
            {data.map(item => {
                const activeClass = activeValue.toLowerCase() === item.value.toLowerCase()
                        ? 'active'
                        : 'passive'
                return (
                    <button
                        className={`${style.tab} ${style[activeClass]}`}
                        key={item.value}
                        data-value={item.value}
                        onClick={selectValue}>
                        {item.title}
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs
