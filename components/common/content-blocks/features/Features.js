import style from './features.module.scss'
import FeaturesItem from "./FeaturesItem/FeaturesItem"

const features = [
    {
        title: 'The largest base',
        description: 'We have full Base of IT specialists CVs. Belarus, Ukraine and Russias developers are in our base',
        icon: 'https://image.flaticon.com/icons/svg/1083/1083168.svg',
    },
    {
        title: 'Fresh vacancies',
        description: 'We have full Base of IT specialists CVs. Belarus, Ukraine and Russias developers are in our base',
        icon: 'https://image.flaticon.com/icons/svg/1083/1083168.svg',
    },
    {
        title: 'Techologies',
        description: 'We have full Base of IT specialists CVs. Belarus, Ukraine and Russias developers are in our base',
        icon: 'https://image.flaticon.com/icons/svg/1083/1083168.svg',
    },
    {
        title: 'The best team ever',
        description: 'We have full Base of IT specialists CVs. Belarus, Ukraine and Russias developers are in our base',
        icon: 'https://image.flaticon.com/icons/svg/1083/1083168.svg',
    },
]

const Features = () => {

    return (
        <div className={`${style.features} bg-accent`}>
            <div className="container">
                <ul className={style.list}>
                    {features.map(({ title, description, icon }, index) =>  (
                        <FeaturesItem
                            title={title}
                            description={description}
                            icon={icon}
                            key={index}
                        />
                    ) )}
                </ul>
            </div>
        </div>
    )
}

export default Features