import React, {useState, useEffect} from 'react';
import {PARSING_STAGES, parsingDuration} from '../../../../constants/constants';


const ParsingAlertBottom: React.FC = () => {

    const interval = (parsingDuration - 1000) / PARSING_STAGES.length;

    const [phrase, setPhrase] = useState(PARSING_STAGES[0]);
    let i = 1;
    useEffect(() => {

        setInterval(() => {
            if (i < (PARSING_STAGES.length - 1)) {
                i++;
                setPhrase(PARSING_STAGES[i]);
            }
        }, interval)
    }, [i]);


    return (
        <div className="text-center">
            {phrase}
        </div>
    )

};

export default ParsingAlertBottom;