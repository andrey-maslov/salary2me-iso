import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowRight } from 'react-icons/fa'
import { useMediaPredicate } from 'react-media-hook'
import { useForm } from 'react-hook-form'
import { withTranslation } from '@i18n'
import { sendRealSalary } from '../../../actions/actionCreator'
import ButtonClose from '../../../components/common/buttons/button-close/ButtonClose'
import { globalStoreType } from '../../../typings/types'
import style from './help-us.module.scss'

function HelpUs({ t }) {
    const { realSalary } = useSelector((state: globalStoreType) => state.cv)
    const { accountApiErrorMsg } = useSelector((state: globalStoreType) => state.app)
    const containerRef = useRef(null)
    const dispatch = useDispatch()
    const [fixedClass, setFixedClass] = useState('')
    const [canBeFixed, setCanBeFixed] = useState(true)
    const { register, handleSubmit, errors, clearErrors } = useForm<{ salary: string }>()

    const onScroll = () => {
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
    }, [canBeFixed, realSalary])

    const closeFixedBlock = () => {
        window.removeEventListener('scroll', onScroll)
        setFixedClass('')
        setCanBeFixed(false)
    }

    const biggerThan992 = useMediaPredicate('(min-width: 992px)')

    return (
        <div ref={containerRef} className={style.section}>
            <div
                className={`${
                    biggerThan992 && fixedClass && realSalary === '' && canBeFixed
                        ? style[fixedClass]
                        : ''
                }`}>
                <div className={style.close}>
                    <ButtonClose handle={closeFixedBlock} />
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-12">
                            <div className={`${style.wrapper}`}>
                                {biggerThan992 && !fixedClass && (
                                    <img
                                        className={`${style.img} img-fluid`}
                                        srcSet="/img/partners@2x.png 2x"
                                        src="/img/partners.png"
                                        alt="help us"
                                    />
                                )}
                                <div className={style.content}>
                                    <h3 className={`${style.title} color-accent`}>
                                        We are wrong?
                                        <br /> Sorry, we are only beta.
                                    </h3>
                                    <div className={style.desc}>
                                        You can support our project by sharing your actual or latest
                                        salary (monthly, brutto)
                                    </div>
                                    <form
                                        className={style.form}
                                        onSubmit={handleSubmit(({ salary }) =>
                                            dispatch(sendRealSalary(+salary))
                                        )}>
                                        <div className={style.group}>
                                            <input
                                                name="salary"
                                                className={`${style.input} input`}
                                                type="tel"
                                                aria-label="salary value"
                                                pattern="\d*"
                                                ref={register({
                                                    required: `${t('common:errors.required')}`
                                                })}
                                            />
                                            <button className={`btn btn-accent ${style.btn}`}>
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                        {errors.salary && (
                                            <div className={style.error}>
                                                {errors.salary.message}
                                            </div>
                                        )}
                                        {accountApiErrorMsg && (
                                            <div className={style.error}>{accountApiErrorMsg}</div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation('common', 'estimation')(HelpUs)
