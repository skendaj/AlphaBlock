// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const CryptoDetails = () => {
//   const { id } = useParams();
//   const [crypto, setCrypto] = useState(null);

//   useEffect(() => {
//     const fetchCryptoDetails = async () => {
//       try {
//         const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
//         const data = await response.json();
//         setCrypto(data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchCryptoDetails();
//   }, [id]);

//   if (!crypto) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{crypto.name}</h2>
//     </div>
//   );
// };

// export default CryptoDetails;

// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_08790') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:ETHUSDT",
            interval: "D",
            timezone: "Europe/Amsterdam",
            theme: "dark",
            style: "2",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            details: true,
            container_id: "tradingview_08790"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_08790' />
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
}
