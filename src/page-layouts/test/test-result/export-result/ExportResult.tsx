import { useState } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { withTranslation } from '@i18n'
import { useSelector } from 'react-redux'
import { FiExternalLink } from 'react-icons/fi'
import { AiOutlineLoading } from 'react-icons/ai'
import { FaFilePdf } from 'react-icons/fa'
import CodeBox from '../../../../components/common/code-box/CodeBox'
import style from './export-result.module.scss'
import { globalStoreType } from '../../../../typings/types'
import { COOP_URL } from '../../../../constants/constants'

interface ExportResultProps {
    data: string
    t: any
}

const ExportResult: React.FC<ExportResultProps> = ({ data, t }) => {
    const { email } = useSelector((state: globalStoreType) => state.user)
    const { dataForPDF } = useSelector((state: globalStoreType) => state.test)
    const [isLoading, setLoading] = useState(false)

    return (
        <>
            <h5 className={style.title}>{t('test:result_page.your_encrypted_result')}:</h5>
            <div className={style.result}>
                <CodeBox content={data} />
            </div>

            <div className={style.bottom}>
                <a
                    href={`${COOP_URL}/pair?encdata=${encodeURIComponent(data)}`}
                    className={style.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FiExternalLink />
                    {t('test:result_page.go_to_comparison')}
                </a>
                <button
                    className={`${style.link} ${isLoading ? 'btn-loader' : ''}`}
                    onClick={createAndDownloadPdf}>
                    {isLoading ? <AiOutlineLoading /> : <FaFilePdf />}
                    {t('test:result_page.create_pdf')}
                </button>
            </div>
        </>
    )

    function createAndDownloadPdf() {
        const canvas = document.querySelector('canvas')
        let dataImg = ''
        if (canvas) {
            dataImg = canvas.toDataURL()
        }
        setLoading(true)
        axios
            .post(
                '/create-pdf',
                { radar: dataImg, testData: dataForPDF },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    responseType: 'arraybuffer'
                }
            )
            .then(res => {
                const fileName = email ? email.split('@')[0].replace('.', '-') : 'psychological-'
                const fileBlob = new Blob([res.data], { type: 'application/pdf' })
                saveAs(fileBlob, `${fileName}-profile.pdf`)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }
}

export default withTranslation('test')(ExportResult)
