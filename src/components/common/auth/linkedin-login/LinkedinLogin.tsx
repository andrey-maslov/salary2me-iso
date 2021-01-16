import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa'
import { LinkedIn } from 'react-linkedin-login-oauth2'
import Button from '../../buttons/button/Button'
import { LINKEDIN_REDIRECT_URI } from '../../../../constants/constants'

export const LinkedinLogin: React.FC<{ isEnabled: boolean }> = ({ isEnabled }) => {

    const handleSuccess = (data) => {
        console.log('linkedin code', data.code)
    }

    const handleFailure = error => {
        console.log('Linkedin error', error.errorMessage)
    }

    // TODO fix redirect uri with actual host
    return (
        // <LinkedIn
        //     clientId={process.env.LINKEDIN_CLIENT_ID}
        //     onFailure={handleFailure}
        //     onSuccess={handleSuccess}
        //     redirectUri="http://localhost:4000/linkedin"
        //     renderElement={({ onClick, disabled }) => (
                <Button
                    handle={() => null}
                    btnClass="btn btn-linkedin"
                    title=""
                    startIcon={<FaLinkedinIn />}
                    isEnabled={isEnabled}
                />
        //     )}
        // />
    )
}
