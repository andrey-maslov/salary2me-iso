import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FiArrowRight } from 'react-icons/fi'
import { withTranslation } from '@i18n'
import { useToasts } from 'react-toast-notifications'
import Button from '../../../../components/common/buttons/button/Button'
import { AnswerType, IQuestion, QuestionsProps } from '../../../../typings/types'
import { checkAnswers, isBrowser } from '../../../../helper/helper'
import RadioGroupItem from '../radio-group-item/RadioGroupItem'
import { savePersonalInfo } from '../../../../actions/actionCreator'

const PersonalInfo = ({ changeBlock, t }: QuestionsProps) => {
    const personalInfo: IQuestion[] = t(`questions:personalInfo`, { returnObjects: true })
    let initAnswers: Array<AnswerType> = personalInfo.map((item: any) => ({
        id: item.title,
        value: ''
    }))

    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [state, setState] = useState({
        answers: initAnswers,
        isBtnEnabled: true
    })

    const personalInfoScheme = [['0', '1', '2'], ['0', '1', '2', '3', '4', '5'], ['0', '1', '2']]

    return (
        <>
            <div>
                {personalInfoScheme.map((item, i) => (
                    <RadioGroupItem
                        caption1={t(`questions:personalInfo.${i}.title`)}
                        values={item}
                        labels={t(`questions:personalInfo.${i}.values`, { returnObjects: true })}
                        index={i + 1}
                        testHandler={testHandler}
                        type="vertical"
                        key={i}
                    />
                ))}
            </div>
            <Button
                handle={nextBtnHandler}
                btnClass="btn btn-accent"
                title={t('common:buttons.next')}
                endIcon={<FiArrowRight />}
                isEnabled={state.isBtnEnabled}
            />
        </>
    )

    function testHandler(questionNumber: number, value: string): void {
        initAnswers = state.answers
        initAnswers[questionNumber - 1] = { id: initAnswers[questionNumber - 1].id, value }
        setState({ ...state, answers: [...initAnswers] })
    }

    function nextBtnHandler(): void {
        const result = state.answers.map(item => +item.value)
        const num = checkAnswers(state.answers)
        if (num === -1) {
            dispatch(savePersonalInfo(result))
            changeBlock('questions')
            window.scrollTo(0, 0)
        } else if (isBrowser) {
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
}

export default withTranslation(['test', 'common', 'questions'])(PersonalInfo)
