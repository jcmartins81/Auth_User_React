import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { history } from '../../history'
import './register.css'



export default function Register() {

    const handleSubmit = values => {
        axios
            .post('http://localhost:8080/auth/register', values)
            .then(resp => {
                const { data } = resp
                console.log(data)
                if (data) {
                    localStorage.setItem('app-token', data.token)
                    history.push('/home')
                }
            })
    }
    const validations = yup.object().shape({
        name: yup.string().min(5).required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    })

    return (
        <fragment>
            <h1>Register</h1>
            <p>Preencha os campos para efetuar o Cadastro</p>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Register">
                    <div className="Register-Group">
                        <Field name="name" className="Register-Field" />
                        <ErrorMessage component="span" name="name" />
                    </div>

                    <div className="Register-Group">
                        <Field name="email" className="Register-Field" />
                        <ErrorMessage component="span" name="email" />
                    </div>
                    <div className="Register-Group">
                        <Field name="password" className="Register-Field" />
                        <ErrorMessage component="span" name="password" />
                    </div>
                    <button className="Register-Btn" type="submit">
                        Register
                    </button>
                </Form>
            </Formik>
        </fragment>
    )
}