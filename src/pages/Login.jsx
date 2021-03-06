import Icon from "../components/Icon/index.js";
import LoginError from "../components/LoginError/index.js";
import { useEffect } from "react";
import { userHasAccount } from "../utils/helpers.js";
import { Formik, Field, ErrorMessage } from 'formik';
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import {loginInputNames, loginInputsInitialValues} from "../utils/constants.js";
import { loginSchema } from "../utils/formSchema.js";
import { useAppProvider } from "../context/AppContext.js";

const Login  = () => {
    const { showLoginErrorMsg, setShowLoginErrorMsg, updateIsAUserLogged } = useAppProvider();
    const navigateTo = useNavigate();

    useEffect(() => {
        setShowLoginErrorMsg({ show: false, msg: ""});
    }, [setShowLoginErrorMsg]);

    return (
        <div className="login">
            <Icon name="logo" iconClassName="login__logo" />
            <Formik
                initialValues={loginInputsInitialValues}
                validationSchema={loginSchema}
                onSubmit={(loginInfo, actions) => {
                    let userHasAnAccount = userHasAccount(loginInfo);
                    if(userHasAnAccount.error) {
                        setShowLoginErrorMsg({
                            show: true,
                            msg: userHasAnAccount.errorMsg,
                        })
                        actions.setSubmitting(false);
                    } else {
                        updateIsAUserLogged(true);
                        navigateTo("/");
                    }
                }}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <form className="login__form" onSubmit={handleSubmit}>
                        { showLoginErrorMsg.show ? <LoginError errorMsg={showLoginErrorMsg.msg} /> : null }
                        <h1>Log In</h1>
                        <div className="login__input-cont">
                            <Field
                                type="email"
                                name={loginInputNames.email}
                                className="login__input"
                                placeholder="Email"
                            />
                            <ErrorMessage name="email" component="div" className="login__input-error" />
                        </div>
                        <div className="login__input-cont">
                            <Field
                                type="password"
                                name={loginInputNames.password}
                                className="login__input"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password" component="div" className="login__input-error" />
                        </div>
                        <button
                            type="submit"
                            className="login__submit-button"
                            disabled={isSubmitting}
                        >
                            Log In to your account
                        </button>
                        <div className="login__alt-option">
                            <p>Don't have an account?</p>
                            <Link to="/signup" className="sign-up-link">Sign up</Link>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Login;
