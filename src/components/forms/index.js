import React from 'react';
import {Form} from 'react-bootstrap';

function InputField({
    label="",
    type="",
    placeholder="",
    value="",
    onChange="",
    className="",
    ...props
}) {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={className}
                    {...props}
                />
        </Form.Group>
    );
};

export default InputField;