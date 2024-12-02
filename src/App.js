import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EnterpriseQuoteBuilder from './EnterpriseQuoteBuilder';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="p-4">
          <Routes>
            <Route path="/enterprise/quote-builder" element={<EnterpriseQuoteBuilder />} />

            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
