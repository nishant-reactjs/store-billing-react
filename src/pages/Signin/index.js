import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { RenderButton } from '../../component/Button'
import localStorage from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {

    const [formFields, setFormFields] = useState({
        phone_number: '', password: ''
    });

    const navigate = useNavigate()

    const __changeInputFields = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        })
    }

    const __handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setData('user-info', { name: 'Testing user' })
        navigate("/");
    }

    return (
        <React.Fragment>
            <div className='d-flex align-items-center justify-content-center m-auto w-25 h-100'>
                <Container className='m-0 p-0 auth-form'>
                    <Row className='m-0 my-2'>
                        <Col md={12} className="my-2">
                            <h3 className='text-center'>Sign In</h3>
                        </Col>
                        <Col md={12}>
                            <Form>
                                <Row className='my-2 mx-0'>

                                    <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter phone number" name="phone_number" onChange={(e) => __changeInputFields(e)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => __changeInputFields(e)} />
                                    </Form.Group>

                                </Row>
                                <Row className='my-2 mx-0'>
                                    <RenderButton
                                        variant={'primary'}
                                        type={'submit'}
                                        title={'Signin'}
                                        onClick={__handleSubmit}
                                    />
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}