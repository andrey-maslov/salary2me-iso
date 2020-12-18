// TODO change
export const signInGoogle = () => {
    return dispatch => {
        // @ts-ignore
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2
            .signIn()
            .then(googleUser => {
                const profile = googleUser.getBasicProfile()
                return profile
            })
            .then(profile => {
                const name = profile.getName()
                const email = profile.getEmail()
                // dispatch(addAuthData(name, email, 'google'));
                // dispatch(isUserInBase(email));
            })
    }
}
// TODO change
export const signOutGoogle = () => {
    // @ts-ignore
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(function() {
        console.log('User signed out.')
    })
}