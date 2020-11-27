import React, { useCallback } from 'react'
import style from './tabs.module.scss'

interface ITabsProps {
    handler: (p: string) => void
    activeValue: string
    values: Array<string>
}

const Tabs: React.FC<ITabsProps> = ({ handler, activeValue, values = [] }) => {
    const selectValue = useCallback(
        e => {
            handler(e.target.textContent.toLowerCase())
        },
        [handler]
    )

    return (
        <div className={style.wrapper}>
            {values.map(val => {
                const activeClass =
                    activeValue.toLowerCase() === val.toLowerCase() ? 'active' : 'passive'
                return (
                    <button
                        className={`${style.tab} ${style[activeClass]}`}
                        key={val}
                        onClick={selectValue}>
                        {val}
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs
