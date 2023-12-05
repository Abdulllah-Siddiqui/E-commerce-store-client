import React from 'react';
import { Form } from 'react-bootstrap';

function SelectComponent({
  options,
  defaultValue,
  label,
  defaultOption,
  type,
  onClick,
  ...props }) {

    const handleSelectionChange = (e) => {
      const value = e.target.value;
      const object = options.filter(obj => obj.value === value);
      onClick({ type, value: object[0].value });
    }

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select
      aria-label="Default select example"
      defaultValue={defaultValue}
      onChange={handleSelectionChange}
      {...props}>
      <option disabled>{defaultOption}</option>

        {options.map((option, index) => (
          <option
          key={index}
          value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default SelectComponent;
