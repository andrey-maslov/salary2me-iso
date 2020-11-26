import React, { useState, useEffect } from 'react'

interface IParsingStage {
    stageList: string[]
    duration: number
}

const ParsingStage: React.FC<IParsingStage> = ({ stageList, duration }) => {
    const interval = (duration - 1000) / stageList.length
    const [phrase, setPhrase] = useState(stageList[0])
    let i = 1

    useEffect(() => {
        const iterate = setInterval(() => {
            if (i < stageList.length - 1) {
                i++
                setPhrase(stageList[i])
            }
        }, interval)

        return function cleanup() {
            clearInterval(iterate)
        }
    }, [i, interval])

    return <div className="text-center">{phrase}</div>
}

export default ParsingStage
