import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBillItem, deleteBillItem, removeBillItems, setBillFormData, setEditFormData, setEditItems, updateBillItem } from '../redux/billSlice';
import { addSales, postSalesItem } from '../redux/customerSlice';

const Bill = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bill = useSelector(store => store.bill);
    const editFormData = bill?.editFormData || {};
    const billItems = bill?.billItems;
    const billData = bill?.billInputForm;
    const customerName = location.state?.name
    const customerContact = "+91 " + location?.state?.mobile ?? "";
    const id = location?.state?.id
    const [errors, setErrors] = useState({});
    const [editerrors, setEditErrors] = useState({})

    const nameRef = useRef();
    const priceRef = useRef();
    const countRef = useRef();

    const handleAddBillitem = () => {
        if (validateForm()) {
            dispatch(addBillItem())
            nameRef.current.focus();
        }
    }

    const [editingIndex, setEditingIndex] = useState(null);

    const handleUpdateItem = (index) => {
        setEditingIndex(index);
        dispatch(setEditItems({ ...billItems[index] }))
    };

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        dispatch(setEditFormData({ name, value }))
    }

    const handleSaveItem = (index) => {
        if (validateEditForm()) {
            dispatch(updateBillItem({ index }))
            setEditingIndex(null)
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null)
        dispatch(setEditFormData({}))
    }

    const handleDeleteItem = (index) => {
        dispatch(deleteBillItem({ index }))
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        dispatch(setBillFormData({ name, value }))
    }

    const handleSaveBill = () => {
        if (billItems?.length !== 0) { dispatch(postSalesItem({ id, billItems, date: new Date().toISOString() })) }
        navigate("/customerDetails")
    }

    const validateForm = () => {
        const newErrors = {};
        if (!billData?.itemName?.trim()) newErrors.itemName = 'Customer name is required';
        if (!billData?.itemPrice?.trim()) newErrors.itemPrice = 'Mobile number is required';
        if (!billData?.itemCount?.trim()) newErrors.itemCount = 'Mobile number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateEditForm = () => {
        const newErrors = {};
        console.log(editFormData)
        if (!editFormData?.itemName?.trim()) newErrors.itemName = 'Customer name is required';
        if (!editFormData?.itemPrice?.trim() || Number(editFormData?.itemPrice) <= 0) newErrors.itemPrice = 'Mobile number is required';
        if (!editFormData?.itemCount?.trim() || Number(editFormData?.itemCount) <= 0) newErrors.itemCount = 'Mobile number is required';
        setEditErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        return () => dispatch(removeBillItems())
    }, [])

    return (
        <div className="container-fluid mt-3 px-2">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <div className="row mb-4 g-3">
                        <div className="col-12 col-md-6">
                            <div className="border p-3 rounded bg-light">
                                <h6 className="fw-bold text-primary mb-3">
                                    <i className="bi bi-person me-2"></i>Customer Information
                                </h6>
                                <div className="mb-2">
                                    <label className="form-label text-muted small mb-1">Customer Name</label>
                                    <p className="fw-bold mb-0">{customerName}</p>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label text-muted small mb-1">Contact Number</label>
                                    <p className="fw-bold mb-0">{customerContact}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="border p-3 rounded bg-light">
                                <h6 className="fw-bold text-primary mb-3">
                                    <i className="bi bi-credit-card me-2"></i>Payment Details
                                </h6>
                                <div>
                                    <label className="form-label text-muted small mb-1">Date</label>
                                    <div>{new Date().toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="border p-3 rounded mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                        <h6 className="fw-bold text-primary mb-3">
                            <i className="bi bi-cart-plus me-2"></i>Add Items
                        </h6>
                        <div className="row g-2">
                            <div className="col-12 col-md-4">
                                <input type="text" ref={nameRef} className={`form-control ${errors?.itemName ? 'is-invalid' : ""} form-control-sm `} name='itemName' value={billData?.itemName || ""} placeholder="Item name" onChange={handleInput} onKeyDown={(e) => e.key === "Enter" ? priceRef.current.focus() : ""} />
                            </div>
                            <div className="col-6 col-md-2">
                                <input type="number" ref={priceRef} className={`form-control ${errors?.itemPrice ? 'is-invalid' : ""} form-control-sm `} name='itemPrice' value={billData?.itemPrice || ""} placeholder="Price (₹)" onChange={handleInput} onKeyDown={(e) => e.key === "Enter" ? countRef.current.focus() : ""} />
                            </div>
                            <div className="col-6 col-md-2">
                                <input type="number" ref={countRef} className={`form-control ${errors?.itemCount ? 'is-invalid' : ""} form-control-sm `} name='itemCount' value={billData?.itemCount || ""} placeholder="Qty" min="1" onChange={handleInput} onKeyDown={(e) => e.key === "Enter" ? handleAddBillitem() : ""} />
                            </div>
                            <div className="col-12 col-md-4">
                                <button className="btn btn-primary btn-sm w-100" onClick={handleAddBillitem}>
                                    <i className="bi bi-plus-circle me-1"></i>Add Item
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive mb-4">
                        <table className="table table-bordered table-hover mb-0">
                            <thead className="table-primary">
                                <tr>
                                    <th width="5%" className="text-center">#</th>
                                    <th width="35%">Item Name</th>
                                    <th width="15%" className="text-end">Price (₹)</th>
                                    <th width="10%" className="text-center">Qty</th>
                                    <th width="15%" className="text-end">Total (₹)</th>
                                    <th width="20%" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billItems?.map((val, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>

                                        {editingIndex === index ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${editerrors?.itemName ? 'is-invalid' : ""}`}
                                                        name='itemName'
                                                        value={editFormData?.itemName}
                                                        onChange={handleUpdate}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        name='itemPrice'
                                                        className={`form-control text-end ${editerrors?.itemPrice ? 'is-invalid' : ""}`}
                                                        value={editFormData?.itemPrice}
                                                        onChange={handleUpdate}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        name='itemCount'
                                                        className={`form-control text-center ${editerrors?.itemCount ? 'is-invalid' : ""}`}
                                                        value={editFormData?.itemCount}
                                                        onChange={handleUpdate}
                                                    />
                                                </td>
                                                <td className="text-end">
                                                    {(editFormData?.itemPrice * editFormData?.itemCount).toFixed(2)}
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => handleSaveItem(index)}
                                                            title="Save"
                                                        >
                                                            <i className="bi bi-check-lg"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-secondary"
                                                            onClick={handleCancelEdit}
                                                            title="Cancel"
                                                        >
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{val?.itemName}</td>
                                                <td className="text-end">{Number(val?.itemPrice).toFixed(2)}</td>
                                                <td className="text-center">{val?.itemCount}</td>
                                                <td className="text-end">
                                                    {(val?.itemPrice * val?.itemCount).toFixed(2)}
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleUpdateItem(index)}
                                                            title="Edit item"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteItem(index)}
                                                            title="Remove item"
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot className="table-group-divider">
                                <tr>
                                    <td colSpan="4" className="text-end fw-bold">Subtotal</td>
                                    <td className="text-end fw-bold">{billItems?.reduce((sum, val) => sum + val?.itemPrice * val?.itemCount, 0)}</td>
                                    <td></td>
                                </tr>
                                <tr className="table-active">
                                    <td colSpan="4" className="text-end fw-bold fs-5">Grand Total</td>
                                    <td className="text-end fw-bold fs-5">{billItems?.reduce((sum, val) => sum + val?.itemPrice * val?.itemCount, 0)}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4 pt-2 border-top">
                        <div className="d-flex gap-2 order-2 order-md-1">
                            <button className="btn btn-outline-danger" onClick={() => dispatch(removeBillItems())}>
                                <i className="bi bi-trash me-1"></i>Clear All
                            </button>
                            <button className="btn btn-outline-dark" onClick={() => navigate("/customerDetails")}>
                                <i className="bi bi-x-circle me-1"></i>Cancel
                            </button>
                        </div>
                        <div className="d-flex gap-2 order-1 order-md-2">
                            <button className="btn btn-success" onClick={() => handleSaveBill()}>
                                <i className="bi bi-save me-1"></i>Save Bill
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bill;
