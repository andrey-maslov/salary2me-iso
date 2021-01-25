import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Link, withTranslation } from '@i18n'
import { getDescByRange, getFamous, UserResult, getAndDecodeData } from 'psychology'
import { IUserResult, DecodedDataType } from 'psychology/build/main/types/types'
import { useMediaPredicate } from 'react-media-hook'
import ChartRadar from './radar-chart/ChartRadar'
import TopBar from './top-bar/TopBar'
import Table from '../../../components/common/tables/table/Table'
import Box from '../../../components/common/box/Box'
import Loader from '../../../components/common/loaders/loader/Loader'
import { globalStoreType } from '../../../typings/types'
import Famous from './famous/Famous'
import ShareResult from './share-result/ShareResult'
import { PSYCHO_RESULT } from '../../../actions/actionTypes'
import {
    getModifiedSubAxes,
    getOctantFraction,
    getPortraitDesc,
    getPsychoTypeDesc,
    getProfileDesc,
    TablesWithBars
} from './functions'
import RobotQuestion from '../../../components/common/media/robots/robot-question/RobotQuestion'
import { TEST_THRESHOLD } from '../../../constants/constants'
import { encodeDataForURL, isBrowser, isTestPassed } from '../../../helper/helper'

type ResultProps = {
    t: any
}

const Result: React.FC<ResultProps> = ({ t }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isXL = useMediaPredicate('(min-width: 1360px)')

    const { isLoggedIn } = useSelector((state: globalStoreType) => state.user)
    const { terms, descriptions } = useSelector((state: globalStoreType) => state.test)
    // get test data from store
    const { personalInfo: userPersonalInfo, testData: userTestData } = useSelector(
        (state: globalStoreType) => state.test
    )

    // parse url query params if it has encoded data string with default key encdata
    const dataFromUrl: DecodedDataType | null = getAndDecodeData().data

    // set test data for rendering the component
    const personalInfoForProfile = dataFromUrl ? dataFromUrl[0] : userPersonalInfo
    const resultForProfile = dataFromUrl ? dataFromUrl[1] : userTestData

    // encode all test data to base64 string for using in links
    const encDataForURL = encodeDataForURL([personalInfoForProfile, resultForProfile])

    const [isReady, setReady] = useState(false)
    const isPassed = isTestPassed(resultForProfile, TEST_THRESHOLD)

    // generate params in URL for better usability, if user want to copy URL for sharing
    if (!dataFromUrl && isBrowser && personalInfoForProfile && resultForProfile) {
        router.push(`?encdata=${encDataForURL}`)
    }

    useEffect(() => {
        if (descriptions) {
            setReady(true)
        }
        if (descriptions && isPassed && resultForProfile) {
            console.log('data for pdf', fullProfileData)
            dispatch({
                type: PSYCHO_RESULT,
                dataForPDF: {
                    fullProfileData,
                    portraitDesc,
                    famous,
                    secondaryPortraitDesc,
                    psychoTypeDesc
                }
            })
        }
    }, [terms, descriptions])

    useEffect(() => {
        if (isReady) {
            dispatch({
                type: PSYCHO_RESULT,
                dataForPDF: {
                    fullProfileData,
                    portraitDesc,
                    famous,
                    secondaryPortraitDesc,
                    psychoTypeDesc
                }
            })
        }
    }, [isReady, descriptions])

    // TODO check this!
    if (!isReady) {
        return <Loader />
    }

    if (!resultForProfile || resultForProfile.length === 0) {
        return (
            <div className="flex-centered" style={{ padding: '3rem' }}>
                <Link href="/test">
                    <a>
                        <h4>{t('test:errors.take_the_test')}</h4>
                    </a>
                </Link>
            </div>
        )
    }

    const modedSubAxes = getModifiedSubAxes(terms.subAxes)
    const fullProfile: IUserResult = UserResult(resultForProfile)
    const sex = personalInfoForProfile[2] === 2 ? 1 : personalInfoForProfile[2]
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
    const tables = TablesWithBars(modedSubAxes, tablesWithBarsTitles, resultForProfile)
    const fullProfileData = getProfileDesc(
        fullProfileList,
        terms,
        getDescByRange,
        tables,
        resultForProfile,
        fullProfile
    )
    const portraitDesc = getPortraitDesc(mainOctant, complexDataSoft, fullProfileList)
    const psychoTypeDesc = getPsychoTypeDesc(sortedOctants, psychoTypeList) || ''
    const mainPsychoType: string = terms.psychoTypes[mainPsychoTypeList[0]]
    const secondaryPsychoType: string | null = mainPsychoTypeList[1]
        ? terms.psychoTypes[mainPsychoTypeList[1]]
        : null
    const secondaryPortraitDesc: string | null = mainPsychoTypeList[1]
        ? complexDataSoft[mainPsychoTypeList[1]][0][1]
        : null
    const mainOctantFraction: number = getOctantFraction(mainOctant, sortedOctants)
    const secondaryOctantFraction: number | null = secondaryPsychoType
        ? getOctantFraction(sortedOctants[1], sortedOctants)
        : null
    const accuracy = Math.round((mainOctantFraction / (mainOctantFraction + secondaryOctantFraction)) * 100)

    const fpTableHeader = [t('test:result_page.main_features'), t('test:result_page.revealed')]

    if (!isPassed) {
        return (
            <div className="flex-centered center-xs">
                <div className="col-lg-8">
                    <div
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                        <RobotQuestion />
                    </div>
                    <div style={{ fontSize: '1.4rem', marginBottom: '3rem' }}>
                        {t('test:errors.test_failed')}
                    </div>
                    <Link href="/test/questions">
                        <a className="btn btn-outlined">{t('test:result_page.again')}</a>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div id="result">
            <div
                className="between-xs middle-xs"
                style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <h3>{t('test:result_page.title')}</h3>
                <Link href="/test/questions">
                    <a className="btn btn-outlined" style={{ marginBottom: '1rem' }}>
                        {t('test:result_page.again')}
                    </a>
                </Link>
            </div>
            <Box>
                <TopBar
                    title={t('test:result_page.your_profile')}
                    userResult={profile.map((item, i) => [terms.tendencies[i], item.value])}
                    details={tendencies}
                    isLoggedIn={isLoggedIn}
                    fullTestResult={[personalInfoForProfile, resultForProfile]}
                />
                <div className="row middle-xs">
                    <div className="col-lg-7">
                        <ChartRadar profile={fullProfile.profile} chartLabels={terms.tendencies} />
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
                <p style={{ marginBottom: '.5rem', fontSize: '1.2rem' }}>
                    {t('test:result_page.accuracy_of_result')} - <strong>{accuracy}%</strong>
                </p>
                {secondaryPortraitDesc ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            {`${t('test:result_page.your_main_type')} `}
                            <strong>
                                {mainPsychoType} ({(mainOctantFraction * 100).toFixed(1)}%)
                            </strong>
                            {`, ${t('test:result_page.sec_type')} `}
                            <strong>
                                {`${secondaryPsychoType} ${(secondaryOctantFraction * 100).toFixed(
                                    1
                                )}%`}
                            </strong>
                        </div>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            {`${t('test:result_page.main_type_desc')}:`}
                        </div>
                    </div>
                ) : (
                    <div className="pb-sm">
                        <div style={{ fontSize: '1.2rem' }}>
                            {`${t('test:result_page.your_type')} - `}
                            <strong>{mainPsychoType}</strong>
                        </div>
                    </div>
                )}
                <Table
                    tableData={portraitDesc.map(item => [
                        item[0],
                        <span dangerouslySetInnerHTML={{ __html: item[1] }} key={item[0]} />
                    ])}
                    tableHeader={fpTableHeader}
                    addClasses={['striped', 'large']}
                />
                {secondaryPortraitDesc && (
                    <>
                        <div
                            style={{
                                fontSize: '1.2rem',
                                marginBottom: '.5rem',
                                marginTop: '2rem'
                            }}>
                            {`${t('test:result_page.sec_type_desc')}:`}
                        </div>
                        <p>{secondaryPortraitDesc}</p>
                    </>
                )}
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
                                            tableHeader={fpTableHeader}
                                            addClasses={['striped']}
                                        />
                                    </div>
                                )
                            }
                        )
                    ) : (
                        <Table
                            tableData={fullProfileData}
                            tableHeader={fpTableHeader}
                            addClasses={['striped']}
                        />
                    )}
                </div>
            </Box>

            <Box>
                <ShareResult encData={encDataForURL} isLoggedIn={isLoggedIn} />
            </Box>
        </div>
    )
}

export default withTranslation(['test', 'common'])(Result)
