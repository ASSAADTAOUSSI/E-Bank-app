import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import DashboardHeader from '../components/common/DashboardHeader';
import TableauBord from '../components/client/TableauBord';
import NouveauVirement from '../components/client/NouveauVirement';
import { FiHome, FiSend } from 'react-icons/fi';
import './ModernDashboard.css';

function ClientDashboard() {
  const navItems = [
    { path: '/client/tableau-bord', label: 'Tableau de bord', icon: <FiHome />, exact: true },
    { path: '/client/virement', label: 'Nouveau virement', icon: <FiSend />, exact: false }
  ];

  return (
    <div className="modern-dashboard">
      <Sidebar navItems={navItems} userRole="CLIENT" />
      
      <div className="dashboard-main">
        <DashboardHeader showSendButton={true} />
        
        <main className="dashboard-content-wrapper">
          <Routes>
            <Route path="/" element={<TableauBord />} />
            <Route path="/tableau-bord" element={<TableauBord />} />
            <Route path="/virement" element={<NouveauVirement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default ClientDashboard;