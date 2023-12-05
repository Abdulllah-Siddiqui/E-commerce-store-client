import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function CustomButton({
    style,text,...props
}) {
    return (
        <Button style={{cursor : 'pointer'}} {...props}>{text}</Button>
    );
};

export default CustomButton;