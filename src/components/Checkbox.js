import React from 'react';
import Form from 'react-bootstrap/Form';

export const Checkbox = ({ name, value, onChange=null, Checklabel, ID }) => {
    return (
        <>
            <Form.Check // prettier-ignore
                type="checkbox"
                id={ID}
                name={name}
                checked={value ? true : false}
                onChange={onChange}
                label={Checklabel}
            />
        </>
    )
}
