'use client'

import TradingViewWidget from "@/components/TradingViewWidget";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";

const Home = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="min-h-screen p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
              {/* Market Overview - Left */}
              <div className="md:col-span-1 xl:col-span-1">
                  <TradingViewWidget
                    title="Market Overview"
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={MARKET_OVERVIEW_WIDGET_CONFIG}
                    height={600}
                  />
              </div>
              
              {/* Stock Heatmap - Right */}
              <div className="md:col-span-1 xl:col-span-2">
                  <TradingViewWidget
                      title="Stock Heatmap"
                      scriptUrl={`${scriptUrl}stock-heatmap.js`}
                      config={HEATMAP_WIDGET_CONFIG}
                      height={600}
                  />
              </div>
              
              {/* Top Stories - Left */}
              <div className="md:col-span-1 xl:col-span-1">
                  <TradingViewWidget
                      title="Top Stories"
                      scriptUrl={`${scriptUrl}timeline.js`}
                      config={TOP_STORIES_WIDGET_CONFIG}
                      height={600}
                  />
              </div>
              
              {/* Market Data - Right */}
              <div className="md:col-span-1 xl:col-span-2">
                  <TradingViewWidget
                      title="Market Data"
                      scriptUrl={`${scriptUrl}market-quotes.js`}
                      config={MARKET_DATA_WIDGET_CONFIG}
                      height={600}
                  />
              </div>
          </div>
        </div>
    )
}

export default Home;