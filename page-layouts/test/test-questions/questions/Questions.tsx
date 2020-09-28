import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Button from '../../../../components/common/buttons/button/Button'
import { FiArrowRight, FiArrowLeft, FiMoreVertical } from 'react-icons/fi'
import fakeData from './fakeData.json'
import { checkAnswers, getRandomIntInclusive, isBrowser } from '../../../../helper/helper'
import {AnswerType, globalStoreType, QuestionsProps} from '../../../../typings/types'
import RadioGroupItem from "../radio-group-item/RadioGroupItem"
import style from './questions.module.scss'
import {withTranslation} from "@i18n"

const Questions = ({saveAnswers, questions, isVisible, changeBlock, t}: QuestionsProps) => {

    const router = useRouter()
    const visibleClass: string = isVisible ? 'visible' : 'hidden'
    const {isLoggedIn} = useSelector((state: globalStoreType) => state.user)

    let initAnswers: Array<AnswerType> = [...questions].map((item: any) => ({id: item.title, value: ''}))

    const [answers, setAnswers] = useState<AnswerType[]>(initAnswers)
    const [isAddButtons, setAddButtons] = useState(false)

    const testHandler = (questionNumber: number, value: string) => {
        initAnswers = answers
        initAnswers[questionNumber - 1] = {id: questionNumber.toString(), value: value}
        setAnswers([...initAnswers])
    }

    const returnBtnHandler = () => {
        changeBlock('personalInfo')
        window.scrollTo(0, 0)
    }

    const renderQuestionsList = (): React.ReactNode[] => {
        let questions: React.ReactNode[] = []
        for (let i = 0; i < 75; i++) {
            questions.push(
                <RadioGroupItem
                    caption1={t(`questions:questions.${i}.values.0`)}
                    caption2={t(`questions:questions.${i}.values.1`)}
                    values={['-2', '-1', '0', '1', '2']}
                    index={i + 1}
                    testHandler={testHandler}
                    key={i}
                />
            )
        }
        return questions
    }

    return (
        <div className={`${visibleClass} fade-in`}>
            <div
                dangerouslySetInnerHTML={{__html: t('test:page.test_block_desc')}}
            />
            {renderQuestionsList()}
            <div className={style.buttons}>
                <Button
                    handle={returnBtnHandler}
                    btnClass='btn-accent'
                    title={t('common:buttons.return')}
                    startIcon={<FiArrowLeft/>}
                />
                <Button
                    handle={sendBtnHandler}
                    btnClass='btn-accent'
                    title={t('common:buttons.send')}
                    endIcon={<FiArrowRight/>}
                    // isEnabled={false}
                />
                {isLoggedIn && <button onClick={() => {
                    setAddButtons(!isAddButtons)
                }} className={style.more}><FiMoreVertical/></button>}
            </div>
            {isAddButtons && <div className={style.addButtons}>
                <Button
                    handle={sendFakeData}
                    btnClass='btn-accent'
                    title={t('common:buttons.send_example_data')}
                />
                <Button
                    handle={sendRandomFakeData}
                    btnClass='btn-accent'
                    title={t('common:buttons.send_generated_data')}
                />
            </div>}
        </div>
    )

    function calculateResults(answersArr: Array<AnswerType>) {
        const arrSum = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]

        arrSum.forEach((item, i) => {
            let k = i
            item.forEach((value, j) => {
                [0, 0, 0].forEach(() => {
                    arrSum[i][j] += +answersArr[k].value
                    k += 5
                })
            })
        })

        return arrSum
    }

    function sendBtnHandler() {
        const num = checkAnswers(answers)

        if (num === -1) {
            sendAnswers(calculateResults(answers))
        } else {
            if (isBrowser) {
                // Toast.fail('Необходимо ответить на все вопросы', 3000,)
                //scroll to first not answered question
                let targetElem: any = document.querySelector(`.visible [data-item-index="${num + 1}"]`)
                targetElem.scrollIntoView({block: 'center', behavior: 'smooth'})
            }
        }
    }

    function sendAnswers(result: any) {
        saveAnswers(result)
        router.push('/result')
    }

    //send template answers
    function sendFakeData() {
        let data = fakeData.fakeData
        const calculatedResult = calculateResults(data)
        sendAnswers(calculatedResult)
    }

    //Generate and send random generated answers
    function sendRandomFakeData() {
        let fakeData: any = []
        for (let i = 1; i <= 75; i++) {
            let value = getRandomIntInclusive(-2, 2)
            fakeData.push({id: `${i}`, value})
        }
        const calculatedResult = calculateResults(fakeData)
        sendAnswers(calculatedResult)
    }
}

export default withTranslation('questions')(Questions)