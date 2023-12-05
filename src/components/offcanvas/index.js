import React, { useEffect } from 'react';
import {Button} from 'react-bootstrap';
import {Offcanvas} from 'react-bootstrap';

function OffCanvasComponent ({ 
    name='', 
    className='',
    show='', 
    placement='',
    handleClose='', 
    handleShow='', 
    children 
})  {
  useEffect(
    ()=>{
      console.log('offscancavs renders');
      console.log(show);
    }
    
  )
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button> */}
      <Offcanvas show={show} onHide={handleClose} placement='end'className={className} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvasComponent;
