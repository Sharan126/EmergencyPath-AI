import React, { useState, useEffect } from 'react';
import './HospitalsPage.css';
import SmartSearch from '../components/hospitals/SmartSearch';
import HospitalListPanel from '../components/hospitals/HospitalListPanel';
import HospitalMap from '../components/hospitals/HospitalMap';
import LiveStatusPanel from '../components/hospitals/LiveStatusPanel';
import HospitalDetailsModal from '../components/hospitals/HospitalDetailsModal';
import { hospitalService } from '../services/hospitalService';
import { useHospitalSocket } from '../hooks/useHospitalSocket';
import toast from 'react-hot-toast';

const HospitalsPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const { liveStatus, alerts } = useHospitalSocket();

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      const data = await hospitalService.getHospitals();
      setHospitals(data);
    } catch (err) {
      toast.error('Failed to load hospitals');
    }
  };

  const handleSearch = async (query) => {
    try {
      const data = await hospitalService.searchHospitals(query);
      setHospitals(data);
    } catch (err) {
      toast.error('Search failed');
    }
  };

  const handleFilter = async (filters) => {
    try {
      const data = await hospitalService.filterHospitals(filters);
      setHospitals(data);
    } catch (err) {
      toast.error('Filter failed');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const updatedHospital = await hospitalService.toggleFavorite(id);
      setHospitals(hospitals.map(h => h.id === id ? updatedHospital : h));
      if (updatedHospital.isFavorite) {
        toast.success(`${updatedHospital.name} added to favorites`);
      } else {
        toast.success(`${updatedHospital.name} removed from favorites`);
      }
    } catch (err) {
      toast.error('Failed to update favorite status');
    }
  };

  return (
    <>
      <div className="hospitals-grid">
        <div className="h-left-col">
          <SmartSearch onSearch={handleSearch} onFilter={handleFilter} />
          <HospitalListPanel 
            hospitals={hospitals} 
            onSelectHospital={setSelectedHospital} 
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className="h-center-col">
          <HospitalMap 
            hospitals={hospitals} 
            selectedHospital={selectedHospital} 
            onSelectHospital={setSelectedHospital} 
          />
        </div>
        <div className="h-right-col">
          <LiveStatusPanel liveStatus={liveStatus} alerts={alerts} />
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
