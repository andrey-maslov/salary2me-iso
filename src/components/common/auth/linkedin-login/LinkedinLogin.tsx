import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa'
import Button from '../../buttons/button/Button'
import { LINKEDIN_REDIRECT_URI } from '../../../../constants/constants'

export const LinkedinLogin: React.FC<{ isEnabled: boolean }> = ({ isEnabled }) => {



    // TODO fix redirect uri with actual host
    return (
        <Button
            handle={() => null}
            btnClass="btn btn-linkedin"
            title=""
            startIcon={<FaLinkedinIn />}
            isEnabled={isEnabled}
        />
    )
}
