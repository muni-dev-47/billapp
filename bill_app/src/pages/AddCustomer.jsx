import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearInput, setFormInput, setUpdateFormData } from '../redux/inputSlice';
import { addCustomer, addNewCustomer, updateCustomer } from '../redux/customerSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let formData = useSelector(store => store.formData);

    useEffect(() => {
        if (location.state) {
            dispatch(setUpdateFormData({ ...location.state }));
        }
    }, [location.state, dispatch]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormInput({ name, value }))
    };

    const handleAddNewCustomer = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (!location.state) {
                // dispatch(addNewCustomer({ id: Date.now(), ...formData, balance: 0 }))
                dispatch(addCustomer({ id: Date.now(), ...formData, balance: 0 }))
            }
            else {
                dispatch(updateCustomer({ ...formData }))
            }
            dispatch(clearInput())
            navigate("/customerDetails")
        }
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData?.name?.trim()) newErrors.name = 'Customer name is required';
        if (!formData?.mobile?.trim()) newErrors.mobile = 'Mobile number is required';
        if (!formData?.shopName?.trim()) newErrors.shopName = 'shopName number is required';
        if (!formData?.address?.trim()) newErrors.address = 'address number is required';
        else if (!/^[6-9]\d{9}$/.test(formData?.mobile)) {
            newErrors.mobile = 'Invalid mobile number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        return () => dispatch(clearInput());
    }, [])

    return (
        <div className="container-fluid mt-3 px-2">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <form onSubmit={handleAddNewCustomer}>
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <div className="border p-3 rounded bg-light">
                                    <h6 className="fw-bold text-primary mb-3">
                                        <i className="bi bi-person me-2"></i>Basic Information
                                    </h6>
                                    <div className="mb-3">
                                        <label className="form-label">Customer Name*</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            name="name"
                                            value={formData?.name || ""}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mobile Number*</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                            name="mobile"
                                            value={formData?.mobile || ""}
                                            onChange={handleChange}
                                            placeholder="Enter 10-digit number"
                                        />
                                        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="border p-3 rounded bg-light">
                                    <h6 className="fw-bold text-primary mb-3">
                                        <i className="bi bi-shop me-2"></i>Business Information
                                    </h6>
                                    <div className="mb-3">
                                        <label className="form-label">Shop Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.shopName ? 'is-invalid' : ''}`}
                                            name="shopName"
                                            value={formData?.shopName || ""}
                                            onChange={handleChange}
                                            placeholder="Enter shop/business name"
                                        />
                                        {errors.shopName && <div className="invalid-feedback">{errors.shopName}</div>}

                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Shop Address</label>
                                        <textarea
                                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                            name="address"
                                            rows="3"
                                            value={formData?.address || ""}
                                            onChange={handleChange}
                                            placeholder="Enter complete address"
                                        ></textarea>
                                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row justify-content-end gap-3 mt-4 pt-2 border-top">
                            <div className="d-flex gap-2 order-1 order-md-2">
                                <button type="reset" className="btn btn-outline-secondary" onClick={() => dispatch(clearInput())}>
                                    <i className="bi bi-arrow-counterclockwise me-1"></i>Reset
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success px-4 py-2 fw-bold"
                                    style={{
                                        minWidth: '150px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <i className="bi bi-save me-2"></i>
                                    {location.state ? "Update Customer" : "Save Customer"}
                                    <span className="ps-2">
                                        {location.state ? <i className="bi bi-arrow-repeat"></i> : <i className="bi bi-check-lg"></i>}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;