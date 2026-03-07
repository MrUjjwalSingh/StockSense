'use client'

import useTradingviewWidget from '@/hooks/useTradingviewWidget'
import React, { memo } from 'react'

interface TradingViewWidgetProps {
  title?: string
  scriptUrl: string
  config: Record<string, unknown>
  height?: number
  className?: string
}

const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className = ''
}: TradingViewWidgetProps) => {
  const containerRef = useTradingviewWidget(scriptUrl, config, height)

  return (
    <div className={`w-full ${className}`}>
      {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}
      <div ref={containerRef} className="tradingview-widget-container">
        <div className="tradingview-widget-container_widget" style={{height , width:"100%"}}></div>
      </div>

    </div>
  )
}

export default memo(TradingViewWidget)