import style from "./service.module.scss"
import PopoverInfo from "../../../../components/common/popovers/popover-info/PopoverInfo"
import {Link, withTranslation} from "@i18n"

import React from "react"

interface IServiceBox {
    service: 'salary2me' | 'teamconstructor' | 'thegreatbase' | 'default'
    children: React.ReactNode
}

function Service({children, service,}: IServiceBox) {

    return (
        <div className={`${style.service} ${style[service]}`}>
            <div className={style.top}>
                <div className={style.title}>
                    <a href="/">{service}</a>
                </div>
                <div className={`${style.rate} ${style.on}`}>
                    <span>premium</span>
                    <PopoverInfo
                        contentList={[
                            {url: '/', label: 'Перейти к сервису'},
                            {url: '/', label: 'Управлять подпиской'},
                        ]}
                    />
                </div>
            </div>
            <div className={style.content}>
                {children}
            </div>
        </div>
    )
}

export default withTranslation('profile')(Service)