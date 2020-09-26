import React, {useState, useEffect} from 'react'
import {PARSING_STAGES, parsingDuration} from '../../../../constants/constants'


const ParsingStage: React.FC = () => {

    const interval = (parsingDuration - 1000) / PARSING_STAGES.length
    const [phrase, setPhrase] = useState(PARSING_STAGES[0])
    let i = 1

    useEffect(() => {

        const iterate = setInterval(() => {
            if (i < (PARSING_STAGES.length - 1)) {
                i++
                setPhrase(PARSING_STAGES[i])
            }
        }, interval)

        return function cleanup() {
            clearInterval(iterate)
        }
    }, [i])


    return (
        <div className="text-center">
            {phrase}
        </div>
    )

}

export default ParsingStage