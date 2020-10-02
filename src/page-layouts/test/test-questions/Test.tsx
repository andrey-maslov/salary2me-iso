import React, {useState} from 'react'
import {withTranslation} from "@i18n"
import {savePersonalInfo, saveTestData} from '../../../actions/actionCreator'
import Loader from "../../../components/common/loaders/loader/Loader"
import PersonalInfo from "./personal-info/PersonalInfo"
import Questions from "./questions/Questions"
import {GrInfo} from 'react-icons/gr'
import style from './test.module.scss'

const Test = ({t}) => {

    const personalInfo = t(`questions:personalInfo`, {returnObjects: true})
    const questions = t(`questions:questions`, {returnObjects: true})
    const [testBlock, setTestBlock] = useState('personalInfo')

    if (!personalInfo) {
        return <Loader/>
    }

    return (
        <>
            <div className={`${testBlock === 'personalInfo' ? 'visible' : 'hidden'} fade-in`}>
                <div className={style.info}>
                    <GrInfo/>
                    <div dangerouslySetInnerHTML={{__html: t('test:page.info_block_desc')}} />
                </div>
                <PersonalInfo
                    questions={personalInfo}
                    saveAnswers={savePersonalInfo}
                    changeBlock={changeTestBlock}
                />
            </div>
            <div className={`${testBlock === 'questions' ? 'visible' : 'hidden'} fade-in`}>
                <div className={style.info}>
                    <GrInfo/>
                    <div dangerouslySetInnerHTML={{__html: t('test:page.test_block_desc')}}/>
                </div>
                <Questions
                    questions={questions}
                    saveAnswers={saveTestData}
                    changeBlock={changeTestBlock}
                />
            </div>
        </>
    )

    function changeTestBlock(blockToShow: string, currentBlock?: string,): void {
        setTestBlock(blockToShow)
    }
}

export default withTranslation('questions')(Test)