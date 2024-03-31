import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { RenderButton } from '../../component/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { get_item, update_item } from '../../redux/actions/items.action'
import noIMg from '../../assets/images/No_Image_Available.jpeg'

export const Item = () => {
    // const [category,setCategory]=useState('')
    const [file,setFile] = useState('')
    const [preview,setPreview] = useState('')
    const [hsbFile,sethsbFile] = useState('')
    const [hsbPreview,setHasbPreview] = useState('')
    const [formFields, setFormFields] = useState({
        "item_name": '',
        "mesuring_qntty": '',
        "item_mrp": '',
        "offer_price": '',
        "offer_percentage":'',
        "item_catogory": '',
        "item_tags": '',
        "item_hsb": '',
        "instock_outstock_indication": '',
        "stock_quantity": '',
        "item_discription": '',
        "image": '',
    })

    const CategoryData = [
        {label:'Category 1',value:'Category 1'},
        {label:'Category 2',value:'Category 2'},
        {label:'Category 3',value:'Category 3'},
        {label:'Category 4',value:'Category 4'},
        {label:'Category 5',value:'Category 5'},
        {label:'Category 6',value:'Category 6'},
        {label:'Category 7',value:'Category 7'},
        {label:'Category 8',value:'Category 8'},
        {label:'Category 9',value:'Category 9'},
        {label:'Category 10',value:'Category 10'},
        {label:'Category 11',value:'Category 11'},
        {label:'Category 12',value:'Category 12'},
    ]

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (id.length > 0) {
            get_stock_detail()
        }
    }, [])

    const get_stock_detail = () => {
        dispatch(get_item(id)).then(res =>{
            setFormFields(res.data)
        }).catch(err =>{
            console.log(err);
        })
    }

    const __changeInputFields = (e) => {
        setFormFields({...formFields,[e.target.name]: e.target.value})
    }

    const __changeImage = (e) => {
        setFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const __changeHsbImage = (e) => {
        sethsbFile(e.target.files[0])
        setHasbPreview(URL.createObjectURL(e.target.files[0]))
    }

    const __handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("id", formFields?.id);
        formData.append("item_name", formFields?.item_name);
        formData.append("mesuring_qntty", formFields?.mesuring_qntty);
        formData.append("item_mrp", formFields.item_mrp);
        formData.append("offer_price", formFields.offer_price);
        formData.append("offer_percentage",formFields.offer_percentage)
        formData.append("item_catogory", formFields.item_catogory);   
        formData.append("item_tags", formFields.item_tags);
        formData.append("item_hsb", formFields.item_hsb);
        formData.append("stock_quantity", formFields.stock_quantity);
        formData.append("item_discription", formFields.item_discription);
        formData.append("instock_outstock_indication", formFields.instock_outstock_indication);  
        formData.append("item_image", file);
        formData.append("item_hsb", hsbFile);

            dispatch(update_item(formData)).then(res =>{
                setFormFields(res.data)
                navigate('/')
            }).catch(err =>{
                console.log(err);
            })
    }

    // var categoryChange = (category) => {
    //     setCategory(category.value);
    //   };

    return (
        <React.Fragment>
            <div className='d-flex align-items-center p-5'>
                <Container>
                    <Row>
                        <Col md={12} className='d-flex align-items-center justify-content-center'>
                            <div className='card w-100 dashboard-card'>
                                <div className='card-body'>
                                    <Row>
                                        <Col md={12}>
                                            <h1 className='fw-bolder text-white mt-2 mb-3'>
                                                Edit Item
                                            </h1>
                                        </Col>
                                    </Row>
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Item name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter item name" name="item_name" onChange={(e) => __changeInputFields(e)} value={formFields.item_name} className='fw-semibold' />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Mesuring qntty</Form.Label>
                                                 
                                                    <select className="form-select form-control" name='mesuring_qntty' value={formFields.mesuring_qntty}  onChange={(e) => __changeInputFields(e)} >
                                                        <option value='' disabled="disabled">Mesuring qntty</option>
                                                        <option value="Kg" >Kg</option>
                                                        <option value="Number" >Number</option>
                                                        <option value="liter" >Liter</option>
                                                        <option value="gram" >Gram</option>
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Item MRP</Form.Label>
                                                    <Form.Control type="number" placeholder="Enter item MRP" name="item_mrp" onChange={(e) => __changeInputFields(e)} value={formFields.item_mrp} className='fw-semibold' />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Offer price</Form.Label>
                                                    <Form.Control type="number" placeholder="Enter offer price" name="offer_price" onChange={(e) => __changeInputFields(e)} value={formFields.offer_price} className='fw-semibold' />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Item category</Form.Label>
                                                    <select value={formFields.item_catogory} name='item_catogory' className="form-select form-control" onChange={(e) => __changeInputFields(e)} >
                                                        <option value='' disabled="disabled">Item category</option>
                                                        {
                                                            CategoryData.map((data)=>{
                                                                return <option value={data.value} >{data.label}</option>
                                                            })
                                                        }
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Item tags</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter item tags" name="item_tags" onChange={(e) => __changeInputFields(e)} value={formFields.item_tags} className='fw-semibold' />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Instock/outstock indication</Form.Label>
                                                    <select value={formFields.instock_outstock_indication} name='instock_outstock_indication' className="form-select form-control" onChange={(e) => __changeInputFields(e)} >
                                                        <option value="" disabled="disabled">Instock/outstock indication</option>
                                                        <option value="1">Yes</option>
                                                        <option value="2" >No</option>
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Stock quantity</Form.Label>
                                                    <Form.Control type="number" placeholder="Enter stock quantity" name="stock_quantity" onChange={(e) => __changeInputFields(e)} value={formFields.stock_quantity} className='fw-semibold' />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Item discription</Form.Label>
                                                    <Form.Control as="textarea" rows={2} placeholder="Enter Item discription" name="item_discription" onChange={(e) => __changeInputFields(e)} value={formFields.item_discription} className='fw-semibold' />
                                                </Form.Group>
                                            </Col>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className='text-white fw-semibold'>Item HSB</Form.Label> 
                                                            <Form.Control type="file" accept="image/png, image/gif, image/jpeg" placeholder="Enter item image" onChange={(e)=>__changeHsbImage(e)} className='fw-semibold' required/>
                                                            <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                                                    Item hsb is required.
                                                            </Form.Control.Feedback>
                                                            {
                                                                (formFields.item_hsb === "") ? (<img src={noIMg} className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />) : (<img src={process.env.REACT_APP_IMG_URL + formFields.item_hsb } className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />)
                                                            }
                                                            {   (hsbPreview) &&
                                                                <img src={hsbPreview} className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />
                                                            }
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label className='text-white fw-semibold'>Item image</Form.Label>
                                                        <Form.Control type="file" accept="image/png, image/gif, image/jpeg" placeholder="Enter item image" onChange={(e) => __changeImage(e)} className='fw-semibold' />
                                                        {
                                                            (formFields.item_image === "")  ? (<img src={noIMg} className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />) : (<img src={process.env.REACT_APP_IMG_URL + formFields.item_image } className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />)
                                                        }
                                                        {   (preview) &&
                                                                <img src={preview} className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />
                                                        }
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Col md={6} className="d-flex align-items-center justify-content-end">
                                                <RenderButton 
                                                    variant={'primary'}
                                                    type={'submit'}
                                                    title={'Update'}
                                                    onClick={__handleSubmit}
                                                />
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}