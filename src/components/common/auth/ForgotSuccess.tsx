import {FiCheckSquare} from "react-icons/fi"

const ForgotSuccess: React.FC = () => {

    return (
        <div>
            <div className="auth-icon-success">
                <FiCheckSquare/>
            </div>
            <p>common:auth.forgot_success</p>
        </div>
    )
}

export default ForgotSuccess