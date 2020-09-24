import {ContentLayout} from '../../../page-layouts'
import {useEffect, useState} from "react"
import Loader from "../../../components/common/loaders/loader/Loader"
import axios from 'axios'
import {CONTENT_API} from "../../../constants/constants"
import {useRouter} from "next/router"

const PageContent: React.FC  = () => {

    const router = useRouter()
    const page = router.pathname.split('/').slice(-1).join()

    const [content, setContent] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        fetchPageContent(page)
    }, [page])


    if (isLoading) {
        return <main className='flex-centered'><Loader/></main>
    }

    return <ContentLayout content={content}/>

    function fetchPageContent(page: string) {

        if (!page) {
            console.error('page is not defined')
            return false
        }

        setLoading(true)

        const pages = {
            'terms': 4,
            'cookie-policy': 2,
            'privacy-policy': 3
        }

        const lang = 'en'

        axios(`${CONTENT_API}/content-blocks/${pages[page]}`)
            .then(res => setContent(res.data[`content_${lang}`]))
            .catch(err => {
                console.error(err)
                setContent('data is not available')
            })
            .finally(() => setLoading(false))
    }
}

export default PageContent