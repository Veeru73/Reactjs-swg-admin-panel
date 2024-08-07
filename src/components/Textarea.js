import React from 'react';
import Form from 'react-bootstrap/Form';

export const InputField = ({
  FormLabel = "",
  FormType = "text", // Default type is "text"
  FormPlaceHolder = "",
  error = "",
  name = "",
  onChange = null,
  value = "",
  readOnly = false,
  isTextArea = false, // New prop to determine if the input should be a textarea
}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>{FormLabel}</Form.Label>
        <Form.Control
          as={isTextArea ? 'textarea' : 'input'} // Use 'textarea' if isTextArea is true
          type={isTextArea ? undefined : FormType} // Remove type if textarea
          name={name}
          defaultValue={value ? value : ''}
          placeholder={FormPlaceHolder}
          onChange={onChange}
          readOnly={!!readOnly}
          className="custom-input"
          rows={isTextArea ? 3 : undefined}
           // Set rows if textarea
        />
        <small className='error'>{error}</small>
      </Form.Group>
    </>
  );
};
