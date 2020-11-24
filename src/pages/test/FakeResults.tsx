import React from 'react'
import style from '../../page-layouts/test/test-questions/questions/questions.module.scss'
import Button from '../../components/common/buttons/button/Button'
import fakeData from '../../page-layouts/test/test-questions/questions/fakeData.json'
import { getRandomIntInclusive } from '../../helper/helper'

interface IFakeResults {
    calculateResults: any
    sendAnswers: any
}

const FakeResults: React.FC<IFakeResults> = ({ calculateResults, sendAnswers }) => {
    return (
        <div className={style.addButtons}>
            <Button handle={sendFakeData} btnClass="btn btn-accent" title="send example data" />
            <Button
                handle={sendRandomFakeData}
                btnClass="btn btn-accent"
                title="send generated data"
            />
        </div>
    )

    // send template answers
    function sendFakeData() {
        const data = fakeData.fakeData
        const calculatedResult = calculateResults(data)
        sendAnswers(calculatedResult)
    }

    // Generate and send random generated answers
    function sendRandomFakeData() {
        const fake = []
        for (let i = 1; i <= 75; i++) {
            const value = getRandomIntInclusive(-2, 2)
            fake.push({ id: `${i}`, value })
        }
        const calculatedResult = calculateResults(fake)
        sendAnswers(calculatedResult)
    }
}

export default FakeResults
