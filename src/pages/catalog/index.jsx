import React, { useState, useEffect } from 'react'
import { 
  Button, 
  Col, 
  Label, 
  Row, 
  Navbar, 
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink 
} from 'reactstrap'
import axios from 'axios';
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import './style.scss'

const productApiURL = process.env.REACT_APP_PRODUCT_API_URL;

const Catalog = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const getData = async () => {
    await axios.get(`${productApiURL}`)
      .then((res) => {
        setData(res.data)
      })
      .catch(err => alert(err))
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="catalog-container">
      <div>
        <Navbar
          color="light"
          expand="md"
          light
        >
          <NavbarBrand href="/">
            SuperShop
          </NavbarBrand>
          <NavbarToggler 
            className="me-2" 
            onClick={() => { setIsOpen(!isOpen) }} 
          />
          <Collapse isOpen={isOpen} navbar>
            <Nav
              className="me-auto"
              navbar
            >
              <NavItem>
                <NavLink href="http://localhost:3000">
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="http://localhost:3000/catalog">
                  Catalog
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <div className="catalog-pages">
      <Row>
        {data.map((row, idx) => (
          <Col key={idx} sm={12} md={4}>
            <div className="card">
              <Row>
                <img
                  src={`https://loremflickr.com/390/200/${row.name}`} width={390} height={200} alt={idx} />
              </Row>
              <Row>
                <Label className="label-name">{row.name}</Label>
              </Row>
              <Row>
                <Label className="label-price"> {`$ ${row.price}`}</Label>
              </Row>
              <div className="m-2">
                <Button className="btn-add"> + Add To Card </Button>
              </div>
            </div>
          </Col>
        ))
        }
      </Row>
    </div >
    <footer className="footer">
          <h4 class="d-flex justify-content-center">Follow our sosial media</h4>
          <div class="simbol d-flex justify-content-center">
            <a className="simbol" href="#">
                <FaFacebookSquare />
            </a>
            <a className="simbol" href="#">
                <FaInstagram />
            </a>
          </div>
          <p class="d-flex justify-content-center"> 
          copyright 2022. Miniproject from Dibimbing.
        </p>
        </footer>
    </div>
  )
}

export default Catalog;