import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  renderCount: number;
  averageRenderTime: number;
  lastRenderTime: number;
  totalRenderTime: number;
}

interface PerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
  showMetrics?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  componentName,
  enabled = process.env.NODE_ENV === 'development',
  showMetrics = false
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0,
    totalRenderTime: 0
  });

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      setMetrics(prev => {
        const newRenderCount = prev.renderCount + 1;
        const newTotalRenderTime = prev.totalRenderTime + renderTime;
        const newAverageRenderTime = newTotalRenderTime / newRenderCount;
        
        const newMetrics = {
          renderCount: newRenderCount,
          averageRenderTime: newAverageRenderTime,
          lastRenderTime: renderTime,
          totalRenderTime: newTotalRenderTime
        };

        // Log performance data
        // console.log(`[${componentName}] Performance:`, {
        //   renderCount: newMetrics.renderCount,
        //   lastRenderTime: `${newMetrics.lastRenderTime.toFixed(2)}ms`,
        //   averageRenderTime: `${newMetrics.averageRenderTime.toFixed(2)}ms`,
        //   totalRenderTime: `${newMetrics.totalRenderTime.toFixed(2)}ms`
        // });

        return newMetrics;
      });
    };
  });

  if (!enabled || !showMetrics) {
    return null;
  }

  return (
    <div className="performance-monitor" style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      minWidth: '200px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        {componentName}
      </div>
      <div>Renders: {metrics.renderCount}</div>
      <div>Last: {metrics.lastRenderTime.toFixed(2)}ms</div>
      <div>Avg: {metrics.averageRenderTime.toFixed(2)}ms</div>
      <div>Total: {metrics.totalRenderTime.toFixed(2)}ms</div>
    </div>
  );
};

export default PerformanceMonitor;
