import  React, {useState, useEffect } from 'react'
import { 
  Row, 
  Col,
  Navbar, 
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink  
} from 'reactstrap'
import Login from './login'
import Signup from './register'
import { useNavigate } from 'react-router-dom'
import './style.scss';

const AuthPages = () => {
  const navigate = useNavigate()
  const [currentContainer, setCurrentContainer] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // cek jika user sudah terotentikasi
    let isAuth = localStorage.getItem('access_token')
    if (isAuth) {
      //arahkan user kembali ke dashboard jika sudah login
      navigate({ pathname: './dashboard' }) 
    }
  }, [navigate])

  return (
    <div>   
      <div className={`auth-pages`}>
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
            {/* <Button color="danger" onClick={() => handleLogout()} >  Logout </Button> */}
          </Collapse>
        </Navbar>
      <Row>
        <Col md="12" lg="12">
          <div className="card-auth-page">
              <div className={`card-inner`}>
                {
                  currentContainer ?
                    <div className={`card-register `}>
                      <h3>Sign up</h3>
                      <Signup setCurrentContainer={setCurrentContainer} />
                      <button className="btn-chang-container" onClick={() => setCurrentContainer(false)}> Sudah punya Akun?</button>
                    </div> :
                    <div className={`card-login`}>
                      <h3>Login</h3>
                      <Login />
                      <button className="btn-chang-container"  onClick={() => setCurrentContainer(true)}>Daftar</button>
                    </div>
                }
              </div>
          </div>
        </Col>
      </Row>
    </div>
    </div>  
  )
}

export default AuthPages;