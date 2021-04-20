import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { withTranslation } from '@i18n'
import { GrInfo } from 'react-icons/gr'
import { baseTestResultType, DecodedDataType, IUserResult } from 'psychology/build/main/types/types'
import { UserResult } from 'psychology'
import PersonalInfo from './personal-info/PersonalInfo'
import Questions from './questions/Questions'
import style from './test.module.scss'
import { savePersonalInfo, saveTestData, sendTestData } from '../../../actions/actionCreator'
import { TEST_THRESHOLD } from '../../../constants/constants'
import { encodeDataForURL, isBrowser, isTestPassed } from '../../../helper/helper'
import { globalStoreType } from '../../../typings/types'

interface IDataState {
    personalInfo: readonly number[] | null
    testData: baseTestResultType | null
}

const Test = ({ t }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [testBlock, setTestBlock] = useState('personalInfo')
    const { isLoggedIn } = useSelector((state: globalStoreType) => state.user)
    const [data, setData] = useState<IDataState>({
        personalInfo: null,
        testData: null
    })

    useEffect(() => {
        if (data.personalInfo && data.testData) {
            sendAnswers([data.personalInfo, data.testData])
        }
        // console.log('data from useEffect', data)
    }, [data.personalInfo, data.testData])



    return (
        <>
            <div className={`${testBlock === 'personalInfo' ? 'visible' : 'hidden'} fade-in`}>
                <div className={style.info}>
                    <GrInfo />
                    <div>{t('test:page.info_block_desc')}</div>
                </div>
                <PersonalInfo
                    changeBlock={changeTestBlock}
                    questionsSubmit={personalInfoSubmit}
                />
            </div>
            <div className={`${testBlock === 'questions' ? 'visible' : 'hidden'} fade-in`}>
                <div className={style.info}>
                    <GrInfo />
                    <div dangerouslySetInnerHTML={{ __html: t('test:page.test_block_desc') }} />
                </div>
                <Questions changeBlock={changeTestBlock} questionsSubmit={testSubmit} />
            </div>
        </>
    )

    function changeTestBlock(blockToShow: string): void {
        setTestBlock(blockToShow)
    }

    function personalInfoSubmit(answers: number[]): void {
        setData({ ...data, personalInfo: answers })
    }

    function testSubmit(answers: baseTestResultType): void {
        setData({ ...data, testData: answers })
    }

    function sendAnswers(fullResult: DecodedDataType) {
        // console.log('data from send answ', data)
        const isPassed = isTestPassed(fullResult[1], TEST_THRESHOLD)
        if (isPassed) {
            dispatch(savePersonalInfo(fullResult[0]))
            dispatch(saveTestData(fullResult[1]))
        }
        if (isLoggedIn && isPassed) {
            dispatch(sendTestData())
        }
        if (isBrowser) {
            router.push(`result?encdata=${encodeDataForURL(fullResult)}`)
        }
    }
}

export default withTranslation('test')(Test)
