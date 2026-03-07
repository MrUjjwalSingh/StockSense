'use client'

import { useRef, useEffect } from "react"

const useTradingviewWidget = (
  scriptUrl: string, 
  config: Record<string, unknown>, 
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Prevent duplicate loading
    if (containerRef.current.dataset.loaded === 'true') return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';
    
    // Create widget container
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = `${height}px`;
    widgetDiv.style.width = '100%';
    
    // Create script element
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.type = 'text/javascript';
    script.textContent = JSON.stringify(config);
    
    // Append elements
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = 'true';
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scriptUrl, JSON.stringify(config), height]);
  
  return containerRef;
}

export default useTradingviewWidget