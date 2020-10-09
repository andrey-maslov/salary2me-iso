import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useDeviceDetect} from '../../../helper/useDeviceDetect'
import {logOut} from '../../../actions/actionCreator'
import MobiHeader from '../../mobi/header/MobiHeader'
import WebHeader from '../../web/header/WebHeader'
import {Media} from "../../../../media"
import {globalStoreType} from "../../../typings/types"
import {isBrowser} from "../../../helper/helper";

const Header: React.FC = () => {

    const {isLoggedIn, email} = useSelector((state: globalStoreType) => state.user)
    const dispatch = useDispatch()

    const {isMobile} = useDeviceDetect()

    useEffect(() => {

    }, [isMobile])

    console.log('isMobile', isMobile, 'isbrowser', isBrowser)

    const handleLoginBtn = () => {
        if (isLoggedIn) {
            dispatch(logOut())
        } else {
            console.log('xc')
        }
    }

    return (
        <>
            {isMobile ?
                <MobiHeader
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={email}
                />
                :
                <WebHeader
                    isLoggedIn={isLoggedIn}
                    handleLoginBtn={handleLoginBtn}
                    userEmail={email}
                />
            }
        </>
    )

}

export default Header