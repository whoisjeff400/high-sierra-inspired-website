import React, { useEffect, useState } from 'react';
import Window from './Window';

const VisitorStats = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prevCount) => prevCount + 1); // Simulate visitors increasing
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Window title="Visitor Stats">
      <div>
        <p className="text-lg">Visitors: {visitorCount}</p>
      </div>
    </Window>
  );
};

export default VisitorStats;
