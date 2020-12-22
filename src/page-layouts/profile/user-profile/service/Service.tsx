import { Link, withTranslation } from '@i18n'
import React from 'react'
import style from './service.module.scss'
import PopoverInfo from '../../../../components/common/popovers/popover-info/PopoverInfo'

type ServiceType = {
    title: 'salary2me' | 'teamconstructor' | 'thegreatbase' | 'default'
    url: string
}

interface IServiceBox {
    service: ServiceType
    ancillaryLinks: { title: string; url: string }[] | null
    tariff: string
    children: React.ReactNode
}

function Service({ children, service, ancillaryLinks, tariff }: IServiceBox) {
    return (
        <div className={`${style.service} ${style[service.title]}`}>
            <div className={style.top}>
                <div className={style.title}>
                    <a href={service.url} target="_blank" rel="noreferrer">
                        {service.title}
                    </a>
                </div>
                <div className={`${style.rate} ${style.on}`}>
                    <span>{tariff}</span>
                    {ancillaryLinks && <PopoverInfo contentList={ancillaryLinks} />}
                </div>
            </div>
            <div className={style.content}>{children}</div>
        </div>
    )
}

export default withTranslation('profile')(Service)
