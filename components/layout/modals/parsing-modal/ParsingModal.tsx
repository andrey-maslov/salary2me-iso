import React, {useState} from "react";
import Rodal from "rodal";
import style from "./parsing-modal.module.scss";
import ParsingLoader from "../../../common/loaders/parsing-loader/ParsingLoader";
import ParsingAlert from "./ParsingAlert";
import Button from "../../../common/buttons/button/Button";
import {IModalProps} from "../../../../typings/types";

interface IParsingModalProps extends IModalProps {
    isParsingError: boolean
    tryMore: ()=> void
}

const ParsingModal: React.FC<IParsingModalProps> = ({isModalShown, closeModal, isParsingError, tryMore}) => {

    const renderErrorMode = () => (
        <>
            <div className={style.error}>
                <h3 className={style.title}>Oooops... Something went wrong</h3>
                <p>We are only beta and we can't parse your CV right now. But you can eiter try one more time or wait
                    until we proceed your valuation manually. The result will be sent to your email.</p>
                <Button
                    btnClass={`btn btn-outlined ${style.tryMore}`}
                    title="Try one more"
                    handle={tryMore}
                />
            </div>
        </>
    );

    const renderSuccessMode = () => (
        <div className="text-center">
            <h3>Success!</h3>
            Resume parsed
        </div>
    );

    const renderParsingMode = () => (
        <>
            <ParsingLoader/>
            <ParsingAlert/>
        </>
    );

    return (
        <Rodal
            visible={isModalShown}
            onClose={closeModal}
            closeMaskOnClick={false}
            className={`modal ${style.parsingModal}`}
            height={350}
            showCloseButton={false}
        >
            <div className={style.content}>
                {!isParsingError ?
                    renderParsingMode() :
                    renderErrorMode()}
            </div>
        </Rodal>
    )
};

export default ParsingModal;