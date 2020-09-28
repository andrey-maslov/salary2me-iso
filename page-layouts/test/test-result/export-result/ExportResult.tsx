import axios from 'axios'
// import { saveAs } from 'file-saver'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { FiExternalLink } from 'react-icons/fi'
import { FaFilePdf } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import CodeBox from "../../../../components/common/code-box/CodeBox"
import style from './export-result.module.scss'

interface ExportResultProps {
    data: string
}

const ExportResult: React.FC<ExportResultProps> = ({data}) => {

    const {t} = useTranslation()
    const userName = useSelector((state: any) => state.userData.name)
    const isLoggedIn = useSelector((state: any) => state.userData.isLoggedIn)
    const dispatch = useDispatch()



    return (
        <>
            <h5 className={style.title}>{t('common:result_page.your_encrypted_result')}:</h5>
            <div className={style.result}>
                <CodeBox content={data}/>
            </div>

            <div className={style.bottom}>
                <a
                    href={`${process.env.COOP_URL}?encdata=${data}`}
                    className={style.link}
                    target="_blank"
                    rel="noopener norefferer"
                >
                    <FiExternalLink/>
                    {t('common:result_page.go_to_comparison')}
                </a>
                {/*<button className={style.link} onClick={createAndDownloadPdf}>*/}
                {/*    <FaFilePdf/>*/}
                {/*    {t('common:result_page.create_pdf')}*/}
                {/*</button>*/}
            </div>
        </>
    )

    function createAndDownloadPdf() {

        if (!isLoggedIn) {
            // dispatch(setOnlyLoggedModal(true))
            return
        }

        const canvas = document.querySelector('canvas');
        let dataImg = ''
        if (canvas) {
            console.log(canvas.toDataURL())
            dataImg = canvas.toDataURL()
        }

        axios.post('/create-pdf', {radar: dataImg}, {
            responseType: 'arraybuffer'
        })
            .then((res) => {
                const fileName = userName.replace(' ', '-')
                console.log(res.data);
                // @ts-ignore
                const fileBlob = new Blob([res.data], {type: 'application/pdf'})
                // saveAs(fileBlob, `${fileName}-profile.pdf`)
            })
    }
}

export default ExportResult