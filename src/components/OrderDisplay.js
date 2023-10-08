import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Select, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import './orderDisplay.css';

function OrderDisplay() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // Initialize with 'all'

  useEffect(() => {
    // Retrieve orders from local storage
    const storedOrders = localStorage.getItem('orders');

    // Check if there are stored orders and if they are in the correct format
    if (storedOrders) {
      try {
        // Attempt to parse the JSON data
        const parsedOrders = JSON.parse(storedOrders);

        // Check if parsedOrders is an array
        if (Array.isArray(parsedOrders)) {
          setOrders(parsedOrders);
        } else {
          console.error('Stored orders are not in the expected array format.');
        }
      } catch (error) {
        console.error('Error parsing stored orders:', error);
      }
    } else {
      console.error('No orders found in local storage.');
    }
  }, [localStorage.getItem('orders')]);

  const handleAccordionClick = (index) => {
    // Create a copy of the orders array
    const updatedOrders = [...orders];

    // Toggle the expanded property for the clicked order
    updatedOrders[index].expanded = !updatedOrders[index].expanded;

    // Update the state with the modified orders
    setOrders(updatedOrders);
  };

  const markAsDelivered = (index) => {
    // Create a copy of the orders array
    const updatedOrders = [...orders];

    // Update the delivered property for the clicked order
    updatedOrders[index].delivered = true;

    // Update local storage with the modified orders
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Update the state with the modified orders
    setOrders(updatedOrders);
  };

  const deleteOrder = (index) => {
    // Create a copy of the orders array
    const updatedOrders = [...orders];

    // Remove the order at the specified index
    updatedOrders.splice(index, 1);

    // Update local storage with the modified orders
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Update the state with the modified orders
    setOrders(updatedOrders);
  };

  // Function to filter orders based on delivered status
  const filterOrders = () => {
    if (filterStatus === 'all') {
      return orders;
    } else {
      const isDelivered = filterStatus === 'true';
      return orders.filter((order) => order.delivered === isDelivered);
    }
  };

  const handleEditOrder = (index) => {
    // Implement the logic to edit the order here, e.g., open a modal for editing
    // You can use state to store the data of the order being edited and display it in a modal.
    // Here, we'll simply log a message.
    console.log('Edit order clicked for index:', index);
  };

  return (
    <div>
      <div className='filter'>
        <h4 className='filtitle'>Filter by:</h4>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='select'
        >
          <MenuItem value="all">All Orders</MenuItem>
          <MenuItem value="true">Delivered</MenuItem>
          <MenuItem value="false">Not Delivered</MenuItem>
        </Select>
      </div>
      {filterOrders().map((order, index) => (
        <Accordion key={index} expanded={order.expanded} className='title'>
          <AccordionSummary
            expandIcon={<KeyboardArrowDownIcon />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
            onClick={() => {
              handleAccordionClick(index);
            }}
            className="custom-accordion-header"
          >
            <Typography variant="subtitle1" className={order.delivered ? 'custom-accordion-text' : 'not-custom-accordion-text'}>
              {order.name}
            </Typography>
            {order.delivered ? (
              <Button
                variant="outlined"
                color="primary"
                className='delivered'
              >
                Delivered
              </Button>
            ) : (
              <div>
                <Button
                variant="outlined"
                color="primary"
                className='Notdelivered'
                onClick={() => {
                    markAsDelivered(index);
                  }}
              >
                MarkAsDelivered
              </Button>
                
              
                
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    deleteOrder(index); // Add a delete button with this function
                  }}
                >
                  <DeleteIcon /> {/* Display a delete icon */}
                </Button>
              </div>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography variant="body1"><span className='labels'>Material:</span> {order.name}</Typography>
              <Typography variant="body1"><span className='labels'>Unit Price:</span> {order.unitPrice}</Typography>
              <Typography variant="body1"><span className='labels'>Quantity:</span> {order.quantity}</Typography>
              <Typography variant="body1"><span className='labels'>Description:</span> {order.description}</Typography>
              <Typography variant="body1"><span className='labels'>Supplier Email:</span> {order.supplierEmail}</Typography>
              <Typography variant="body1"><span className='labels'>Date: </span>{order.date}</Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default OrderDisplay;
