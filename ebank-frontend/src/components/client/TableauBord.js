import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../api/axios';
import { FiCreditCard, FiTrendingUp, FiTrendingDown, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import './TableauBord.css';

function TableauBord() {
  const [data, setData] = useState(null);
  const [selectedRib, setSelectedRib] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('account');

  const fetchTableauBord = useCallback(async () => {
    try {
      const params = {
        page: currentPage,
        size: 10
      };
      if (selectedRib) {
        params.rib = selectedRib;
      }

      const response = await axios.get('/client/tableau-bord', { params });
      setData(response.data);

      if (!selectedRib && response.data.compteActif) {
        setSelectedRib(response.data.compteActif.rib);
      }
    } catch (err) {
      setError('Erreur lors du chargement du tableau de bord');
    } finally {
      setLoading(false);
    }
  }, [selectedRib, currentPage]);

  useEffect(() => {
    fetchTableauBord();
  }, [fetchTableauBord]);

  const handleAccountChange = (rib) => {
    setSelectedRib(rib);
    setCurrentPage(0);
  };

  const getOperationIcon = (type) => {
    return type === 'CREDIT' ? (
      <FiTrendingUp className="transaction-icon credit" />
    ) : (
      <FiTrendingDown className="transaction-icon debit" />
    );
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  if (!data || !data.compteActif) {
    return (
      <div className="card">
        <div className="empty-state">
          <FiCreditCard size={48} />
          <p>Aucun compte bancaire disponible</p>
        </div>
      </div>
    );
  }

  // Calculate total balance from all accounts
  const totalBalance = data.comptes?.reduce((sum, compte) => sum + compte.solde, 0) || data.compteActif.solde;

  return (
    <div className="modern-dashboard-content">
      {/* Promotional Banner */}
      <div className="promo-banner">
        <div className="promo-content">
          <h2 className="promo-title">
            Accès illimité <strong>à tout moment, n'importe où</strong> avec eBank.
          </h2>
        </div>
        <div className="promo-illustration">
          <FiCreditCard size={120} />
        </div>
      </div>

      {/* Account Balances Section */}
      <div className="balance-section">
        <div className="balance-tabs">
          <button 
            className={`balance-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            Compte
          </button>
        </div>

        <div className="balance-display">
          <div className="total-balance">
            <span className="balance-label">Solde total</span>
            <span className="balance-amount">{totalBalance.toLocaleString('fr-FR')} MAD</span>
          </div>
        </div>

        {/* Account Cards */}
        <div className="account-cards">
          {data.comptes && data.comptes.length > 0 ? (
            data.comptes.map((compte) => (
              <div 
                key={compte.rib} 
                className={`account-card ${selectedRib === compte.rib ? 'active' : ''}`}
                onClick={() => handleAccountChange(compte.rib)}
              >
                <div className="account-card-header">
                  <div className="account-icon">
                    <FiCreditCard />
                  </div>
                  <div className="account-info">
                    <div className="account-label">Compte bancaire</div>
                    <div className="account-rib">{compte.rib}</div>
                  </div>
                </div>
                <div className="account-balance">
                  {compte.solde.toLocaleString('fr-FR')} MAD
                </div>
                <div className="account-status">
                  <span className={`status-badge ${compte.statut.toLowerCase()}`}>
                    {compte.statut}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="account-card active">
              <div className="account-card-header">
                <div className="account-icon">
                  <FiCreditCard />
                </div>
                <div className="account-info">
                  <div className="account-label">Compte bancaire</div>
                  <div className="account-rib">{data.compteActif.rib}</div>
                </div>
              </div>
              <div className="account-balance">
                {data.compteActif.solde.toLocaleString('fr-FR')} MAD
              </div>
              <div className="account-status">
                <span className={`status-badge ${data.compteActif.statut.toLowerCase()}`}>
                  {data.compteActif.statut}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <div className="section-header">
          <h3 className="section-title">Opérations récentes</h3>
          <button className="see-all-btn">
            Voir tout <FiArrowRight />
          </button>
        </div>

        <div className="transactions-list">
          {data.derniersOperations && data.derniersOperations.length > 0 ? (
            <>
              {data.derniersOperations.map((op) => {
                const opDate = new Date(op.dateOperation);
                const isToday = opDate.toDateString() === new Date().toDateString();
                const dateLabel = isToday 
                  ? `Aujourd'hui, ${opDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`
                  : opDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

                return (
                  <div key={op.id} className="transaction-item">
                    <div className="transaction-icon-wrapper">
                      {getOperationIcon(op.type)}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-main">
                        <span className="transaction-title">{op.intitule}</span>
                        <span className={`transaction-amount ${op.type === 'CREDIT' ? 'credit' : 'debit'}`}>
                          {op.type === 'CREDIT' ? '+' : '-'}{op.montant.toLocaleString('fr-FR')} MAD
                        </span>
                      </div>
                      <div className="transaction-meta">
                        <span className="transaction-date">{dateLabel}</span>
                        {op.motif && (
                          <span className="transaction-motive">{op.motif}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                  >
                    <FiChevronLeft />
                  </button>
                  <span className="pagination-info">
                    Page {currentPage + 1} sur {data.totalPages}
                  </span>
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(p => Math.min(data.totalPages - 1, p + 1))}
                    disabled={currentPage === data.totalPages - 1}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-transactions">
              <p>Aucune opération enregistrée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableauBord;