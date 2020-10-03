import React, {useState, useEffect} from 'react'
import {Link, withTranslation} from '@i18n'
import {useSelector, useDispatch} from "react-redux"
import style from './profile.module.scss'
import BorderedBox from "../../../components/common/bordered-box/BorderedBox"
import {globalStoreType, IOneFieldForm} from "../../../typings/types"
import InputTransformer from "../../../components/common/inputs/input-transformer/InputTransformer"
import {addAuthData, IUserData, updateUserData} from "../../../actions/actionCreator"
import Loader from "../../../components/common/loaders/loader/Loader"
import {withToastManager} from 'react-toast-notifications'
import Checkbox from "../../../components/common/inputs/checkbox/Checkbox"
import {MdAttachMoney} from 'react-icons/md'

const Profile = ({t}: { t: any }) => {

    const {firstName, lastName, email, position, provider, isPublic, isLookingForJob} = useSelector((state: globalStoreType) => state.user)
    // const {position} = useSelector((state: globalStoreType) => state.cv)
    const [isReady, setReady] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (email && email.length > 0) {
            setReady(true)
        }

        setLocalUser({
            firstName,
            lastName,
            email,
            position,
            provider,
            isPublic,
            isLookingForJob,
        })

    }, [firstName, lastName, email, position, provider, isPublic, isLookingForJob])

    const [localUser, setLocalUser] = useState<IUserData>({
        firstName,
        lastName,
        email,
        position,
        provider,
        isPublic,
        isLookingForJob,
    })

    if (!isReady) {
        return <Loader/>
    }


    return (
        <div className={style.profile}>
            <div className={style.header}>
                <h2 className={style.title}>Private office</h2>
                <p>Here you can change your personal data and privacy settings.</p>
                <p>
                    <Link href="/terms"><a>More about the terms of use</a></Link>
                    {` or `}
                    <Link href="/privacy-policy"><a>read our privacy policy</a></Link>
                </p>
            </div>
            <div className={style.content}>

                <h4>Private date</h4>
                <ul className={style.list}>
                    <li className={style.item} key='firstName'>
                        <span className={style.itemTitle}>First Name:</span>
                        <InputTransformer
                            initValue={localUser.firstName}
                            rules={{
                                required: `${t('common:errors.required')}`
                            }}
                            objectKey={Object.keys({firstName})[0]}
                            handler={updateProfile}
                            {...{
                                type: "text",
                                autoComplete: "off",
                            }}
                        />
                    </li>
                    <li className={style.item} key='lastName'>
                        <span className={style.itemTitle}>Last Name:</span>
                        <InputTransformer
                            initValue={localUser.lastName}
                            rules={{
                                required: `${t('common:errors.required')}`
                            }}
                            objectKey={Object.keys({lastName})[0]}
                            handler={updateProfile}
                            {...{
                                type: "text",
                                autoComplete: "off",
                            }}
                        />
                    </li>
                    <li className={style.item} key='position'>
                        <span className={style.itemTitle}>Position:</span>
                        <InputTransformer
                            initValue={localUser.position}
                            rules={{
                                required: `${t('common:errors.required')}`
                            }}
                            objectKey={Object.keys({position})[0]}
                            handler={updateProfile}
                            {...{
                                type: "text",
                                autoComplete: "off",
                            }}
                        />
                    </li>

                    <li className={style.item} key={email}>
                        <span className={style.itemTitle}>Email:</span>
                        <span className={style.itemVal}>{email}</span>
                    </li>
                </ul>

                <h4>Security data</h4>
                <ul className={style.list}>
                    <li className={style.item} key='isPublic'>
                        <span className={style.itemTitle}>isPublic:</span>
                        <Checkbox
                            label='isPublic'
                            handle={() => {}}
                            isChecked={isPublic}
                            // innerRef={register()}
                        />
                    </li>
                    <li className={style.item} key='isLookingForJob'>
                        <span className={style.itemTitle}>isLookingForJob:</span>
                        <Checkbox
                            label='isLookingForJob'
                            handle={() => {}}
                            isChecked={isLookingForJob}
                            // innerRef={register()}
                        />
                    </li>
                </ul>

                <h4>Your services</h4>

                <div className={style.service}>
                    <h5 className={style.title}>Salary2.me</h5>
                    <ul className={style.list}>
                        <li className={style.item}>
                            <MdAttachMoney/>
                            <Link href="/estimation"><a>You CV estimation</a></Link>
                        </li>
                        <li className={style.item}>
                            <MdAttachMoney/>
                            <Link href="/cv"><a>You CV generator</a></Link>
                        </li>
                    </ul>
                </div>

                <div className={style.service}>
                    <h5 className={style.title}>Teamconstructor</h5>
                    <ul className={style.list}>
                        <li className={style.item}>
                            <MdAttachMoney/>
                            <Link href="/estimation"><a>Pair comparison</a></Link>
                        </li>
                        <li className={style.item}>
                            <MdAttachMoney/>
                            <Link href="/cv"><a>Team generator</a></Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )

    function updateProfile(formData: IOneFieldForm<(string | boolean)>) {
        dispatch(updateUserData(formData))
    }
}

export default withTranslation(['profile', 'common'])(Profile)