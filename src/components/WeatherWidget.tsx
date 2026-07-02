import React, { useState, useEffect } from 'react';
import type { WeatherData } from '../types';
import { apiService } from '../services/api';
import { Sun, Cloud, Wind, Droplets, Sparkles, RefreshCw, Thermometer } from 'lucide-react';

interface WeatherWidgetProps {
  locationKey?: string;
  locationName?: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  locationKey = 'noronha',
  locationName = 'Fernando de Noronha - PE'
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadWeather = () => {
    setIsLoading(true);
    // map readable names to location keys if needed
    let key = locationKey;
    const lowerName = (locationName || '').toLowerCase();
    if (lowerName.includes('noronha') || lowerName.includes('carneiros') === false && key === '') key = 'noronha';
    if (lowerName.includes('carneiros') || lowerName.includes('tamandaré')) key = 'carneiros';
    if (lowerName.includes('recife') || lowerName.includes('porto digital') || lowerName.includes('estúdio')) key = 'recife';
    if (lowerName.includes('são paulo') || lowerName.includes('faria lima')) key = 'sp';
    if (lowerName.includes('europa') || lowerName.includes('destination') || lowerName.includes('lisboa')) key = 'europa';

    apiService.getLiveWeather(key || 'noronha').then(data => {
      setWeather(data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  };

  useEffect(() => {
    loadWeather();
  }, [locationKey, locationName]);

  if (isLoading) {
    return (
      <div className="card-gourmet-alt p-4 border border-warm rounded-4 text-center my-3 shadow-sm">
        <div className="spinner-border spinner-border-sm text-gold me-2" role="status" />
        <span className="text-warm-gray fs-7 gourmet-mono">Sincronizando satélite climático para {locationName}...</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="card-gourmet p-4 p-md-5 my-4 shadow-md border border-warm" style={{ borderRadius: '24px', background: '#FFFFFF' }}>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center pb-3 mb-4 border-bottom border-warm gap-2">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-gourmet-dark text-white rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center">
            <Sun size={18} className="text-gold" />
          </div>
          <div>
            <h5 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-5">Clima & Luz em Tempo Real</h5>
            <div className="text-muted-warm fs-7 gourmet-mono">📍 {locationName} • Satélite Open-Meteo</div>
          </div>
        </div>

        <button
          type="button"
          onClick={loadWeather}
          className="btn btn-sm btn-gourmet-outline px-3 py-1 fs-7 d-flex align-items-center gap-1"
        >
          <RefreshCw size={12} className="text-gold" />
          <span>Sincronizar</span>
        </button>
      </div>

      {/* 4 Climate Metric Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="bg-gourmet-alt p-3 rounded-4 border border-warm h-100">
            <div className="d-flex align-items-center gap-1 text-terracotta mb-1" style={{ fontSize: '0.72rem' }}>
              <Thermometer size={14} />
              <span className="gourmet-mono fw-bold text-uppercase">Temperatura</span>
            </div>
            <div className="gourmet-title fw-bold text-dark-espresso fs-3 mb-0">{weather.temp}°C</div>
            <div className="text-muted-warm fs-7">Sensação: {weather.feelsLike}°C</div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="bg-gourmet-alt p-3 rounded-4 border border-warm h-100">
            <div className="d-flex align-items-center gap-1 text-gold mb-1" style={{ fontSize: '0.72rem' }}>
              <Droplets size={14} />
              <span className="gourmet-mono fw-bold text-uppercase">Umidade do Ar</span>
            </div>
            <div className="gourmet-title fw-bold text-dark-espresso fs-3 mb-0">{weather.humidity}%</div>
            <div className="text-muted-warm fs-7">Atmosfera litorânea</div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="bg-gourmet-alt p-3 rounded-4 border border-warm h-100">
            <div className="d-flex align-items-center gap-1 text-success mb-1" style={{ fontSize: '0.72rem', color: '#5F7367' }}>
              <Wind size={14} />
              <span className="gourmet-mono fw-bold text-uppercase">Vento & Brisa</span>
            </div>
            <div className="gourmet-title fw-bold text-dark-espresso fs-3 mb-0">{weather.windSpeed} km/h</div>
            <div className="text-muted-warm fs-7">Brisa suave contínua</div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="bg-gourmet-alt p-3 rounded-4 border border-warm h-100">
            <div className="d-flex align-items-center gap-1 text-dark-espresso mb-1" style={{ fontSize: '0.72rem' }}>
              <Cloud size={14} className="text-gold" />
              <span className="gourmet-mono fw-bold text-uppercase">Nuvens / Chuva</span>
            </div>
            <div className="gourmet-title fw-bold text-dark-espresso fs-3 mb-0">{weather.cloudCover}%</div>
            <div className="text-muted-warm fs-7">{weather.rain} mm precipitação</div>
          </div>
        </div>
      </div>

      {/* Photography Lighting Assessment Box by Maria Clara & Vinicius Strack */}
      <div className="p-4 bg-gourmet-alt rounded-4 border border-warm d-flex align-items-start gap-3 shadow-sm">
        <Sparkles size={24} className="text-gold flex-shrink-0 mt-1" />
        <div>
          <h6 className="fw-bold text-dark-espresso mb-1 fs-6">
            📷 Análise Luminosa de Maria Clara & Vinicius Strack:
          </h6>
          <p className="text-warm-gray fs-7 mb-0 gourmet-sans" style={{ lineHeight: '1.6' }}>
            {weather.lightingAdvice}
          </p>
        </div>
      </div>
    </div>
  );
};
