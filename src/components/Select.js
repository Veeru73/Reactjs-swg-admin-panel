import React from 'react';
import { Form } from 'react-bootstrap';

export default function Select({ FormLabel = "", Array = [], FormPlaceHolder = "", name = "", onChange, value = "", error = "" }) {
    return (
        <>
            {FormLabel && <Form.Label>{FormLabel}</Form.Label>}
            <Form.Select aria-label={FormPlaceHolder} defaultValue={value} className={FormLabel ? "" : "mt-2"} name={name} onChange={onChange}>
                <option value="" disabled> Select </option>
                {Array.length > 0 &&
                    Array.map((e, i) => (
                        <option key={i} value={e.value}>{e.name} </option>
                    ))}
            </Form.Select>
            <small className='error'>{error}</small>
        </>
    );
}
