import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {withTranslation} from "@i18n"
import { savePersonalInfo, saveTestData } from '../../../actions/actionCreator'
import Loader from "../../../components/common/loaders/loader/Loader"
import PersonalInfo from "./personal-info/PersonalInfo"
import Questions from "./questions/Questions"

const Test = ({t}) => {

    const dispatch = useDispatch()
    const personalInfo = t(`questions:personalInfo`, { returnObjects: true })
    const questions = t(`questions:questions`, { returnObjects: true })

    const [testBlock, setTestBlock] = useState({toShow: 'personalInfo'})

    if (!personalInfo) {
        return <Loader/>
    }

    return (
        <>
            <PersonalInfo
                questions={personalInfo}
                saveAnswers={savePersonalInfo}
                isVisible={testBlock.toShow === 'personalInfo'}
                changeBlock={changeTestBlock}
            />
            <Questions
                questions={questions}
                saveAnswers={saveTestData}
                isVisible={testBlock.toShow === 'questions'}
                changeBlock={changeTestBlock}
            />
        </>
    )

    function changeTestBlock(blockToShow: string, currentBlock?: string,): void {
        setTestBlock({toShow: blockToShow})
    }
}

export default withTranslation('questions')(Test)