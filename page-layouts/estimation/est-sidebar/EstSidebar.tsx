import React from 'react';
import style from './est-sidebar.module.scss';
import {connect} from "react-redux";
import {setCurrency, setDisplayedResults, setPayPeriod, setPayTax, setSorting} from "../../../actions/actionCreator";
import {currencies} from "../../../constants/constants";
import Select from "../../../components/common/inputs/select/Select";
import Tabs from "../../../components/common/tabs/Tabs";
import {ApplicationModeType} from "../../../reducers/applicationMode";

type EstSidebarType = {
    applicationMode: ApplicationModeType
    setSorting: (p: string) => {}
    setDisplayedResults: (p: string) => {}
    setPayTax: (p: string) => {}
    setPayPeriod: (p: string) => {}
    setCurrency: (p: string) => {}
}

const EstSidebar: React.FC<EstSidebarType> = ({applicationMode, ...props}) => {

    const {selectedCurrency, payPeriod, payTax, sorting} = applicationMode;
    const {setSorting, setDisplayedResults, setPayTax, setPayPeriod, setCurrency} = props
    const sortingValues = [
        {value: `normal`, title: 'Choose sorting'},
        {value: `min-first`, title: 'Minimal first'},
        {value: `max-first`, title: 'Maximum first'},
    ];

    const sortHandler = (e) => {
        const sortingType = `${payTax}-${e.target.value}`;
        setSorting(e.target.value);
        setDisplayedResults(sortingType);
    };

    const selectPayTax = (value) => {
        const sortingType = `${value}-${sorting}`;
        setPayTax(value);
        setDisplayedResults(sortingType);
    };

    const selectPayPeriod = (value) => {
        setPayPeriod(value)
    };

    const selectCurrency = (value) => {
        setCurrency(value);
    };


    return (
        <div className={style.wrapper}>
            <div className={style.option}>
                <Select
                    selected={sorting}
                    handler={sortHandler}
                    values={sortingValues}
                />
            </div>
            <div className={style.option}>
                <div className={style.optionTitle}>Preferred currency</div>
                <Tabs
                    values={[(currencies.usd.nameISO).toUpperCase(), (currencies.eur.nameISO).toUpperCase()]}
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
                <Tabs
                    values={['Netto', 'Brutto']}
                    handler={selectPayTax}
                    activeValue={payTax}
                />
            </div>
        </div>
    )
};

type StateType = {
    applicationMode: ApplicationModeType
}

export default connect((state: StateType) => ({
    applicationMode: state.applicationMode,
}), {setPayTax, setPayPeriod, setCurrency, setSorting, setDisplayedResults})(EstSidebar);