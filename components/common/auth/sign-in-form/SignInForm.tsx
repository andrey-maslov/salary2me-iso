import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

import {signIn} from '../../../../actions/actionCreator';
import {connect} from 'react-redux';

// const loginSchema = Yup.object().shape({
//     password: Yup.string()
//         .min(8, "Too Short!")
//         .max(50, "Too Long!")
//         .required(),
//     username: Yup.string()
//         .email("Invalid email")
//         .required(),
// });

const SignInForm = ({signIn}) => {

    const handleSubmit = (values, {setSubmitting}) => {
        setTimeout(() => {
            console.log(values)
            signIn(JSON.stringify(values))
            setSubmitting(false);
        }, 400);
    };

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{username: "", password: ""}}
                // validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <label>
                            Email: <Field type="email" name="username"/>
                            <ErrorMessage name="username" component="div"/>
                        </label>
                        <label>
                            Password:
                            <Field type="password" name="password"/>
                            <ErrorMessage name="password" component="div"/>
                        </label>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default connect((state) => ({

}), {signIn})(SignInForm);
