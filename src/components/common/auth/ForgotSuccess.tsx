import { FiCheckSquare } from 'react-icons/fi'

const ForgotSuccess: React.FC<{ msg: string }> = ({ msg }) => {
    return (
        <div>
            <div className="auth-icon-success">
                <FiCheckSquare />
            </div>
            <p>{msg}</p>
        </div>
    )
}

export default ForgotSuccess
