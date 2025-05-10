import React, { useEffect, useState } from 'react';
import API from '../../utils/api';
import { Link } from 'react-router-dom';

const AnalysisSection = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await API.get('/measurements/latest-analysis');
        setAnalysis(res.data.analysis);
      } catch (err) {
        console.error('Failed to fetch analysis:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light text-primary d-flex justify-content-between align-items-center">
        <h5 className='mb-0 py-1'>Latest Body Analysis</h5>
        <p className="text-muted mb-0">{new Date().toLocaleDateString()}</p>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center text-muted">Loading...</div>
        ) : analysis ? (
          <>
            <div className="mb-4">
              <h6 className='mb-3 text-muted text-uppercase'>Focus Areas:</h6>
              <div className="d-flex flex-wrap gap-2">
                {analysis.focusAreas.map((area, i) => (
                  <span key={i} className="badge bg-primary text-white">{area}</span>
                ))}
              </div>
            </div>

            <h6 className='mb-3 text-muted text-uppercase'>Ratios vs Ideal:</h6>
            <div className="table-responsive mb-4">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Ratio</th>
                    <th>Actual</th>
                    <th>Ideal</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(analysis.currentRatios).map(([key, actual]) => {
                    const ideal = analysis.idealRatios?.[key];
                    return (
                      <tr key={key}>
                        <td className="text-capitalize">{key.replace(/([A-Z])/g, ' $1')}</td>
                        <td>
                          {Number(actual).toFixed(2)}{key.toLowerCase().includes('imbalance') ? ' cm' : ''}
                        </td>
                        <td>
                          {ideal ? Number(ideal).toFixed(2) + (key.toLowerCase().includes('imbalance') ? ' cm' : '') : '—'}
                        </td>
                      </tr>

                    );
                  })}
                </tbody>
              </table>
            </div>


            <div className="mt-4">
              <h6 className="mb-3 text-muted text-uppercase">Suggested Improvements</h6>
              <div className="d-flex flex-column gap-2">
                {analysis.suggestions.map((s, i) => (
                  <div key={i} className="d-flex align-items-start bg-light p-2 rounded shadow-sm">
                    <span className="me-2 text-success fs-5">✔️</span>
                    <span className="text-body">{s}</span>
                  </div>
                ))}
              </div>
            </div>

          </>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center text-muted">
            <p className="mb-3">No analysis data available.</p>
            <Link to={'/home/measurements'}>
              <button className="btn btn-outline-primary me-2">+ New Measurement</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalysisSection;