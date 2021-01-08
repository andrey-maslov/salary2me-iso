import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ParsingModal from './parsing-modal/ParsingModal'
import { globalStoreType } from '../../../typings/types'
import { DANGER_MODAL, PARSING_MODAL, THANX_MODAL } from '../../../actions/actionTypes'
import { clearErrors } from '../../../actions/errorHandling'
import DangerModal from './danger-modal/DangerModal'
import ThanxModal from './thanx-modal/ThanxModal'
import { isBrowser } from '../../../helper/helper'

const Modals: React.FC = () => {
    const { isParsingModal, isDangerModal, isThanxModal } = useSelector(
        (state: globalStoreType) => state.modals
    )
    const { processFailed } = useSelector((state: globalStoreType) => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isBrowser && isThanxModal) {
            setTimeout(() => {
                dispatch({ type: THANX_MODAL, isThanxModal: false })
            }, 5000)
        }
    }, [isThanxModal])

    const tryMore = () => {
        dispatch({ type: PARSING_MODAL, isParsingModal: false })
        clearErrors(dispatch)
    }

    return (
        <>
            {isParsingModal && (
                <ParsingModal
                    isModalShown={isParsingModal}
                    closeModal={tryMore}
                    isParsingError={processFailed}
                    tryMore={tryMore}
                />
            )}
            {isDangerModal && (
                <DangerModal
                    isModalShown={isDangerModal}
                    closeModal={() => {
                        dispatch({ type: DANGER_MODAL, isDangerModal: false })
                    }}
                />
            )}
            {isThanxModal && (
                <ThanxModal
                    isModalShown={isThanxModal}
                    closeModal={() => {
                        dispatch({ type: THANX_MODAL, isThanxModal: false })
                    }}
                />
            )}
        </>
    )
}

export default Modals
