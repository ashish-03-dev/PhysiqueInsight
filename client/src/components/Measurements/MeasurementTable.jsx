import { useEffect, useState } from "react";

export default function MeasurementTable({measurements, loading}) {

  return (
    <div className="container mt-5" style={{ maxWidth: "1000px" }}>
      <h2 className="mb-4 text-center">Your Measurement History</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : measurements.length === 0 ? (
        <p className="text-center">No measurements saved yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>Height</th>
                <th>Shoulders</th>
                <th>Chest</th>
                <th>Waist</th>
                <th>Torso</th>
                <th>Legs</th>
                <th>Biceps (L/R)</th>
                <th>Forearms (L/R)</th>
                <th>Thighs (L/R)</th>
                <th>Calves (L/R)</th>
                <th>Arm Span</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m, idx) => {
                const meas = m.measurements;
                return (
                  <tr key={idx}>
                    <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td>{meas.height} cm</td>
                    <td>{meas.shoulderWidth} cm</td>
                    <td>{meas.chestCircumference} cm</td>
                    <td>{meas.waistCircumference} cm</td>
                    <td>{meas.torsoLength} cm</td>
                    <td>{meas.legLength} cm</td>
                    <td>{meas.bicepCircumferenceLeft} / {meas.bicepCircumferenceRight} cm</td>
                    <td>{meas.forearmCircumferenceLeft} / {meas.forearmCircumferenceRight} cm</td>
                    <td>{meas.thighCircumferenceLeft} / {meas.thighCircumferenceRight} cm</td>
                    <td>{meas.calfCircumferenceLeft} / {meas.calfCircumferenceRight} cm</td>
                    <td>{meas.armSpan} cm</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
