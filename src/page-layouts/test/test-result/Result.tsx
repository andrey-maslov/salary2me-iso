import React, { useEffect, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { Link, withTranslation } from '@i18n'
import ChartRadar from './radar-chart/ChartRadar'
import {
    getDescByRange, getFamous,
    getIndexByRange,
    UserResult,
    getAndDecodeData,
} from 'psychology'
import { IUserResult, IDescWithRange, IDescWithStatus, IOctant } from 'psychology/build/main/types/types'
import CodeBox from '../../../components/common/code-box/CodeBox'
import { TablesWithBars } from './TablesWithBars'
import TopBar from './top-bar/TopBar'
import Table from '../../../components/common/tables/table/Table'
import Box from '../../../components/common/box/Box'
import { useMediaPredicate } from 'react-media-hook'
import { useTranslation } from 'react-i18next'
import Loader from '../../../components/common/loaders/loader/Loader'
import { savePersonalInfo, saveTestData } from '../../../actions/actionCreator'
import {globalStoreType} from "../../../typings/types"

type AnyFullResultType = any
type ResultProps = {
    t: any
}

const Result: React.FC<ResultProps> = ({t}) => {

    const dispatch = useDispatch()
    const isXL = useMediaPredicate('(min-width: 1360px)')

    //parse url query params if it has encoded data
    const dataFromUrl: AnyFullResultType | null = getAndDecodeData().data

    const {name} = useSelector((state: globalStoreType) => state.user)
    const {personalInfo, testData} = dataFromUrl
        ? {personalInfo: dataFromUrl[0], testData : dataFromUrl[1]}
        : useSelector((state: globalStoreType) => state.test)
    const {terms: scheme, descriptions} = useSelector((state: globalStoreType) => state.test)

    const [isReady, setReady] = useState(false)

    useEffect(() => {
        if (dataFromUrl) {
            dispatch(savePersonalInfo(dataFromUrl[0]))
            dispatch(saveTestData(dataFromUrl[1]))
        }
        if (descriptions) {
            setReady(true)
        }
    }, [scheme, descriptions, name])

    //TODO check this!
    if (!isReady) {
        return <Loader/>
    }

    if (!testData || testData.length === 0) {
        return <div><Link href='/test'><a>{t('test:errors.take_the_test')}</a></Link></div>
    }

    const modedSubAxes = getModifiedSubAxes(scheme.subAxes)
    const fullProfile: IUserResult = UserResult(testData)
    const {sortedOctants, mainOctant, profile, portrait} = fullProfile
    const {fullProfileList, tablesWithBarsTitles, famousList, psychoTypeList, complexData, tendencies} = descriptions
    const tables = TablesWithBars(modedSubAxes, tablesWithBarsTitles, testData)
    const fullProfileData = getFullProfileData()

    if (fullProfile.mainOctant.value <= 0) {
        return (
            <div>
                <h2>{t('test:errors.test_failed')}</h2>
            </div>
        )
    }

    //fill full profile table title by translations
    let fpTableTile = [t('test:result_page.main_features'), t('test:result_page.revealed')]

    return (
        <div id="result">
            <h3>{t('test:result_page.title')}</h3>
            <Box>
                <TopBar
                    title={t('test:result_page.your_profile')}
                    userResult={profile.map((item, i) => [scheme.tendencies[i], item.value])}
                    details={tendencies}
                />
                <ChartRadar
                    profile={fullProfile.profile}
                    chartLabels={scheme.tendencies}
                    description={getPsychoTypeDesc(sortedOctants, psychoTypeList) || ''}
                    description2={getFamous(mainOctant, famousList, personalInfo[2])}
                />
            </Box>

            <Box>
                <h4>{t('test:result_page.export_result_title')}</h4>
                <p>
                    {t('test:result_page.export_result_desc')}
                    <a
                        style={{textDecoration: 'underline'}}
                        href={`${process.env.COOP_URL}?encdata=${btoa(JSON.stringify([personalInfo, testData]))}`}
                        target="_blank"
                        rel="noopener norefferer"
                    >
                        teamconstructor.com
                    </a></p>
                <CodeBox content={btoa(JSON.stringify([personalInfo, testData]))}/>
            </Box>


            {/*<h3>{t('common:result_page.key_features')}</h3>*/}
            {/*{tables.tablesWithBars && tables.tablesWithBars.map((item, i) => {*/}
            {/*    return <Box key={i}>*/}
            {/*        <ResultBlock*/}
            {/*            title={item.title}*/}
            {/*            description={item.desc}*/}
            {/*            tableData={item.data}*/}
            {/*        />*/}
            {/*    </Box>;*/}
            {/*})}*/}

            <Box className='result-box full-profile'>
                <h4>{t('test:result_page.full_profile_title')}</h4>
                <div className="row justify-content-between">
                    {isXL ? [fullProfileData.slice(0, 11), fullProfileData.slice(11)].map((tablePart, index) => {
                            return (
                                <div className="col-xl-6" key={index}>
                                    <Table
                                        tableData={tablePart}
                                        tableHeader={fpTableTile}
                                        addClasses={['striped']}
                                    />
                                </div>
                            )
                        }) :
                        <Table
                            tableData={fullProfileData}
                            tableHeader={fpTableTile}
                            addClasses={['striped']}
                        />}
                </div>
            </Box>


            <Box className='result-box full-profile'>
                <h4>{t('test:result_page.full_profile_title')}</h4>
                <Table
                    tableData={getComplexData(mainOctant, complexData).map(item => (
                        [item[0], <span dangerouslySetInnerHTML={{__html: item[1]}}/>]
                    ))}
                    tableHeader={fpTableTile}
                    addClasses={['striped']}
                />
            </Box>

        </div>
    )

    /**
     * data for long table with full profile
     */
    function getFullProfileData() {

        const data = fullProfileList
        const _ = getDescByRange

        const arr: IDescWithStatus[] = [
            {
                title: data[0].title,
                desc: (fullProfile.mainPsychoTypeList.map(item => scheme.psychoTypes[item])).join(', '),
                status: 1
            },                                                                    //профиль (сочетание профилей) - ведущий психотип
            _(mainOctant.value, data[1]),                                         // severity - выраженность
            _(testData[3][4], data[2]),                                         // relBuilding - склонность к установлению отношений
            _(testData[3][3], data[3]),                                         // relAccept - склонность к принятию отношений
            _(testData[3][2], data[4]),                                         // neuroticism - невротизм
            _((profile[0].value + profile[1].value + profile[7].value), data[5]), // motivation - мотивация
            _(mainOctant.index, data[7]),                                         // thinkingStyle - стиль мышления
            {
                title: data[8].title,
                desc: (fullProfile.mainTendencyList.map(item => scheme.tendencies[item])).join(', '),
                status: 1
            },                                                                   // ведущие тенденции
            _(mainOctant.index, data[9]),                                        // leadingEmotion - ведущая эмоция
            _(mainOctant.index, data[10]),                                       // reactionType - тип реагирования
            _(getSum(tables.managementData), data[11]),                            // efficiency эффективность
            {
                title: data[12].title,
                desc: getLeadershipSkills(data[12].options),
                status: 1
            },                                                               // лидерские качества
            _(getSum(tables.teamSurvivalData), data[13]),                      // teamSurvival - уживаемость в коллективе
            _(getSum(tables.selfOrganizationData), data[14]),                  // selfOrganize - самоорганизация
            _(getSum(tables.loyaltyData), data[15]),                           // loyalty - лояльность
            _(getSum(tables.initiativeData), data[16]),                        // Initiative - инициативность
            _(getSum(tables.learnabilityData), data[17]),                      // learnability - обучаемость
            _(getSum(tables.conformismData), data[18]),                        // conformism - конформизм
            _(getSum(tables.selfEsteemData), data[19]),                        // selfEsteem - самооценка
            _(getSum(tables.conflictData), data[20]),                          // conflict - конфликтность
            _(getSum(tables.depressionData), data[21])                         // depression - депрессивность
        ]
        return arr.map(item => [item.title, item.desc])
    }

    /**
     * Лидерксие качества
     * @param data
     */
    function getLeadershipSkills(data: IDescWithRange[]): string {
        const as = profile[3][1] + profile[4][1], // aggressiveness + spontaneity
            ee = profile[1][1] + profile[2][1], // extraversion + emotiveness
            value = as + ee,
            probably = (profile[3][1] < 5 || profile[4][1] < 5 || profile[1][1] < 5 || profile[2][1] < 5) ? `${data[5].desc}, ` : ''

        if (value < 24) {
            return `${probably}${data[0].desc}`
        }
        if (value > 42) {
            return (as >= ee) ?
                `${probably}${data[2].desc} ${data[1].desc}-${data[3].desc}` :
                `${probably}${data[2].desc} ${data[1].desc}-${data[4].desc}`
        }
        return (as >= ee) ?
            `${probably}${data[1].desc}-${data[3].desc}` :
            `${probably}${data[1].desc}-${data[4].desc}`
    }

    /**
     * Описание психотипа
     * @param sortedOctants
     * @param data
     */
    function getPsychoTypeDesc(sortedOctants: readonly IOctant[], data: readonly(readonly string[])[]): string | null {

        const value1 = sortedOctants[0].value
        const value2 = sortedOctants[1].value
        const typeInd = sortedOctants[0].index // get psycho type group index
        const diff: number = value1 * 0.15 // difference between 1st and 2nd max values
        const range = [8.75, 42.35, 140, 218.57]
        let descInd: number

        if (value1 < range[0] || value1 > range[3]) {
            return null
        }

        //combined profile
        if ((value1 - value2 < diff) && (sortedOctants[1].code === sortedOctants[0].code.toUpperCase())) {
            const ind = typeInd > 3 ? typeInd - 4 : typeInd
            return data[ind][3]
        }

        if (value1 >= range[0] && value1 < range[1]) {
            descInd = 0
        } else if (value1 >= range[1] && value1 < range[2]) {
            descInd = 1
        } else {
            descInd = 2
        }

        //mono profile
        return data[typeInd][descInd]
    }

    /**
     *
     * @param octant
     * @param data
     */
    function getComplexData(octant: IOctant, data: string[][][]): string[][] {

        const descByIndex = data[octant.index]

        let severityIndex = getIndexByRange(octant.value, fullProfileList[1].options)

        if (severityIndex > 2) {
            severityIndex = 2
        }
        // need to choose addition description by severity in fist line of the table
        let fistItem = descByIndex[0]
        let descBySeverity = fistItem[2][severityIndex]

        //change fist line of the table with edited description
        let fistItemEdited = [fistItem[0], fistItem[1] + descBySeverity]

        return [fistItemEdited, ...descByIndex.slice(1)]
    }

    function getModifiedSubAxes(subAxes: string[][]) {
        return subAxes.map(item => item.map(str => str.split(' - ')))
    }

    function getSum(tableData: ([string, number] | [string, number, number])[]): number {
        return tableData.map(item => item[1]).reduce((a, b) => Number(a) + Number(b))
    }
}

export default withTranslation(['test', 'common'])(Result)