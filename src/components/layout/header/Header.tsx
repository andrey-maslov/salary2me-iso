import {useEffect} from 'react'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux'
import {useDeviceDetect} from '../../../helper/useDeviceDetect'
import { useMediaPredicate } from "react-media-hook"
import {logOut} from '../../../actions/actionCreator'
import MobiHeader from '../../mobi/header/MobiHeader'
import WebHeader from '../../web/header/WebHeader'
import {globalStoreType} from "../../../typings/types"

const Header: React.FC = () => {

    const {isLoggedIn, email} = useSelector((state: globalStoreType) => state.user)
    const dispatch = useDispatch()
    const smallDevice = useMediaPredicate("(max-width: 992px)")
    const { isMobile } = useDeviceDetect()
    const router = useRouter()

    useEffect(() => {

    }, [isMobile, smallDevice])

    const handleLoginBtn = () => {
        if (isLoggedIn) {
            dispatch(logOut())
            router.push('/')
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