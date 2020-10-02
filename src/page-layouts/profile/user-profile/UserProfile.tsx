import {useState, useEffect} from 'react'
import {Link} from '@i18n'
import {useSelector, useDispatch} from "react-redux"
import style from './profile.module.scss'
import BorderedBox from "../../../components/common/bordered-box/BorderedBox"
import Subscription from "../../../components/common/subscription/Subscription"
import {globalStoreType} from "../../../typings/types"
import InputTransformer from "../../../components/common/inputs/input-transformer/InputTransformer";
import {addAuthData} from "../../../actions/actionCreator";

const Profile = () => {

    const {firstName, lastName, name, email, position} = useSelector((state: globalStoreType) => state.user)
    // const {position} = useSelector((state: globalStoreType) => state.cv)

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        name: '',
        email: '',
        position: ''
    })

    useEffect(() => {
        setUser({...user, firstName, lastName, name, email, position})
    }, [position, email])

    const dispatch = useDispatch()

    //TODO only for demo links length
    const [state, setState] = useState({
        length: 'long',
        ellipsis: ''
    })

    function changeLinkLength(e) {
        setState({
            ...state,
            length: e.target.textContent
        })
    }

    function setEllipsis(e) {
        setState({
            ...state,
            ellipsis: e.target.textContent
        })
    }


    return (
        <div className={style.profile}>
            <div className={style.topline}>
                {/*<div*/}
                {/*    className={style.title}*/}
                {/*    dangerouslySetInnerHTML={{__html: `Hello, <strong>${name}</strong>. This is your profile`}}*/}
                {/*/>*/}
            </div>
            <div className={style.content}>
                <ul className={style.list}>
                    <li className={style.item} key={name}>
                        <span className={style.itemTitle}>Name:</span>
                        {/*<span className={style.itemVal}>{name}</span>*/}
                    </li>
                    <li className={style.item} key={'position'}>
                        <span className={style.itemTitle}>Position:</span>
                        <InputTransformer
                            initValue={user.position}
                            rules={{}}
                            handler={updateUserData}
                            {...{
                                type: "text",
                                autoFocus: true,
                                autoComplete: "off",
                                tabindex: 0
                            }}
                        />
                    </li>
                    <li className={style.item} key={email}>
                        <span className={style.itemTitle}>Email:</span>
                        <span className={style.itemVal}>{user.email}</span>
                    </li>
                    <li className={style.item} key='link'>
                        <span className={style.itemTitle}>Salary est.</span>
                        <Link href={'/estimation'}>
                            <a className={`${style.link} ${style.itemVal}`}>show me!</a>
                        </Link>
                    </li>
                </ul>

                {/*TODO Fix it */}
                {'isUserInBase' &&
                <BorderedBox borderColor="#d1d1d1">
                    <Subscription/>
                </BorderedBox>}

            </div>
        </div>
    )

    function updateUserData(value) {
        dispatch(addAuthData({firstName: 'chort', position: value}))
    }
}

export default Profile