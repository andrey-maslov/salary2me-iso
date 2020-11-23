import React, { useState, useEffect } from 'react'
import { Link, withTranslation } from '@i18n'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import { MdAttachMoney } from 'react-icons/md'
import { FaFilePdf } from 'react-icons/fa'
import QRCode from 'qrcode.react'
import style from './profile.module.scss'
import { globalStoreType, IOneFieldForm } from '../../../typings/types'
import InputTransformer from '../../../components/common/inputs/input-transformer/InputTransformer'
import { IUserData, updateUserData } from '../../../actions/actionCreator'
import Loader from '../../../components/common/loaders/loader/Loader'
import Checkbox from '../../../components/common/inputs/checkbox/Checkbox'
import { SET_TOAST } from '../../../actions/actionTypes'
import CodeBox from '../../../components/common/code-box/CodeBox'
import Service from './service/Service'

const UserProfile = ({ t }) => {
    const {
        firstName,
        lastName,
        email,
        position,
        isLoggedIn,
        isPublicProfile,
        isOpenForWork
    } = useSelector((state: globalStoreType) => state.user)

    const { personalInfo, testData } = useSelector((state: globalStoreType) => state.test)
    const { setToast, apiErrorMsg } = useSelector((state: globalStoreType) => state.app)
    const [isReady, setReady] = useState(false)
    const { addToast } = useToasts()
    const dispatch = useDispatch()
    const router = useRouter()
    const encData: string | null = testData ? btoa(JSON.stringify([personalInfo, testData])) : null

    const [localUser, setLocalUser] = useState<IUserData>({
        firstName,
        lastName,
        email,
        position,
        isPublicProfile,
        isOpenForWork
    })

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/')
        }

        if (email && email.length > 0) {
            setReady(true)
        }

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
                position,
                isPublicProfile,
                isOpenForWork
            })

            dispatch({ type: SET_TOAST, setToast: 0 })
        }

        updateLocalData()
    }, [firstName, lastName, email, position, isPublicProfile, isLoggedIn, isOpenForWork])

    if (!isReady) {
        return <Loader />
    }

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
    const checkBoxes = [
        {
            label: t('signin:extra.want_to_open'),
            key: 'isPublicProfile',
            value: localUser.isPublicProfile
        },
        {
            label: t('signin:extra.looking_for_job'),
            key: 'isOpenForWork',
            value: localUser.isOpenForWork
        }
    ]

    const pairLink = `https://teamconstructor.com${
        encData ? `?encdata=${encodeURIComponent(encData)}` : ''
    }`
    const teamLink = `https://teamconstructor.com`
    const grBaseLink = `https://thegreatbase.online`
    const QRValue = `${process.env.HOST}/test/result?encdata=${encodeURIComponent(encData)}`

    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h2 className={style.title}>Account Settings</h2>
                <p>Here you can change your personal data and privacy settings.</p>
                <p>
                    <Link href="/terms">
                        <a>More about the terms of use</a>
                    </Link>
                    {` or `}
                    <Link href="/policies/privacy-policy">
                        <a>read our privacy policy</a>
                    </Link>
                </p>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className={`${style.box} ${style.account}`}>
                        <h5 className={style.box_title}>Account</h5>
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
                                    }`}>
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
                                        handler={updateProfile}
                                        {...{ type: 'text', autoComplete: 'off' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.box} ${style.privacy}`}>
                        <h5 className={style.box_title}>Privacy</h5>
                        <div className={`${style.box_content}`}>
                            <div className={style.list}>
                                {checkBoxes.map(item => (
                                    <div className={style.item} key={item.key}>
                                        <Checkbox
                                            label={item.label}
                                            handle={updateProfile}
                                            isChecked={item.value}
                                            {...{ name: item.key }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className={`${style.box} ${style.services}`}>
                        <h5 className={style.box_title}>Services</h5>

                        <Service service="salary2me">
                            <div className={`${style.item} flex between-xs`}>
                                <Link href="/resume">
                                    <a>Ваше резюме</a>
                                </Link>
                                <FaFilePdf />
                            </div>
                            <div className={`${style.item} flex between-xs`}>
                                <Link href="/estimation">
                                    <a>Оценка резюме по городам</a>
                                </Link>
                            </div>
                            <div className={`${style.item} flex between-xs`}>
                                {encData ? (
                                    <>
                                        <div className={style.qr}>
                                            <QRCode value={QRValue} size={160} />
                                        </div>
                                        <CodeBox content={encData} />
                                    </>
                                ) : (
                                    <Link href="/test">
                                        <a>Пройдите тест</a>
                                    </Link>
                                )}
                            </div>

                            <div className={`${style.item} flex between-xs`}>
                                {testData ? (
                                    <Link href="/test/result">
                                        <a>Перейти к психологическому профилю</a>
                                    </Link>
                                ) : (
                                    <Link href="/test">
                                        <a>Пройдите тест</a>
                                    </Link>
                                )}
                            </div>
                        </Service>

                        <Service service="teamconstructor">
                            <div className={`${style.item} flex between-xs`}>
                                <a href={pairLink} target="_blank" rel="noopener noreferrer">
                                    Перейти к анализу совместимости
                                </a>
                                <MdAttachMoney />
                            </div>
                            <div className={`${style.item} flex between-xs`}>
                                <a href={teamLink} target="_blank" rel="noopener noreferrer">
                                    Перейти к формированию команды
                                </a>
                            </div>
                        </Service>

                        <Service service="thegreatbase">
                            <div className={`${style.item} flex between-xs`}>
                                <a href={grBaseLink} target="_blank" rel="noopener noreferrer">
                                    Рабочий кабинет
                                </a>
                                <MdAttachMoney />
                            </div>
                        </Service>
                    </div>
                </div>
            </div>

            <div className={`${style.box} ${style.danger}`}>
                <h5 className={style.box_title}>Danger zone</h5>
                <div className={`${style.box_content}`}>
                    <div className={`${style.item} ${style.delete}`}>
                        <div>
                            Once you delete your account, it cannot be undone. This is permanent.
                        </div>
                        <button
                            className="btn"
                            onClick={() => {
                                if (
                                    // eslint-disable-next-line no-alert
                                    window.confirm('Вы действительно хотите удалить аккаунт????')
                                ) {
                                    // eslint-disable-next-line no-alert
                                    alert('Зря!')
                                }
                            }}>
                            Delete account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    function updateProfile(formData: IOneFieldForm<string | boolean>) {
        console.log(formData)
        dispatch(
            updateUserData({
                firstName,
                lastName,
                email,
                position,
                isPublicProfile,
                isOpenForWork,
                ...formData
            })
        )
    }

    function toast() {
        addToast('Изменения приняты', {
            appearance: 'success'
        })
    }
}

export default withTranslation(['profile', 'common', 'signin'])(UserProfile)
