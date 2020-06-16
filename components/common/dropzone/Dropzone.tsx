import React, {useState, useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {ACCEPTED_FILE_TYPES, parsingDuration} from '../../../constants/constants';
import Button from "../buttons/button/Button";
import {FaArrowRight, FaCloudUploadAlt, FaFileAlt, FaFilePdf, FaFileWord, FaFileImage} from "react-icons/fa";
import DeleteBtn from "../buttons/delete-btn/DeleteBtn";
import {connect} from 'react-redux';
import {
    setLoginModal,
    setOnlyLoggedModal,
    setParsingModal,
    setParsingTextState,
    setCvSent,
    sendCvForResults
} from "../../../actions/actionCreator";
import {Helper} from '../../../helper/helper';
import BorderedBox from "../bordered-box/BorderedBox";
import {useMediaPredicate} from "react-media-hook";
import {Tooltip} from "../tooltip/Tooltip";
import {AppReducerType} from "../../../reducers/appReducer";
import {UserDataType} from "../../../reducers/userData";
import {Router} from '@i18n';

import style from './dropzone.module.scss';

type DropzoneType = {
    userEmail: string
    userName: string
    isUserLogged: boolean
    isParsingError: boolean
    isParsingModalShowed: boolean
    isParsingTextShowed: boolean
    isCvSent: boolean
    setOnlyLoggedModal: (p: boolean) => void
    setParsingModal: (p: boolean) => void
    setParsingTextState: (p: boolean) => void
    setCvSent: (p: boolean) => void
    sendCvForResults: any
}

const Dropzone: React.FC<DropzoneType> = (props) => {

    const {
        userEmail,
        userName,
        isUserLogged,
        isParsingError,
        isParsingModalShowed,
        isParsingTextShowed,
        isCvSent,
        setOnlyLoggedModal,
        setParsingModal,
        setParsingTextState,
        setCvSent,
        sendCvForResults
    } = props;

    const linkedinTip = 'Profile - More - Save to PDF';
    // const history = useHistory();
    const [myFiles, setMyFiles] = useState([]);
    const lessThan400 = useMediaPredicate("(max-width: 400px)");


    const onDrop = useCallback(acceptedFiles => {
        setMyFiles([...acceptedFiles]);
    }, []);

    const {getRootProps, getInputProps, open, acceptedFiles, fileRejections} = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
        // disabled: !isUserLogged,
        onDrop,
        accept: ACCEPTED_FILE_TYPES
    });


    const removeAll = () => {
        setMyFiles([])
    };


    const handlePushBtn = () => {

        if (isUserLogged) {

            openParsingModal();
            pushFile(acceptedFiles);
            setParsingTextState(true);

            setTimeout(() => {
                setParsingTextState(false)
            }, parsingDuration);
        } else {
            setOnlyLoggedModal(true);
        }
    };

    const openParsingModal = () => {
        setParsingModal(true);
    };


    const pushFile = (files, email = userEmail, name = userName) => {

        if (files.length > 0) {
            const formData = new FormData()
            formData.append('email', email);
            formData.append('ContentType', files[0].type);
            formData.append('Name', name);
            formData.append('FileName', files[0].path);
            formData.append('file', files[0]);

            sendCvForResults(formData);
        }
    };


    useEffect(() => {
        if (!isParsingError && !isParsingTextShowed && isCvSent) {

            setParsingModal(false);
            setCvSent(false);
            Router.push('/results')
            // history.push('/results');
        }
    }, [isParsingError, isParsingTextShowed, isCvSent])


    //can be list, but now it is ONE file
    const acceptedFilesList = myFiles.map(file => {

        const icon = setFileIcon(file.type);

        return (
            <div key={file.path} className={style.file}>
                <div>
                    <span className={style.fileSize}>{Helper.getConvertedSize(file.size)}</span>
                    {icon}
                    <span className={style.fileName}>{file.path}</span>
                </div>
                {!isParsingModalShowed && <DeleteBtn handle={removeAll}/>}
            </div>
        )
    });


    return (
        <div className={`${style.wrapper}`}>
            <div {...getRootProps()} className={`${style.dropzone}`}>
                <input {...getInputProps()} />
                <div>
                    <p>Drop your CV file here</p>
                    <p>or</p>
                    <span className={`${style.browse} color-accent`} onClick={open}>Browse</span>
                </div>
                <FaCloudUploadAlt className={style.uploadIcon}/>
                <p className={style.formats}>Standardized formats{lessThan400 && <br/>} are preferred (<Tooltip
                    tip={linkedinTip} direction="top"><span>LinkedIn</span></Tooltip> etc.)</p>
            </div>
            {acceptedFilesList}
            {myFiles.length > 0 &&
            <Button
                startIcon={null}
                endIcon={<FaArrowRight/>}
                btnClass={`btn btn-accent btn-lg ${style.pushBtn}`}
                title="send CV"
                handle={handlePushBtn}
            />}
            {fileRejections.length > 0 && renderRejectedBlock()}
        </div>
    );

    function renderRejectedBlock() {
        return (
            <BorderedBox borderColor={'#D73A49'}>
                <div className={style.rejectedWrap}>
                    This file has not accepted type.<br/>
                    Only following file types are accepted:<br/>
                    <strong>{ACCEPTED_FILE_TYPES}</strong>
                </div>
            </BorderedBox>
        )
    }

    function setFileIcon(docType) {
        switch (docType) {
            case 'application/pdf' :
                return <FaFilePdf className={`${style.fileIcon} ${style.pdf}`}/>;
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                return <FaFileWord className={`${style.fileIcon} ${style.word}`}/>;
            case 'image/png' :
            case 'image/jpg' :
            case 'image/jpeg' :
                return <FaFileImage className={`${style.fileIcon} ${style.image}`}/>;
            default :
                return <FaFileAlt className={`${style.fileIcon}`}/>
        }
    }

}

interface DropzoneState {
    userData: UserDataType
    appReducer: AppReducerType
    predictionsRequestHasErrored: boolean
}

export default connect((state: DropzoneState) => ({
    userName: state.userData.info.name,
    userEmail: state.userData.info.email,
    isUserLogged: state.userData.auth.isLoggedIn,
    isParsingTextShowed: state.appReducer.isParsingTextShowed,
    isParsingModalShowed: state.appReducer.isParsingModal,
    isCvSent: state.userData.isCvSent,
    isParsingError: state.predictionsRequestHasErrored,
}), {setLoginModal, setOnlyLoggedModal, setParsingModal, setParsingTextState, setCvSent, sendCvForResults})(Dropzone);