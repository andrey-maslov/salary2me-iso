import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaFilter, FaChevronDown } from 'react-icons/fa'
import { useMediaPredicate } from 'react-media-hook'
import { Link } from '@i18n'
import { getSalariesLimits } from '../../../helper/helper'
import SocialSharing from '../../../components/common/buttons/social-sharing/SocialSharing'
import style from './cv-estimation.module.scss'
import EstItem from '../est-item/EstItem'
import { locations } from '../../../constants/constants'
import EstSidebar from '../est-sidebar/EstSidebar'
import HelpUs from '../help-us/HelpUs'
import { globalStoreType } from '../../../typings/types'
import { useDeviceDetect } from '../../../helper/useDeviceDetect'

const CVEstimation: React.FC = () => {
    const { isLoggedIn } = useSelector((store: globalStoreType) => store.user)
    const { predictions, position } = useSelector((store: globalStoreType) => store.cv)
    const { displayedResults, selectedCurrency, payPeriod, currencyRates } = useSelector(
        (store: globalStoreType) => store.app
    )

    const biggerThan992 = useMediaPredicate('(min-width: 992px)')
    const { isMobile } = useDeviceDetect()
    const [isMobileOptionsShown, setMobileOptions] = useState(false)
    const mobiOptionsClass = isMobileOptionsShown ? style.mobiOptionsOpened : ''

    if (isLoggedIn && predictions.length === 0) {
        return (
            <div className={`flex-centered text-center ${style.predictions}`}>
                <strong>
                    Please,{' '}
                    <Link href="/">
                        <a>upload</a>
                    </Link>{' '}
                    your CV
                </strong>
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
        <>
            <div className={`${style.predictions} container`}>
                <div className="row center-xs">
                    <div className="col-xl-10">
                        <div className={style.title}>
                            <h3 className={`${style.position}`}>
                                {position || 'No experience detected'}:
                            </h3>
                            <span> Estimated salary by city</span>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 last-lg">
                        {isMobile && <MobileOptions />}
                        <div
                            className={`${style.sidebar} ${
                                isMobile ? mobiOptionsClass : ''
                            }`}>
                            <EstSidebar />
                            <div className={style.sharing}>
                                <SocialSharing url="https://salary2.me" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-8">
                        <ul className={style.list}>
                            {resultsToDisplay.map(({ city, avg, max }) => {
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
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="divider" />
            <HelpUs />
        </>
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

        const bruttoNormalSorted = [...bruttoNormal].sort()
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

export default CVEstimation
