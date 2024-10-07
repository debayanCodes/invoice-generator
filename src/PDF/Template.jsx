import ReactPrint from 'react-to-print';
import { useRef, useState } from 'react';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import './PdfTemplate.css';

function PdfTemplate(props) {
    const ref = useRef();
    const [openAirPopup, setAirPopup] = useState(false);
    const [Product, setProduct] = useState('');
    const [Quantity, setQuantity] = useState(0);
    const [Price, setPrice] = useState(0);
    const [List, setList] = useState([]);
    const [CustomerName, setCustomerName] = useState(props.customerName);
    const [Discount, setDiscount] = useState(0);

    const addData = () => {
        setList((prevList) => [...prevList, { product: Product, quantity: Quantity, price: Price, amount: Quantity * Price }]);
        setProduct('');
        setQuantity(0);
        setPrice(0);
        setAirPopup(false);
    };

    const calculateSum = () => {
        return List.reduce((acc, curr) => acc + curr.amount, 0);
    };

    const calculatePayableAmount = () => {
        return calculateSum() - (calculateSum() * Discount / 100);
    };

    return (
        <div>
            <div className="container" ref={ref}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4 barcode">
                                <Barcode
                                    value={`4n%${props.InvoiceNumber}+ut%`}
                                    width={1}
                                    height={50}
                                    displayValue={false}
                                />
                            </div>
                            <div className="col-md-8 text-right company-info">
                                <h4 style={{ color: '#325aa8' }}>
                                    <strong>Invoice Generator</strong>
                                </h4>
                                <p>(+91) 8777274644</p>
                                <p>debayan.paul07@gmail.com</p>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h2 style={{ color: '#325aa8' }}>INVOICE</h2>
                                <h5>Id: {props.InvoiceNumber}</h5>
                            </div>
                        </div>
                        <br />
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <h5>Products</h5>
                                        </th>
                                        <th>
                                            <h5>Quantity</h5>
                                        </th>
                                        <th>
                                            <h5>Price</h5>
                                        </th>
                                        <th>
                                            <h5>Amount</h5>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {List.map((items, index) => (
                                        <tr key={index}>
                                            <td className="col-md-3">{items.product}</td>
                                            <td className="col-md-2">{items.quantity}</td>
                                            <td className="col-md-3">
                                                <i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {items.price}
                                            </td>
                                            <td className="col-md-4">
                                                <i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {items.amount}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="text-right">
                                            <p>
                                                <strong>Total Amount:</strong>
                                            </p>
                                            <p>
                                                <strong>Discount ({Discount}%):</strong>
                                            </p>
                                            <p>
                                                <strong>Payable Amount:</strong>
                                            </p>
                                        </td>
                                        <td colSpan="3">
                                            <p>
                                                <strong>
                                                    <i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {calculateSum()}
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    <i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {calculateSum() * Discount / 100}
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    <i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {calculatePayableAmount()}
                                                </strong>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr style={{ color: '#F81D2D' }}>
                                        <td className="text-right">
                                            <h4>
                                                <strong>Total:</strong>
                                            </h4>
                                        </td>
                                        <td className="text-left">
                                            <h4>
                                                <strong>
                                                    <i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {calculatePayableAmount()}
                                                </strong>
                                            </h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h5>Bill To:</h5>
                                <h5>{CustomerName}</h5>
                                <h5>Date: {props.date}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="print-and-add-buttons">
                <ReactPrint
                    trigger={() => <button className="print-button">Print</button>}
                    content={() => ref.current}
                    documentTitle={`INVOICE ${props.InvoiceNumber}`}
                />

                <button className="add-button" onClick={() => setAirPopup(true)}>
                    Add Product
                </button>

                <div className="discount-input">
                    <label>Discount (%)</label>
                    <input
                        type="number"
                        value={Discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        min={0}
                        max={100}
                    />
                </div>
            </div>

            {/* POPUP OPEN */}
            <Dialog open={openAirPopup}>
                <DialogTitle>
                    <div className="title">
                        <div className="hed">New Product</div>
                        <div className="icon-cross" onClick={() => setAirPopup(false)}>
                            <Close />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="container">
                        <div className="forms">
                            <input
                                type="text"
                                value={Product}
                                onChange={(e) => setProduct(e.target.value)}
                                placeholder="Product Name"
                            />
                            <input
                                type="number"
                                value={Quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Quantity"
                            />
                            <input
                                type="number"
                                value={Price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price ₹"
                            />
                        </div>
                        <div className="buttons">
                            <button onClick={addData}>Add</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* POPUP CLOSED */}
        </div>
    );
}

export default PdfTemplate;