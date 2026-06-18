// src/components/Confetti.jsx
import { useEffect, useState } from 'react';

export default function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ['#7F77DD', '#1D9E75', '#EF9F27', '#D85A30', '#FFF'];
    const newPieces = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random(),
      size: 5 + Math.random() * 8
    }));
    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="confetti-container">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}vw`,
            top: -20,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
}
