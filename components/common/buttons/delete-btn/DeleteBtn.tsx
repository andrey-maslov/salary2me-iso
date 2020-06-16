import {FaTimes} from "react-icons/fa";
import style from './delete-btn.module.scss';

type DeleteBtnType = {
    handle: () => void
}

const DeleteBtn: React.FC<DeleteBtnType> = ({handle}) => {

    return (
        <button className={`color-red ${style.btn}`} onClick={handle}>
            <FaTimes/>
        </button>
    )
};

export default DeleteBtn;