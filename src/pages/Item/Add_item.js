import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { RenderButton } from "../../component/Button";
import { create_item } from "../../redux/actions/items.action";

const ItemAdd = () => {

    const [stockIndicater,setStockIndicater]=useState('')
    const [mesuring_Qntty,setMesuring_Qntty]=useState('')
    const [category,setCategory]=useState('')
    const [validated, setValidated] = useState(false);
    const [file,setFile] = useState('')
    const [preview,setPreview] = useState('')
    const [hsbFile,sethsbFile] = useState('')
    const [hsbPreview,setHasbPreview] = useState('')
    const [formFields, setFormFields] = useState({
        "item_code": '',
        "item_name": '',
        "mesuring_qntty": '',
        "offer_percentage":'',
        "item_mrp": '',
        "offer_price": '',
        "item_catogory": '',
        "item_tags": '',
        "item_hsb": '',
        "instock_outstock_indication": '',
        "stock_quantity": '',
        "item_discription": ''
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

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const __changeInputFields = (e) => {
        setFormFields({...formFields,[e.target.name]:e.target.value})
    }

    const __changeImage = (e) => {
       setFile(e.target.files[0])
       setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const __changeHsbImage = (e) => {
        sethsbFile(e.target.files[0])
        setHasbPreview(URL.createObjectURL(e.target.files[0]))
     }

    const  __handleSubmit = (e) =>{
        e.preventDefault();
        
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }

          setValidated(true);

        let formData = new FormData()
        
        formData.append("item_name", formFields?.item_name);
        formData.append("mesuring_qntty", mesuring_Qntty);
        formData.append("offer_percentage",formFields.offer_percentage)
        formData.append("item_mrp", formFields.item_mrp);
        formData.append("offer_price", formFields.offer_price);
        formData.append("item_catogory", category);
        formData.append("item_tags", formFields.item_tags);
        formData.append("instock_outstock_indication", stockIndicater);
        formData.append("stock_quantity", formFields.stock_quantity);
        formData.append("item_discription", formFields.item_discription);
        formData.append("item_image", file);
        formData.append("item_hsb", hsbFile);

        dispatch(create_item(formData)).then(res =>{
            if (res.success === true) {
                swal({
                    title: "Stock item created sucessfully...",
                    text: res.message,
                    icon: "success",
                    showConfirmButton: false,
                    button: (navigate('/')),
                  });
            } else {
                swal({
                    title: "Oops,Something went wrong!",
                    text: res.message,
                    icon: "error",
                  });
            }
        }).catch(err =>{
            console.log(err);
        })
    }

  return (
    <React.Fragment>
      <div className="d-flex align-items-center p-5">
        <Container>
          <Row>
            <Col md={12} className="d-flex align-items-center justify-content-center">
              <div className="card w-100 dashboard-card">
                <div className="card-body">
                  <Row>
                    <Col md={12}>
                      <h1 className="fw-bolder text-white mt-2 mb-3">
                        Add Item
                      </h1>
                    </Col>
                  </Row>
                  <Form noValidate validated={validated}>
                    <Row>
                        {/* <Col md={6}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Item code</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control type="number" placeholder="Enter item code" name="item_code" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required />
                                    <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                        Item code is required.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col> */}
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Item name</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control type="text" placeholder="Enter item name" name="item_name" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required/>
                                    <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                            Item name is required.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Mesuring qntty</Form.Label>
                                <select value={mesuring_Qntty} className="form-select form-control" onChange={(e) => setMesuring_Qntty(e.target.value)} >
                                    <option value='' disabled="disabled">Mesuring qntty</option>
                                    <option value="Kg" >Kg</option>
                                    <option value="Number" >Number</option>
                                    <option value="liter" >Liter</option>
                                    <option value="gram" >Gram</option>
                                </select>
                                {/* <InputGroup hasValidation>
                                    <Form.Control type="number" placeholder="Enter mesuring qntty" name="mesuring_qntty" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required/>
                                    <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                            Mesuring qntty is required.
                                    </Form.Control.Feedback>
                                </InputGroup> */}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Item price</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control type="number" placeholder="Enter item price" name="item_mrp" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required/>
                                    <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                            Item price is required.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className='text-white fw-semibold'>Offer price</Form.Label>
                                <Form.Control type="number" placeholder="Enter offer price" name="offer_price" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' />
                            </Form.Group>
                        </Col>
                        {/* <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className='text-white fw-semibold'>Offer Percentage</Form.Label>
                                <Form.Control type="number" placeholder="Enter offer percentage" name="offer_percentage" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' />
                            </Form.Group>
                        </Col> */}
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Item category</Form.Label>
                                {/* <InputGroup hasValidation>
                                    <Form.Control type="text" placeholder="Enter item category" name="item_catogory" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required/>
                                    <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                            Item category is required.
                                    </Form.Control.Feedback>
                                </InputGroup> */}
                                <select value={category} className="form-select form-control" onChange={(e) => setCategory(e.target.value)} >
                                    <option value='' disabled="disabled">Item category</option>
                                    {
                                         CategoryData.map((data)=>{
                                            return <option value={data.value} >{data.label}</option>
                                         })
                                    }
                                </select>
                                 {/* <Select 
                                    isMulti
                                    options={CategoryData} 
                                /> */}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Item tags</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control type="text" placeholder="Enter item tags" name="item_tags" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required/>
                                    <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                            Item tags is required.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Instock/outstock indication</Form.Label>
                                {/* <Form.Control type="number" placeholder="Enter instock/outstock indication" name="instock_outstock_indication" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' /> */}
                            
                                {/* <DropdownButton onSelect={(e) =>setStockIndicater(e.target.value)} value={stockIndicater}  title="Instock/outstock indication" className="Form-Control drop-down" id="input-group-dropdown-1">
                                    <Dropdown.Item eventKey="0">Yes</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="1">No</Dropdown.Item>
                                </DropdownButton> */}
                                <select value={stockIndicater} className="form-select form-control" onChange={(e) => setStockIndicater(e.target.value)} >
                                    <option value='' disabled="disabled">Instock/outstock indication</option>
                                    <option value="0" >Yes</option>
                                    <option value="1" >No</option>
                                </select>
    
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3"controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Stock quantity</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control type="number" placeholder="Enter stock quantity" name="stock_quantity" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required/>
                                    <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                        Stock quantity is required.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className='text-white fw-semibold'>Item discription</Form.Label>
                                <Form.Control as="textarea" rows={2} placeholder="Enter Item discription" name="item_discription" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' />
                            </Form.Group>
                        </Col>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label className='text-white fw-semibold'>Item HSB</Form.Label>
                                    <InputGroup hasValidation>
                                        {/* <Form.Control type="text" placeholder="Enter item HSB" name="item_hsb" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required/> */}
                                        <Form.Control type="file" accept="image/png, image/gif, image/jpeg" placeholder="Enter item image" onChange={(e)=>__changeHsbImage(e)} className='fw-semibold' required/>
                                        <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                                Item tags is required.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    {   (hsbPreview) &&
                                        <img src={hsbPreview} className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />
                                    }
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label className='text-white fw-semibold'>Item image</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="file" accept="image/png, image/gif, image/jpeg" placeholder="Enter item image" onChange={(e)=>__changeImage(e)} className='fw-semibold' required/>
                                        <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                                Item image is required.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    {   (preview) &&
                                        <img src={preview} className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Col className="d-flex align-items-center text-end justify-content-end">
                            <RenderButton 
                                variant={'primary'}
                                type={'submit'}
                                title={'Add'}
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
  );
};

export default ItemAdd;
