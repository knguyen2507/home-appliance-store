import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
    GetProductById 
} from '../services/productAPI.js';

const title = "Product";

function Product (props) {
    const {id} = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProductById = async () => {
            const product = await GetProductById({id});
            setProduct(product);
        }
        getProductById();
    }, [])

    const itemImage = {
        width: "300px", 
        height: "auto",
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginBottom: "25px"
    };

    function CheckAvaiable (properties) {
        if (properties.qty === 0) return <p style={{color:"red", fontWeight: "bold"}}>Out Of Stock</p>
        return true
    };

    const btn_AddToCart = {
        backgroundColor: '#14A44D',
        color: "white",
        borderRadius: "5px",
        padding: "10px",
        textAlign: "center",
        width: "200px"
    };

    const btn_OutStock = {
        borderRadius: "5px",
        padding: "10px",
        textAlign: "center",
        width: "200px"
    };

    const addProductToCart = async () => {
        
    };

    function AddToCart() {
        return (
            <input style={btn_AddToCart} type="submit" value="ADD TO CART" onClick={addProductToCart} />
        )
    };

    function OutStock() {
        return (
            <input style={btn_OutStock} type="submit" value="OUT OF STOCK" />
        )
    };

    function StatusProduct(properties) {
        if (!localStorage.getItem('nameUser')) {
            return (
                <CheckAvaiable qty={properties.qty} />
            )
        }
        if (properties.qty === 0) {
            return (
                <OutStock />
            )
        }
        return (
            <AddToCart />
        )
    };

    return (
        <>
            <Navigation />
            <Container>
                <Row style={{marginTop: "25px", marginBottom: "25px"}}>
                    <Col sm={4}>
                        <div style={itemImage}>
                            <img width="300" height="300" src={'../images/' + product.idCategory + '/' + product.id + '.jpg'}></img>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div style={{textAlign: "left"}}>
                            <p><span style={{fontWeight: "bold"}}>PRODUCT NAME: </span>{product.name}</p>
                            <p><span style={{fontWeight: "bold"}}>CATEGORY: </span>{product.category}</p>
                            <p><span style={{fontWeight: "bold"}}>BRAND: </span>{product.brand}</p>
                            <p><span style={{fontWeight: "bold"}}>PRICE: </span>{product.price}</p>
                            <StatusProduct qty={product.qty} />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer brands={props.brands} categories={props.categories} />
        </>
    )
}

export default Product;