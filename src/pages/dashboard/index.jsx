import  {
    useState,
    useEffect
  } from "react";
  import {
    Button,
    Table,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
  import Modal from "../../component/Modal";
  import Form from "./form";
  import axios from "axios";
  import './style.scss'
  import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
  
  const productApiURL = process.env.REACT_APP_PRODUCT_API_URL;
  
  const Dashboard = () => {
  
    const [headers, setHeader] = useState([])
    const [data, setData] = useState([]);
    const [actionForm, setActionForm] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleCreate = () => {
      setActionForm("create");
      setModalVisible(true);
    }
  
    const handleDelete = async (id) => {
      await axios.delete(`${productApiURL}/${id}`)
      .then(() => {
        const updatedData = data.filter(v => id !== v.id);
        setData(updatedData)
      })
      .catch(err => alert(err))
    }
  
    const handleEdit = (id) => {
      setUpdateId(id)
      setActionForm("edit")
      setModalVisible(true)
    }
  
    const getData = async () => {
      await axios.get(`${productApiURL}`)
      .then(({data}) => {
        setData(data)
      })
      .catch(err => alert(err))
    }
  
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    useEffect(() => {
      const header = ['No', 'Name', 'Description', 'Price', 'Stock', 'Action']
      setHeader(header)
      getData()
    }, [])
  
    return (
      <div className="dashboard-container">
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
                  <NavLink href="#">
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="http://localhost:3000/catalog">
                    Catalog
                  </NavLink>
                </NavItem>
              </Nav>
              <Button color="danger" onClick={() => handleLogout()} >  Logout </Button>
            </Collapse>
          </Navbar>
        </div>
        <br />
        <div className="container">
          <h1> PRODUCT LIST </h1>
          <br />
          <Button color="primary" onClick={() => handleCreate()} > Add Product + </Button>
          <br /> <br />  <br />
          <div className="tabel">
            <Table bordered striped>
              <thead>
                <tr>
                  {headers.map((header, idx) => (
                    <th key={idx}>{header} </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    <th scope="row">
                      {idx + 1}
                    </th>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
                    <td>{row.price}</td>
                    <td>{row.stock}</td>
                    <td className="action">
                      <Button onClick={() => handleEdit(row.id)} > Edit</Button>
                        &nbsp;&nbsp;
                      <Button color="danger" onClick={() => handleDelete(row.id)} > Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
  
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
        
        {/* Modal Form */}
        <Modal
          title={`Form ${actionForm} Data`}
          isOpen={modalVisible}
          setOpen={setModalVisible}
          children={
            <Form
              action={actionForm}
              data={data}
              setModalVisible={setModalVisible}
              updateId={updateId}
            />
          }
        />
      </div>
    )
  }
  
  export default Dashboard;