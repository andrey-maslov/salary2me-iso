import { FaBell } from 'react-icons/fa'
import { accentColor } from '../../../constants/constants'
import Checkbox from '../inputs/checkbox/Checkbox'
import style from './subscription.module.scss'

const Subscription = () => {
    const handleSubscription = () => {
        alert('tss')
    }

    return (
        <div className={style.wrapper}>
            <div className={style.icon}>
                <span className={style.lighthouse} />
                <FaBell color={accentColor} />
            </div>
            {/* <Checkbox */}
            {/*    isChecked={false} */}
            {/*    innerRef={{}} */}
            {/*    handle={handleSubscription} */}
            {/*    label={'I want to receive notifications about new vacancies'} */}
            {/* /> */}
        </div>
    )
}

export default Subscription
