import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, withTranslation } from '@i18n'
import { getDescByRange, getFamous, UserResult, getAndDecodeData } from 'psychology'
import { IUserResult, DecodedDataType } from 'psychology/build/main/types/types'
import { useMediaPredicate } from 'react-media-hook'
import ChartRadar from './radar-chart/ChartRadar'
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
    getProfileDesc,
    TablesWithBars
} from './functions'

type ResultProps = {
    t: any
}

const Result: React.FC<ResultProps> = ({ t }) => {
    const dispatch = useDispatch()
    const isXL = useMediaPredicate('(min-width: 1360px)')

    // parse url query params if it has encoded data
    const dataFromUrl: DecodedDataType | null = getAndDecodeData().data

    const { isLoggedIn, email } = useSelector((state: globalStoreType) => state.user)
    const storeData = useSelector((state: globalStoreType) => state.test)
    const { personalInfo, testData } = dataFromUrl
        ? { personalInfo: dataFromUrl[0], testData: dataFromUrl[1] }
        : storeData
    const { terms, descriptions } = useSelector((state: globalStoreType) => state.test)

    const [isReady, setReady] = useState(false)

    useEffect(() => {
        if (dataFromUrl) {
            dispatch(savePersonalInfo(dataFromUrl[0]))
            dispatch(saveTestData(dataFromUrl[1]))
        }
        if (descriptions) {
            setReady(true)
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
    }, [terms, email, descriptions])

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

    const modedSubAxes = getModifiedSubAxes(terms.subAxes)
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
    const fullProfileData = getProfileDesc(
        fullProfileList,
        terms,
        getDescByRange,
        tables,
        testData,
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
            <div
                className="between-xs middle-xs"
                style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <h3>{t('test:result_page.title')}</h3>
                <Link href="/test">
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
                {secondaryPortraitDesc ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            {`${t('test:result_page.your_main_type')} `}
                            <strong>
                                {mainPsychoType} ({(mainOctantFraction * 100).toFixed(1)}%)
                            </strong>
                            {`, ${t('test:result_page.sec_type')} `}
                            <strong>
                                {`${secondaryPsychoType} ${(secondaryOctantFraction * 100).toFixed(1)}%`}
                            </strong>
                        </div>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            {`${t('test:result_page.sec_type_desc')}:`}
                        </div>
                        <p style={{ marginBottom: '1.5rem' }}>{secondaryPortraitDesc}</p>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            {`${t('test:result_page.main_type_desc')}:`}
                        </div>
                    </div>
                ) : (
                    <div className="pb-sm">
                        <div>
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
}

export default withTranslation(['test', 'common'])(Result)
