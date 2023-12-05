import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DropDown from '../icons/dropDown';
import dropdownSvg from '../../assets/images/dropdown.svg'


function CustomDropdown({
    title='',
    disabled='',
    align='',
    menuVariant='',
    variant='',
    onClick='',
    onClick2='',
    className='',
    id='',
    href='',
    customDropdownIcon='',
    placeholder=''
}) {
    const { isAdmin } = useSelector((state) => state.auth);

    return(
        <Dropdown as={ButtonGroup} border='false'>
            <Button variant='light'id="dropdown-split-button">{placeholder}</Button>
            <Dropdown.Toggle split variant='light' id="dropdown-split">  </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="1" onClick={onClick}>Logout</Dropdown.Item>
                { !isAdmin ? (

                    <Dropdown.Item eventKey="2" onClick={onClick2}>Orders</Dropdown.Item>
                    ):null
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomDropdown;