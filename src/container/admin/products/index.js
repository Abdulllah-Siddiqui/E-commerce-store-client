/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { deleteProduct, fetchProducts, addProduct, updateProduct, setProductsStates } from '../../../redux/reducers/productSlice';
import Header from '../../../components/header';
import BulkImportModel from './BulkImportModel';
import ImportProgress from './ImportProgress';
import CustomButton from '../../../components/buttons';
import pencil from '../../../assets/images/edit-pencil.svg';
import arrows from '../../../assets/images/double-arrow.svg';
import trash from '../../../assets/images/trash-can.svg';
import greenTick from '../../../assets/images/green-tick.svg'
import InputField from '../../../components/forms';
import PaginationComponent from '../../../components/pagintion';
import OffCanvasComponent from '../../../components/offcanvas';
import upload from '../../../assets/images/cloud-arrow.svg'
import ModalComponent from '../../../components/modal';
import warningSign from '../../../assets/images/warning-sign.svg';
import { notification } from 'antd';
import '../../../styles/index.css';



function AdminProducts() {

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const totalProducts = useSelector((state) => state.product.totalProducts);
  const currentPage = useSelector((state) => state.product.currentPage);
  const totalPages = useSelector((state) => state.product.totalPages);

  const [page, setPage] = useState(1);
  const [showImport, setShowImport]= useState(false);
  const [showImportProgress, setShowImportProgress] = useState(false);
  const [fileName, setFileName]= useState(null);


  const [refresh, setRefresh] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showUploadSuccessfulMsg, setShowUploadSuccessfulMsg] = useState(false);

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [editID, setEditID] = useState(null);

  const deleteModalButtons = [
    { label: 'No', onClick: () => setShowDeleteWarning(false), isClose: false },
    {
      label: 'Yes', onClick: () => {
        handleDeleteProduct(deleteID)
        setShowDeleteWarning(false)
      }, isClose: false
    }
  ]
  const saveUpdateModalButton = [
    { label: 'Close', onClick: () => setShowUploadSuccessfulMsg(false), isClose: true }
  ]

  const [file, setFile] = useState([]);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({})
  const [searchItem, setSearchItem] = useState('');
  const [prodTitle, setProdTitle] = useState('');
  const [prodRating, setProdRating] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodQuantity, setProdQuantity] = useState('');

  const handleAddProductSubmit = () => {
    const data = {
      title: prodTitle,
      price: prodPrice,
      rating: prodRating,
      quantity: prodQuantity,
      brand: prodBrand,
      images: file
    }
    dispatch(addProduct(data));
  };

  const handleEditProductSubmit = () => {
    const data = {
      productId: editID,
      title: prodTitle,
      price: prodPrice,
      rating: prodRating,
      quantity: prodQuantity,
      brand: prodBrand
    }
    dispatch(updateProduct(data));
  };

  const handleProdTitleChange = (e) => {
    e.preventDefault();
    const title = e.target.value;
    setProdTitle(title);
  }
  const handleProdRatingChange = (e) => {
    e.preventDefault();
    const rating = e.target.value;
    setProdRating(rating);
  }
  const handleProdBrandChange = (e) => {
    e.preventDefault();
    const brand = e.target.value;
    setProdBrand(brand);
  }
  const handleProdPriceChange = (e) => {
    e.preventDefault();
    const price = e.target.value;
    if(price > 0) {
      setProdPrice(price);
    } else if (price == '') {
      setProdPrice('');
    } else {
      notification.warning({
        message: 'Invalid Price',
        description: 'Sorry, Price Should be greater than zero',
        duration: 2
      });    
    }
  }
  const handleProdQuantityChange = (e) => {
    e.preventDefault();
    const quantity = e.target.value;
    if(quantity >= 0) {
      setProdQuantity(quantity);
    } else if (quantity == 0 || quantity == '') {
      setProdQuantity('');
    } else {
      notification.warning({
        message: 'Invalid Stock',
        description: 'Sorry, stock cannot be negative',
        duration: 2
      });    
    }
  }

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    setRefresh(!refresh);
  };
  const handleFilters = ({ type, value }) => {
    switch (type) {
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

  useEffect(() => {
    const search = filter?.search ? filter.search != null : false;

    if (search) {
      console.log('search', search);
      setItems(products);
    } else if (products?.length && !search) {
      setItems(products);
      // dispatch(setProductsStates({ field: 'products', value: [] }));

      console.log('items:', items)
    }
  }, [products]);

  useEffect(() => {
    dispatch(fetchProducts({ page, filter }));
  }, [page, filter]);

  const handlePageChange = (num) => {
    setPage(num);
  }

  const handleImportBulkButton = () => {
    setShowImport(true);
  }
  const handleImportModalHide = () => {
    setShowImport(false);

  }
  const handleImportModalSave = () => {
    setShowImport(false);
    setShowImportProgress(true);

  }
  const handleImportProgressClose = () => {
    setShowImportProgress(false);

  }

  return (
    <>
     {<BulkImportModel show={showImport} handleHide={handleImportModalHide} action={handleImportModalSave} setFileName={setFileName}/>}
      
      <OffCanvasComponent
        name='Add Products'
        show={showAdd}
        handleClose={handleCloseAdd}
        className='Canvas w-50'
      >
        <div className='addProductDiv'>
          <div className='addProductLeft'>
            <div className='addProductImg'>
              <img src={upload} alt='cloud-upload' ></img>
              <span>Drag & drop files here</span>
              <span>or</span>
              <div>
                <input type='file' multiple onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>
          </div>
          <div className='addProductRight'>
            <InputField
              label='Add Product name'
              type='text'
              value={prodTitle}
              className='addProductNameInputField'
              placeholder='Product Name'
              onChange={handleProdTitleChange}
            ></InputField>
            <InputField
              label='Add Product Rating'
              type='text'
              value={prodRating}
              className='addProductNameInputField'
              placeholder='Product Rating'
              onChange={handleProdRatingChange}
            ></InputField>
            <InputField
              label='Add Product Brand'
              type='text'
              value={prodBrand}
              className='addProductNameInputField'
              placeholder='Product Brand'
              onChange={handleProdBrandChange}
            ></InputField>
            <InputField
              label='Price'
              type='text'
              value={prodPrice}
              className='addProductPriceINputField'
              placeholder='$00.0'
              onChange={handleProdPriceChange}
            ></InputField>
            <InputField
              label='Stock'
              type='number'
              value={prodQuantity}
              className='addProductPriceINputField'
              placeholder='Stock'
              onChange={handleProdQuantityChange}

            ></InputField>
            <div className='canvasSubmitButton'>
              <CustomButton
                variant='primary'
                text='Save'
                size='lg'
                onClick={() => {
                  handleAddProductSubmit();
                  setShowUploadSuccessfulMsg(true)
                }}
                id='offCanvasBtn'
              ></CustomButton>
            </div>
          </div>
        </div>
      </OffCanvasComponent>
      <OffCanvasComponent
        name='Edit Products'
        show={showEdit}
        handleClose={handleCloseEdit}
        className='Canvas w-50'
      // handleShow={handleShow}
      >
        <div className='addProductDiv'>
          <div className='addProductLeft'>
            <div className='addProductImg'>
              <img src={upload} alt='cloud-upload' ></img>
              <span>Drag & drop files here</span>
              <span>or</span>
              <CustomButton
                variant='primary'
                text='Browse'
                size='sm'
                onClick={() => alert('Browse button clicked')}
                id='offCanvasBtn'
              ></CustomButton>
            </div>
          </div>
          <div className='addProductRight'>
            {/* <h4>Product Name</h4> */}
            <InputField
              label='Edit Product name'
              type='text'
              value={prodTitle}
              className='addProductNameInputField'
              placeholder='Product Name'
              onChange={handleProdTitleChange}
            ></InputField>
            <InputField
              label='Edit Product Rating'
              type='text'
              value={prodRating}
              className='addProductNameInputField'
              placeholder='Product Rating'
              onChange={handleProdRatingChange}
            ></InputField>
            <InputField
              label='Edit Product Brand'
              type='text'
              value={prodBrand}
              className='addProductNameInputField'
              placeholder='Product Brand'
              onChange={handleProdBrandChange}
            ></InputField>
            <InputField
              label='Price'
              type='text'
              value={prodPrice}
              className='addProductPriceINputField'
              placeholder='$00.0'
              onChange={handleProdPriceChange}
            ></InputField>
            <InputField
              label='Stock'
              type='text'
              value={prodQuantity}
              className='addProductPriceINputField'
              placeholder='Stock'
              onChange={handleProdQuantityChange}

            ></InputField>
            <div className='canvasSubmitButton'>
              <CustomButton
                variant='primary'
                text='Update'
                size='lg'
                onClick={() => {
                  handleEditProductSubmit();
                  setShowUploadSuccessfulMsg(true)
                }}
                id='offCanvasBtn'
              ></CustomButton>
            </div>
          </div>
        </div>
      </OffCanvasComponent>
      <ModalComponent
        className='uploadSuccessfulModal'
        show={showUploadSuccessfulMsg}
        // onHide={() => setShowUploadSuccessfulMsg(false)}
        title='Successful'
        content={
          <>
            <h4><img src={greenTick} alt='successful tick'></img></h4>
            <p>
              Awesome, Your product has been upload successfully.
            </p>
          </>
        }
        buttons={saveUpdateModalButton}

      ></ModalComponent>
      <ModalComponent
        className='deleteWarningModal'
        show={showDeleteWarning}
        onHide={() => setShowDeleteWarning(false)}
        title='Remove Product'
        content={
          <>
            <h4><img src={warningSign} alt='warning Sign'></img></h4>
            <p>Are you sure you want to Delete the Item!</p>
          </>
        }
        buttons={deleteModalButtons}
      ></ModalComponent>
      <div className='adminContainer'>
        <div className='adminSubContainer'>
        {showImportProgress && <ImportProgress action={handleImportProgressClose} fileName = {fileName}/>}
          <div className='adminHead'>
            <Header
              title='Products'
            ></Header>
            <div className='rightContainer'>
              <Col xs="1">
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
              {/* ////////////////////////////////////// */}
              <CustomButton
                variant='primary'
                size='sm'
                id='dashboardHeadBtn'
                active='true'
                text='Import Bulk Products'
                onClick={handleImportBulkButton}
              />
              <CustomButton
                variant='primary'
                id='dashboardHeadBtn'
                size='sm'
                active='true'
                text='Add New'
                onClick={handleShowAdd}
              />
            </div>
          </div>
          <div className='dashboardTable'>
            <Table borderless hover  >
              <thead className='table-gradient'>
                <tr className='tableHeaderRow'>
                  <th>
                    Title
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>Rating</th>
                  <th>Brand</th>
                  <th>
                    Price
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>
                    Stock
                    {' '}
                    <img src={arrows} alt='double-arrow'></img>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className='tableBody'>
                {items?.map((item, index) => (
                  <tr className='productInfo' key={index}>
                    <td>
                      <img className='productIcon' src={item?.thumbnail || item?.images[0] || ''} alt='product-img' />
                      {' '}
                      {item?.title || ''}

                    </td>
                    <td>
                      {`${item?.rating}/5` || 0}
                    </td>
                    <td>
                      {item?.brand || 0}
                    </td>
                    <td>
                      {`$${item?.price || 0}`}
                    </td>
                    <td>
                      {item?.stock || 0}
                    </td>
                    <td>
                      <button className='productsEditButton' onClick={() => {
                        handleShowEdit();
                        setEditID(item._id);
                        setProdTitle(item.title);
                        setProdBrand(item.brand);
                        setProdQuantity(item.stock);
                        setProdPrice(item.price);
                        setProdRating(item.rating);

                      }}>
                        <img src={pencil} alt='pencil-icon'></img>
                      </button>
                      {'  '}
                      <button className='productsEditButton' onClick={() => {
                        setDeleteID(item._id)
                        setShowDeleteWarning(true)
                      }}>
                        <img src={trash} alt='trash-icon'></img>

                      </button>

                    </td>
                  </tr>
                ))}


              </tbody>
            </Table>
            <PaginationComponent
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

          </div>

        </div>
      </div>
    </>
  );
};
export default AdminProducts;
