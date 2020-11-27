import style from './select.module.scss'

interface ISelectProps {
    handler: (e: React.ChangeEvent<HTMLSelectElement>) => void
    values: Array<{ title: string; value: string }>
    selected: string
}

const Select: React.FC<ISelectProps> = ({ handler, values, selected }) => {
    return (
        <select className={style.select} onChange={handler} defaultValue={selected}>
            {values.map(({ value, title }) => (
                <option value={value} key={value}>
                    {title}
                </option>
            ))}
        </select>
    )
}

export default Select
