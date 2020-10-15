import React, { useState } from 'react'
import { withTranslation } from '@i18n'
import { GrInfo } from 'react-icons/gr'
import PersonalInfo from './personal-info/PersonalInfo'
import Questions from './questions/Questions'
import style from './test.module.scss'

const Test = ({ t }) => {
    const [testBlock, setTestBlock] = useState('personalInfo')

    return (
        <>
            <div className={`${testBlock === 'personalInfo' ? 'visible' : 'hidden'} fade-in`}>
                <div className={style.info}>
                    <GrInfo />
                    <div dangerouslySetInnerHTML={{ __html: t('test:page.info_block_desc') }} />
                </div>
                <PersonalInfo changeBlock={changeTestBlock} />
            </div>
            <div className={`${testBlock === 'questions' ? 'visible' : 'hidden'} fade-in`}>
                <div className={style.info}>
                    <GrInfo />
                    <div dangerouslySetInnerHTML={{ __html: t('test:page.test_block_desc') }} />
                </div>
                <Questions changeBlock={changeTestBlock} />
            </div>
        </>
    )

    function changeTestBlock(blockToShow: string): void {
        setTestBlock(blockToShow)
    }
}

export default withTranslation('questions')(Test)
