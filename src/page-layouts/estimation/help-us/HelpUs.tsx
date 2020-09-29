import React, {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {FaRegSmile} from 'react-icons/fa'
import {sendRealSalary} from "../../../actions/actionCreator"
import Rodal from 'rodal'
import Form from "./form/Form";
import {useMediaPredicate} from "react-media-hook"
import Loader from "../../../components/common/loaders/loader/Loader"
import ButtonClose from "../../../components/common/buttons/button-close/ButtonClose"
import {globalStoreType} from "../../../typings/types"
import style from './help-us.module.scss'

function HelpUs() {
    const {realSalary} = useSelector((state: globalStoreType) => state.cv)
    const {email} = useSelector((state: globalStoreType) => state.user)
    const containerRef = useRef(null)
    const dispatch = useDispatch()
    const [fixedClass, setFixedClass] = useState('')
    const [canBeFixed, setCanBeFixed] = useState(true)

    const onScroll = (e) => {
        if (containerRef.current) {
            if (containerRef.current.getBoundingClientRect().top < window.innerHeight) {
                setFixedClass('')
            } else {
                setFixedClass('fixed')
            }
        }
    }

    useEffect(() => {
        if (window && !realSalary && canBeFixed) {
            window.addEventListener('scroll', onScroll, true)
        }
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, []);

    const closeFixedBlock = () => {
        window.removeEventListener('scroll', onScroll)
        setFixedClass('')
        setCanBeFixed(false)
    }

    const biggerThan992 = useMediaPredicate("(min-width: 992px)")

    const [isModalShown, setModalShown] = useState(false)
    const [value, setValue] = useState('')
    const [isConsentEstimation, setConsentEstimation] = useState(false)

    const sendSalary = () => {

        const formData = new FormData()
        formData.append('email', email)
        formData.append('salary', value)
        formData.append('estimate', isConsentEstimation.toString())

        dispatch(sendRealSalary(formData))
        setModalShown(true)
    }

    //send
    const handleSendBtn = () => {
        if (value.length >= 3) {
            sendSalary()
        } else {
            //console.log('is it correct value?')
        }
    }

    //send
    const handlePressEnter = ({key}) => {
        if (key === 'Enter' && value.length >= 3) {
            sendSalary()
        }
    }


    //set to redux
    const handleInput = ({target: {value}}) => {
        const pattern = /([^0-9])/

        if (!pattern.exec(value)) {
            setValue(value)
        }
    }

    useEffect(() => {

        if (isModalShown) {
            setTimeout(() => {
                setModalShown(false)
                // if (!hasErrored) {
                //     setValue('')
                // }
            }, 5000)
        }
    }, [isModalShown])

    const ThanxModal = () => {

        function renderModalContent() {
            // if (isLoading) return <Loader/>
            //TODO change to 'if error'
            if (false) return (
                <div className={style.modalContent}>
                    <h5 className="text-center modal-title">Something wen wrong</h5>
                    <p>Try to enter your salary<br/> in number format, like 1300</p>
                </div>
            )

            return (
                <div className={style.modalContent}>
                    <FaRegSmile className={style.icon}/>
                    <h5 className="text-center modal-title">Thank you for your help!</h5>
                </div>
            )
        }

        return (
            <Rodal
                visible={isModalShown}
                onClose={() => setModalShown(false)}
                height={450}
                width={450}
            >
                {renderModalContent()}
            </Rodal>
        )
    }

    return (
        <div ref={containerRef} className={style.section}>
            <div className={`${(biggerThan992 && fixedClass && realSalary === '' && canBeFixed) ? style[fixedClass] : ''}`}>
                <div className={style.close}>
                    <ButtonClose handle={closeFixedBlock}/>
                </div>
                <div className={`container`}>
                    <div className="row justify-content-center">
                        <div className='col-xl-12'>
                            <div className={`${style.wrapper}`}>
                                {(biggerThan992 && !fixedClass) &&
                                <img
                                    className={`${style.img} img-fluid`}
                                    srcSet={'/img/partners@2x.png 2x'}
                                    src={'/img/partners.png'}
                                    alt="help us"
                                />}
                                <div className={style.content}>
                                    <h3 className={`${style.title} color-accent`}>We are wrong?<br/> Sorry, we are only
                                        beta.</h3>
                                    <p className={style.desc}>You can support our project by sharing your actual or
                                        latest salary
                                        (monthly,
                                        brutto)</p>
                                    <Form
                                        handleInput={handleInput}
                                        handlePressEnter={handlePressEnter}
                                        userRealSalary={value}
                                        handleSendBtn={handleSendBtn}
                                    />
                                </div>
                                <ThanxModal/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelpUs