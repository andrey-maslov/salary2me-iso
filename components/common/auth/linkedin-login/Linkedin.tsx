import React from 'react';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';
import {addUserData, isUserInBase} from "../../../../actions/actionCreator";
import {parseQueryString} from "../../../../helper/helper";

interface LinkedinProps {
    addAuthData: (name: string, email: string) => {}
    redirectUrl: string
    isUserInBase: (email: string) => void
}

const Linkedin: React.FC<LinkedinProps> = ({addAuthData, redirectUrl, isUserInBase}) => {

    const history = useHistory();
    const queryString = (window.location.search).replace('?', '');
    const userParams: any = parseQueryString(queryString);
    let name = decodeURI(userParams.name).replace('+', ' ')

    isUserInBase(userParams.email);
    addAuthData(name, userParams.email);
    history.push(redirectUrl);

    return (
        <div>
            linkedin login
        </div>

    )

};

export default connect((state: any) => ({
    redirectUrl: state.applicationMode.redirectUrl,
}), {addUserData, isUserInBase})(Linkedin);