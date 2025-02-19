
import { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 38.7223,
  lng: -9.1393
};

const mapOptions = {
  id: 'google-map-script',
  googleMapsApiKey: '',  // Chave removida para evitar conflito
  libraries: ['places']
};

interface AddressMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const AddressMap = ({ onLocationSelect }: AddressMapProps) => {
  const { isLoaded } = useJsApiLoader(mapOptions);
  const [marker, setMarker] = useState(center);

  const onClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });
      onLocationSelect(lat, lng);
    }
  }, [onLocationSelect]);

  if (!isLoaded) return <div>Carregando...</div>;

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
