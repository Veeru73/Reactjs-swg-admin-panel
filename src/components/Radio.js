import React from 'react'
import { Form } from 'react-bootstrap'

export const Radio = ({type, label, id}) => {
    return (
        <>
            <Form.Check
                type={type}
                label={label}
                id={id}
            />
        </>
    )
}
