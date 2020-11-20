import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { withTranslation } from '@i18n'
import Button from '../buttons/button/Button'
import style from './auth.module.scss'
import Password from '../inputs/password/Password'
import axios from "axios";
import { addAuthData, authUser } from "../../../actions/actionCreator";

export interface ISigninForm {
    username: string
    password: string
}

export interface ISignin<T> {
    isLoading: boolean
    errorApiMessage: string
    submitHandle: (data: T) => void
    clearApiError?: () => void
    t?: any
}

const Signin: React.FC<ISignin<ISigninForm>> = ({
                                                    isLoading,
                                                    errorApiMessage,
                                                    submitHandle,
                                                    clearApiError,
                                                    t
                                                }) => {
    const { register, handleSubmit, errors, setError } = useForm<ISigninForm>()
    const dispatch = useDispatch()

    async function auth(userData) {
        try {
            const response = await axios
                .post(`${process.env.BASE_API}/api/v1/Account/authenticate`, userData)
                .then(res => res.data)
                .then(data => {
                    dispatch(addAuthData({ ...data, email: data.username }))
                })
        } catch {
            alert('ERROR')
        }
    }

    async function SignIn(data: ISigninForm) {
        await dispatch(authUser(data, 'signin'))
        setError('username', 'validate')

        // dispatch(authUser(data, 'signin'))
        // if (isLoggedIn) {
        //     router.push(redirectUrl || '/')
        // }
    }

    return (
        <form onSubmit={handleSubmit(SignIn)}>
            <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
                <label>
                    <span>Email</span>
                    <input
                        className={style.input}
                        name="username"
                        onFocus={clearApiError}
                        ref={register({
                            required: `${t('common:errors.required')}`,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: `${t('common:errors.invalid_email')}`
                            }
                        })}
                    />
                </label>
                {errors.username && <div className="item-explain">{errors.username.message}</div>}
            </div>
            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <Password
                    label={t('signin:pwd')}
                    innerRef={register({
                        required: `${t('common:errors.required')}`
                    })}
                    clearApiError={clearApiError}
                    name="password"
                />
                {errors.password && <div className="item-explain">{errors.password.message}</div>}
            </div>

            <div className={`form-group ${errorApiMessage ? 'has-error' : ''}`}>
                <Button
                    title={t('signin:sign_in')}
                    startIcon={isLoading && <AiOutlineLoading />}
                    handle={null}
                    btnClass="btn btn-accent btn-loader"
                />
                {errorApiMessage && <div className="item-explain">{errorApiMessage}</div>}
            </div>
        </form>
    )
}

export default withTranslation(['common', 'signin'])(Signin)
