import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { FiArrowRight, FiArrowLeft, FiMoreVertical } from 'react-icons/fi'
import { withTranslation } from '@i18n'
import { useToasts } from 'react-toast-notifications'
import Button from '../../../../components/common/buttons/button/Button'
import { checkAnswers, isBrowser } from '../../../../helper/helper'
import { AnswerType, globalStoreType, IQuestion, QuestionsProps } from '../../../../typings/types'
import RadioGroupItem from '../radio-group-item/RadioGroupItem'
import style from './questions.module.scss'
import { saveTestData, sendTestData } from '../../../../actions/actionCreator'
import FakeResults from '../../../../pages/test/FakeResults'

const Questions = ({ changeBlock, t }: QuestionsProps) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const { isLoggedIn } = useSelector((state: globalStoreType) => state.user)

    const questions: IQuestion[] = t(`questions:questions`, { returnObjects: true })

    let initAnswers: Array<AnswerType> = questions.map(item => ({
        id: item.title,
        value: ''
    }))

    const [answers, setAnswers] = useState<AnswerType[]>(initAnswers)
    const [isAddButtons, setAddButtons] = useState(false)

    const testHandler = (questionNumber: number, value: string) => {
        initAnswers = answers
        initAnswers[questionNumber - 1] = { id: questionNumber.toString(), value }
        setAnswers([...initAnswers])
    }

    const returnBtnHandler = () => {
        changeBlock('personalInfo')
        window.scrollTo(0, 0)
    }

    return (
        <>
            <div>
                {questions.map((item, i) => (
                    <RadioGroupItem
                        caption1={t(`questions:questions.${i}.values.0`)}
                        caption2={t(`questions:questions.${i}.values.1`)}
                        values={['-2', '-1', '0', '1', '2']}
                        index={i + 1}
                        testHandler={testHandler}
                        key={i}
                    />
                ))}
            </div>
            <div className={style.buttons}>
                <Button
                    handle={returnBtnHandler}
                    btnClass="btn btn-accent"
                    title={t('common:buttons.return')}
                    startIcon={<FiArrowLeft />}
                />
                <Button
                    handle={sendBtnHandler}
                    btnClass="btn btn-accent"
                    title={t('common:buttons.send')}
                    endIcon={<FiArrowRight />}
                />
                {isLoggedIn && (
                    <button
                        onClick={() => {
                            setAddButtons(!isAddButtons)
                        }}
                        className={style.more}>
                        <FiMoreVertical />
                    </button>
                )}
            </div>
            {isAddButtons && (
                <FakeResults calculateResults={calculateResults} sendAnswers={sendAnswers} />
            )}
        </>
    )

    function sendBtnHandler() {
        const num = checkAnswers(answers)
        if (num === -1) {
            sendAnswers(calculateResults(answers))
        } else if (isBrowser && num !== -1) {
            addToast(t('test:errors.all_q_required'), {
                appearance: 'error'
            })
            // scroll to first not answered question
            const targetElem: any = document.querySelector(
                `.visible [data-item-index="${num + 1}"]`
            )
            targetElem.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    }

    function sendAnswers(result: any) {
        dispatch(saveTestData(result))

        if (isLoggedIn) {
            dispatch(sendTestData())
        }
        router.push('result')
    }

    function calculateResults(answersArr: Array<AnswerType>) {
        const arrSum = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]

        arrSum.forEach((item, i) => {
            let k = i
            const list = [0, 0, 0]
            item.forEach((value, j) => {
                list.forEach(() => {
                    arrSum[i][j] += +answersArr[k].value
                    k += 5
                })
            })
        })
        return arrSum
    }
}

export default withTranslation('questions')(Questions)
