import { useState } from 'react'
import { FiMapPin, FiRefreshCw } from 'react-icons/fi'
import { Card, Button } from '../components/Ui'

const nearbyPlaces = [
  { name: 'MediCare Hospital', type: 'Hospital', address: '12 Health Avenue', distance: '450 m' },
  { name: 'City Pharmacy', type: 'Medical Store', address: '52 Wellness Road', distance: '620 m' },
  { name: 'Green Valley Clinic', type: 'Hospital', address: '85 Care Street', distance: '1.1 km' },
  { name: 'CarePlus Pharmacy', type: 'Medical Store', address: '9 Relief Boulevard', distance: '1.4 km' }
]

export default function NearbyStore() {
  const [locationStatus, setLocationStatus] = useState('Detecting location...')
  const [coords, setCoords] = useState(null)
  const [error, setError] = useState('')

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.')
      setLocationStatus('Location unavailable')
      return
    }

    setLocationStatus('Requesting location...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCoords({ lat: latitude, lng: longitude })
        setLocationStatus('Location detected')
        setError('')
      },
      () => {
        setError('Unable to detect your location. Showing nearby results instead.')
        setLocationStatus('Location unavailable')
      },
      { timeout: 10000 }
    )
  }

  const query = coords
    ? `hospital+medical+store+near+${coords.lat.toFixed(4)},${coords.lng.toFixed(4)}`
    : 'nearby+hospitals+and+medical+stores'
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`

  return (
    <div className="page nearby-store-page">
      <div className="crumb">Home › Nearby Store</div>
      <div className="page-heading"><h1>Nearby hospitals & medical stores</h1><p>View nearby hospitals and pharmacies on the map so you can find care fast.</p></div>
      <div className="nearby-actions">
        <Button variant="outline" onClick={handleUseLocation}><FiMapPin /> Use my location</Button>
        <Button onClick={handleUseLocation}><FiRefreshCw /> Refresh</Button>
      </div>
      {error && <p className="field-error">{error}</p>}
      <Card className="map-card">
        <iframe
          title="Nearby hospitals and medical stores"
          src={mapSrc}
          frameBorder="0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Card>
      <div className="nearby-grid">
        {nearbyPlaces.map((place) => (
          <Card key={place.name} className="nearby-card">
            <div className="nearby-card-header"><strong>{place.name}</strong><span>{place.type}</span></div>
            <p>{place.address}</p>
            <p className="nearby-distance">{place.distance}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
