import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'

import './login.css'

export default function Login() {
    const handleSubmit = values => {
        axios
            .post('http://localhost:8080/auth/authenticate', values)
            .then(resp => {
                const { data } = resp
                if (data) {
                    localStorage.setItem('app-token', data)
                    history.push('/home')
                }
            })
    }
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    })

    return (
        <fragment>
            <h1>Login</h1>
            <p>Preencha os campos para efetuar login</p>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <div className="Login-Group">
                        <Field name="email" className="Login-Field" />
                        <ErrorMessage component="span" name="email" />
                    </div>
                    <div className="Login-Group">
                        <Field name="password" className="Login-Field" />
                        <ErrorMessage component="span" name="password" />
                    </div>
                    <button className="Login-Btn" type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </fragment>
    )
}
