import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'

export const Loader = ({show=false}) => {
    
    return (
        <>
        {show && 
            <div className='MainLoader'>
                <Container>
                    <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height:'100vh',
                        zIndex:9999
                    }}>
                        <Col md={2} className='text-center'>
                            <Spinner animation="border" size="lg" />
                        </Col>
                    </Row>
                </Container>
            </div>
            }
        </>
    )
}
