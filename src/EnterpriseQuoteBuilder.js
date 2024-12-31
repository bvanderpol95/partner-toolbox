import React, { useState, useEffect } from 'react';

const formatWithCommas = (num) => (!num ? '' : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
const parseNumber = (num) => parseInt(num.replace(/,/g, ''), 10) || 0;

const tiers = [
  { label: 'Tier 1', min: 0, max: 499999, pricePer1000: 4.5, inclusive: 0, price: 13188 },
  { label: 'Tier 2', min: 500000, max: 4999999, pricePer1000: 3.25, inclusive: 500000, price: 17188},
  { label: 'Tier 3', min: 5000000, max: 10000000, pricePer1000: 1.75, inclusive: 5000000, price: 31813},
  { label: 'Tier 4', min: 10000001, max: 50000000, pricePer1000: 1.25, inclusive: 10000000, price: 38813},
  { label: 'Tier 5', min: 50000001, max: 200000000, pricePer1000: 0.5, inclusive: 50000000, price: 88813},
];

const integrationData = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    type: 'Advanced',
    price: 500,
    link: 'https://www.salesforce.com',
    logo: 'https://a.sfdcstatic.com/shared/images/c360-nav/salesforce-with-type-logo.svg',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    type: 'Standard',
    price: 300,
    link: 'https://www.shopify.com',
    logo: 'https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png',
  },
  {
    id: 'zapier',
    name: 'Apparelmagic',
    type: 'Standard',
    price: 200,
    link: 'https://www.zapier.com',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1ShWcfh0R2JFD20tgmRxjGtI26g_Sj9SXA&s',
  },
  {
    "id": "fashionerp1",
    "name": "FashionERP 1",
    "type": "Advanced",
    "price": 500,
    "link": "https://www.fashionerp1.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "fashionerp2",
    "name": "FashionERP 2",
    "type": "Standard",
    "price": 300,
    "link": "https://www.fashionerp2.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "plmexpert",
    "name": "PLM Expert",
    "type": "Advanced",
    "price": 550,
    "link": "https://www.plmexpert.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "textilepro",
    "name": "Textile Pro",
    "type": "Standard",
    "price": 250,
    "link": "https://www.textilepro.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "garmentmaster",
    "name": "Garment Master",
    "type": "Standard",
    "price": 280,
    "link": "https://www.garmentmaster.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "plmmagic",
    "name": "PLM Magic",
    "type": "Advanced",
    "price": 450,
    "link": "https://www.plmmagic.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "stylemanager",
    "name": "Style Manager",
    "type": "Standard",
    "price": 320,
    "link": "https://www.stylemanager.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "fashionmaster",
    "name": "Fashion Master",
    "type": "Advanced",
    "price": 600,
    "link": "https://www.fashionmaster.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "garmenttracker",
    "name": "Garment Tracker",
    "type": "Standard",
    "price": 200,
    "link": "https://www.garmenttracker.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "textilesuite",
    "name": "Textile Suite",
    "type": "Advanced",
    "price": 520,
    "link": "https://www.textilesuite.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "supplytrace",
    "name": "Supply Trace",
    "type": "Standard",
    "price": 300,
    "link": "https://www.supplytrace.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "appareltrack",
    "name": "Apparel Track",
    "type": "Advanced",
    "price": 400,
    "link": "https://www.appareltrack.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "fashiontrace",
    "name": "Fashion Trace",
    "type": "Standard",
    "price": 220,
    "link": "https://www.fashiontrace.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "designhub",
    "name": "Design Hub",
    "type": "Advanced",
    "price": 470,
    "link": "https://www.designhub.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "fashionsync",
    "name": "Fashion Sync",
    "type": "Standard",
    "price": 280,
    "link": "https://www.fashionsync.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "plmflow",
    "name": "PLM Flow",
    "type": "Advanced",
    "price": 480,
    "link": "https://www.plmflow.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "stitchsuite",
    "name": "Stitch Suite",
    "type": "Standard",
    "price": 240,
    "link": "https://www.stitchsuite.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "materialsync",
    "name": "Material Sync",
    "type": "Advanced",
    "price": 420,
    "link": "https://www.materialsync.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "productionflow",
    "name": "Production Flow",
    "type": "Standard",
    "price": 260,
    "link": "https://www.productionflow.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "garmentlink",
    "name": "Garment Link",
    "type": "Advanced",
    "price": 510,
    "link": "https://www.garmentlink.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "plmpro",
    "name": "PLM Pro",
    "type": "Standard",
    "price": 270,
    "link": "https://www.plmpro.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "supplychain",
    "name": "Supply Chain",
    "type": "Advanced",
    "price": 490,
    "link": "https://www.supplychain.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
  {
    "id": "textiledesign",
    "name": "Textile Design",
    "type": "Standard",
    "price": 300,
    "link": "https://www.textiledesign.com",
    "logo": "https://cdn.prod.website-files.com/63ae6f1bb966f5c640b170b9/661a3347d72d6cda33fa66d8_Logo%20Main.svg"
  },
];

const additionalServicesData = [
  { id: 'core', name: 'Core', price: 0, alwaysEnabled: true },
  { id: 'customerConnection', name: 'Consumer Connection', price: 249, badge: 'Popular', badgeColor: 'blue' },
  { id: 'brandProtection', name: 'Brand Protection', price: 199, badge: 'Security', badgeColor: 'purple' },
  { id: 'circularity', name: 'Circularity', price: 179 },
  { id: 'integratedWarranty', name: 'Integrated Warranty', price: 149 },
  { id: 'lostAndFound', name: 'Lost & Found', price: 89 },
];

const EnterpriseQuoteBuilder = () => {

  const [selectedIntegrations, setSelectedIntegrations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All'); // Filter state for integrations
  const [searchQuery, setSearchQuery] = useState(''); // Search state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const integrationsPerPage = 15; // Number of integrations per page

  const toggleIntegration = (id) => {
    setSelectedIntegrations((prev) =>
      prev.includes(id) ? prev.filter((integration) => integration !== id) : [...prev, id]
    );
  };

  const calculateIntegrationFee = () => {
    return selectedIntegrations.reduce((total, id) => {
      const integration = integrationData.find((int) => int.id === id);
      return total + (integration ? integration.price : 0);
    }, 0);
  };
  const [idCount, setIdCount] = useState(0);
  const [isYearly, setIsYearly] = useState(false);
  const [currency, setCurrency] = useState('€');
  const [additionalServices, setAdditionalServices] = useState({
    customerConnection: false,
    brandProtection: false,
    circularity: false,
    integratedWarranty: false,
    lostAndFound: false,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredIntegrations = integrationData.filter((integration) => {
    if (filter === 'All') return true;
    return integration.type === filter;
  });

  const totalPages = Math.ceil(filteredIntegrations.length / integrationsPerPage);
  const displayedIntegrations = filteredIntegrations.slice(
    (currentPage - 1) * integrationsPerPage,
    currentPage * integrationsPerPage
  );

  // Move the configuration state into the component
  const [configuration, setConfiguration] = useState({
    multiLanguage: false, // true/false option
    customDomain: 0,  // true/false option
    additionalBrands: 0,  // numeric input
  });

  useEffect(() => {
    document.title = 'Tappr - Enterprise Calculator';
    setIdCount(1000000);
  }, []);

  const configurationOptions = [
    { id: 'multiLanguage', name: 'Multilanguage support', price: 75, type: 'boolean' },
    { id: 'customDomain', name: 'Custom Domain', price: 50, type: 'number' },
    { id: 'additionalBrands', name: 'Additional Brands', price: 50, type: 'number' },
  ];

  const currentTier = tiers.find((tier) => idCount >= tier.min && idCount <= tier.max);

  const mapSliderToIdCount = (sliderValue) => {
    const tierWidth = 20;
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
    const tierWidth = 20;
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
    const applicableTier = tiers.find((tier) => idCount >= tier.min && idCount <= tier.max);
  
    // If no tier matches, return 0
    if (!applicableTier) return 0;
  
    // Return the price for the matched tier
    return isYearly ? applicableTier.price : Math.ceil(applicableTier.price);
  };
  

  const calculateVariableFee = () => {
    let remainingVolume = idCount;
    return tiers.reduce((total, tier) => {
      if (remainingVolume <= 0) return total;
      const tierVolume = Math.min(
        remainingVolume,
        tier.max - tier.min + (idCount >= tier.min && idCount <= tier.max ? tier.inclusive : 0)
      );
      remainingVolume -= tierVolume;
      return total + (tierVolume / 1000) * tier.pricePer1000;
    }, 0);
  };

  const calculateTotalCost = () => {
    const platformFee = calculatePlatformFee();
    const variableFee = calculateVariableFee();
    const integrationFee = calculateIntegrationFee();
    const additionalServiceFee = Object.keys(additionalServices).reduce(
      (total, key) => {
        const service = additionalServicesData.find((s) => s.id === key);
        if (!service) return total;

        if (service.isPerUnit) {
          return total + additionalServices[key] * service.price;
        }
        return additionalServices[key] ? total + service.price : total;
      },
      0
    );

    const configurationFee = configurationOptions.reduce((total, option) => {
      if (option.type === 'boolean') {
        return total + (configuration[option.id] ? option.price : 0);
      }
      if (option.type === 'number') {
        return total + configuration[option.id] * option.price;
      }
      return total;
    }, 0);

    return {
      platformFee,
      variableFee,
      additionalServiceFee,
      configurationFee,
      totalCost: platformFee + variableFee + additionalServiceFee + configurationFee + integrationFee,
    };
  };

// At the top, where you destructure costs
const { platformFee, variableFee, additionalServiceFee, configurationFee, totalCost } = calculateTotalCost();

  const totalSubscriptionCost = Math.floor(platformFee / 12) +
    Math.floor((((idCount - (currentTier?.min || 0)) / 1000) * (currentTier?.pricePer1000 || 0)) / 12) +
    Math.floor(additionalServiceFee) + Math.floor(configurationFee);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 relative overflow-visible">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Customize Your Plan</h1>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-gray-700 text-white rounded px-2 py-1"
          >
            <option value="€">EUR (€)</option>
            <option value="$">USD ($)</option>
          </select>
        </div>

        <div className="mb-6 relative">
          <div className="flex justify-between items-center mb-2">
            <label className="text-lg font-semibold">Expected Volume:</label>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-white-500 bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600"
            >
              {isExpanded ? 'Hide Tiered Pricing' : 'Display Tiered Pricing'}
            </button>
          </div>

          <input
            type="text"
            value={formatWithCommas(idCount)}
            onChange={(e) => setIdCount(parseNumber(e.target.value))}
            onBlur={(e) => {
              if (idCount < 0 || idCount > 200000000) {
                setIdCount(Math.min(Math.max(0, idCount), 200000000));
              }
            }}
            className="p-2 w-full mb-2 rounded bg-gray-700 text-white"
          />

          <div className="relative mt-4">
            <div className="flex justify-between text-gray-300 text-sm">
              {tiers.map((tier, index) => (
                <span
                  key={index}
                  className={`absolute transform -translate-x-1/2 ${
                    idCount >= tier.min && idCount <= tier.max ? 'text-blue-500 font-bold' : ''
                  }`}
                  style={{ left: `${index * 20 + 10}%` }}
                >
                  {tier.label}
                </span>
              ))}
            </div>
          </div>

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

          <div className="flex justify-between mt-2 text-gray-300 text-sm">
            <span>0</span>
            <span>500K</span>
            <span>5M</span>
            <span>10M</span>
            <span>50M</span>
            <span>200M</span>
          </div>

          <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
            {isExpanded && (
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
                      <td className="py-1">{currency}{tier.pricePer1000.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

<div>
  <h3 className="text-md font-semibold mb-4 text-white">Configuration</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {configurationOptions.map((option) => (
    <div
      key={option.id}
      className="relative flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm hover:border-blue-500 transition-colors"
    >
      <div className="flex flex-col">
        <span className="block font-bold text-white">{option.name}</span>
        <span className="text-sm text-gray-400">
          {currency}{formatWithCommas(option.price)} {option.type === 'boolean' ? '/month' : '/unit'}
        </span>
      </div>
      {option.type === 'boolean' ? (
        <div
          onClick={() =>
            setConfiguration((prev) => ({
              ...prev,
              [option.id]: !prev[option.id],
            }))
          }
          className={`w-10 h-5 flex items-center ${
            configuration[option.id] ? 'bg-blue-600' : 'bg-gray-500'
          } rounded-full p-1 cursor-pointer`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              configuration[option.id] ? 'translate-x-5' : ''
            }`}
          ></div>
        </div>
      ) : (
        <input
          type="text"
          value={configuration[option.id] || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setConfiguration((prev) => ({
                ...prev,
                [option.id]: value === '' ? 0 : parseInt(value, 10),
              }));
            }
          }}
          onBlur={(e) => {
            if (e.target.value === '') {
              setConfiguration((prev) => ({
                ...prev,
                additionalBrands: 0,
              }));
            }
          }}
          className="w-16 p-1 rounded bg-gray-700 text-white text-right appearance-none"
          style={{ MozAppearance: 'textfield' }}
        />
      )}
    </div>
  ))}
</div>

</div>

{/* Integrations Section */}
<div className="mt-8">
  <h3 className="text-md font-semibold mb-4 text-white">Integrations</h3>
  <div className="space-y-2">
    {[
      ...integrationData.filter((int) => selectedIntegrations.includes(int.id)), // Selected integrations
      ...integrationData.filter((int) => !selectedIntegrations.includes(int.id)), // Non-selected integrations
    ]
      .slice(0, 3) // Show only the first 3 integrations
      .map((integration) => (
        <div
          key={integration.id}
          className="relative bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm hover:border-blue-500 transition-colors flex items-center"
        >
          <img
            src={integration.logo}
            alt={integration.name}
            className="w-12 h-12 mr-4 rounded"
          />
          <div className="flex-grow">
            <h4 className="font-bold text-white">{integration.name}</h4>
            <p className="text-sm text-gray-400">{integration.type}</p>
            <p className="text-sm text-gray-400 mt-1">
              {currency}{formatWithCommas(integration.price)} {isYearly ? '/year' : '/month'}
            </p>
          </div>
          <div
            onClick={() => toggleIntegration(integration.id)}
            className={`w-10 h-5 flex ${
              selectedIntegrations.includes(integration.id) ? 'bg-blue-600' : 'bg-gray-500'
            } rounded-full p-0.5 cursor-pointer`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
                selectedIntegrations.includes(integration.id) ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>
      ))}
  </div>
  <div className="text-right mb-4">
    <button
      onClick={() => setShowModal(true)}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
    >
      View All Integrations
    </button>
  </div>
</div>

    {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
    <div className="bg-gray-900 w-11/12 md:w-2/3 lg:w-3/4 p-6 rounded-lg relative">
      {/* Close Button (Red X) */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-red-500 text-2xl font-bold hover:text-red-700 transition"
      >
        &times;
      </button>

      {/* Modal Header with Search */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 text-white">All Integrations</h2>
        <input
          type="text"
          placeholder="Search integrations..."
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Integration List (Grid View) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {displayedIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg hover:border-blue-500 border border-gray-700 transition"
          >
            <img
              src={integration.logo}
              alt={integration.name}
              className="w-16 h-16 mx-auto mb-4 rounded"
            />
            <h4 className="text-center text-white font-bold">{integration.name}</h4>
            <p className="text-center text-gray-400 text-sm">{integration.type}</p>
            <p className="text-center text-gray-400 text-sm mt-2">
              {currency}{formatWithCommas(integration.price)} {isYearly ? '/year' : '/month'}
            </p>
            <button
              onClick={() => toggleIntegration(integration.id)}
              className={`mt-4 w-full py-2 text-sm font-bold text-white rounded ${
                selectedIntegrations.includes(integration.id)
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {selectedIntegrations.includes(integration.id) ? 'Remove' : 'Add'}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  </div>
)}

<div className="mt-8">
    <h3 className="text-md font-semibold mb-4 text-white">Modules</h3>
    <div className="space-y-2">
      {additionalServicesData.map((service) => (
        <div
          key={service.id}
          className={`relative ${
            service.alwaysEnabled ? 'bg-blue-900' : 'bg-gray-800'
          } p-4 rounded-lg border border-gray-700 shadow-sm hover:border-blue-500 transition-colors`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{service.name}</span>
                  {service.badge && (
                    <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${
                      service.badgeColor === 'blue' ? 'bg-blue-500' : 
                      service.badgeColor === 'purple' ? 'bg-purple-500' : 'bg-gray-500'
                    }`}>
                      {service.badge}
                    </span>
                  )}
                </div>
                {!service.alwaysEnabled && (
                  <span className="text-sm text-gray-400 mt-1 block">
                    {currency}{formatWithCommas(isYearly ? service.price * 12 : service.price)}
                    {isYearly ? '/year' : '/month'}
                  </span>
                )}
              </div>
            </div>

            {!service.alwaysEnabled && service.id !== 'additionalBrands' && (
  <div
    onClick={() => setAdditionalServices(prev => ({...prev, [service.id]: !prev[service.id]}))}
    className={`w-10 h-5 flex ${
      additionalServices[service.id] ? 'bg-blue-600' : 'bg-gray-500'
    } rounded-full p-0.5 cursor-pointer`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
      additionalServices[service.id] ? 'translate-x-5' : 'translate-x-0'
    }`} />
  </div>
)}
          </div>

          {service.id === 'additionalBrands' && (
            <div className="flex items-center mt-2 justify-between">
              <label htmlFor="additionalBrandsInput" className="text-gray-300">
                Number of Additional Brands:
              </label>
              <input
                id="additionalBrandsInput"
                type="text"
                value={additionalServices.additionalBrands || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setAdditionalServices((prev) => ({
                      ...prev,
                      additionalBrands: value === '' ? 0 : parseInt(value, 10),
                    }));
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === '') {
                    setAdditionalServices((prev) => ({
                      ...prev,
                      additionalBrands: 0,
                    }));
                  }
                }}
                className="w-16 p-1 rounded bg-gray-700 text-white text-right appearance-none"
                style={{ MozAppearance: 'textfield' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
</div>


      </div>

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
              <li>- Includes {formatWithCommas(currentTier?.inclusive || 0)} IDs</li>
              <li>- Brand Cloud & Passport Builder</li>
              <li>- 5x8 support SLA with phone & e-mail</li>
            </ul>
          </div>
          <div className="flex items-center">
            <p className="text-xl font-bold text-gray-800">
              {currency}{formatWithCommas(isYearly ? platformFee : Math.floor(platformFee / 12))}
            </p>
            <span className="text-sm text-gray-600 ml-2">{isYearly ? 'per year' : 'per month'}</span>
          </div>
        </div>

        

        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Workload Fee</h3>
            <p className="text-gray-600 text-sm">
              {formatWithCommas(idCount - currentTier?.min || 0)} IDs at {currency}
              {currentTier?.pricePer1000.toFixed(2)} per 1,000
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-xl font-bold text-gray-800">
              {currency}{formatWithCommas(
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
    <h3 className="text-lg font-semibold mb-2">Configuration Options</h3>
    {configurationOptions.some((option) => configuration[option.id]) || configuration.additionalBrands > 0 ? (
      <ul className="list-disc list-inside text-gray-600 text-sm">
        {configurationOptions.map((option) => {
          if (option.type === 'boolean' && configuration[option.id]) {
            return (
              <li key={option.id} className="text-gray-800 font-regular">
                {option.name} at {currency}{formatWithCommas(option.price)}
                {isYearly ? ' per year' : ' per month'}
              </li>
            );
          }
          if (option.type === 'number' && configuration[option.id] > 0) {
            return (
              <li key={option.id} className="text-gray-800 font-regular">
                {option.name}: {configuration[option.id]} x {currency}{option.price}
              </li>
            );
          }
          return null;
        })}
      </ul>
    ) : (
      <p className="text-gray-600 text-sm">No additional configurations</p>
    )}
  </div>
  <div className="flex items-center">
    <p className="text-xl font-bold text-gray-800">
      {currency}{formatWithCommas(isYearly ? configurationFee * 12 : configurationFee)}
    </p>
    <span className="text-sm text-gray-600 ml-2">
      {isYearly ? 'per year' : 'per month'}
    </span>
  </div>
</div>
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start mb-4">
          <div> 
            <h3 className="text-lg font-semibold mb-2">Modules</h3>
            {Object.keys(additionalServices).some((key) => additionalServices[key]) ? (
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {Object.keys(additionalServices)
                  .filter((key) => additionalServices[key] && key !== 'additionalBrands')
                  .map((key) => {
                    const service = additionalServicesData.find((service) => service.id === key);
                    return (
                      <li key={key} className="text-gray-800 font-regular">
                        <span className="text-sm text-gray-600 ml-2">
                        {service.name} at {currency}{formatWithCommas(service.price)} {isYearly ? 'per year' : 'per month'}</span>
                      </li>
                    );
                  })}
                {additionalServices.additionalBrands > 0 && (
                  <li className="text-gray-800 font-regular">
                    Additional Brands: {additionalServices.additionalBrands} x {currency}50
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">No additional modules</p>
            )}
          </div>
          <div className="flex items-center">
            <p className="text-xl font-bold text-gray-800">
              {currency}{formatWithCommas(isYearly ? additionalServiceFee * 12 : additionalServiceFee)}
            </p>
            <span className="text-sm text-gray-600 ml-2">{isYearly ? 'per year' : 'per month'}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>

          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Subscription Fee:</span>
            <div className="flex items-baseline">
              <span className="text-gray-800 font-bold">
                {currency}{formatWithCommas(isYearly ? Math.ceil(totalSubscriptionCost * 12) : Math.ceil(totalSubscriptionCost))}
              </span>
              <span className="text-sm text-gray-600 ml-2">
                {isYearly ? 'per year' : 'per month'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Price per 1,000 IDs:</span>
            <div className="flex items-baseline">
              <span className="text-gray-800 font-bold">
                {currency}{(totalSubscriptionCost * 12 / (idCount / 1000)).toFixed(2)}
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

export default EnterpriseQuoteBuilder;