import { Pill, FlaskConical, Factory, Package, CheckCircle2 } from 'lucide-react';
import './MedicineCard.css';

export default function MedicineCard({ medicine }) {
  if (!medicine) return null;

  const details = [
    medicine.genericName   && { label: 'Generic Name',      value: medicine.genericName,      icon: <Pill size={14}/> },
    medicine.saltComposition && { label: 'Salt Composition', value: medicine.saltComposition,  icon: <FlaskConical size={14}/> },
    medicine.manufacturer  && { label: 'Manufacturer',      value: medicine.manufacturer,     icon: <Factory size={14}/> },
    medicine.dosage        && { label: 'Dosage / Form',      value: medicine.dosage,           icon: <Package size={14}/> },
  ].filter(Boolean);

  return (
    <div className="medicine-card anim-up">
      <div className="med-card-top">
        <div className="med-icon">
          <Pill size={20} />
        </div>
        <div className="med-title-group">
          <div className="med-brand">{medicine.brandName}</div>
          {medicine.genericName && (
            <div className="med-generic">{medicine.genericName}</div>
          )}
        </div>
        <div className="med-identified-badge">
          <CheckCircle2 size={12} />
          Identified
        </div>
      </div>

      {details.length > 0 && (
        <div className="med-details">
          {details.map((d, i) => (
            <div key={i} className="med-detail">
              <div className="med-detail-label">{d.label}</div>
              <div className="med-detail-value">{d.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
