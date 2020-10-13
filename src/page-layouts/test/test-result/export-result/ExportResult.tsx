import axios from 'axios'
import { saveAs } from 'file-saver'
import { withTranslation } from '@i18n'
import { useSelector } from 'react-redux'
import { FiExternalLink } from 'react-icons/fi'
import { FaFilePdf } from 'react-icons/fa'
import CodeBox from '../../../../components/common/code-box/CodeBox'
import style from './export-result.module.scss'
import { globalStoreType } from '../../../../typings/types'

interface ExportResultProps {
    data: string
    t: any
}

const ExportResult: React.FC<ExportResultProps> = ({ data, t }) => {
    const { isLoggedIn } = useSelector((state: globalStoreType) => state.user)

    return (
        <>
            <h5 className={style.title}>{t('test:result_page.your_encrypted_result')}:</h5>
            <div className={style.result}>
                <CodeBox content={data}/>
            </div>

            <div className={style.bottom}>
                <a
                    href={`${process.env.COOP_URL}?encdata=${data}`}
                    className={style.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FiExternalLink />
                    {t('test:result_page.go_to_comparison')}
                </a>
                <button className={style.link} onClick={createAndDownloadPdf}>
                    <FaFilePdf />
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

        axios
            .post(
                '/create-pdf',
                { radar: dataImg },
                {
                    responseType: 'arraybuffer'
                }
            )
            .then(res => {
                // const fileName = name.replace(' ', '-')
                const fileName = 'test-file'
                // console.log(res.data)
                const fileBlob = new Blob([res.data], { type: 'application/pdf' })
                saveAs(fileBlob, `${fileName}-profile.pdf`)
            })
    }
}

export default withTranslation('test')(ExportResult)
