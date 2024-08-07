import React from 'react'
import { Form } from 'react-bootstrap'
import { error } from 'toastr'

export const Textareanew = ({FormLabel,error,onChange,name,value, rows=3,FormPlaceHolder}) => {
    return (
        <>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{FormLabel}</Form.Label>
                <Form.Control as="textarea" name={name} value={value} onChange={onChange} rows={rows} placeholder={FormPlaceHolder} />
                <small className='error'>{error}</small>
            </Form.Group>
        </>
    )
}
