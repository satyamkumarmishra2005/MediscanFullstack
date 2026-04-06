import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Search, ArrowRight, Zap, Upload, ShieldCheck, Tags, ScanLine } from 'lucide-react';
import { api } from '../services/api';
import './HeroSection.css';

export default function HeroSection({ onMedicineIdentified }) {
  const [mode, setMode]       = useState('search');
  const [query, setQuery]     = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError]     = useState(null);

  const onDrop = useCallback(async (files) => {
    const file = files[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true);
    setError(null);
    try {
      const med = await api.identifyByImage(file);
      onMedicineIdentified(med);
    } catch {
      setError('Could not identify medicine from image. Try a clearer photo.');
    } finally {
      setLoading(false);
    }
  }, [onMedicineIdentified]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    disabled: loading,
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const med = await api.identifyByName(query.trim());
      onMedicineIdentified(med);
    } catch {
      setError('Medicine not found. Double-check the spelling and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero">
      <div className="container hero-inner">

        {/* Eyebrow */}
        <div className="hero-chip anim-up">
          <Zap size={12} />
          AI-Powered Price Comparison
        </div>

        {/* Heading */}
        <h1 className="hero-title anim-up d-1">
          Find the <span className="hero-title-accent">cheapest</span> price<br />
          for any medicine in India
        </h1>

        <p className="hero-sub anim-up d-2">
          Compare prices across 1mg, PharmEasy, Apollo & MedPlus.
          Discover generic alternatives and save up to 80%.
        </p>

        {/* Search card */}
        <div className="search-card anim-up d-3">

          {/* Tabs */}
          <div className="mode-tabs">
            <button
              className={`mode-tab ${mode === 'search' ? 'active' : ''}`}
              onClick={() => { setMode('search'); setError(null); }}
            >
              <Search size={15} />
              Type Name
            </button>
            <button
              className={`mode-tab ${mode === 'upload' ? 'active' : ''}`}
              onClick={() => { setMode('upload'); setError(null); }}
            >
              <Camera size={15} />
              Scan Photo
            </button>
          </div>

          {/* Loading overlay */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner spinner-lg" />
              <p className="loading-text">
                {mode === 'upload' ? `Analysing ${fileName}…` : `Searching for "${query}"…`}
              </p>
              <p className="loading-sub">This usually takes a few seconds</p>
            </div>
          ) : mode === 'search' ? (
            <form className="search-area" onSubmit={handleSearch}>
              <div className="search-row">
                <Search size={16} className="search-icon-inner" />
                <input
                  className="search-input"
                  type="text"
                  placeholder="e.g. Crocin Advance, Dolo 650, Azithromycin…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="search-go"
                  disabled={!query.trim()}
                >
                  Search
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          ) : (
            <div
              {...getRootProps()}
              className={`dropzone-area ${isDragActive ? 'drag-over' : ''}`}
            >
              <input {...getInputProps()} />
              <div className="dz-inner">
                <div className="dz-icon">
                  {isDragActive ? <Upload size={22} /> : <Camera size={22} />}
                </div>
                <p className="dz-title">
                  {isDragActive ? 'Drop the image here' : 'Drag & drop a medicine photo'}
                </p>
                <p className="dz-hint">or click to browse · PNG, JPG, WEBP up to 5 MB</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="error-box">{error}</div>
          )}
        </div>

        {/* Features Row */}
        <div className="hero-stats anim-up d-4" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-2)' }}>
            <ShieldCheck size={16} color="var(--blue)" /> Verified Pharmacies
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-2)' }}>
            <Tags size={16} color="var(--blue)" /> Cheaper Generics
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-2)' }}>
            <ScanLine size={16} color="var(--blue)" /> Smart Scanner
          </div>
        </div>

      </div>
    </section>
  );
}
