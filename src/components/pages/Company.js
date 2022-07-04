import React from 'react';
import CompanyInfo from '../pages/CompanyInfo';
import LeftBar from '../layout/LeftBar';
import '../Home.css';
import HeaderLog from '../layout/HeaderLog';

function Company() {
  return (
    <div>
      <HeaderLog />
      <div className="container-home">
        <LeftBar />
        <div className="company-info">
          <CompanyInfo />
        </div>
      </div>
    </div>
  )
}

export default Company