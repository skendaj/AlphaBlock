import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget({ cryptoSymbol }) {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      console.log(cryptoSymbol, "cryptoSymbolcryptoSymbolcryptoSymbol");

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
        var binance = "BINANCE:"
        if (document.getElementById('tradingview_08790') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            // symbol: `BINANCE:${cryptoSymbol == "USDT" ? "" : cryptoSymbol}USDT`,
            symbol: `${cryptoSymbol == "USDT" ? "CRYPTOCAP:" + cryptoSymbol : "BINANCE:" + cryptoSymbol + "USDT"}`,
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
    <div className='tradingview-widget-container' >
      <div id='tradingview_08790' style={{ marginLeft: "5%", width: '90%', height: '640px' }} />
    </div>
  );
}
