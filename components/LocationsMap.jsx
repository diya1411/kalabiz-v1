"use client";

import { useEffect, useRef } from "react";

const MANUFACTURING = [
  { name: "Corporate & R&D Centre", note: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Genset Plants 1 & 4", note: "Chakan, Pune", lat: 18.7606, lng: 73.8636 },
  { name: "Defence & Biotech — Plant 6", note: "Talegaon, Pune", lat: 18.7349, lng: 73.6759 },
  { name: "Plant 5", note: "Bengaluru", lat: 12.9716, lng: 77.5946 },
];

const SERVICE = [
  { name: "Aurangabad", lat: 19.8762, lng: 75.3433 },
  { name: "Ahmednagar", lat: 19.0948, lng: 74.748 },
  { name: "Beed", lat: 18.9894, lng: 75.7585 },
  { name: "Parbhani", lat: 19.2704, lng: 76.76 },
  { name: "Nanded", lat: 19.1383, lng: 77.321 },
  { name: "Latur", lat: 18.4088, lng: 76.5604 },
  { name: "Babhleshwar", lat: 19.55, lng: 74.95 },
  { name: "Hubli", lat: 15.3647, lng: 75.124 },
  { name: "Belgaum", lat: 15.8497, lng: 74.4977 },
  { name: "Bagalkot", lat: 16.1691, lng: 75.6615 },
  { name: "Kalaburagi", lat: 17.3297, lng: 76.8343 },
  { name: "Vijayapura", lat: 16.8302, lng: 75.71 },
  { name: "Hospet", lat: 15.2689, lng: 76.3909 },
  { name: "Ballari", lat: 15.1394, lng: 76.9214 },
];

const INTERNATIONAL = [
  { name: "Oman", note: "Muscat", lat: 23.588, lng: 58.3829 },
  { name: "Kenya", note: "Nairobi", lat: -1.2921, lng: 36.8219 },
  { name: "Uganda", note: "Kampala", lat: 0.3476, lng: 32.5825 },
];

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

function ensureLeaflet() {
  return new Promise((resolve, reject) => {
    if (window.L) return resolve(window.L);
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    let s = document.querySelector(`script[src="${LEAFLET_JS}"]`);
    if (!s) {
      s = document.createElement("script");
      s.src = LEAFLET_JS;
      s.async = true;
      document.body.appendChild(s);
    }
    s.addEventListener("load", () => resolve(window.L));
    s.addEventListener("error", reject);
    if (window.L) resolve(window.L);
  });
}

export default function LocationsMap() {
  const elRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    ensureLeaflet().then((L) => {
      if (cancelled || !elRef.current || mapRef.current) return;

      const map = L.map(elRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([17.6, 75.6], 6);
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(map);

      const mfgIcon = (label) =>
        L.divIcon({
          className: "",
          html: `<span style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#1d3630;border:3px solid #fff;box-shadow:0 2px 8px rgba(29,54,48,.45)"></span>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

      const svcIcon = L.divIcon({
        className: "",
        html: `<span style="display:block;width:11px;height:11px;border-radius:50%;background:#6e807a;border:2px solid #fff;box-shadow:0 1px 4px rgba(29,54,48,.35)"></span>`,
        iconSize: [11, 11],
        iconAnchor: [5.5, 5.5],
      });

      const intlIcon = L.divIcon({
        className: "",
        html: `<span style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:#3f5f54;border:3px solid #fff;box-shadow:0 2px 8px rgba(29,54,48,.45)"></span>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      MANUFACTURING.forEach((m) => {
        L.marker([m.lat, m.lng], { icon: mfgIcon(m.name) })
          .addTo(map)
          .bindPopup(
            `<strong style="font-family:sans-serif">${m.name}</strong><br/><span style="color:#6e807a;font-family:sans-serif">${m.note}</span>`
          );
      });

      SERVICE.forEach((s) => {
        L.marker([s.lat, s.lng], { icon: svcIcon })
          .addTo(map)
          .bindPopup(
            `<strong style="font-family:sans-serif">${s.name}</strong><br/><span style="color:#6e807a;font-family:sans-serif">Service Location</span>`
          );
      });

      INTERNATIONAL.forEach((c) => {
        L.marker([c.lat, c.lng], { icon: intlIcon })
          .addTo(map)
          .bindPopup(
            `<strong style="font-family:sans-serif">${c.name}</strong><br/><span style="color:#6e807a;font-family:sans-serif">International · ${c.note}</span>`
          );
      });

      // fit to all points
      const all = [...MANUFACTURING, ...SERVICE, ...INTERNATIONAL].map((p) => [p.lat, p.lng]);
      map.fitBounds(all, { padding: [40, 40] });
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-line bg-offwhite shadow-soft">
      <div ref={elRef} className="h-[420px] w-full sm:h-[520px]" style={{ zIndex: 0 }} />
      {/* legend */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-[400] flex flex-col gap-2 rounded-xl border border-gray-line bg-white/90 p-3 text-xs backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-white bg-navy" style={{ boxShadow: "0 0 0 1px #d8d4cc" }} />
          <span className="font-medium text-ink">Manufacturing & R&D</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-gray-soft" style={{ boxShadow: "0 0 0 1px #d8d4cc" }} />
          <span className="font-medium text-ink">Service Network</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-white bg-blue" style={{ boxShadow: "0 0 0 1px #d8d4cc" }} />
          <span className="font-medium text-ink">International</span>
        </div>
      </div>
    </div>
  );
}
