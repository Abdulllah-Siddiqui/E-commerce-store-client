/* eslint-disable no-sequences */
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Row, Col } from 'react-bootstrap'

import '../../../styles/index.css'
import { fetchUserProducts, setProductsStates } from '../../../redux/reducers/productSlice';
import { addToCart } from '../../../redux/reducers/cartSlice';
import Header from '../../../components/header';
import SelectComponent from '../../../components/selector';
import InputField from '../../../components/forms';
import CustomCard from '../../../components/cards';
import CustomButton from '../../../components/buttons';

function UserHome() {

    const filterSizeOptions = [
        { value: '0', label: 'Size' },
        { value: '1', label: 'XS' },
        { value: '2', label: 'S' },
        { value: '4', label: 'M' },
        { value: '5', label: 'L' },
        { value: '6', label: 'XL' },
    ];
    const filterColorOptions = [
        { value: '0', label: 'colour' },
        { value: '1', label: 'Red' },
        { value: '2', label: 'Blue' },
        { value: '4', label: 'Green' },
        { value: '5', label: 'Black' },
        { value: '6', label: 'Grey' }
    ];
    const filterPriceOptions = [
        { value: '0', label: 'Price' },
        { value: '1', label: '$5-$99' },
        { value: '2', label: '$100-$499' },
        { value: '4', label: '$500-$999' },
        { value: '5', label: '$1000-$2000' }
    ];
    const sortingOptions = [
        { value: '0', label: 'Default Sorting' },
        { value: '1', label: 'Price low to high' },
        { value: '2', label: 'Price high to low' },
        { value: '3', label: 'Newest Products' },
    ];
    const dispatch = useDispatch();
    const navigate = useNavigate();


    let [count, setCount] = useState(1);

    const userID = useSelector((state) => state.auth.user._id);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { products, totalPages } = useSelector((state) => state.product);

    const [colours, setColours] = useState([
        { colour: 'darkgreen', isClicked: false },
        { colour: 'grey', isClicked: false },
        { colour: 'black', isClicked: false },
        { colour: 'navy', isClicked: false },
        { colour: 'maroon', isClicked: false },
    ]);
    const [selectedColour, setSelectedColour] = useState(null);

    const [sizes, setSizes] = useState([
        { size: 'XS', isClicked: false },
        { size: 'S', isClicked: false },
        { size: 'M', isClicked: false },
        { size: 'L', isClicked: false },
        { size: 'XL', isClicked: false },
    ]);
    const [selectedSize, setSelectedSize] = useState(null);

    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({})
    const [selectedProduct, setSelectedProduct] = useState({});
    const [searchItem, setSearchItem] = useState('');


    useEffect(() => {
        dispatch(fetchUserProducts({ page, filter }));
    }, [page, filter]);


    window.onscroll = function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (page < totalPages) {
                setPage(page + 1);
            }
        }
    };

    useEffect(() => {
        const colour = filter?.colour ? filter.colour != null : false;
        const price = filter?.price ? filter.price != null : false;
        const size = filter?.size ? filter.size != null : false;
        const sort = filter?.sort ? filter.sort != null : false;
        const search = filter?.search ? filter.search != null : false;
        const condition = colour || price || size || sort || search;
        console.log('search', search);
        if (condition) {
            console.log('condition', condition);
            setItems(products);

        } else if (products?.length && !condition) {
            setItems(items.concat(products));
            dispatch(setProductsStates({ field: 'products', value: [] }));
        }
    }, [products]);


    useEffect(() => {
        if (items?.length) {
            setSelectedProduct(items[0]);
        }
    }, [items]);

    const handleColourClick = (index) => {
        const updatedColours = colours.map((col, i) => {
            if (i === index) {
                return { ...col, isClicked: true };
            } else {
                return { ...col, isClicked: false };
            }
        });

        setColours(updatedColours);
        setSelectedColour(updatedColours[index].colour);
    };
    const handleSizeClick = (index) => {
        const updatedSizes = sizes.map((siz, i) => {
            if (i === index) {
                return { ...siz, isClicked: true };
            } else {
                return { ...siz, isClicked: false };
            }
        });

        setSizes(updatedSizes);
        setSelectedSize(updatedSizes[index].size);
    };

    const handleFilters = ({ type, value }) => {
        switch (type) {
            case 'size': {
                if (value > 0) {
                    const object = filterSizeOptions.find(obj => obj.value === value);
                    setFilter({
                        ...filter,
                        size: object.label
                    })
                } else {
                    setFilter({
                        ...filter,
                        size: null
                    })
                }
                break;
            }
            case 'colour': {
                if (value > 0) {
                    const object = filterColorOptions.find(obj => obj.value === value);
                    setFilter({
                        ...filter,
                        colour: object.label
                    })
                } else {
                    setFilter({
                        ...filter,
                        colour: null
                    })
                }
                break;
            }
            case 'price': {
                if (value > 0) {
                    const object = filterPriceOptions.find(obj => obj.value === value);
                    setFilter({
                        ...filter,
                        price: object.label
                    })
                } else {
                    setFilter({
                        ...filter,
                        price: null
                    })
                }
                break;
            }
            case 'sort': {
                if (value > 0) {
                    const object = sortingOptions.find(obj => obj.value === value);
                    setFilter({
                        ...filter,
                        sort: object.value
                    })
                } else {
                    setFilter({
                        ...filter,
                        sort: null
                    })
                }
                break;
            }
            case 'search': {
                setFilter({
                    ...filter,
                    search: value,
                })
                break;
            }
            default:
                break;
        }
    }

    function incrementCount() {
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        count = count - 1;
        setCount(count);
    }

    function handleAddToCartBtn({ title, description, _id, price, brand, rating, thumbnail, count, selectedSize, selectedColour }) {
        const newItem = {
            productID: _id,
            userID: userID,
            title,
            description,
            price,
            brand,
            rating,
            quantity: count,
            size: selectedSize,
            colour: selectedColour,
            thumbnail
        }
        dispatch(addToCart(newItem));
        console.log('new cart item', newItem);

    };

    return (
        <>
            <div className='userContainer'>
                <div className='userHeader'>
                    <Col xs="auto">
                        <Header
                            title='Home Page'
                        ></Header>
                    </Col>
                    <Col xs='1'>
                        <span>  </span>
                    </Col>

                    <Col xs="auto">
                        <Row>
                            <Col xs="auto" >
                                <span>Filter:</span>
                            </Col>
                            <Col xs="auto">
                                <SelectComponent
                                    options={filterSizeOptions}
                                    defaultValue='0'
                                    size='sm'
                                    onClick={handleFilters}
                                    type={'size'}
                                ></SelectComponent>
                            </Col>
                            <Col xs="auto">
                                <SelectComponent
                                    options={filterColorOptions}
                                    defaultValue='0'
                                    size='sm'
                                    onClick={handleFilters}
                                    type={'colour'}
                                ></SelectComponent>
                            </Col>
                            <Col xs="auto">
                                <SelectComponent
                                    options={filterPriceOptions}
                                    defaultValue='0'
                                    size='sm'
                                    onClick={handleFilters}
                                    type={'price'}
                                ></SelectComponent>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs="auto">
                        <Row>
                            <Col xs="auto">
                                <span>Sorting:</span>
                            </Col>
                            <Col xs="auto">
                                <SelectComponent
                                    options={sortingOptions}
                                    defaultValue='0'
                                    size='sm'
                                    onClick={handleFilters}
                                    type={'sort'}
                                ></SelectComponent>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs="auto">
                        <Row>
                            <Col xs="auto">
                                <span>Search:</span>
                            </Col>
                            <Col xs="auto" >
                                <div className='userHeaderSearch'>
                                    <InputField
                                        placeholder='Search by name'
                                        className='userHeadSearch'
                                        type='text'
                                        size='sm'
                                        value={searchItem}
                                        onChange={(e) => {
                                            setSearchItem(e.target.value);
                                            handleFilters({ type: 'search', value: e.target.value });
                                        }}
                                    ></InputField>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
                <div className='userSubContainer'>
                    <div className='userLeftContainer'>
                        {/* {randomProducts.map((product, index) => ( */}
                        {items?.map((item, index) => (
                            <CustomCard
                                className='userCards'
                                key={index}
                                thumbnail={item.thumbnail || item.images[0]}
                                title={item.title}
                                t1={item.description}
                                t3={`Price: $${item.price}`}
                                btnText={item.stock === 0 ? 'Out of Stock' : 'Details'}
                                variant={item.stock === 0 ? 'outline-danger' : 'primary'}
                                disabled={item.stock === 0 ? true : false}
                                onClickBtn={() => {
                                    setSelectedProduct(item);
                                    setCount(1);
                                }}
                            />
                        ))}

                    </div>
                    <div className='userRightContainer'>
                        <div className='productDetails'>
                            <div className='productDetailsUpperDiv d-flex'>

                                {/* <Row> */}
                                <Col><div className='userHomeDetailImg'>
                                    <img src={selectedProduct?.thumbnail} alt={'product Thumbnail'}></img>
                                </div>
                                    <div className='userHomeDetailImges'>
                                        {selectedProduct?.images?.map((image, index) => (
                                            <img key={index} src={image} alt={`Product ${index + 1}`} />
                                        ))}
                                    </div>
                                </Col>
                                <Col>
                                    <div className='prodDetails'>
                                        <h4>
                                            {selectedProduct?.title}
                                        </h4>
                                    </div>
                                    <div>{' '}</div>
                                    <span><strong>Colour:</strong></span>
                                    <div className='addProductsColors'>
                                        {colours.map((col, index) => (
                                            <div key={index} style={{ border: col.isClicked ? '2px solid #0275d8' : '1px solid #DFDFDF' }}>
                                                <span onClick={() => { setColours(col.colour); handleColourClick(index); }} style={{ backgroundColor: col.colour }}></span>
                                            </div>
                                        ))}
                                    </div>
                                    <span><strong>Sizes:</strong></span>
                                    <div className='addProductsColors'>
                                        {sizes.map((size, index) => (
                                            <div key={index} style={{ border: size.isClicked ? '2px solid #0275d8' : '1px solid #DFDFDF' }}>
                                                <span onClick={() => { setSizes(size.size); handleSizeClick(index, 'sizes'); }}>{size.size}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <span><strong>Price:</strong><span>${selectedProduct?.price}</span></span>
                                </Col>
                                {/* </Row> */}
                            </div>
                            <div className='productDetailsLowerDiv d-flex flex-column'>
                                <span><strong>Quantity:</strong></span>
                                <div className="quantityCount">
                                    {count > 0 ?(
                                        <button onClick={decrementCount}>-</button>
                                    ):
                                    <button>-</button>
                                }
                                    <div>{count}</div>
                                    <button onClick={incrementCount}>+</button>

                                </div>
                                <CustomButton
                                    text='Add to Cart'
                                    size='sm'
                                    variant='primary'
                                    className='productDetailsBtn'
                                    disabled={count === 0 ? true : false}
                                    onClick={() => {
                                        if (isLoggedIn) {

                                            handleAddToCartBtn({ ...selectedProduct, count, selectedColour, selectedSize });
                                        } else {
                                            navigate('/login');
                                        }
                                    }}
                                ></CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default UserHome;