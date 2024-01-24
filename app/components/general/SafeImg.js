import { useState } from "react";

export function SafeImg({ src, alt, ...props }) {
  const [error, setError] = useState(false);

  const addDefaultSrc = ev => {
    setError(true);
  };

  return (
    error ? 
    <div style={{backgroundColor: '#007f87', display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...props}>
      <span className="text-white font-bold">{alt ? alt[0] : ''}</span>
    </div> :
    <img src={src} onError={addDefaultSrc} alt={alt} {...props} />
  );
}

