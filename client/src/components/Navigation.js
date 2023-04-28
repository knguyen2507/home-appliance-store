import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";

function Navigation () {
    const tag_p = {
        margin: "10px"
    };

    const [key, setKey] = useState('');

    function searchProducts() {
        if (key !== '') {
            let path = `/product/search?k=`+key; 
            window.location.href = path;
        }
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/" ><p style={tag_p} className="font-weight-bold fs-4">HOME</p></Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                        style={{marginTop:"2px"}}
                        value={key}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={e => setKey(e.target.value)}
                    />
                    <Button variant="light" size="sm" onClick={searchProducts}>SEARCH</Button>
                </Form>
                {localStorage.getItem('role') === 'Admin' &&
                <Nav className="justify-content-end">
                    <Nav.Link href="/admin-page"><p style={tag_p} className="font-weight-bold fs-4">ADMIN</p></Nav.Link>
                </Nav>
                }
                {!localStorage.getItem('nameUser') &&
                <Nav className="justify-content-end">
                    <Nav.Link href="/login"><p style={tag_p} className="font-weight-bold fs-4">SIGN IN</p></Nav.Link>
                    <Nav.Link href="/register"><p style={tag_p} className="font-weight-bold fs-4">SIGN UP</p></Nav.Link>
                </Nav>
                }
                {localStorage.getItem('nameUser') &&
                <Nav className="justify-content-end">
                    <Nav.Link href={`/user/${localStorage.getItem('idUser')}`}><p style={tag_p} className="font-weight-bold fs-4">{localStorage.getItem('nameUser').toUpperCase()}</p></Nav.Link>
                    <Nav.Link href="/logout"><p style={tag_p} className="font-weight-bold fs-4">SIGN OUT</p></Nav.Link>
                </Nav>
                }
            </Container>
        </Navbar>
    );
}

export default Navigation;