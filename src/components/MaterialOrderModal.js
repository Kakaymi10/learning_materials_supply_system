import React, { useState } from 'react';
import Modal from 'react-modal';
import './modalOrder.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const MaterialOrderModal = ({ isOpen, closeModal, onSubmit }) => {
  const [materialName, setMaterialName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [supplierEmail, setSupplierEmail] = useState(''); // Add supplierEmail state

  const handleSubmit = () => {
    // Handle the form submission here and send the order details to a function
    const orderDetails = {
      materialName,
      unitPrice,
      quantity,
      description,
      supplierEmail,
    };
  
    // Store the order details in local storage
    localStorage.setItem('materialOrder', JSON.stringify(orderDetails));
  
    // Clear form fields
    setMaterialName('');
    setUnitPrice('');
    setQuantity('');
    setDescription('');
    setSupplierEmail('');
  
    // Close the modal
    closeModal();
  };
  

  return (
    <div className='modal'>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Material Order Modal"
      >
        <h2 className='orderTitle'>Order Material</h2>
        <form>
          <div>
            <label htmlFor="materialName">Material Name:</label>
            <input
              type="text"
              id="materialName"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="unitPrice">Unit Price:</label>
            <input
              type="number"
              id="unitPrice"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="supplierEmail">Supplier Email:</label>
            <input
              type="email" // Use type="email" for email input
              id="supplierEmail"
              value={supplierEmail}
              onChange={(e) => setSupplierEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MaterialOrderModal;
