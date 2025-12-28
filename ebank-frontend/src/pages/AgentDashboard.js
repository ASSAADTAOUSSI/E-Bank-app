import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import DashboardHeader from '../components/common/DashboardHeader';
import CreateClient from '../components/agent/CreateClient';
import CreateAccount from '../components/agent/CreateAccount';
import ClientList from '../components/agent/ClientList';
import AccountList from '../components/agent/AccountList';
import { FiUsers, FiCreditCard, FiList, FiUserPlus } from 'react-icons/fi';
import './ModernDashboard.css';

function AgentDashboard() {
  const navItems = [
    { path: '/agent/clients', label: 'Clients', icon: <FiUsers />, exact: false },
    { path: '/agent/create-client', label: 'Nouveau client', icon: <FiUserPlus />, exact: false },
    { path: '/agent/accounts', label: 'Comptes', icon: <FiList />, exact: false },
    { path: '/agent/create-account', label: 'Nouveau compte', icon: <FiCreditCard />, exact: false }
  ];

  return (
    <div className="modern-dashboard">
      <Sidebar navItems={navItems} userRole="AGENT_GUICHET" />
      
      <div className="dashboard-main">
        <DashboardHeader showSendButton={false} />
        
        <main className="dashboard-content-wrapper">
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/create-client" element={<CreateClient />} />
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AgentDashboard;