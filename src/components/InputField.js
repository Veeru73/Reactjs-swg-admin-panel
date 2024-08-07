import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const InputField = ({
    FormLabel = "",
    FormType = "",
    FormPlaceHolder = "",
    error = "",
    name = "",
    onChange = null,
    value = "",
    readOnly = false,
    isTextArea = false,
    max = '',
    min = "",
    required = false,
}) => {
    const [startDate, setStartDate] = useState();

    useEffect(()=>{
        if(FormType === 'date' && value !=""){
            const momentObj = moment.unix(value).format("ddd MMM DD YYYY HH:mm:ss");
            setStartDate(momentObj);
        }
    },[FormType,value]);


    const handleDateChange = (date) => {
        setStartDate(date);
        let formattedDate = "";
        if (date) {
            // Parse the timestamp using moment
            const momentObj = moment(date, "ddd MMM DD YYYY HH:mm:ss");

            // Get Unix timestamp (seconds since Jan 1, 1970)
            const unixTimestamp = momentObj.unix();
            // formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
            formattedDate = unixTimestamp;
        }
        if (onChange) {
            onChange({ target: { name, value: formattedDate } });
        }
    };

    return (
        <Form.Group className="mb-2 d-grid" controlId="formGroupEmail">
            <Form.Label>{FormLabel} {required ? <small className='error'>*</small> : ""}</Form.Label>
            {FormType === 'date' ? (
                readOnly == false ?
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                        className="form-control"
                        placeholderText={"select date"}
                    />
                    : ""
            ) : (
                <Form.Control
                    as={isTextArea ? 'textarea' : 'input'}
                    type={isTextArea ? undefined : FormType}
                    name={name}
                    defaultValue={value ? value : ''}
                    placeholder={FormPlaceHolder}
                    onChange={onChange}
                    readOnly={readOnly}
                    maxLength={max}
                    min={min}
                    className="custom-input"
                    rows={isTextArea ? 3 : undefined}
                />
            )}
            <small className='error'>{error}</small>
        </Form.Group>
    );
};
