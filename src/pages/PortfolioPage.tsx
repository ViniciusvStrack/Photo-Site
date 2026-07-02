import React, { useState, useMemo } from 'react';
import { MOCK_PHOTOS } from '../data/mockData';
import type { PhotoItem } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { FrameSimulator } from '../components/FrameSimulator';
import { Search, Heart, Camera, SlidersHorizontal, MapPin, Eye, Sparkles } from 'lucide-react';

interface PortfolioPageProps {
  onPhotoClick: (photoId: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onPhotoClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [photos, setPhotos] = useState<PhotoItem[]>(MOCK_PHOTOS);

  const categories = [
    { id: 'todos', label: 'Todas as Obras' },
    { id: 'casamento', label: 'Casamentos & Bodas' },
    { id: 'retrato', label: 'Retratos & Branding' },
    { id: 'comercial', label: 'Arquitetura & Comercial' },
    { id: 'natureza', label: 'Fine Art & Natureza' },
    { id: 'editorial', label: 'Moda & Editorial' },
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesCategory = selectedCategory === 'todos' || photo.category === selectedCategory;
      const matchesSearch = 
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.exif.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.exif.lens.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [photos, selectedCategory, searchQuery]);

  return (
    <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 bg-gourmet-main">
      <div className="container pt-4">
        {/* Header */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '820px' }}>
          <div className="d-inline-flex align-items-center gap-2 bg-gourmet-surface border border-warm rounded-pill px-4 py-1 mb-3 shadow-sm">
            <Sparkles size={14} className="text-gold" />
            <span className="text-warm-gray gourmet-mono" style={{ fontSize: '0.75rem' }}>
              ACERVO FINE ART LUMEN ATELIER • 100% PRORAW 16-BIT
            </span>
          </div>
          <h1 className="display-4 fw-bold mb-3 tracking-tight gourmet-title text-dark-espresso">
            Galeria & Portfólio Fine Art.
          </h1>
          <p className="text-warm-gray lead gourmet-sans" style={{ fontSize: '1.18rem', lineHeight: '1.7' }}>
            Explore nossa curadoria visual por categoria editorial, técnica ou equipamento óptico. Clique em qualquer obra para inspecionar os parâmetros EXIF, lentes e especificações do sensor.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="row g-3 align-items-center justify-content-between mb-5 pb-3 border-bottom border-warm">
          {/* Category Tabs */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-medium transition-all d-flex align-items-center gap-1 ${
                      isActive 
                        ? 'bg-gourmet-dark text-white fw-semibold shadow-sm' 
                        : 'bg-gourmet-surface text-warm-gray border border-warm hover-text-dark'
                    }`}
                    style={{ fontSize: '0.85rem' }}
                  >
                    <span>{cat.label}</span>
                    {cat.id === 'todos' && (
                      <span className={`badge rounded-pill ms-1 ${isActive ? 'bg-white text-dark-espresso' : 'badge-gold'}`} style={{ fontSize: '0.65rem' }}>
                        {photos.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Box */}
          <div className="col-12 col-lg-4">
            <div className="position-relative">
              <input
                type="text"
                className="form-control bg-white text-dark-espresso border-warm rounded-pill ps-5 pe-4 py-2 shadow-sm"
                placeholder="Buscar por lente, local, câmera ou tema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.9rem' }}
              />
              <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-gold" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="btn btn-sm text-warm-gray position-absolute top-50 end-0 translate-middle-y me-2 border-0"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="d-flex justify-content-between align-items-center mb-4 text-warm-gray fs-7">
          <div className="gourmet-sans">
            Exibindo <span className="text-dark-espresso fw-bold">{filteredPhotos.length}</span> {filteredPhotos.length === 1 ? 'obra curada' : 'obras curadas'}
          </div>
          <div className="d-none d-md-flex align-items-center gap-2 gourmet-mono text-muted-warm">
            <SlidersHorizontal size={14} className="text-gold" />
            <span>EXIBIÇÃO EM GRADE ULTRA RESOLUÇÃO</span>
          </div>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-5 my-5 bg-gourmet-alt rounded-4 border border-warm shadow-sm">
            <Camera size={48} className="text-gold mb-3 opacity-50" />
            <h4 className="text-dark-espresso gourmet-title fw-bold">Nenhuma fotografia encontrada</h4>
            <p className="text-warm-gray mb-4">Não encontramos resultados para sua busca ou categoria selecionada.</p>
            <button 
              onClick={() => { setSelectedCategory('todos'); setSearchQuery(''); }}
              className="btn-gourmet-outline px-4 py-2"
            >
              Restaurar todos os filtros
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="col-12 col-md-6 col-xl-4">
                <div 
                  onClick={() => onPhotoClick(photo.id)}
                  className="card-gourmet overflow-hidden h-100 cursor-pointer transition-all group d-flex flex-column justify-content-between"
                  style={{ borderRadius: '20px' }}
                >
                  <div className="position-relative overflow-hidden" style={{ height: '320px', background: '#F5F2EB' }}>
                    <ImageWithFallback
                      src={photo.url}
                      fallbackSrc={photo.fallbackSvg}
                      alt={photo.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    {/* Top Badges */}
                    <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center z-2">
                      <span className="badge bg-white text-dark-espresso border border-warm rounded-pill px-3 py-1 gourmet-mono shadow-sm" style={{ fontSize: '0.7rem' }}>
                        {photo.categoryLabel}
                      </span>
                      
                      <button
                        onClick={(e) => handleLike(photo.id, e)}
                        className="btn btn-sm bg-white text-dark-espresso rounded-circle p-2 border border-warm shadow-sm hover-bg-danger transition-all d-flex align-items-center justify-content-center"
                        style={{ width: '36px', height: '36px' }}
                        title="Curtir obra"
                      >
                        <Heart size={15} fill={photo.likes > 200 ? 'currentColor' : 'none'} className={photo.likes > 200 ? 'text-danger' : 'text-terracotta'} />
                      </button>
                    </div>

                    {/* Bottom EXIF overlay on card */}
                    <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-to-t from-black via-black to-transparent z-2" style={{ background: 'linear-gradient(to top, rgba(28,27,24,0.75) 0%, rgba(28,27,24,0) 100%)' }}>
                      <div className="d-flex justify-content-between align-items-center text-white gourmet-mono" style={{ fontSize: '0.7rem' }}>
                        <span className="text-white fw-medium">{photo.exif.camera}</span>
                        <span className="badge badge-gold bg-white">{photo.exif.aperture} • {photo.exif.focalLength}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 d-flex flex-column justify-content-between flex-grow-1 bg-white">
                    <div>
                      <h5 className="text-dark-espresso gourmet-title fw-bold mb-2 fs-4">{photo.title}</h5>
                      <p className="text-warm-gray mb-3 text-truncate-2 gourmet-sans" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {photo.description}
                      </p>
                    </div>

                    <div className="pt-3 border-top border-warm d-flex justify-content-between align-items-center text-warm-gray" style={{ fontSize: '0.78rem' }}>
                      <div className="d-flex align-items-center gap-1 text-truncate pe-2">
                        <MapPin size={13} className="text-gold flex-shrink-0" />
                        <span className="text-truncate">{photo.location}</span>
                      </div>
                      <div className="d-flex align-items-center gap-1 text-dark-espresso fw-semibold flex-shrink-0">
                        <Eye size={13} className="text-terracotta" />
                        <span>Inspecionar EXIF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INTERACTIVE 3D FINE ART FRAME SIMULATOR SHOWCASE */}
        <FrameSimulator />

      </div>
    </div>
  );
};
