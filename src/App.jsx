import { useState, useRef } from 'react';
import { RotateCcw, Scan } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MedicineCard from './components/MedicineCard';
import PriceComparison from './components/PriceComparison';
import GenericAlternatives from './components/GenericAlternatives';
import { api } from './services/api';
import './App.css';

function App() {
  const [medicine, setMedicine]                   = useState(null);
  const [prices, setPrices]                       = useState([]);
  const [alternatives, setAlternatives]           = useState([]);
  const [loadingPrices, setLoadingPrices]         = useState(false);
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);
  const resultsRef = useRef(null);

  const handleMedicineIdentified = async (med) => {
    setMedicine(med);
    setPrices([]);
    setAlternatives([]);

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);

    setLoadingPrices(true);
    setLoadingAlternatives(true);

    // Prices
    try {
      const data = await api.getPrices(med.id);
      setPrices(data);
    } catch (err) {
      console.error('Price fetch failed:', err);
    } finally {
      setLoadingPrices(false);
    }

    // Alternatives
    try {
      const data = await api.getAlternatives(med.id);
      setAlternatives(data);
    } catch (err) {
      console.error('Alternatives fetch failed:', err);
    } finally {
      setLoadingAlternatives(false);
    }
  };

  const handleReset = () => {
    setMedicine(null);
    setPrices([]);
    setAlternatives([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar onReset={handleReset} />

      <HeroSection onMedicineIdentified={handleMedicineIdentified} />

      {medicine && (
        <section className="results-section" ref={resultsRef}>
          <div className="container results-container">

            {/* Results topbar */}
            <div className="results-topbar anim-in">
              <div>
                <div className="results-topbar-label">Results for</div>
                <div className="results-topbar-name">{medicine.brandName}</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={handleReset}>
                <RotateCcw size={14} />
                New Search
              </button>
            </div>

            <MedicineCard medicine={medicine} />
            <PriceComparison prices={prices} loading={loadingPrices} />
            <GenericAlternatives alternatives={alternatives} loading={loadingAlternatives} />

          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <div style={{width:24,height:24,background:'#06b6d4',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Scan size={13} color="#fff" />
            </div>
            <span className="footer-brand-name">Medi<span>Scan</span></span>
          </div>
          <p className="footer-text">Built with Spring Boot · Gemini AI · Redis · React</p>
          <p className="footer-disclaimer">Prices are indicative. Always verify on the pharmacy website.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
