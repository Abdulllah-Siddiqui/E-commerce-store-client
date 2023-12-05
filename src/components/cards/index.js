import React from 'react';
import '../../styles/index.css';
import { Card, Button } from 'react-bootstrap';
import cart from '../../assets/images/shopping-cart.svg'

function CustomCard({
    title = '',
    superscript = '',
    img = '',
    thumbnail = '',
    t1 = '',
    t2 = '',
    t3 = '',
    t4 = '',
    t5 = '',
    t7 = '',
    variant = '',
    btnText = '',
    border = '',
    className = '',
    onClickBtn,
    disabled,
    ...props
}) {
    return (
        <Card border={border} className={className} style={{ width: '18rem' }} {...props}>
            <Card.Img variant="top" src={thumbnail} />
            <Card.Body>
                    <div>
                        <div>{superscript}</div>
                        <Card.Title> {title} </Card.Title>
                        <Card.Title style={{ color: '#007BFF' }}> {t5} </Card.Title>
                        <div className='cardSubDiv'>
                            <Card.Text>{t1}</Card.Text>
                            <Card.Text>{t2}</Card.Text>
                        </div>
                        <div className='cardSubDiv'>
                        <Card.Text>{t4}</Card.Text>
                        <Card.Text>{t7}</Card.Text>
                        </div>
                        <Card.Text style={{ color: '#007BFF' }}>{t3}</Card.Text>
                    </div>
                    <div className='cardBtnDiv'>
                        <Button variant={variant} onClick={onClickBtn} disabled={disabled}>{btnText}</Button>
                    </div>
            </Card.Body>
        </Card>
    )
};
export default CustomCard;
