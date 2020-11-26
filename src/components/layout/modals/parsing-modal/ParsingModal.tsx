import Rodal from 'rodal'
import { withTranslation } from '@i18n'
import { useMediaPredicate } from 'react-media-hook'
import style from './parsing-modal.module.scss'
import ParsingLoader from '../../../common/loaders/parsing-loader/ParsingLoader'
import ParsingStage from './ParsingStage'
import Button from '../../../common/buttons/button/Button'
import { IModalProps } from '../../../../typings/types'
import { parsingDuration } from '../../../../constants/constants'

interface IParsingModalProps extends IModalProps {
    isParsingError: boolean
    tryMore: () => void
}

const ParsingModal: React.FC<IParsingModalProps> = ({
    isModalShown,
    closeModal,
    isParsingError,
    tryMore,
    t
}) => {
    const smallDevice = useMediaPredicate('(max-width: 500px)')
    const stageList = t('estimation:parsing_stage_list', { returnObjects: true })

    const renderErrorMode = () => (
        <div className={style.error}>
            <h3 className={style.title}>{t('estimation:error_title')}</h3>
            <p className={style.desc}>{t('estimation:error_desc')}</p>
            <Button
                btnClass={`btn btn-outlined ${style.tryMore}`}
                title="Try one more"
                handle={tryMore}
            />
        </div>
    )

    const renderParsingMode = () => (
        <>
            <ParsingLoader />
            {Array.isArray(stageList) && (
                <ParsingStage stageList={stageList} duration={parsingDuration} />
            )}
        </>
    )

    return (
        <Rodal
            visible={isModalShown}
            onClose={closeModal}
            closeMaskOnClick={false}
            className={`modal ${style.parsingModal}`}
            width={smallDevice ? 300 : 400}
            height={350}
            showCloseButton={false}>
            <div className={style.content}>
                {!isParsingError ? renderParsingMode() : renderErrorMode()}
            </div>
        </Rodal>
    )
}

export default withTranslation('estimation')(ParsingModal)
