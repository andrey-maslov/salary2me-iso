import React, { useState, useEffect } from 'react'
import { Link, withTranslation } from '@i18n'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import style from './profile.module.scss'
import { globalStoreType, IOneFieldForm, IUserData } from '../../../typings/types'
import InputTransformer from '../../../components/common/inputs/input-transformer/InputTransformer'
import { changeEmail, updateUserData } from '../../../actions/actionCreator'
import { DANGER_MODAL, SET_TOAST } from '../../../actions/actionTypes'
import UserServices from './UserServices'

const UserProfile = ({ t }) => {
    const { firstName, lastName, email, emailConfirmed, position, isLoggedIn } = useSelector(
        (state: globalStoreType) => state.user
    )

    const { setToast, apiErrorMsg, isEmailSent } = useSelector(
        (state: globalStoreType) => state.app
    )

    const { addToast } = useToasts()
    const dispatch = useDispatch()
    const router = useRouter()

    const [localUser, setLocalUser] = useState<IUserData>({
        firstName,
        lastName,
        email,
        position
    })

    useEffect(() => {
        if (setToast === 1) {
            addToast('Изменения приняты', {
                appearance: 'success'
            })
        } else if (setToast === 2) {
            addToast(apiErrorMsg, {
                appearance: 'error'
            })
        }

        function updateLocalData() {
            setLocalUser({
                firstName,
                lastName,
                email,
                position
            })

            dispatch({ type: SET_TOAST, setToast: 0 })
        }

        updateLocalData()
    }, [
        firstName,
        lastName,
        email,
        position,
        isLoggedIn,
        apiErrorMsg,
        setToast,
        router,
        addToast,
        dispatch
    ])

    const textFields = [
        {
            label: t('signin:extra.first_name'),
            key: 'firstName',
            value: localUser.firstName,
            defaultValue: t('signin:extra.first_name')
        },
        {
            label: t('signin:extra.last_name'),
            key: 'lastName',
            value: localUser.lastName,
            defaultValue: t('signin:extra.last_name')
        },
        {
            label: t('signin:extra.position'),
            key: 'position',
            value: localUser.position,
            defaultValue: t('signin:extra.position')
        }
    ]
    const emailField = {
        label: 'Email',
        key: 'email',
        value: localUser.email,
        defaultValue: 'email'
    }

    return (
        <div className={style.wrapper}>
            <div className="row center-xs">
                <div className="col-lg-8">
                    <div className={style.header}>
                        <h2 className={style.title}>{t('profile:title')}</h2>
                        <p>{t('profile:hello')}</p>
                        <p>
                            <Link href="/terms">
                                <a>{t('profile:more_terms')}</a>
                            </Link>
                            {` ${t('profile:or')} `}
                            <Link href="/policies/privacy-policy">
                                <a>{t('profile:more_privacy')}</a>
                            </Link>
                        </p>
                    </div>

                    <div className={`${style.box} ${style.account}`}>
                        <h5 className={style.box_title}>
                            {t('profile:account')}

                            {email && !emailConfirmed && (
                                <span className="color-red">
                                    {t('profile:email_needs_confirm')}
                                </span>
                            )}
                            {!email && (
                                <span className="color-red">{t('profile:need_to_set_email')}</span>
                            )}
                        </h5>
                        <div className={`${style.box_content}`}>
                            <div className={`${style.list} flex`}>
                                {textFields.map(item => (
                                    <div
                                        className={`${style.item} ${
                                            !item.value ? style.default : ''
                                        }`}
                                        key={item.key}>
                                        <span className={style.label}>{item.label}</span>
                                        <InputTransformer
                                            initValue={item.value || item.defaultValue}
                                            rules={{
                                                pattern: {
                                                    value: /^[^<>!]*$/i,
                                                    message: `${t('common:errors.invalid')}`
                                                }
                                            }}
                                            objectKey={item.key}
                                            handler={updateProfile}
                                            {...{ type: 'text', autoComplete: 'off' }}
                                        />
                                    </div>
                                ))}
                                <div
                                    className={`${style.item} ${
                                        !emailField.value ? style.default : ''
                                    } ${isEmailSent ? 'has-success' : ''}`}>
                                    <span className={style.label}>{emailField.label}</span>
                                    <InputTransformer
                                        initValue={emailField.value || emailField.defaultValue}
                                        rules={{
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: `${t('common:errors.invalid_email')}`
                                            }
                                        }}
                                        objectKey={emailField.key}
                                        handler={changeUserEmail}
                                        {...{ type: 'text', autoComplete: 'off' }}
                                    />
                                    {isEmailSent && (
                                        <div className="success">
                                            {t('profile:email_send_success')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <UserServices />
                    <div className={`${style.box} ${style.danger}`}>
                        <h5 className={style.box_title}>Danger zone</h5>
                        <div className={`${style.box_content}`}>
                            <div className={`${style.item} ${style.delete}`}>
                                <div>{t('profile:delete.warning_msg_1')}</div>
                                <button className="btn" onClick={deleteAccountBtnHandler}>
                                    {t('profile:delete.delete_account')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function updateProfile(formData: IOneFieldForm<string | boolean>) {
        dispatch(updateUserData(formData))
    }

    function changeUserEmail(data: { email: string }) {
        dispatch(changeEmail(data))
    }

    function checkBoxHandle(e) {
        updateProfile({ [e.target.name]: e.target.checked })
    }

    function deleteAccountBtnHandler() {
        dispatch({ type: DANGER_MODAL, isDangerModal: true })
    }
}

export default withTranslation(['profile', 'common', 'signin'])(UserProfile)
