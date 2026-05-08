import React, { useState } from 'react';
import './HospitalsPage.css';
import SmartSearch from '../components/hospitals/SmartSearch';
import HospitalListPanel from '../components/hospitals/HospitalListPanel';
import HospitalMap from '../components/hospitals/HospitalMap';
import LiveStatusPanel from '../components/hospitals/LiveStatusPanel';
import HospitalDetailsModal from '../components/hospitals/HospitalDetailsModal';

const HospitalsPage = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  return (
    <>
      <div className="hospitals-grid">
        <div className="h-left-col">
          <SmartSearch />
          <HospitalListPanel onSelectHospital={setSelectedHospital} />
        </div>
        <div className="h-center-col">
          <HospitalMap onSelectHospital={setSelectedHospital} />
        </div>
        <div className="h-right-col">
          <LiveStatusPanel />
        </div>
      </div>

      {selectedHospital && (
        <HospitalDetailsModal 
          hospital={selectedHospital} 
          onClose={() => setSelectedHospital(null)} 
        />
      )}
    </>
  );
};

export default HospitalsPage;
