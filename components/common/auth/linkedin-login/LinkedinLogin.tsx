import React from 'react';
import Button from "../../buttons/button/Button";
import {FaLinkedinIn} from "react-icons/fa";
import {LINKEDIN_REDIRECT_URI} from '../../../../constants/constants';

export const LinkedinLogin: React.FC<{isEnabled: boolean}> = ({isEnabled}) => {

    const redirectVariant = (process.env.NODE_ENV === "development") ? 1 : 3;

    const linkedinRedirect = `https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&response_type=code&scope=r_liteprofile%20r_emailaddress&redirect_uri=${LINKEDIN_REDIRECT_URI}/${redirectVariant}`;

    const onClick = () => {
        window.location.href = linkedinRedirect;
    };

    //TODO fix redirect uri with actual host
    return (
        <Button
            handle={onClick}
            btnClass="btn btn-linkedin"
            title={'LinkedIn'}
            startIcon={<FaLinkedinIn/>}
            isEnabled={isEnabled}
        />
    )
};