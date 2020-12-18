import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import {
    FaArrowRight,
    FaCloudUploadAlt,
    FaFileAlt,
    FaFilePdf,
    FaFileWord,
    FaFileImage
} from 'react-icons/fa'
import { Router, Link, withTranslation } from '@i18n'
import { ACCEPTED_FILE_TYPES, parsingDuration } from '../../../constants/constants'
import Button from '../buttons/button/Button'
import DeleteBtn from '../buttons/delete-btn/DeleteBtn'
import { sendCvForResults, setCvSent } from '../../../actions/actionCreator'
import { Helper } from '../../../helper/helper'
import BorderedBox from '../bordered-box/BorderedBox'
import { Tooltip } from '../tooltip/Tooltip'
import style from './dropzone.module.scss'
import { useDeviceDetect } from '../../../helper/useDeviceDetect'
import { PARSING_MODAL, PARSING_TEXT } from '../../../actions/actionTypes'
import { globalStoreType } from '../../../typings/types'

const Dropzone = ({ t }) => {
    // TODO - move tip text to translations
    const linkedinTip = 'Profile - More - Save to PDF'
    const [myFiles, setMyFiles] = useState([])
    const { isMobile } = useDeviceDetect()
    const acceptedTypes = isMobile ? '' : ACCEPTED_FILE_TYPES

    const { email, name, isLoggedIn } = useSelector((state: globalStoreType) => state.user)
    const { isParsingTextShowed, isParsingModal } = useSelector(
        (state: globalStoreType) => state.modals
    )
    const { processFailed } = useSelector((state: globalStoreType) => state.app)
    const { isCvSent } = useSelector((state: globalStoreType) => state.cv)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!processFailed && !isParsingTextShowed && isCvSent) {
            dispatch(dispatch({ type: PARSING_MODAL, isParsingModal: false }))
            dispatch(setCvSent(false))
            Router.push('/estimation')
        }
    }, [processFailed, isParsingTextShowed, isCvSent, dispatch])

    const onDrop = useCallback(acceptedFiles => {
        setMyFiles(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
        onDrop,
        disabled: !isLoggedIn,
        accept: acceptedTypes
    })

    // can be list, but now it is ONE file
    const uploadedFiles = myFiles.map(file => {
        const icon = setFileIcon(file.type)

        return (
            <div key={file.path} className={style.file}>
                <div>
                    <span className={style.fileSize}>{Helper.getConvertedSize(file.size)}</span>
                    {icon}
                    <span className={style.fileName}>{file.path}</span>
                </div>
                {!isParsingModal && <DeleteBtn text="delete file" handle={() => setMyFiles([])} />}
            </div>
        )
    })

    function renderRejectedBlock() {
        return (
            <BorderedBox borderColor="#d73a49">
                <div className={style.rejectedWrap}>
                    <p>{t('main:dropzone.format_error')}</p>
                    <strong>{ACCEPTED_FILE_TYPES}</strong>
                </div>
            </BorderedBox>
        )
    }

    return (
        <div className={`${style.wrapper}`}>
            <div
                {...getRootProps()}
                className={`${style.dropzone} ${!isLoggedIn ? style.disabled : ''}`}>
                <input {...getInputProps()} />
                <div>
                    <div className={style.browse}>
                        <p dangerouslySetInnerHTML={{ __html: t('main:dropzone.instruction') }} />
                    </div>
                    <div className={style.formats}>
                        {t('main:dropzone.standard')} (
                        <Tooltip tip={linkedinTip} direction="top">
                            <span>LinkedIn</span>
                        </Tooltip>
                        {` ${t('main:dropzone.etc')}`})
                    </div>
                </div>
                <FaCloudUploadAlt className={style.uploadIcon} />
                {!isLoggedIn && (
                    <div className={style.toSignIn}>
                        <Link href="/signin">
                            <a>{t('main:dropzone.unlogged_error')}</a>
                        </Link>
                    </div>
                )}
            </div>
            {uploadedFiles}
            {myFiles.length > 0 && (
                <Button
                    startIcon={null}
                    endIcon={<FaArrowRight />}
                    btnClass="btn btn-accent btn-lg"
                    title="send CV"
                    handle={handlePushBtn}
                />
            )}
            {fileRejections.length > 0 && renderRejectedBlock()}
        </div>
    )

    function handlePushBtn() {
        pushFile(acceptedFiles)

        dispatch({ type: PARSING_MODAL, isParsingModal: true })
        dispatch({ type: PARSING_TEXT, isParsingTextShowed: true })

        setTimeout(() => {
            dispatch({ type: PARSING_TEXT, isParsingTextShowed: false })
        }, parsingDuration)
    }

    function pushFile(files) {
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

    function setFileIcon(docType) {
        if (docType === 'application/pdf') {
            return <FaFilePdf className={`${style.fileIcon} ${style.pdf}`} />
        }
        if (
            docType === 'application/msword' ||
            docType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            return <FaFileWord className={`${style.fileIcon} ${style.word}`} />
        }
        if (docType === 'image/png' || docType === 'image/jpg' || docType === 'image/jpeg') {
            return <FaFileImage className={`${style.fileIcon} ${style.image}`} />
        }
        return <FaFileAlt className={`${style.fileIcon}`} />
    }
}

export default withTranslation('main')(Dropzone)
