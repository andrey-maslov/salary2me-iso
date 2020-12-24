import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiArrowRight, FiArrowLeft, FiMoreVertical } from 'react-icons/fi'
import { withTranslation } from '@i18n'
import { useToasts } from 'react-toast-notifications'
import { calculateResults } from 'psychology'
import Button from '../../../../components/common/buttons/button/Button'
import { AnswerType, globalStoreType, IQuestion, QuestionsProps } from '../../../../typings/types'
import RadioGroupItem from '../radio-group-item/RadioGroupItem'
import style from './questions.module.scss'
import FakeResults from '../../../../pages/test/FakeResults'
import { checkAnswers, isBrowser } from '../../../../helper/helper'

const Questions = ({ changeBlock, t, questionsSubmit }: QuestionsProps) => {
    const { addToast } = useToasts()
    const { isLoggedIn } = useSelector((state: globalStoreType) => state.user)

    const questions: IQuestion[] = t(`questions:questions`, { returnObjects: true })

    let initAnswers: Array<AnswerType> = questions.map((item, i) => ({
        id: `${i + 1}`,
        value: ''
    }))

    const [answers, setAnswers] = useState<AnswerType[]>(initAnswers)
    const [isAddButtons, setAddButtons] = useState(false)

    return (
        <>
            <div>
                {questions.map((item, i) => (
                    <RadioGroupItem
                        caption1={t(`questions:questions.${i}.0`)}
                        caption2={t(`questions:questions.${i}.1`)}
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
                    handle={testSubmit}
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
            {/* {isAddButtons && ( */}
            {/*    <FakeResults calculateResults={calculateResults} sendAnswers={sendAnswers} /> */}
            {/* )} */}
        </>
    )

    function testSubmit() {
        const check: number = checkAnswers(answers)
        if (check === -1) {
            // @ts-ignore
            questionsSubmit(calculateResults(answers))
        } else if (isBrowser && check !== -1) {
            addToast(t('test:errors.all_q_required'), {
                appearance: 'error'
            })
            // scroll to first not answered question
            const targetElem: any = document.querySelector(
                `.visible [data-item-index="${check + 1}"]`
            )
            targetElem.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    }

    function testHandler(questionNumber: number, value: string) {
        initAnswers = answers
        initAnswers[questionNumber - 1] = { id: questionNumber.toString(), value }
        setAnswers([...initAnswers])
    }

    function returnBtnHandler() {
        changeBlock('personalInfo')
        window.scrollTo(0, 0)
    }
}

export default withTranslation('questions')(Questions)
