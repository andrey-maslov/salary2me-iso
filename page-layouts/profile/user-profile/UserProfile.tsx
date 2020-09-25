import {useState} from 'react'
import {Link} from '@i18n'
import {useSelector} from "react-redux"
import style from './profile.module.scss'
import BorderedBox from "../../../components/common/bordered-box/BorderedBox"
import Subscription from "../../../components/common/subscription/Subscription"
import {globalStoreType} from "../../../typings/types"

const Profile = () => {

    const {name, email} = useSelector((state: globalStoreType) => state.user)
    const {position} = useSelector((state: globalStoreType) => state.cv)

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
                <div
                    className={style.title}
                    dangerouslySetInnerHTML={{__html: `Hello, <strong>${name}</strong>. This is your profile`}}
                />
            </div>
            <div className={style.content}>
                <ul className={style.list}>
                    <li className={style.item} key={name}>
                        <span className={style.itemTitle}>Name:</span>
                        <span className={style.itemVal}>{name}</span>
                    </li>
                    <li className={style.item} key={position}>
                        <span className={style.itemTitle}>Position:</span>
                        <span className={`${style.itemVal} ${style.position}`}>{position}</span>
                    </li>
                    <li className={style.item} key={email}>
                        <span className={style.itemTitle}>Email:</span>
                        <span className={style.itemVal}>{email}</span>
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
}

export default Profile