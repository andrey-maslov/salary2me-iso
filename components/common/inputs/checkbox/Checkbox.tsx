import style from './checkbox.module.scss';
import { FaCheck } from "react-icons/fa";

type CheckboxType = {
    text: string
    isActive: boolean
    handle: () => void
}

const Checkbox: React.FC<CheckboxType> = ({ text, isActive, handle }) => {

    const checkboxClass = isActive ? `${style.active} ${style.box}` : style.box;

    return (
        <div className={style.container}>
            <span className={checkboxClass} onClick={handle}>
                {isActive &&
                <FaCheck className={`${style.icon} color-accent`} />}
            </span>
            <span
                className={`${style.text} color-grey`}
                dangerouslySetInnerHTML={{__html: text}}
            />
        </div>
    )
};

export default Checkbox;