import {FaArrowRight} from "react-icons/fa";
import style from "./form.module.scss";
import Button from "../../../../components/common/buttons/button/Button";

export default (props) => {
    return (
        <div className={style.form}>
            <input
                className={`${style.input} input`}
                type="tel"
                onChange={props.handleInput}
                onKeyPress={props.handlePressEnter}
                value={props.userRealSalary}
                aria-label="salary value"
            />
            <Button
                endIcon={<FaArrowRight/>}
                btnClass="btn btn-accent"
                title=""
                handle={props.handleSendBtn}
            />
        </div>
    )
};