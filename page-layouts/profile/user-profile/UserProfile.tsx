import {useState} from 'react';
import {Link} from '@i18n'
import {connect} from "react-redux";

import style from './profile.module.scss';
import BorderedBox from "../../../components/common/bordered-box/BorderedBox";
import Subscription from "../../../components/common/subscription/Subscription";

const Profile = (props) => {

    const {userName, userEmail, isLoggedIn, position, isUserInBase} = props;
    // const history = useHistory();

    //TODO only for demo links length
    const [state, setState] = useState({
        length: 'long',
        ellipsis: ''
    })

    //TODO only for demo links length

    // useEffect(() => {
    //
    //     if (!isLoggedIn) {
    //         history.push('/');
    //     }
    // }, [isLoggedIn]);

    // if (!isLoggedIn) {
    //     return <div className="text-center">Login, please</div>
    // }

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
        <>
            <div className={style.profile}>
                <div className={style.topline}>
                    <div
                        className={style.title}
                        dangerouslySetInnerHTML={{__html: `Hello, <strong>${userName}</strong>. This is your profile`}}
                    />
                </div>
                <div className={style.content}>
                    <ul className={style.list}>
                        <li className={style.item} key={userName}>
                            <span className={style.itemTitle}>Name:</span>
                            <span className={style.itemVal}>{userName}</span>
                        </li>
                        <li className={style.item} key={position}>
                            <span className={style.itemTitle}>Position:</span>
                            <span className={`${style.itemVal} ${style.position}`}>{position}</span>
                        </li>
                        <li className={style.item} key={userEmail}>
                            <span className={style.itemTitle}>Email:</span>
                            <span className={style.itemVal}>{userEmail}</span>
                        </li>
                        <li className={style.item} key='link'>
                            <span className={style.itemTitle}>Salary est.</span>
                            <Link href={'/results'}>
                                <a className={`${style.resultsLink} ${style.itemVal}`}>show me!</a>
                            </Link>
                        </li>
                    </ul>

                    {isUserInBase &&
                    <BorderedBox borderColor="#d1d1d1">
                        <Subscription/>
                    </BorderedBox>}

                </div>
            </div>
        </>
    )

};
export default connect(state => ({
    userName: state.userData.info.name,
    userEmail: state.userData.info.email,
    position: state.userData.position,
    isLoggedIn: state.userData.auth.isLoggedIn,
    isUserInBase: state.userData.auth.isUserInBase,
}))(Profile);