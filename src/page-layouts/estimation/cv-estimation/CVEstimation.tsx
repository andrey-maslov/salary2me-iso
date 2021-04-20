import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaFilter, FaChevronDown } from 'react-icons/fa'
import { Link, withTranslation } from '@i18n'
import { getSalariesLimits } from '../../../helper/helper'
import SocialSharing from '../../../components/common/buttons/social-sharing/SocialSharing'
import style from './cv-estimation.module.scss'
import EstItem from '../est-item/EstItem'
import { locations } from '../../../constants/constants'
import EstSidebar from '../est-sidebar/EstSidebar'
import HelpUs from '../help-us/HelpUs'
import { globalStoreType } from '../../../typings/types'
import { useDeviceDetect } from '../../../helper/useDeviceDetect'
import { getPredictions } from '../../../actions/api/predictAPI'

const CVEstimation = ({ t }) => {
    const {
        predictions,
        position,
        displayedResults,
        selectedCurrency,
        payPeriod,
        currencyRates
    } = useSelector((store: globalStoreType) => store.cv)

    const dispatch = useDispatch()
    const { isMobile } = useDeviceDetect()
    const [isMobileOptionsShown, setMobileOptions] = useState(false)
    const [state, setState] = useState({ position: '', predictions: [] })
    const mobiOptionsClass = isMobileOptionsShown ? style.mobiOptionsOpened : ''

    useEffect(() => {
        if (predictions.length && predictions.length !== 0) {
            setState({ ...state, predictions, position })
        } else {
            dispatch(getPredictions())
        }
    }, [position, displayedResults, predictions])

    if (state.predictions && state.predictions.length && state.predictions.length === 0) {
        return (
            <div className={style.wrapper}>
                <div className="flex-centered text-center">
                    <strong>
                        {`${t('estimation:please')}, `}
                        <Link href="/#upload">
                            <a>{t('estimation:upload')}</a>
                        </Link>{' '}
                        {t('estimation:your_cv')}
                    </strong>
                </div>
            </div>
        )
    }

    const sortedSalaries = getSortedSalaries(predictions)
    const resultsToDisplay = getSorting()
    const salaryLimits = getSalariesLimits(resultsToDisplay)

    const MobileOptions = () => {
        return (
            <div
                className={`${style.optionsToggle} ${mobiOptionsClass}`}
                onClick={() => setMobileOptions(!isMobileOptionsShown)}>
                <div className={style.optionsTitle}>
                    <FaFilter className={style.filter} />
                    <span>Options</span>
                </div>
                <FaChevronDown className={style.chevron} />
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <div className={`${style.predictions} container`}>
                <div className="row center-xs">
                    <div className="col-xl-10">
                        <div className={style.title}>
                            <div className={`${style.position}`}>
                                <span>{state.position || 'no experience detected'}: </span>
                                {t('estimation:title')}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 last-lg">
                        {isMobile && <MobileOptions />}
                        <div className={`${style.sidebar} ${isMobile ? mobiOptionsClass : ''}`}>
                            <EstSidebar />
                            <div className={style.sharing}>
                                <SocialSharing url="https://salary2.me" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-8">
                        <ul className={style.list}>
                            {displayedResults ? (
                                resultsToDisplay.map(({ city, avg, max }) => {
                                    const location = getLocation(city, locations)
                                    return (
                                        <EstItem
                                            location={location}
                                            maxVal={max}
                                            avgVal={avg}
                                            limits={salaryLimits}
                                            currencyRates={currencyRates}
                                            payPeriod={payPeriod}
                                            selectedCurrency={selectedCurrency}
                                            key={city}
                                        />
                                    )
                                })
                            ) : (
                                <div>{t('estimation:no_results')}</div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="divider" />
            <HelpUs />
        </div>
    )

    function getSorting() {
        switch (displayedResults) {
            case 'brutto-normal':
                return sortedSalaries.bruttoNormal
            case 'brutto-min-first':
                return sortedSalaries.bruttoMinFirst
            case 'brutto-max-first':
                return sortedSalaries.bruttoMaxFirst
            case 'netto-normal':
                return sortedSalaries.nettoNormal
            case 'netto-min-first':
                return sortedSalaries.nettoMinFirst
            case 'netto-max-first':
                return sortedSalaries.nettoMaxFirst
            default:
                return predictions
        }
    }

    function getSortedSalaries(predictionsArr) {
        const bruttoNormal = [...predictionsArr]
            .map(({ city, salaryWithTaxes, salaryWithTaxesMax }) => ({
                city,
                avg: salaryWithTaxes,
                max: salaryWithTaxesMax
            }))
            .sort(sortAZ)
        const nettoNormal = [...predictionsArr]
            .map(({ city, salaryWithoutTaxes, salaryWithoutTaxesMax }) => ({
                city,
                avg: salaryWithoutTaxes,
                max: salaryWithoutTaxesMax
            }))
            .sort(sortAZ)

        const bruttoMinFirst = [...bruttoNormal].sort((a, b) => a.avg - b.avg)
        const bruttoMaxFirst = [...bruttoNormal].sort((a, b) => b.avg - a.avg)

        const nettoMinFirst = [...nettoNormal].sort((a, b) => a.avg - b.avg)
        const nettoMaxFirst = [...nettoNormal].sort((a, b) => b.avg - a.avg)

        return {
            bruttoNormal,
            nettoNormal,
            bruttoMinFirst,
            bruttoMaxFirst,
            nettoMinFirst,
            nettoMaxFirst
        }
    }

    function getLocation(city, locationsArr) {
        return locationsArr.find(item => item.city.toLowerCase() === city.toLowerCase())
    }

    function sortAZ(a, b) {
        const x = a.city.toLowerCase()
        const y = b.city.toLowerCase()
        if (x < y) return -1
        if (x > y) return 1
        return 0
    }
}

export default withTranslation('estimation')(CVEstimation)
