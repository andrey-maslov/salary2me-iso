import {connect} from 'react-redux';
import {FaBell} from "react-icons/fa";
import {fetchSubscription} from "../../../actions/actionCreator";
import {accentColor} from "../../../constants/constants";
import Checkbox from "../inputs/checkbox/Checkbox";
import style from './subscription.module.scss';


const Subscription = (props) => {

    const {isSubscribed, userEmail, fetchSubscription} = props;

    const handleSubscription = () => {
        let userSubscription = !isSubscribed;
        let formData = new FormData();
        formData.append('email', userEmail);
        formData.append('subscription', userSubscription.toString());
        fetchSubscription(formData);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.icon}>
                <span className={style.lighthouse}/>
                <FaBell color={accentColor}/>
            </div>
            <Checkbox
                isActive={isSubscribed}
                handle={handleSubscription}
                text={'I want to receive notifications about new vacancies'}
            />
        </div>
    );
};

export default connect(state => ({
    isSubscribed: state.userData.isSubscribed,
    userEmail: state.userData.info.email,
}), {fetchSubscription})(Subscription);