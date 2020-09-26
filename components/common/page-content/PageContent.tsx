import {ContentLayout} from '../../../page-layouts'
import {useEffect, useState} from "react"
import Loader from "../../../components/common/loaders/loader/Loader"
import axios from 'axios'
import {CONTENT_API} from "../../../constants/constants"
import {useRouter} from "next/router"

const PageContent: React.FC<{content: any}>  = (props) => {

    return <ContentLayout {...props}/>
}

export default PageContent