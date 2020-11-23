import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { withTranslation } from '@i18n'
import Button from '../buttons/button/Button'
import style from './auth.module.scss'
import { ISignin } from './Signin'
import Checkbox from '../inputs/checkbox/Checkbox'

export interface IInfoForm {
    firstName: string
    lastName: string
    position: string
    isPublic: boolean
    isLookingForJob: boolean
}

const ExtraUserInfo: React.FC<ISignin<IInfoForm>> = ({
    isLoading,
    errorApiMessage,
    submitHandle,
    t
}) => {
    const { register, handleSubmit, errors } = useForm<IInfoForm>()

    const textFields = [
        { label: t('signin:extra.first_name'), key: 'firstName', value: '' },
        { label: t('signin:extra.last_name'), key: 'lastName', value: '' },
        { label: t('signin:extra.position'), key: 'position', value: '' }
    ]
    const checkBoxes = [
        { label: t('signin:extra.want_to_open'), key: 'isPublic', value: '' },
        { label: t('signin:extra.looking_for_job'), key: 'isLookingForJob', value: '' }
    ]

    return (
        <>
            <p>{t('signin:extra.desc')}</p>
            <form onSubmit={handleSubmit(submitHandle)}>
                {textFields.map(item => (
                    <div
                        className={`form-group ${errors[item.key] ? 'has-error' : ''}`}
                        key={item.key}>
                        <label>
                            <span>{item.label}</span>
                            <input
                                className={style.input}
                                type="text"
                                name={item.key}
                                autoComplete="off"
                                ref={register({
                                    pattern: {
                                        value: /^[a-zA-Z0-9 ]*$/i,
                                        message: `${t('common:errors.invalid')}`
                                    }
                                })}
                            />
                        </label>
                        {errors[item.key] && (
                            <div className="item-explain">{errors[item.key].message}</div>
                        )}
                    </div>
                ))}

                {checkBoxes.map(item => (
                    <div
                        className={`form-group ${errors[item.key] ? 'has-error' : ''}`}
                        key={item.key}>
                        <div>
                            <Checkbox
                                isChecked={false}
                                handle={null}
                                label={item.label}
                                innerRef={register()}
                                {...{
                                    name: item.key
                                }}
                            />
                        </div>
                        {errors[item.key] && (
                            <div className="item-explain">{errors[item.key].message}</div>
                        )}
                    </div>
                ))}

                <div className={`form-group ${errorApiMessage ? 'has-error' : ''}`}>
                    <Button
                        title={t('common:buttons.send')}
                        startIcon={isLoading && <AiOutlineLoading />}
                        handle={() => void 0}
                        btnClass="btn-accent btn-loader"
                    />
                    {errorApiMessage && <div className="item-explain">{errorApiMessage}</div>}
                </div>
            </form>
        </>
    )
}

export default withTranslation(['signin'])(ExtraUserInfo)
