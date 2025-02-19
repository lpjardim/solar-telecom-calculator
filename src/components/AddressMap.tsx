
import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Input } from './ui/input';
import { Button } from './ui/button';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 38.7223,
  lng: -9.1393
};

interface AddressMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const AddressMap = ({ onLocationSelect }: AddressMapProps) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('google_maps_api_key') || '');
  const [showMap, setShowMap] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [marker, setMarker] = useState(center);

  const onClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });
      onLocationSelect(lat, lng);
    }
  }, [onLocationSelect]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('google_maps_api_key', apiKey);
    setShowMap(true);
  };

  if (!showMap) {
    return (
      <form onSubmit={handleApiKeySubmit} className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Para usar o mapa, por favor insira sua chave API do Google Maps. 
            Você pode obter uma chave em: 
            <a 
              href="https://console.cloud.google.com/google/maps-apis/credentials" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Google Cloud Console
            </a>
          </p>
          <Input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Cole sua chave API do Google Maps aqui"
            className="w-full"
          />
        </div>
        <Button type="submit">Carregar Mapa</Button>
      </form>
    );
  }

  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <div className="w-full rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={onClick}
      >
        <Marker position={marker} />
      </GoogleMap>
    </div>
  );
};

export default AddressMap;

