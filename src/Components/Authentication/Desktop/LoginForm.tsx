import { Formik, FormikProps } from "formik"
import React, { Component } from "react"
import styled from "styled-components"

import {
  Error,
  Footer,
  ForgotPassword,
  FormContainer as Form,
  SubmitButton,
} from "Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import { LoginValidator } from "Components/Authentication/Validators"
import Input from "Components/Input"

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export interface LoginFormState {
  error: string
}

export class LoginForm extends Component<FormProps, LoginFormState> {
  state = {
    error: this.props.error,
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values}
        onSubmit={this.props.handleSubmit}
        validationSchema={LoginValidator}
      >
        {({
          values,
          errors,
          touched,
          handleChange: formikHandleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
          setStatus,
        }: FormikProps<InputValues>) => {
          const globalError =
            this.state.error || (status && !status.success && status.error)

          const handleChange = e => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form onSubmit={handleSubmit} height={320}>
              <Input
                block
                quick
                error={touched.email && errors.email}
                placeholder="Enter your email address"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                block
                quick
                error={touched.password && errors.password}
                placeholder="Enter your password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Row>
                <ForgotPassword
                  onClick={() => this.props.handleTypeChange(ModalType.forgot)}
                />
              </Row>
              {globalError && <Error show>{globalError}</Error>}
              <SubmitButton disabled={isSubmitting}>Log in</SubmitButton>
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange(ModalType.signup)
                }
                mode="login"
                onFacebookLogin={this.props.onFacebookLogin}
                onTwitterLogin={this.props.onTwitterLogin}
                inline
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}
