import {useSelector, useDispatch} from 'react-redux'
import {logOut} from '../../../actions/actionCreator'
import MobiHeader from '../../mobi/header/MobiHeader'
import WebHeader from '../../web/header/WebHeader'
import {Media} from "../../../../media"
import {globalStoreType} from "../../../typings/types"

const Header: React.FC = () => {

    const {isLoggedIn, email} = useSelector((state: globalStoreType) => state.user)
    const dispatch = useDispatch()

    const handleLoginBtn = () => {
        if (isLoggedIn) {
            dispatch(logOut())
        } else {
            console.log('xc')
        }
    }

    return (
        <>
            <Media greaterThanOrEqual="md">
                <WebHeader
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={email}
                />
            </Media>
            <Media at="xs">
                <MobiHeader
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={email}
                />
            </Media>
        </>
    )

}

export default Header