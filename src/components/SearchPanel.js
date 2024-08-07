import React from 'react'
import { Row, Col, Container, Form, InputGroup } from 'react-bootstrap'

export const SearchPanel = ({ FormLabel, FormType, FormPlaceHolder, StartIcon,onChange}) => {
    return (
        <>
            <div className='SearchBox'>
                <Container>
                    <Row style={{
                        justifyContent:'end'
                    }}>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>{FormLabel}</Form.Label>
                                <InputGroup>
                                <Form.Control type={FormType} placeholder={FormPlaceHolder} onChange={onChange} />
                                    {/* {StartIcon && ( */}
                                        {/* <InputGroup.Text> */}
                                            {/* {StartIcon} */}
                                        {/* </InputGroup.Text> */}
                                    {/* )} */}
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
