import React, { useEffect, useState } from 'react';
import API from '../../utils/api'; // Adjust the import path as necessary

const MeasurementSummary = () => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const items = ['chest', 'waist', 'arms', 'shoulders'];

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const res = await API.get('/measurements/monthly-summary');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch measurements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, []);

  const calculateChange = (latest, previous) => {
    if (previous === 0 || previous === undefined || latest === undefined) return null;
    const diff = latest - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    const isPositive = diff >= 0;
    return { percent, isPositive };
  };

  return (
    <div className="mt-5">
      <h5 className="mb-3">Current Status</h5>
      <div className="row g-4">
        {items.map((item) => {
          let content;

          if (loading) {
            content = (
              <>
                <h6 className="text-muted text-capitalize">{item}</h6>
                <h4>Loading...</h4>
                <small className="text-muted">Please wait</small>
              </>
            );
          } else if (!data || !data.latest || data.latest[item] == null) {
            content = (
              <>
                <h6 className="text-muted text-capitalize">{item}</h6>
                <h5 className="text-muted">No data available</h5>
              </>
            );
          } else {
            const latest = data.latest[item];
            const prev = data.oneMonthAgo?.[item];
            const change = calculateChange(latest, prev);

            content = (
              <>
                <h6 className="text-muted text-capitalize">{item}</h6>
                <h4>{latest} {'cm'}</h4>
                {change && (
                  <small className={change.isPositive ? 'text-success' : 'text-danger'}>
                    {change.isPositive ? `+${change.percent}% ↑` : `${change.percent}% ↓`}
                  </small>
                )}
              </>
            );
          }

          return (
            <div className="col-md-3" key={item}>
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  {content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default MeasurementSummary;
