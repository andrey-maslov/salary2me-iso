import Rodal from 'rodal'
import { withTranslation } from '@i18n'
import { useMediaPredicate } from 'react-media-hook'
import { FaRegSmile } from 'react-icons/fa'
import style from './thanx-modal.module.scss'
import { IModalProps } from '../../../../typings/types'

const ThanxModal: React.FC<IModalProps> = ({ isModalShown, closeModal, t }) => {
    const smallDevice = useMediaPredicate('(max-width: 500px)')

    const customStyles = {
        height: 'auto',
        bottom: 'auto',
        top: '30%'
    }

    return (
        <Rodal
            visible={isModalShown}
            onClose={closeModal}
            customStyles={customStyles}
            width={smallDevice ? 300 : 400}>
            <div>
                <FaRegSmile className={style.icon} />
                <h5 className="text-center modal-title">{t('estimation:help_block.thanx_msg')}</h5>
            </div>
        </Rodal>
    )
}

export default withTranslation('estimation')(ThanxModal)
