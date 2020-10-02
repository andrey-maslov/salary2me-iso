import style from "./auth.module.scss"
import Button from "../buttons/button/Button"
import {useForm} from 'react-hook-form'
import {AiOutlineLoading} from 'react-icons/ai'
import {withTranslation} from "@i18n"
import {ISignin} from "./Signin"
import Checkbox from "../inputs/checkbox/Checkbox"

export interface IInfoForm {
    firstName: string,
    lastName: string,
    position: string,
    isPublic: boolean
    isLookingForJob: boolean
}

const ExtraUserInfo: React.FC<ISignin<IInfoForm>> = ({isLoading, errorApiMessage, submitHandle, clearApiError, t}) => {

    const {register, handleSubmit, reset, getValues, errors} = useForm<IInfoForm>()

    return (
        <>
            <p>{t('signin:extra.desc')}</p>
            <form onSubmit={handleSubmit(submitHandle)}>
                <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
                    <label>
                        <span>{t('signin:extra.first_name')}</span>
                        <input
                            className={style.input}
                            type="text"
                            name="firstName"
                            onFocus={clearApiError}
                            ref={register()}
                        />
                    </label>
                    {errors.firstName && <div className={`item-explain`}>{errors.firstName.message}</div>}
                </div>

                <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
                    <label>
                        <span>{t('signin:extra.last_name')}</span>
                        <input
                            className={style.input}
                            type="text"
                            name="lastName"
                            onFocus={clearApiError}
                            ref={register()}
                        />
                    </label>
                    {errors.lastName && <div className={`item-explain`}>{errors.lastName.message}</div>}
                </div>

                <div className={`form-group ${errors.position ? 'has-error' : ''}`}>
                    <label>
                        <span>{t('signin:extra.position')}</span>
                        <input
                            className={style.input}
                            type="text"
                            name="position"
                            onFocus={clearApiError}
                            ref={register()}
                        />
                    </label>
                    {errors.position && <div className={`item-explain`}>{errors.position.message}</div>}
                </div>

                <div className={`form-group ${errors.isPublic ? 'has-error' : ''}`}>
                    <div>
                        <Checkbox
                            isChecked={false}
                            handle={() => {}}
                            label={t('signin:extra.want_to_open')}
                            innerRef={register()}
                            {...{
                                name: "isPublic",
                            }}
                        />
                    </div>
                    {errors.isPublic && <div className={`item-explain`}>{errors.isPublic.message}</div>}
                </div>

                <div className={`form-group ${errors.isPublic ? 'has-error' : ''}`}>
                    <div>
                        <Checkbox
                            isChecked={false}
                            handle={() => {}}
                            label={t('signin:extra.looking_for_job')}
                            innerRef={register()}
                            {...{
                                name: "isLooking",
                            }}
                        />
                    </div>
                    {errors.isPublic && <div className={`item-explain`}>{errors.isPublic.message}</div>}
                </div>

                <div className={`form-group ${errorApiMessage ? 'has-error' : ''}`}>
                    <Button
                        title={t('common:buttons.send')}
                        startIcon={isLoading && <AiOutlineLoading/>}
                        handle={() => void (0)}
                        btnClass={'btn-accent btn-loader'}
                    />
                    {errorApiMessage && <div className={`item-explain`}>{errorApiMessage}</div>}
                </div>
            </form>
        </>
    )
}

export default withTranslation(['signin'])(ExtraUserInfo)