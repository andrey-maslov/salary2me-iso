import React, { useState } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard"
import { FiCopy } from 'react-icons/fi'
import style from './code-box.module.scss'

interface CodeBoxType {
    content: string
}

const CodeBox: React.FC<CodeBoxType> = ({content}) => {

    const [state, setState] = useState({isCopied: false})

    const onCopy = () => {
        setState({isCopied: true})
    }

    return (
        <div className={`${style.wrapper}`}>
            <input className={style.enc} defaultValue={content} onFocus={(e: any) => e.target.select()}/>
            <CopyToClipboard
                onCopy={onCopy}
                options={{message: 'Whoa!'}}
                text={content}>
                <button className={`${style.btn} ${state.isCopied ? style.success : ''}`}>
                    <FiCopy/>
                </button>
            </CopyToClipboard>
        </div>
    )
}

export default CodeBox