import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {FaRegSmile} from 'react-icons/fa';
import {sendRealSalary, addUserRealSalary} from "../../../actions/actionCreator";
import Rodal from 'rodal';
import Form from "./form/Form";
import {useMediaPredicate} from "react-media-hook";
import Loader from "../../../components/common/loaders/loader/Loader";
import ButtonClose from "../../../components/common/buttons/button-close/ButtonClose";

import style from './help-us.module.scss';

function HelpUs({userRealSalary, sendRealSalary, addUserRealSalary, userEmail, isLoading, hasErrored}) {

    const containerRef = useRef(null);
    const [fixedClass, setFixedClass] = useState('');
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
        if (window && !userRealSalary && canBeFixed) {
            console.log('scroll')
            window.addEventListener('scroll', onScroll, true);
        }
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    const closeFixedBlock = () => {
        window.removeEventListener('scroll', onScroll);
        setFixedClass('');
        setCanBeFixed(false);
    }

    const biggerThan992 = useMediaPredicate("(min-width: 992px)");

    const [isModalShown, setModalShown] = useState(false);
    const [value, setValue] = useState('');
    const [isConsentEstimation, setConsentEstimation] = useState(false);

    const sendSalary = () => {

        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('salary', value);
        formData.append('estimate', isConsentEstimation.toString());

        sendRealSalary(formData);
        setModalShown(true);

    };

    //send
    const handleSendBtn = () => {
        if (value.length >= 3) {
            sendSalary();
        } else {
            //console.log('is it correct value?')
        }
    };

    //send
    const handlePressEnter = ({key}) => {
        if (key === 'Enter' && value.length >= 3) {
            sendSalary();
        }
    };


    //set to redux
    const handleInput = ({target: {value}}) => {
        const pattern = /([^0-9])/;

        if (!pattern.exec(value)) {
            // addUserRealSalary(value);
            setValue(value);
        }
    };

    useEffect(() => {

        if (isModalShown) {
            setTimeout(() => {
                setModalShown(false);
                if (!hasErrored) {
                    setValue('')
                }
            }, 5000);
        }
    }, [isModalShown]);

    const ThanxModal = () => {

        function renderModalContent() {
            if (isLoading) return <Loader/>;
            if (hasErrored) return (
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
    };

    return (
        <div ref={containerRef}>
            <div className={`${(biggerThan992 && fixedClass && userRealSalary === '' && canBeFixed) && style[fixedClass]}`}>
                <ButtonClose handle={closeFixedBlock}/>
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
    );
}


export default connect((state) => ({
    realSalary: state.userData.userRealSalary,
    userEmail: state.userData.info.email,
    isLoading: state.updateRequestLoading,
    hasErrored: state.updateRequestHasErrored,
}), {sendRealSalary, addUserRealSalary})(HelpUs);