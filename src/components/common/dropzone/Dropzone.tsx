import React, {useState, useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useDropzone} from 'react-dropzone'
import {ACCEPTED_FILE_TYPES, parsingDuration} from '../../../constants/constants'
import Button from "../buttons/button/Button"
import {FaArrowRight, FaCloudUploadAlt, FaFileAlt, FaFilePdf, FaFileWord, FaFileImage} from "react-icons/fa"
import DeleteBtn from "../buttons/delete-btn/DeleteBtn"
import {sendCvForResults, setCvSent} from "../../../actions/actionCreator"
import {Helper} from '../../../helper/helper'
import BorderedBox from "../bordered-box/BorderedBox"
import {useMediaPredicate} from "react-media-hook"
import {Tooltip} from "../tooltip/Tooltip"
import {Router} from '@i18n'
import style from './dropzone.module.scss'
import {useDeviceDetect} from "../../../helper/useDeviceDetect"
import {PARSING_MODAL, PARSING_TEXT} from "../../../actions/actionTypes"
import {globalStoreType} from "../../../typings/types"

const Dropzone: React.FC = () => {

    //TODO - move tip text to translations
    const linkedinTip = 'Profile - More - Save to PDF'
    const [myFiles, setMyFiles] = useState([])
    const lessThan400 = useMediaPredicate("(max-width: 400px)")
    const {isMobile} = useDeviceDetect()
    const acceptedTypes = isMobile ? '' : ACCEPTED_FILE_TYPES

    const {email: userEmail, name: userName, isLoggedIn} = useSelector((state: globalStoreType) => state.user)
    const {isParsingTextShowed, isParsingModal} = useSelector((state: globalStoreType) => state.modals)
    const {processFailed, loading} = useSelector((state: globalStoreType) => state.app)
    const {isCvSent} = useSelector((state: globalStoreType) => state.cv)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!processFailed && !isParsingTextShowed && isCvSent) {
            dispatch(dispatch({type: PARSING_MODAL, isParsingModal: false}))
            dispatch(setCvSent(false))
            Router.push('/estimation')
        }
    }, [processFailed, isParsingTextShowed, isCvSent])

    const onDrop = useCallback(acceptedFiles => {
        setMyFiles(acceptedFiles)
    }, [])

    const {getRootProps, getInputProps, acceptedFiles, fileRejections} = useDropzone({
        onDrop,
        accept: acceptedTypes
    })

    const handlePushBtn = () => {

        if (isLoggedIn) {

            pushFile(acceptedFiles)

            dispatch({type: PARSING_MODAL, isParsingModal: true})
            dispatch({type: PARSING_TEXT, isParsingTextShowed: true})

            setTimeout(() => {
                dispatch({type: PARSING_TEXT, isParsingTextShowed: false})
            }, parsingDuration)
        } else {
            alert('need to be logged in')
        }
    }

    const pushFile = (files, email = userEmail, name = userName) => {

        if (files.length > 0) {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('ContentType', files[0].type)
            formData.append('Name', name)
            formData.append('FileName', files[0].path)
            formData.append('file', files[0])

            dispatch(sendCvForResults(formData))
        }
    }

    //can be list, but now it is ONE file
    const files = myFiles.map(file => {

        const icon = setFileIcon(file.type);

        return (
            <div key={file.path} className={style.file}>
                <div>
                    <span className={style.fileSize}>{Helper.getConvertedSize(file.size)}</span>
                    {icon}
                    <span className={style.fileName}>{file.path}</span>
                </div>
                {!isParsingModal && <DeleteBtn text={'delete file'} handle={() => setMyFiles([])}/>}
            </div>
        )
    })

    return (
        <div className={`${style.wrapper}`}>
            <div {...getRootProps()} className={`${style.dropzone}`}>
                <input {...getInputProps()} />
                <div>
                    <p>Drop your CV file here</p>
                    <p>or</p>
                    <span className={`${style.browse} color-accent`}>Browse</span>
                </div>
                <FaCloudUploadAlt className={style.uploadIcon}/>
                <p className={style.formats}>Standardized formats{lessThan400 && <br/>} are preferred (<Tooltip tip={linkedinTip} direction="top"><span>LinkedIn</span></Tooltip> etc.)</p>
            </div>
            {files}
            {myFiles.length > 0 &&
            <Button
                startIcon={null}
                endIcon={<FaArrowRight/>}
                btnClass={`btn btn-accent btn-lg`}
                title="send CV"
                handle={handlePushBtn}
            />}
            {fileRejections.length > 0 && renderRejectedBlock()}
        </div>
    )

    function renderRejectedBlock() {
        return (
            <BorderedBox borderColor={'#d73a49'}>
                <div className={style.rejectedWrap}>
                    This file has not accepted type.<br/>
                    Only following file types are accepted:<br/>
                    <strong>{ACCEPTED_FILE_TYPES}</strong>
                </div>
            </BorderedBox>
        )
    }

    function setFileIcon(docType) {

        if (docType === 'application/pdf') {
            return <FaFilePdf className={`${style.fileIcon} ${style.pdf}`}/>
        } else if (docType === 'application/msword' || docType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return <FaFileWord className={`${style.fileIcon} ${style.word}`}/>
        } else if (docType === 'image/png' || docType === 'image/jpg' || docType === 'image/jpeg') {
            return <FaFileImage className={`${style.fileIcon} ${style.image}`}/>
        } else {
            return <FaFileAlt className={`${style.fileIcon}`}/>
        }
    }

}

export default Dropzone