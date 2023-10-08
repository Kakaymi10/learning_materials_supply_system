import React, { useState } from "react";
import Modal from "react-modal";
import {
  Button,
  TextField,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./AvailableMaterials.css";

Modal.setAppElement("#root");

const AvailableMaterials = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    unitPrice: "",
    quantity: "",
    description: "",
    supplierEmail: "",
    date: new Date(),
    delivered: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    unitPrice: "",
    quantity: "",
    description: "",
    supplierEmail: "",
  });

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error message when the user starts typing again
    setErrors({ ...errors, [name]: "" });
  };

  const isFormValid = () => {
    const { name, unitPrice, quantity, description, supplierEmail } = formData;

    let formIsValid = true;

    // Validate Name
    if (name.trim() === "") {
      setErrors({ ...errors, name: "Name should be filled" });
      formIsValid = false;
    }

    // Validate Unit Price
    if (unitPrice.trim() === "") {
      setErrors({ ...errors, unitPrice: "Unit Price should be filled" });
      formIsValid = false;
    }

    // Validate Quantity
    if (quantity.trim() === "") {
      setErrors({ ...errors, quantity: "Quantity should be filled" });
      formIsValid = false;
    }

    // Validate Description
    if (description.trim() === "") {
      setErrors({ ...errors, description: "Description should be filled" });
      formIsValid = false;
    }

    // Validate Supplier Email
    if (supplierEmail.trim() === "") {
      setErrors({ ...errors, supplierEmail: "Supplier Email should be filled" });
      formIsValid = false;
    } else if (!supplierEmail.includes("@")) {
      setErrors({
        ...errors,
        supplierEmail: "Supplier Email should contain @",
      });
      formIsValid = false;
    }

    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const existingOrders =
        JSON.parse(localStorage.getItem("orders")) || [];
      const updatedOrders = [...existingOrders, formData];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      hideModal();
    }
  };

  return (
    <div className="ordering">
      <div className="av_header">
        <h2 className="av_subtitle">Order List</h2>
        <Button variant="contained" color="primary" onClick={showModal}>
          Order Material
        </Button>
      </div>
      <div>
        <Modal
          isOpen={modalVisible}
          onRequestClose={hideModal}
          contentLabel="Order Material"
          className="react-modal-content"
        >
          <DialogTitle className="orderTitle">Order Form</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                margin="normal"
              />
              <p className="error">{errors.name}</p>
              <TextField
                fullWidth
                label="Unit Price"
                id="unitPrice"
                name="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={handleChange}
                required
                margin="normal"
              />
              <p className="error">{errors.unitPrice}</p>
              <TextField
                fullWidth
                label="Quantity"
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
                margin="normal"
              />
              <p className="error">{errors.quantity}</p>
              <TextareaAutosize
                minRows={3}
                fullWidth
                placeholder="Description"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                margin="normal"
              />
              <p className="error">{errors.description}</p>
              <TextField
                fullWidth
                label="Supplier Email"
                id="supplierEmail"
                name="supplierEmail"
                type="email"
                value={formData.supplierEmail}
                onChange={handleChange}
                required
                margin="normal"
              />
              <p className="error">{errors.supplierEmail}</p>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Order
            </Button>
            <Button variant="contained" onClick={hideModal}>
              Close
            </Button>
          </DialogActions>
        </Modal>
      </div>
    </div>
  );
};

export default AvailableMaterials;
