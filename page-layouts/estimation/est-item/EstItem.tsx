import {useEffect, useState} from 'react'
import {useMediaPredicate} from "react-media-hook"
import Bar from "./bar/Bar"
import {getCurrencySymbol, Helper} from "../../../helper/helper"
import style from './est-item.module.scss'
import {SVGFlag} from "../../../components/common/media/svgflag/SVGFlag"
import {ILocation} from "../../../typings/types"

interface IEstItemProps {
    location: ILocation
    maxVal: string
    avgVal: string
    limits: number[]
    currencyRates: { EUR: number, USD: number, GBP: number }
    payPeriod: string
    selectedCurrency: string
}

const EstItem: React.FC<IEstItemProps> = ({
                                              location,
                                              maxVal,
                                              avgVal,
                                              limits,
                                              currencyRates,
                                              payPeriod,
                                              selectedCurrency
                                          }) => {

    const biggerThan992 = useMediaPredicate("(min-width: 992px)")
    let livingIndexCity = location.city

    const getCurrencyRate = (name) => {
        let currencyName = name.toUpperCase()
        return currencyRates[currencyName]
    };

    const currenciesObjectLength = Object.keys(currencyRates).length

    const indexPeriod = payPeriod === 'annually' ? 12 : 1

    const [indexCurrency, setIndexCurrency] = useState(0)

    useEffect(() => {

        if (Object.keys(currencyRates).length !== 0) {
            setIndexCurrency(getCurrencyRate(selectedCurrency))
        }
    }, [currenciesObjectLength, selectedCurrency])

    const indexCombined = indexCurrency * indexPeriod

    if (!location) {
        return null
    }

    if (location.city.toLowerCase() === 'krakow') {
        livingIndexCity = 'Krakow-Cracow'
    }

    const maxValToShow = Helper.addSpace(Math.round(+maxVal * indexCombined))
    const avgValToShow = Helper.addSpace(Math.round(+avgVal * indexCombined))

    return (
        <li className={`${style.item}`}>
            {biggerThan992 && <div className={`city ${location.city.toLowerCase()} ${style.img}`}/>}
            <div className={`${style.content}`}>

                <div className={style.top}>
                    <div>
                        <span className={style.city}>{location.city}</span>
                        <span className={style.country}>, {location.countryISO}</span>
                    </div>
                    <SVGFlag id={`${location.countryISO}`} tagClass={style.flag}/>
                </div>
                <div className={style.valuesList}>
                    <div className={style.valuesItem}>
                        <div className={style.num}>
                            {getCurrencySymbol(selectedCurrency)}
                            <span className={style.value}>{maxValToShow}</span>
                            <span className={style.desc}>max</span>
                        </div>
                        <Bar value={maxVal} limits={limits}/>
                    </div>
                    <div className={style.valuesItem}>
                        <div className={style.num}>
                            {getCurrencySymbol(selectedCurrency)}
                            <span className={style.value}>{avgValToShow}</span>
                            <span className={style.desc}>avg</span>
                        </div>
                        <Bar value={avgVal} limits={limits}/>
                    </div>
                    <div className={style.addition}>
                        <a href={`https://www.numbeo.com/cost-of-living/in/${livingIndexCity}`} target="_blank"
                           rel="noopener noreferrer">
                            <span>Cost of living index:</span> <strong>{location.costLivingIndex}</strong>
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default EstItem