import { useNavigate } from "react-router-dom";

export default function VenueCard({ venue }) {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white border border-[#E5E0D8] rounded-sm overflow-hidden
                 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl
                 hover:border-gold cursor-pointer"
    >
      {/* Image with overlay */}
      <div className="relative overflow-hidden">
        <img
          src={venue.img}
          alt={venue.name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay / Mockup effect */}
        <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-white/80 text-xs mb-1">{venue.loc}</p>
            <p className="text-gold font-playfair text-lg mb-1">{venue.price}</p>
            <p className="text-white/60 text-xs mb-3">Kapasitas {venue.cap} orang</p>
            <button
              onClick={() => navigate(`/venues/${venue.id}`)}
              className="border border-gold/70 text-white text-xs px-5 py-2 rounded-sm
                         hover:bg-gold hover:border-gold hover:text-black transition-colors"
            >
              Lihat Detail
            </button>
          </div>
        </div>

        {venue.badge && (
          <div className="absolute top-3 left-3 bg-gold text-black text-[10px] font-semibold
                          px-2.5 py-0.5 tracking-widest uppercase">
            {venue.badge}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="font-playfair text-[1.05rem] mb-1">{venue.name}</h3>
        <p className="text-xs text-gray-400 mb-2.5">📍 {venue.loc}</p>
        <p className="font-semibold text-navy text-[0.95rem]">
          {venue.price} <span className="text-xs font-normal text-gray-400">/ hari</span>
        </p>
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#E5E0D8]">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <span className="text-gold">★★★★★</span> {venue.rating} ({venue.reviews})
          </span>
          <span className="text-xs text-gray-400">👥 {venue.cap}</span>
        </div>
      </div>
    </div>
  );
}
