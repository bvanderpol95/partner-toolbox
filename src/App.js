import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import EnterpriseQuoteBuilder from './EnterpriseQuoteBuilder';
import './index.css';

const App = () => {
  return (
    <BrowserRouter basename="/enterprise/quote-builder">
      <div className="bg-gray-900 text-white min-h-screen">
        <EnterpriseQuoteBuilder />
      </div>
    </BrowserRouter>
  );
};

export default App;
