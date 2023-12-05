import React from 'react';
import {Form} from 'react-bootstrap';

function CheckboxField({
    type='',
    label='',
    checked,
    onClick,
    ...props
}) {
    return(
        <Form.Group>
            <Form.Check
            type={type}
            label={label}
            checked={checked}
            onClick={onClick}
            {...props}
            >
            </Form.Check>
        </Form.Group>
    );
};

export default CheckboxField;