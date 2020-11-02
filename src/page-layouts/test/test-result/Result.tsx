import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, withTranslation } from '@i18n'
import { getDescByRange, getFamous, UserResult, getAndDecodeData } from 'psychology'
import { IUserResult, IDescWithRange, IDescWithStatus } from 'psychology/build/main/types/types'
import { useMediaPredicate } from 'react-media-hook'
import ChartRadar from './radar-chart/ChartRadar'
import { TablesWithBars } from './TablesWithBars'
import TopBar from './top-bar/TopBar'
import Table from '../../../components/common/tables/table/Table'
import Box from '../../../components/common/box/Box'
import Loader from '../../../components/common/loaders/loader/Loader'
import { savePersonalInfo, saveTestData } from '../../../actions/actionCreator'
import { globalStoreType } from '../../../typings/types'
import Famous from './famous/Famous'
import ShareResult from './share-result/ShareResult'
import { PSYCHO_RESULT } from '../../../actions/actionTypes'
import {
    getModifiedSubAxes,
    getOctantFraction,
    getPortraitDesc,
    getPsychoTypeDesc,
    getSum
} from './functions'

type AnyFullResultType = any
type ResultProps = {
    t: any
}

const Result: React.FC<ResultProps> = ({ t }) => {
    const dispatch = useDispatch()
    const isXL = useMediaPredicate('(min-width: 1360px)')

    // parse url query params if it has encoded data
    const dataFromUrl: AnyFullResultType | null = getAndDecodeData().data

    const { isLoggedIn, email } = useSelector((state: globalStoreType) => state.user)
    const storeData = useSelector((state: globalStoreType) => state.test)
    const { personalInfo, testData } = dataFromUrl
        ? { personalInfo: dataFromUrl[0], testData: dataFromUrl[1] }
        : storeData
    const { terms: scheme, descriptions } = useSelector((state: globalStoreType) => state.test)

    const [isReady, setReady] = useState(false)

    useEffect(() => {
        if (dataFromUrl) {
            dispatch(savePersonalInfo(dataFromUrl[0]))
            dispatch(saveTestData(dataFromUrl[1]))
        }
        if (descriptions) {
            setReady(true)
            console.log(
                JSON.stringify({
                    fullProfileData,
                    portraitDesc,
                    famous,
                    secondaryPortraitDesc,
                    psychoTypeDesc
                })
            )
            dispatch({
                type: PSYCHO_RESULT,
                result: {
                    fullProfileData,
                    portraitDesc,
                    famous,
                    secondaryPortraitDesc,
                    psychoTypeDesc
                }
            })
        }
    }, [scheme, descriptions, email, dataFromUrl, dispatch])

    // TODO check this!
    if (!isReady) {
        return <Loader />
    }

    if (!testData || testData.length === 0) {
        return (
            <div className="flex-centered">
                <Link href="/test">
                    <a>{t('test:errors.take_the_test')}</a>
                </Link>
            </div>
        )
    }

    const modedSubAxes = getModifiedSubAxes(scheme.subAxes)
    const fullProfile: IUserResult = UserResult(testData)
    const sex = personalInfo[2] === 2 ? 1 : personalInfo[2]
    const { sortedOctants, mainOctant, profile, mainPsychoTypeList } = fullProfile
    const {
        fullProfileList,
        tablesWithBarsTitles,
        famousList,
        psychoTypeList,
        complexDataSoft,
        tendencies
    } = descriptions
    const famous: { person: string; picture: string } | null = getFamous(
        mainOctant,
        famousList,
        sex
    )
    const tables = TablesWithBars(modedSubAxes, tablesWithBarsTitles, testData)
    const fullProfileData = getProfileDesc()
    const portraitDesc = getPortraitDesc(mainOctant, complexDataSoft, fullProfileList)
    const psychoTypeDesc = getPsychoTypeDesc(sortedOctants, psychoTypeList) || ''
    const mainPsychoType: string = scheme.psychoTypes[mainPsychoTypeList[0]]
    const secondaryPsychoType: string | null = mainPsychoTypeList[1]
        ? scheme.psychoTypes[mainPsychoTypeList[1]]
        : null
    const secondaryPortraitDesc: string | null = mainPsychoTypeList[1]
        ? complexDataSoft[mainPsychoTypeList[1]][0][1]
        : null
    const mainOctantFraction: number = getOctantFraction(mainOctant, sortedOctants)
    const secondaryOctantFraction: number | null = secondaryPsychoType
        ? getOctantFraction(sortedOctants[1], sortedOctants)
        : null

    if (fullProfile.mainOctant.value <= 0) {
        return (
            <div className="flex-centered">
                <h2>{t('test:errors.test_failed')}</h2>
            </div>
        )
    }

    const encData = btoa(JSON.stringify([personalInfo, testData]))
    const fpTableTile = [t('test:result_page.main_features'), t('test:result_page.revealed')]

    return (
        <div id="result">
            <h3>{t('test:result_page.title')}</h3>
            <Box>
                <TopBar
                    title={t('test:result_page.your_profile')}
                    userResult={profile.map((item, i) => [scheme.tendencies[i], item.value])}
                    details={tendencies}
                    isLoggedIn={isLoggedIn}
                />
                <div className="row middle-xs">
                    <div className="col-lg-7">
                        <ChartRadar profile={fullProfile.profile} chartLabels={scheme.tendencies} />
                    </div>
                    <div className="col-lg-5">
                        {famous && (
                            <Famous
                                person={famous.person}
                                imgName={famous.picture}
                                desc={psychoTypeDesc}
                            />
                        )}
                    </div>
                </div>
            </Box>

            <Box className="result-box full-profile">
                <h4>{t('test:result_page.psychological_portrait')}</h4>
                {secondaryPortraitDesc ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            Ваш основной психотип -{' '}
                            <strong>
                                {mainPsychoType} ({(mainOctantFraction * 100).toFixed(1)}%)
                            </strong>
                            , дополнительный психотип -{' '}
                            <strong>
                                {secondaryPsychoType} ({(secondaryOctantFraction * 100).toFixed(1)}%)
                            </strong>
                        </div>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            Описание дополнительного психотипа:
                        </div>
                        <p style={{ marginBottom: '1.5rem' }}>{secondaryPortraitDesc}</p>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            Описание основного психотипа:
                        </div>
                    </div>
                ) : (
                    <div className="pb-sm">
                        <div>
                            Ваш психотип - <strong>{mainPsychoType}</strong>
                        </div>
                    </div>
                )}
                <Table
                    tableData={portraitDesc.map(item => [
                        item[0],
                        <span dangerouslySetInnerHTML={{ __html: item[1] }} key={item[0]} />
                    ])}
                    tableHeader={fpTableTile}
                    addClasses={['striped', 'large']}
                />
            </Box>

            <Box className="result-box full-profile">
                <h4>{t('test:result_page.psychological_profile_desc')}</h4>
                <div className="row justify-content-between">
                    {isXL ? (
                        [fullProfileData.slice(0, 11), fullProfileData.slice(11)].map(
                            (tablePart, index) => {
                                return (
                                    <div className="col-xl-6" key={index}>
                                        <Table
                                            tableData={tablePart}
                                            tableHeader={fpTableTile}
                                            addClasses={['striped']}
                                        />
                                    </div>
                                )
                            }
                        )
                    ) : (
                        <Table
                            tableData={fullProfileData}
                            tableHeader={fpTableTile}
                            addClasses={['striped']}
                        />
                    )}
                </div>
            </Box>

            <Box>
                <ShareResult encData={encData} isLoggedIn={isLoggedIn} />
            </Box>
        </div>
    )

    /**
     * data for long table with full profile
     */
    function getProfileDesc() {
        const data = fullProfileList
        const _ = getDescByRange

        const arr: IDescWithStatus[] = [
            {
                title: data[0].title,
                desc: fullProfile.mainPsychoTypeList
                    .map(item => scheme.psychoTypes[item])
                    .join(', '),
                status: 1
            }, // профиль (сочетание профилей) - ведущий психотип
            _(mainOctant.value, data[1]), // severity - выраженность
            _(testData[3][4], data[2]), // relBuilding - склонность к установлению отношений
            _(testData[3][3], data[3]), // relAccept - склонность к принятию отношений
            _(testData[3][2], data[4]), // neuroticism - невротизм
            _(profile[0].value + profile[1].value + profile[7].value, data[5]), // motivation - мотивация
            _(mainOctant.index, data[7]), // thinkingStyle - стиль мышления
            {
                title: data[8].title,
                desc: fullProfile.mainTendencyList.map(item => scheme.tendencies[item]).join(', '),
                status: 1
            }, // ведущие тенденции
            _(mainOctant.index, data[9]), // leadingEmotion - ведущая эмоция
            _(mainOctant.index, data[10]), // reactionType - тип реагирования
            _(getSum(tables.managementData), data[11]), // efficiency эффективность
            {
                title: data[12].title,
                desc: getLeadershipSkills(data[12].options),
                status: 1
            }, // лидерские качества
            _(getSum(tables.teamSurvivalData), data[13]), // teamSurvival - уживаемость в коллективе
            _(getSum(tables.selfOrganizationData), data[14]), // selfOrganize - самоорганизация
            _(getSum(tables.loyaltyData), data[15]), // loyalty - лояльность
            _(getSum(tables.initiativeData), data[16]), // Initiative - инициативность
            _(getSum(tables.learnabilityData), data[17]), // learnability - обучаемость
            _(getSum(tables.conformismData), data[18]), // conformism - конформизм
            _(getSum(tables.selfEsteemData), data[19]), // selfEsteem - самооценка
            _(getSum(tables.conflictData), data[20]), // conflict - конфликтность
            _(getSum(tables.depressionData), data[21]) // depression - депрессивность
        ]
        return arr.map(item => [item.title, item.desc])
    }

    /**
     * Лидерские качества
     * @param data
     */
    function getLeadershipSkills(data: IDescWithRange[]): string {
        const as = profile[3][1] + profile[4][1] // aggressiveness + spontaneity
        const ee = profile[1][1] + profile[2][1] // extraversion + emotiveness
        const value = as + ee
        const probably =
            profile[3][1] < 5 || profile[4][1] < 5 || profile[1][1] < 5 || profile[2][1] < 5
                ? `${data[5].desc}, `
                : ''

        if (value < 24) {
            return `${probably}${data[0].desc}`
        }
        if (value > 42) {
            return as >= ee
                ? `${probably}${data[2].desc} ${data[1].desc}-${data[3].desc}`
                : `${probably}${data[2].desc} ${data[1].desc}-${data[4].desc}`
        }
        return as >= ee
            ? `${probably}${data[1].desc}-${data[3].desc}`
            : `${probably}${data[1].desc}-${data[4].desc}`
    }
}

export default withTranslation(['test', 'common'])(Result)
