import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rodal from 'rodal'
import { AiOutlineLoading } from 'react-icons/ai'
import style from './danger-modal.module.scss'
import { globalStoreType, IModalProps } from '../../../../typings/types'
import Password from '../../../common/inputs/password/Password'
import Button from '../../../common/buttons/button/Button'
import { deleteAccount } from '../../../../actions/actionCreator'
import { clearErrors } from '../../../../actions/errorHandling'

const DangerModal: React.FC<IModalProps> = ({ isModalShown, closeModal }) => {
    const dispatch = useDispatch()
    const { isLoading, apiErrorMsg } = useSelector((state: globalStoreType) => state.app)
    const pwdField = useRef(null)

    const desc = 'Это действие не может быть отменено. Это приведет к безвозвратному удалению вашего аккаунта, проектов, результатов тестов'

    return (
        <Rodal
            className={`modal ${style.authModal}`}
            visible={isModalShown}
            onClose={closeModal}
            closeMaskOnCLick
            height={350}
            width={400}>
            <div className={`${style.content}`}>
                <div className={style.top}><strong>Вы точно уверены?</strong></div>
                <div className={style.desc}><p>{desc}</p></div>
                <div className={style.form}>
                    <p>Для подтверждения введите ваш пароль</p>
                    <form onSubmit={deleteFormHandler}>
                        <div className="form-group">
                            <Password placeholder="Пароль" required name="password" innerRef={pwdField} />
                            {apiErrorMsg && <div className="item-explain api-error">{apiErrorMsg}</div>}
                        </div>
                        <Button
                            title="Удалить аккаунт"
                            startIcon={isLoading && <AiOutlineLoading />}
                            handle={() => clearErrors(dispatch)}
                            btnClass="btn btn-danger btn-loader"
                        />
                    </form>
                </div>
            </div>
        </Rodal>
    )

    function deleteFormHandler(e) {
        e.preventDefault()
        dispatch(deleteAccount(pwdField.current?.value))
    }
}

export default DangerModal
