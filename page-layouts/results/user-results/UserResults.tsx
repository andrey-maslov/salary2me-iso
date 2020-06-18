import {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {FaFilter, FaChevronDown} from "react-icons/fa";
import {getSalariesLimits} from "../../../helper/helper";
import {useMediaPredicate} from "react-media-hook";
import SocialSharing from "../../../components/common/buttons/social-sharing/SocialSharing";
import Subscription from "../../../components/common/subscription/Subscription";
import {SVGSource} from "../../../components/common/media/svgflag/SVGFlag";
import {Link, Router} from "@i18n";
import style from './user-results.module.scss';
import ResultsItem from "../result-item/ResultItem";
import {locations} from "../../../constants/constants";
import {ApplicationModeType} from "../../../reducers/applicationMode";
import {UserDataType} from "../../../reducers/userData";
import ResultsSidebar from "../results-sidebar/ResultsSIdebar";
import HelpUs from "../help-us/HelpUs";

interface IUserResultsProps {
    results: []
    position: string
    isLoggedIn: boolean
    applicationMode: ApplicationModeType
    isUserInBase: boolean
}

const Results: React.FC<IUserResultsProps> = ({...props}) => {

    const {results, position, isLoggedIn, applicationMode, isUserInBase} = props;

    const biggerThan992 = useMediaPredicate("(min-width: 992px)");

    const [isMobileOptionsShown, setMobileOptions] = useState(false);
    const mobiOptionsClass = isMobileOptionsShown ? style.mobiOptionsOpened : '';

    useEffect(() => {

        if (!isLoggedIn) {
            Router.push('/');
        }
    }, [isLoggedIn]);

    const displayedResults = applicationMode.displayedResults;
    const sortedSalaries = getSortedSalaries(results);
    const resultsToDisplay = getSorting();
    const salaryLimits = getSalariesLimits(resultsToDisplay);

    const NoResults = () => {
        return (
            <div className={`container text-center ${style.noCv}`}>
                <strong>Please, <Link href={'/'}><a>upload</a></Link> your CV</strong>
            </div>
        )
    };

    const MobileOptions = () => {
        return (
            <div className={`${style.optionsToggle} ${mobiOptionsClass}`}
                 onClick={() => setMobileOptions(!isMobileOptionsShown)}>
                <div className={style.optionsTitle}>
                    <FaFilter className={style.filter}/>
                    <span>Options</span>
                </div>
                <FaChevronDown className={style.chevron}/>
            </div>
        )
    };

    if (!isLoggedIn) {
        return null
    }

    // if (isLoggedIn && resultsToDisplay.length === 0) {
    //     return <NoResults/>
    // }

    return (
        <>
            <div className={`${style.results} container`}>
                <div className="row center-xs">
                    <div className="col-xl-10">
                        <div className={style.title}>
                            <h3 className={`${style.position}`}>{position ? position : 'No experience detected'}:</h3>
                            <span> Estimated salary by city</span>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 last-lg">
                        {!biggerThan992 &&
                        <MobileOptions/>}
                        <div className={`${style.sidebar} ${!biggerThan992 ? mobiOptionsClass : ''}`}>
                            <ResultsSidebar/>
                            <div className={style.sharing}>
                                <SocialSharing url={'https://salary2.me'}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-8">
                        <ul className={style.list}>
                            {resultsToDisplay.map(({city, avg, max}) => {
                                const location = getLocation(city, locations)
                                return (
                                    <ResultsItem
                                        location={location}
                                        maxVal={max}
                                        avgVal={avg}
                                        limits={salaryLimits}
                                        applicationMode={applicationMode}
                                        key={city}
                                    />
                                )
                            })}
                        </ul>
                        <Subscription/>
                    </div>
                </div>
            </div>
            <div className="divider"/>
            <HelpUs/>
        </>
    );

    function getSorting() {
        switch (displayedResults) {
            case 'brutto-normal':
                return [...sortedSalaries.bruttoNormal];
            case 'brutto-min-first':
                return [...sortedSalaries.bruttoMinFirst];
            case 'brutto-max-first':
                return [...sortedSalaries.bruttoMaxFirst];
            case 'netto-normal':
                return [...sortedSalaries.nettoNormal];
            case 'netto-min-first':
                return [...sortedSalaries.nettoMinFirst];
            case 'netto-max-first':
                return [...sortedSalaries.nettoMaxFirst];
            default:
                return [...results]
        }
    }

    function getSortedSalaries(predictionsArr) {
        let bruttoNormal, bruttoMinFirst, bruttoMaxFirst, nettoNormal, nettoMinFirst, nettoMaxFirst;

        bruttoNormal = predictionsArr.map(({city, salaryWithTaxes, salaryWithTaxesMax}) => (
            {city, avg: salaryWithTaxes, max: salaryWithTaxesMax}
        ));
        nettoNormal = predictionsArr.map(({city, salaryWithoutTaxes, salaryWithoutTaxesMax}) => (
            {city, avg: salaryWithoutTaxes, max: salaryWithoutTaxesMax}
        ));

        bruttoMinFirst = [...bruttoNormal].sort((a, b) => (a.avg - b.avg));
        bruttoMaxFirst = [...bruttoNormal].sort((a, b) => (b.avg - a.avg));

        nettoMinFirst = [...nettoNormal].sort((a, b) => (a.avg - b.avg));
        nettoMaxFirst = [...nettoNormal].sort((a, b) => (b.avg - a.avg));


        return {bruttoNormal, nettoNormal, bruttoMinFirst, bruttoMaxFirst, nettoMinFirst, nettoMaxFirst};
    }

    function getLocation(city, locationsArr) {
        let location = locationsArr.find((item) => {
            return item.city.toLowerCase() === city.toLowerCase();
        });
        return location;
    }

};

type StateType = {
    userData: UserDataType
    applicationMode: ApplicationModeType
}

export default connect((state: StateType) => ({
    results: state.userData.predictions,
    position: state.userData.position,
    isLoggedIn: state.userData.auth.isLoggedIn,
    isUserInBase: state.userData.auth.isUserInBase,
    applicationMode: state.applicationMode,
}))(Results);