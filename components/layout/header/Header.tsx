import {useSelector, useDispatch} from 'react-redux'
import {clearUserData} from '../../../actions/actionCreator'
import MobiHeader from '../../../components/mobi/header/MobiHeader'
import WebHeader from '../../../components/web/header/WebHeader'
import {Media} from "../../../media"
import {globalStoreType} from "../../../typings/types"

const Header: React.FC = () => {

    const {isLoggedIn, email} = useSelector((state: globalStoreType) => state.user)
    const dispatch = useDispatch()

    const handleLoginBtn = () => {
        if (isLoggedIn) {
            dispatch(clearUserData())
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