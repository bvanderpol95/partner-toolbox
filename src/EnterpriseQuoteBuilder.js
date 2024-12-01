import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


// Helper functions
const formatWithCommas = (num) => (!num ? '' : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
const parseNumber = (num) => parseInt(num.replace(/,/g, ''), 10) || 0;

// Tiers data
const tiers = [
  { label: 'Tier 1', min: 500000, max: 4999999, pricePer1000: 6, inclusive: 500000 },
  { label: 'Tier 2', min: 5000000, max: 10000000, pricePer1000: 4, inclusive: 5000000 },
  { label: 'Tier 3', min: 10000001, max: 50000000, pricePer1000: 2.75, inclusive: 10000000 },
  { label: 'Tier 4', min: 50000001, max: 200000000, pricePer1000: 1.25, inclusive: 50000000 },
];

// Additional service costs
const additionalServiceCosts = {
  core: 0,
  engagement: 4200,
  lostAndFound: 1800,
  customerConnection: 7800,
  integratedWarranty: 72000,
};
const additionalServicesData = [
  { id: 'core', name: 'Core', price: 0, alwaysEnabled: true },
  { id: 'engagement', name: 'Engagement', price: 35000, badge: 'Popular', badgeColor: 'blue' },
  { id: 'customerConnection', name: 'Customer Connection', price: 65000, badge: 'High Value', badgeColor: 'purple' },
  { id: 'lostAndFound', name: 'Lost & Found', price: 15000},
  { id: 'integratedWarranty', name: 'Integrated Warranty & Service', price: 72000},
];




const EnterpriseQuoteBuilder = () => {
  const [idCount, setIdCount] = useState(500000);
  
  const [isYearly, setIsYearly] = useState(false); // Default to yearly 
  const [additionalServices, setAdditionalServices] = useState({
    engagement: false,
    lostAndFound: false,
    customerConnection: false,
  });

  // Set the document title
  useEffect(() => {
    document.title = 'Tappr - Enterprise Calculator';
  }, []); // Empty dependency array ensures this runs only once on mount

  const currentTier = tiers.find((tier) => idCount >= tier.min && idCount <= tier.max);

  const mapSliderToIdCount = (sliderValue) => {
    const tierWidth = 25; // Each tier occupies 25%
    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i];
      const startPercent = i * tierWidth;
      const endPercent = startPercent + tierWidth;
      if (sliderValue >= startPercent && sliderValue <= endPercent) {
        const relativePercent = (sliderValue - startPercent) / tierWidth;
        return Math.round(tier.min + relativePercent * (tier.max - tier.min));
      }
    }
    return tiers[tiers.length - 1].max;
  };

  const mapIdCountToSlider = (idCount) => {
    const tierWidth = 25;
    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i];
      if (idCount >= tier.min && idCount <= tier.max) {
        const relativePosition = (idCount - tier.min) / (tier.max - tier.min);
        return i * tierWidth + relativePosition * tierWidth;
      }
    }
    return 100;
  };

  const calculatePlatformFee = () => {
    const baseFee = 16788;
  
   const applicableTiers = tiers.filter((tier) => idCount >= tier.min);
  
    return baseFee * applicableTiers.length;
  };
  
  

  const calculateVariableFee = () => {
    let remainingVolume = idCount;
    return tiers.reduce((total, tier) => {
      if (remainingVolume <= 0) return total;
  
      // Calculate tier volume
      const tierVolume = Math.min(
        remainingVolume,
        tier.max - tier.min + (idCount >= tier.min && idCount <= tier.max ? tier.inclusive : 0)
      );
  
      // Subtract the tier volume from the remaining volume
      remainingVolume -= tierVolume;
  
      // Add to total cost
      return total + (tierVolume / 1000) * tier.pricePer1000;
    }, 0);
  };
  

  const calculateTotalCost = () => {
    const platformFee = calculatePlatformFee();
    const variableFee = calculateVariableFee();
    const additionalServiceFee = Object.keys(additionalServices).reduce(
      (total, key) => (additionalServices[key] ? total + additionalServiceCosts[key] : total),
      0
    );
    return { platformFee, variableFee, additionalServiceFee, totalCost: platformFee + variableFee + additionalServiceFee };
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTable = () => setIsExpanded((prev) => !prev);
  // Define the total cost upfront
  
  const { platformFee, variableFee, additionalServiceFee, totalCost } = calculateTotalCost();

  const totalSubscriptionCost = Math.floor(platformFee) + 
                  Math.floor(((idCount - (currentTier?.min || 0)) / 1000) * (currentTier?.pricePer1000 || 0)) + 
                  Math.floor(additionalServiceFee);

  React.useEffect(() => {
    setIdCount(500000); // Set initial value to 500,000
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 relative overflow-visible">
      {/* Left Section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-lg font-semibold mb-4">Customize Your Plan</h1>
        

       {/* Slider Section */}
       <div className="mb-6 relative">
       <div className="flex justify-between items-center mb-2">
  <label className="text-lg font-semibold">Expected Volume:</label>
  <button
    onClick={toggleTable}
    className="text-sm text-blue-500 bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600"
  >
    {isExpanded ? 'Hide Tiers' : 'Display Tiers Pricing'}
  </button>
</div>


  {/* Input Field */}
  <input
    type="text"
    value={formatWithCommas(idCount)}
    onChange={(e) => setIdCount(parseNumber(e.target.value))}
    onBlur={() => {
      if (idCount < 500000 || idCount > 200000000) {
        alert('Please enter a value between 500,000 and 200,000,000');
        setIdCount(Math.min(Math.max(500000, idCount), 200000000));
      }
    }}
    className="p-2 w-full mb-2 rounded bg-gray-700 text-white"
  />

  {/* Tier Labels */}
  <div className="relative mt-4">
    <div className="flex justify-between text-gray-300 text-sm">
      {tiers.map((tier, index) => (
        <span
          key={index}
          className={`absolute transform -translate-x-1/2 ${
            idCount >= tier.min && idCount <= tier.max ? 'text-blue-500 font-bold' : ''
          }`}
          style={{
            left: `${(index * 25) + 12.5}%`,
          }}
        >
          {tier.label}
        </span>
      ))}
    </div>
  </div>

  {/* Slider */}
  <div className="mt-4">
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      value={mapIdCountToSlider(idCount)}
      onChange={(e) => setIdCount(mapSliderToIdCount(parseInt(e.target.value, 10)))}
      className="w-full"
    />
  </div>

  {/* Slider Markers */}
  <div className="flex justify-between mt-2 text-gray-300 text-sm">
    <span>500K</span>
    <span>5M</span>
    <span>10M</span>
    <span>50M</span>
    <span>200M</span>
  </div>

  <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">

  {isExpanded && ( // Conditionally render the table
    <table className="w-full text-sm text-gray-300 mt-4">
      <thead>
        <tr>
          <th className="text-left pb-2">Tier</th>
          <th className="text-left pb-2">Volume Range</th>
          <th className="text-left pb-2">Price per 1,000 IDs</th>
        </tr>
      </thead>
      <tbody>
        {tiers.map((tier, index) => (
          <tr
            key={index}
            className={`${
              idCount >= tier.min && idCount <= tier.max ? 'bg-blue-700 text-white' : ''
            }`}
          >
            <td className="py-1">{tier.label}</td>
            <td className="py-1">
              {formatWithCommas(tier.min)} - {formatWithCommas(tier.max)}
            </td>
            <td className="py-1">${tier.pricePer1000.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

</div>


<div>
  <h3 className="text-md font-semibold mb-4 text-white">Modules</h3>
  <div className="space-y-2"> {/* Reduced vertical spacing */}
    {additionalServicesData.map((service) => (
      <div
        key={service.id}
        className={`relative flex flex-col ${
          service.alwaysEnabled ? 'bg-blue-900' : 'bg-gray-800'
        } p-4 rounded-lg border border-gray-700 shadow-sm`}
        style={{ minHeight: '70px' }} // Adjust for multiline content
      >
        {/* Top Row: Module Name + Badge */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <span className="block font-bold text-white">{service.name}</span>
            {service.badge && (
              <span
                className={`ml-2 px-2 py-1 text-xs font-bold text-white rounded-full ${
                  service.badgeColor === 'blue'
                    ? 'bg-blue-500'
                    : service.badgeColor === 'green'
                    ? 'bg-green-500'
                    : service.badgeColor === 'purple'
                    ? 'bg-purple-500'
                    : 'bg-gray-500'
                }`}
              >
                {service.badge}
              </span>
            )}
          </div>

          {/* Toggle on the Right */}
          {!service.alwaysEnabled && (
            <div
              onClick={() =>
                setAdditionalServices((prev) => ({
                  ...prev,
                  [service.id]: !prev[service.id],
                }))
              }
              className={`w-10 h-5 flex items-center ${
                additionalServices[service.id] ? 'bg-blue-600' : 'bg-gray-500'
              } rounded-full p-1 cursor-pointer`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  additionalServices[service.id] ? 'translate-x-5' : ''
                }`}
              ></div>
            </div>
          )}
        </div>

        {/* Bottom Row: Pricing */}
        <div className="text-sm text-gray-300">
          {service.price === 0 ? 'Included' : `$${service.price / 100} / month`}
        </div>
      </div>
    ))}
  </div>
</div>









      </div>

      {/* Right Section */}
      <div className="bg-[#F0F6FF] p-6 rounded-lg text-gray-900 z-10" id="quote-overview">
      <div className="flex justify-between items-center mb-6">
  <h2 className="text-xl font-bold">Pricing Overview</h2>
  <button
    onClick={() => setIsYearly(!isYearly)}
    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
  >
    {isYearly ? 'Switch to Monthly' : 'Switch to Yearly'}
  </button>
</div>

        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Platform License</h3>
            <p className="text-sm text-gray-600">
   Core - {currentTier?.label || 'Tier 1'}
</p>
            <ul className="mt-2 text-gray-600 text-sm">
              <li>- Includes {formatWithCommas(currentTier?.inclusive || 500000)} IDs</li>
              <li>- Brand Cloud & Passport Builder</li>
              <li>- 5x8 support SLA with phone & e-mail</li>
            </ul>
          </div>
          <div className="flex items-center">
          <p className="text-xl font-bold text-gray-800">
  ${formatWithCommas(isYearly ? platformFee : Math.floor(platformFee / 12))}
</p>
<span className="text-sm text-gray-600 ml-2">{isYearly ? 'per year' : 'per month'}</span>

          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4">
  <div>
    <h3 className="text-lg font-semibold mb-2">Usage Fee</h3>
    <p className="text-gray-600 text-sm">
      {formatWithCommas(idCount - currentTier?.min || 0)} IDs at $
      {currentTier?.pricePer1000.toFixed(2)} per 1,000
    </p>
  </div>
  <div className="flex items-center">
  <p className="text-xl font-bold text-gray-800">
  ${formatWithCommas(
    isYearly
      ? Math.floor((idCount - currentTier?.min || 0) / 1000 * currentTier?.pricePer1000)
      : Math.floor(((idCount - currentTier?.min || 0) / 1000 * currentTier?.pricePer1000) / 12)
  )}
</p>
<span className="text-sm text-gray-600 ml-2">{isYearly ? 'per year' : 'per month'}</span>

  </div>
</div>
<div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start mb-4">
  <div>
    <h3 className="text-lg font-semibold mb-2">Additional Modules</h3>
    {Object.keys(additionalServices).filter((key) => additionalServices[key]).length > 0 ? (
      <ul className="list-disc list-inside text-gray-600 text-sm">
        {Object.keys(additionalServices)
          .filter((key) => additionalServices[key])
          .map((key) => {
            const service = additionalServicesData.find((service) => service.id === key);
            return (
              <li key={key} className="text-gray-800 font-regular">
                {service.name}
              </li>
            );
          })}
      </ul>
    ) : (
      <p className="text-gray-600 text-sm">No additional modules</p>
    )}
  </div>
  <div className="flex items-center">
    <p className="text-xl font-bold text-gray-800">
      ${formatWithCommas(isYearly ? additionalServiceFee : Math.floor(additionalServiceFee / 12))}
    </p>
    <span className="text-sm text-gray-600 ml-2">{isYearly ? 'per year' : 'per month'}</span>
  </div>
</div>




<div className="bg-white shadow-md rounded-lg p-4">
  <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>

  {/* ${formatWithCommas(
    isYearly
      ? false
      : false
  )}*/}

  

  {/* Total Cost */}
<div className="flex items-center justify-between mb-2">
  <span className="text-gray-600">Subscription Fee:</span>
  <div className="flex items-baseline">
    <span className="text-gray-800 font-bold">
      ${formatWithCommas(isYearly ? Math.ceil(totalSubscriptionCost) : Math.ceil(totalSubscriptionCost / 12))}
    </span>
    <span className="text-sm text-gray-600 ml-2">
      {isYearly ? 'per year' : 'per month'}
    </span>
  </div>
</div>

  {/* Price per 1000 */}
  <div className="flex items-center justify-between mb-2">
  <span className="text-gray-600">Price per 1,000 IDs:</span>
  <div className="flex items-baseline">
  <span className="text-gray-800 font-bold">
      ${(Math.ceil(totalSubscriptionCost / (idCount/1000)) )}
    </span>
    <span className="text-sm text-gray-600 ml-2">
     per 1,000
    </span>
  </div>
</div>

</div>

      </div>
    </div>
  );
};
const generatePDF = async () => {
  const quoteElement = document.getElementById('quote-overview');
  const canvas = await html2canvas(quoteElement, { scale: 2 }); // High-res capture
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save('quote.pdf');
};


export default EnterpriseQuoteBuilder;
