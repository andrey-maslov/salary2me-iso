import React from 'react'
import { withTranslation } from '@i18n'
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

export type TabsDataItem = { title: string; value: string }

interface IFilterTabsDataItem {
    groupTitle: string
    data: TabsDataItem[]
    handler: (value: string) => void
    activeValue: string
}

const EstSidebar: React.FC<{ t: any }> = ({ t }) => {
    const { selectedCurrency, payPeriod, payTax, sorting } = useSelector(
        (state: globalStoreType) => state.cv
    )
    const dispatch = useDispatch()
    const sortingValues = [
        { value: `normal`, title: t('estimation:choose_sorting') },
        { value: `min-first`, title: t('estimation:min_first') },
        { value: `max-first`, title: t('estimation:max_first') }
    ]

    const optionList: IFilterTabsDataItem[] = [
        {
            groupTitle: t('estimation:currency'),
            data: [
                {
                    value: currencies.usd.nameISO.toUpperCase(),
                    title: currencies.usd.nameISO.toUpperCase()
                },
                {
                    value: currencies.eur.nameISO.toUpperCase(),
                    title: currencies.eur.nameISO.toUpperCase()
                }
            ],
            activeValue: selectedCurrency,
            handler: value => dispatch({ type: SET_CURRENCY, selectedCurrency: value })
        },
        {
            groupTitle: t('estimation:pay_period'),
            data: [
                {
                    value: 'monthly',
                    title: t('estimation:monthly')
                },
                {
                    value: 'annually',
                    title: t('estimation:annually')
                }
            ],
            activeValue: payPeriod,
            handler: value => dispatch({ type: SET_PAY_PERIOD, payPeriod: value })
        },
        {
            groupTitle: t('estimation:tax'),
            data: [
                {
                    value: 'netto',
                    title: t('estimation:netto')
                },
                {
                    value: 'brutto',
                    title: t('estimation:brutto')
                }
            ],
            activeValue: payTax,
            handler: value => {
                const sortingType = `${value}-${sorting}`
                dispatch({ type: SET_PAY_TAX, payTax: value })
                dispatch({ type: SET_DISPLAYED_RESULTS, displayedResults: sortingType })
            }
        }
    ]

    return (
        <div className={style.wrapper}>
            <div className={style.option}>
                <Select selected={sorting} handler={sortHandler} values={sortingValues} />
            </div>
            {optionList &&
                optionList.map(({ groupTitle, data, handler, activeValue }) => (
                    <div className={style.option} key={groupTitle}>
                        <div className={style.optionTitle}>{groupTitle}</div>
                        <Tabs data={data} handler={handler} activeValue={activeValue} />
                    </div>
                ))}
        </div>
    )

    function sortHandler(e) {
        const sortingType = `${payTax}-${e.target.value}`
        dispatch({ type: SET_SORTING, sorting: e.target.value })
        dispatch({ type: SET_DISPLAYED_RESULTS, displayedResults: sortingType })
    }
}

export default withTranslation('estimation')(EstSidebar)
