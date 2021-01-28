import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { anyType, globalStoreType } from '../../../typings/types'
import { isBrowser, parseQueryString } from '../../../helper/helper'
import { socialAuth } from '../../../actions/api/socialAuthAPI'
import Loader from '../../../components/common/loaders/loader/Loader'

const Linkedin: React.FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state: globalStoreType) => state.user)

    useEffect(() => {
        if (isBrowser) {
            const queryString = window.location.search.replace('?', '')
            const { code, state }: anyType = parseQueryString(queryString)
            if (code && state) {
                dispatch(
                    socialAuth(
                        { authCode: code, redirectUri: process.env.LINKEDIN_REDIRECT },
                        'linkedin'
                    )
                )
            }
        }
    }, [dispatch])

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/profile')
        }
    }, [isLoggedIn, router])

    return (
        <section className="section main flex-centered">
            <Loader />
        </section>
    )
}

export default Linkedin
