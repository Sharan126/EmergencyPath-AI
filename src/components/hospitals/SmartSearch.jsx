import React from 'react';
import { Search, MapPin, Stethoscope, AlertTriangle, Filter } from 'lucide-react';
import './SmartSearch.css';

const SmartSearch = () => {
  return (
    <div className="card smart-search-container">
      <div className="search-header">
        <h2 className="section-title">SMART HOSPITAL SEARCH</h2>
        <button className="btn btn-outline filter-btn">
          <Filter size={16} />
          Filters
        </button>
      </div>

      <div className="search-inputs">
        <div className="search-input-wrapper main-search">
          <Search className="input-icon" size={18} />
          <input type="text" placeholder="Search hospital name or keywords..." className="search-input" />
        </div>
        
        <div className="search-filters-row">
          <div className="search-input-wrapper">
            <MapPin className="input-icon" size={16} />
            <select className="search-select">
              <option value="">Any Location</option>
              <option value="north">North Zone</option>
              <option value="south">South Zone</option>
              <option value="east">East Zone</option>
              <option value="west">West Zone</option>
            </select>
          </div>
          
          <div className="search-input-wrapper">
            <Stethoscope className="input-icon" size={16} />
            <select className="search-select">
              <option value="">Any Specialty</option>
              <option value="cardio">Cardiology</option>
              <option value="neuro">Neurology</option>
              <option value="burns">Burn Center</option>
              <option value="trauma">Trauma Support</option>
            </select>
          </div>

          <div className="search-input-wrapper">
            <AlertTriangle className="input-icon text-amber-500" size={16} />
            <select className="search-select">
              <option value="">Emergency Type</option>
              <option value="accident">Accident / Trauma</option>
              <option value="stroke">Stroke</option>
              <option value="heart">Heart Attack</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSearch;
