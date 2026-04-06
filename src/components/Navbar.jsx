import { Scan } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onReset }) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <button className="brand" onClick={onReset} aria-label="Go to home">
          <div className="brand-icon">
            <Scan size={17} />
          </div>
          <span className="brand-name">Medi<em>Scan</em></span>
        </button>

      </div>
    </nav>
  );
}
