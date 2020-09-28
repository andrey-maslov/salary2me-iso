import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import {withTranslation} from "@i18n"
import Button from '../../../../components/common/buttons/button/Button'
import { AnswerType, QuestionsProps } from '../../../../typings/types'
import { checkAnswers, isBrowser } from '../../../../helper/helper'
import RadioGroupItem from '../radio-group-item/RadioGroupItem'
// import Toast from 'light-toast'

const PersonalInfo = ({questions, saveAnswers, isVisible, changeBlock, t}: QuestionsProps) => {

    let initAnswers: Array<AnswerType> = [...questions].map((item: any) => ({id: item.title, value: ''}))

    const [state, setState] = useState({
                                           answers: initAnswers,
                                           isBtnEnabled: true
                                       })

    const testHandler = (questionNumber: number, value: string) => {
        initAnswers = state.answers
        initAnswers[questionNumber - 1] = {id: initAnswers[questionNumber - 1].id, value: value}
        setState({...state, answers: [...initAnswers]})
    }

    const nextBtnHandler = () => {
        const result = state.answers.map(item => +item.value)
        const num = checkAnswers(state.answers)
        if (num === -1) {
            saveAnswers(result)
            changeBlock('questions')
            window.scrollTo(0, 0)
        } else {
            if (isBrowser) {
                // Toast.fail('Необходимо ответить на все вопросы', 3000, )
                //scroll to first not answered question
                let targetElem: any = document.querySelector(`.visible [data-item-index="${num + 1}"]`)
                targetElem.scrollIntoView({block: 'center', behavior: 'smooth'})
            }
        }
    }

    const visibleClass: string = isVisible ? 'visible' : 'hidden'

    const renderQuestionsList = (): React.ReactNode[] => {

        const personalInfoScheme = [
            ['0', '1', '2'],
            ['0', '1', '2', '3', '4', '5'],
            ['0', '1', '2'],
        ]

        return personalInfoScheme.map((item, i) => (
            <RadioGroupItem
                caption1={t(`questions:personalInfo.${i}.title`)}
                values={item}
                labels={t(`questions:personalInfo.${i}.values`, {returnObjects: true})}
                index={i + 1}
                testHandler={testHandler}
                type='vertical'
                key={i}
            />
        ))
    }

    return (
        <div className={`${visibleClass} fade-in`}>
            <p>{t('test:page.info_block_desc')}</p>

            {renderQuestionsList()}

            <Button
                handle={nextBtnHandler}
                btnClass='btn-accent'
                title={t('common:buttons.next')}
                endIcon={<FiArrowRight/>}
                isEnabled={state.isBtnEnabled}
            />
        </div>
    )
}

export default withTranslation(['test', 'questions'])(PersonalInfo)