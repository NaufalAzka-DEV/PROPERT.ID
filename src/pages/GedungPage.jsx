import React, { useState } from 'react';
import { venues } from '../data/venues';
import VenueCard from '../COMPONENTS/VenueCard';

function GedungPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = venues.filter((venue) => {
    const nameData = venue.name ? venue.name.toLowerCase() : "";
    const locData = venue.loc ? venue.loc.toLowerCase() : "";
    const kotaData = venue.kota ? venue.kota.toLowerCase() : "";
    const query = searchQuery.toLowerCase();

    return nameData.includes(query) || locData.includes(query) || kotaData.includes(query);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold text-navy mb-4">Cari Gedung Premium</h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">Temukan ruang pertemuan dan pernikahan terbaik dari 7+ lokasi pilihan kami.</p>
        
        {/* Fitur Cari Gedung */}
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Ketik nama gedung, lokasi, atau kota..."
            className="w-full px-4 py-3 rounded text-navy border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid Banyak Gedung */}
      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl font-semibold">Gedung tidak ditemukan</p>
          <p className="text-sm">Silakan gunakan kata kunci lain.</p>
        </div>
      )}
    </div>
  );
}

export default GedungPage;