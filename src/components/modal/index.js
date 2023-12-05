import {Modal, Button} from 'react-bootstrap';
import React from 'react';




function ModalComponent ({ 
    show='',
    onHide='',
    title='',
    content='',
    className='',
    buttons=[] })  {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={className}
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        {buttons.map((button,index) => {
          return(
            <Button 
              key={index} 
              onClick={button.onClick}
              variant={button.isClose ? 'secondary' : 'primary'}
              >
              {button.label}
            </Button> 
          )
        })}
        {/* <Button onClick={onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
