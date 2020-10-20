import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import style from './est-sidebar.module.scss'
import { currencies } from '../../../constants/constants'
import Select from '../../../components/common/inputs/select/Select'
import Tabs from '../../../components/common/tabs/Tabs'
import { globalStoreType } from '../../../typings/types'
import {
    SET_CURRENCY,
    SET_DISPLAYED_RESULTS,
    SET_PAY_PERIOD,
    SET_PAY_TAX,
    SET_SORTING
} from '../../../actions/actionTypes'

const EstSidebar: React.FC = () => {
    const { selectedCurrency, payPeriod, payTax, sorting } = useSelector(
        (state: globalStoreType) => state.cv
    )
    const dispatch = useDispatch()
    const sortingValues = [
        { value: `normal`, title: 'Choose sorting' },
        { value: `min-first`, title: 'Minimal first' },
        { value: `max-first`, title: 'Maximum first' }
    ]

    const sortHandler = e => {
        const sortingType = `${payTax}-${e.target.value}`
        dispatch({ type: SET_SORTING, sorting: e.target.value })
        dispatch({ type: SET_DISPLAYED_RESULTS, displayedResults: sortingType })
    }

    const selectPayTax = value => {
        const sortingType = `${value}-${sorting}`
        dispatch({ type: SET_PAY_TAX, payTax: value })
        dispatch({ type: SET_DISPLAYED_RESULTS, displayedResults: sortingType })
    }

    const selectPayPeriod = value => {
        dispatch({ type: SET_PAY_PERIOD, payPeriod: value })
    }

    const selectCurrency = value => {
        dispatch({ type: SET_CURRENCY, selectedCurrency: value })
    }

    return (
        <div className={style.wrapper}>
            <div className={style.option}>
                <Select selected={sorting} handler={sortHandler} values={sortingValues} />
            </div>
            <div className={style.option}>
                <div className={style.optionTitle}>Preferred currency</div>
                <Tabs
                    values={[
                        currencies.usd.nameISO.toUpperCase(),
                        currencies.eur.nameISO.toUpperCase()
                    ]}
                    handler={selectCurrency}
                    activeValue={selectedCurrency.toUpperCase()}
                />
            </div>
            <div className={style.option}>
                <div className={style.optionTitle}>Pay period</div>
                <Tabs
                    values={['Monthly', 'Annually']}
                    handler={selectPayPeriod}
                    activeValue={payPeriod}
                />
            </div>
            <div className={style.option}>
                <div className={style.optionTitle}>Approximate taxation?</div>
                <Tabs values={['Netto', 'Brutto']} handler={selectPayTax} activeValue={payTax} />
            </div>
        </div>
    )
}

export default EstSidebar
