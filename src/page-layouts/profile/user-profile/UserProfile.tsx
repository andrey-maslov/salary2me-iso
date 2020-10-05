import React, {useState, useEffect} from 'react'
import {Link, withTranslation} from '@i18n'
import {useSelector, useDispatch} from "react-redux"
import style from './profile.module.scss'
import BorderedBox from "../../../components/common/bordered-box/BorderedBox"
import {globalStoreType, IOneFieldForm} from "../../../typings/types"
import InputTransformer from "../../../components/common/inputs/input-transformer/InputTransformer"
import {IUserData, updateUserData} from "../../../actions/actionCreator"
import Loader from "../../../components/common/loaders/loader/Loader"
import {useToasts} from 'react-toast-notifications'
import Checkbox from "../../../components/common/inputs/checkbox/Checkbox"
import {MdAttachMoney} from 'react-icons/md'
import {SET_TOAST} from "../../../actions/actionTypes";

const Profile = ({t}: { t: any }) => {

    const {firstName, lastName, email, position, provider, isPublic, isLookingForJob} = useSelector((state: globalStoreType) => state.user)
    const {setToast} = useSelector((state: globalStoreType) => state.app)
    // const {position} = useSelector((state: globalStoreType) => state.cv)
    const [isReady, setReady] = useState(false)
    const {addToast} = useToasts()
    const dispatch = useDispatch()

    const [localUser, setLocalUser] = useState<IUserData>({
        firstName,
        lastName,
        email,
        position,
        provider,
        isPublic,
        isLookingForJob,
    })

    useEffect(() => {
        if (email && email.length > 0) {
            setReady(true)
        }

        if (setToast === 1) {
            addToast('Изменения приняты', {
                appearance: 'success',
            })
        } else if (setToast === 2) {
            addToast('Что-то пошло не так', {
                appearance: 'error',
            })
        }

        updateLocalData()

    }, [firstName, lastName, email, position, provider, isPublic, isLookingForJob, setToast])

    if (!isReady) {
        return <Loader/>
    }

    const textFields = [
        {label: 'First Name', key: 'firstName', value: localUser.firstName},
        {label: 'Last Name', key: 'lastName', value: localUser.lastName},
        {label: 'Position', key: 'position', value: localUser.position},
    ]
    const checkBoxes = [
        {label: t('signin:extra.want_to_open'), key: 'isPublic', value: localUser.isPublic},
        {label: t('signin:extra.looking_for_job'), key: 'isLookingForJob', value: localUser.isLookingForJob},
    ]


    return (
        <div className={style.wrapper}>

            <div className={style.header}>
                <h2 className={style.title}>Account Settings</h2>
                <p>Here you can change your personal data and privacy settings.</p>
                <p>
                    <Link href="/terms"><a>More about the terms of use</a></Link>
                    {` or `}
                    <Link href="/privacy-policy"><a>read our privacy policy</a></Link>
                </p>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className={`${style.box} ${style.account}`}>
                        <h5 className={style.box_title}>Account</h5>
                        <div className={`${style.box_content}`}>
                            <div className={`${style.list} flex`}>
                                {textFields.map(item => (
                                    <div className={style.item} key={item.key}>
                                        <span className={style.label}>{item.label}</span>
                                        <InputTransformer
                                            initValue={item.value}
                                            rules={{
                                                pattern: {
                                                    value: /^[a-zA-Z0-9 ]*$/i,
                                                    message: `${t('common:errors.invalid')}`
                                                }
                                            }}
                                            objectKey={item.key}
                                            handler={updateProfile}
                                            {...{type: "text", autoComplete: "off"}}
                                        />
                                    </div>
                                ))}
                                <div className={style.item} key='email'>
                                    <span className={style.label}>Email:</span>
                                    <div className={style.field}>{email}</div>
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
                                            handle={() => {
                                            }}
                                            isChecked={item.value}
                                            // innerRef={register()}
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
                        <div className={`${style.box_content} ${style.salary}`}>
                            <div className={style.top}>
                                <div className={style.title}>Salary2me</div>
                                <div className={`${style.rate} ${style.on}`}>
                                    premium
                                </div>
                            </div>
                        </div>
                        <div className={`${style.box_content} ${style.teamconstructor}`}>
                            <div className={style.top}>
                                <div className={style.title}>Teamconstructor</div>
                                <div className={`${style.rate} ${style.on}`}>
                                    premium
                                </div>
                            </div>
                        </div>
                        <div className={`${style.box_content} ${style.thegreatbase}`}>
                            <div className={style.top}>
                                <div className={style.title}>Thegreatbase</div>
                                <div className={`${style.rate} ${style.on}`}>
                                    premium
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

    function updateProfile(formData: IOneFieldForm<(string | boolean)>) {
        dispatch(updateUserData(formData))
    }

    function updateLocalData() {
        setLocalUser({
            firstName,
            lastName,
            email,
            position,
            provider,
            isPublic,
            isLookingForJob,
        })

        dispatch({type: SET_TOAST, setToast: 0})
    }
}

export default withTranslation(['profile', 'common', 'signin'])(Profile)