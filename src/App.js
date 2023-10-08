import React, { useState } from 'react';
import BannerPage from './BannerPage'; // Import the BannerPage component
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Modal,
  Paper,
} from '@mui/material';
import AvailableMaterials from './components/AvailableMaterials';
import OrderDisplay from './components/OrderDisplay';
import './App.css'; // Import a CSS file for custom styles

const App = () => {
  const [reportData, setReportData] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [userName, setUserName] = useState(() => {
    // Initialize userName with the value from local storage if it exists
    const storedName = localStorage.getItem('userName');
    return storedName || '';
  });

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  const handleGenerateReport = () => {
    // Implement the logic to generate a report here
    // For example, fetch data from local storage
    const itemsInLocalStorage = JSON.parse(localStorage.getItem('orders')) || [];

    // Filter items with delivered status as true
    const deliveredItems = itemsInLocalStorage.filter(item => item.delivered);

    // Create a report with the filtered items, including total cost
    const report = deliveredItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalCost: item.quantity * item.unitPrice,
      date: item.date,
    }));

    // Set the report data in state
    setReportData(report);

    // Open the report modal
    setIsReportModalOpen(true);
  };

  const handlePrintReport = () => {
    // Implement the logic to print the report here
    // You can use the window.print() method to trigger the browser's print dialog
    window.print();
  };

  return (
    <div>
      {userName ? ( // Render the main content if userName is set
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Your Supplies Made Easy
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleGenerateReport}>
                Generate Report
              </Button>
            </Toolbar>
          </AppBar>
          <Container>
            <Box mt={3}>
              <AvailableMaterials />
            </Box>
            <Box mt={3}>
              <OrderDisplay />
            </Box>
          </Container>

          {/* Report Modal */}
          <Modal open={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} className='report-modal'>
            <Paper>
              <Box p={2}>
                <Typography variant="h5" gutterBottom>
                  Delivered Items Report
                </Typography>
                {reportData && (
                  <div>
                    <table className="report-table">
                      <thead>
                        <tr>
                          <th className="header-cell">Item Name</th>
                          <th className="header-cell">Quantity</th>
                          <th className="header-cell">Unit Price</th>
                          <th className="header-cell">Total Cost</th>
                          <th className="header-cell">Date</th>
                          {/* Add more table headers for additional item properties */}
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((item, index) => (
                          <tr key={index}>
                            <td className="name-cell">{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.totalCost}</td>
                            <td>{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Button variant="contained" color="primary" onClick={handlePrintReport}>
                      Print Report
                    </Button>
                  </div>
                )}
              </Box>
            </Paper>
          </Modal>
        </div>
      ) : (
        // Render the BannerPage component if userName is not set
        <BannerPage onNameSubmit={handleNameSubmit} />
      )}
    </div>
  );
};

export default App;