import React, { useEffect, useState } from 'react';
import './DebugPage.css';

type NotificationType = 'success' | 'warning' | 'error' | 'info';

const DebugPage: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<Record<string, unknown>>({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | { message: string; isConfirmation?: boolean; onConfirm?: () => void; onCancel?: () => void }>('');
  const [notificationType, setNotificationType] = useState<NotificationType>('info');
  const [showDebugButton, setShowDebugButton] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [performanceRating, setPerformanceRating] = useState<any>('');
  const [performanceDetails, setPerformanceDetails] = useState<any>({});
  const [connectionInfo, setConnectionInfo] = useState<any>({});
  const [batteryInfo, setBatteryInfo] = useState<any>({});
  const [storageEstimate, setStorageEstimate] = useState<{usage?: number; quota?: number}>({});

  const showCustomNotification = (message: string, type: NotificationType = 'info', autoClose = true) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    if (autoClose) {
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const showCustomConfirmation = (message: string, onConfirm: () => void, onCancel?: () => void) => {
    setNotificationMessage({ message, isConfirmation: true, onConfirm, onCancel });
    setNotificationType('warning');
    setShowNotification(true);
  };

  useEffect(() => {
    const info: Record<string, unknown> = {
      userAgent: navigator.userAgent,
      platform: (navigator as any).platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      colorDepth: window.screen.colorDepth,
      pixelDepth: (window.screen as any).pixelDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateTime: new Date().toLocaleString(),
      localStorage: typeof Storage !== 'undefined',
      sessionStorage: typeof Storage !== 'undefined',
      cookies: document.cookie ? document.cookie.split(';').length : 0,
      url: window.location.href,
      referrer: document.referrer,
      title: document.title,
      readyState: document.readyState,
      lastModified: document.lastModified,
      domain: document.domain,
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      port: window.location.port,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
    };
    setSystemInfo(info);

    const timer = setTimeout(() => setShowDebugButton(true), 2000);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

    const calculatePerformanceRating = () => {
      const memory: any = (performance as any).memory;
      const memoryUsed = memory ? Math.round(memory.usedJSHeapSize / 1048576) : 0;
      const memoryLimit = memory ? Math.round(memory.jsHeapSizeLimit / 1048576) : 0;
      const navTiming: any = (performance as any).timing;
      const loadTime = navTiming ? Math.round(navTiming.loadEventEnd - navTiming.navigationStart) : 0;

      let score = 0;
      let rating = '';
      let color = '';
      let icon = '';

      if (memoryUsed && memoryLimit) {
        const memoryUsage = memoryUsed / memoryLimit;
        if (memoryUsage < 0.3) score += 40;
        else if (memoryUsage < 0.6) score += 25;
        else if (memoryUsage < 0.8) score += 10;
      }

      if (loadTime) {
        if (loadTime < 1000) score += 40;
        else if (loadTime < 2000) score += 25;
        else if (loadTime < 3000) score += 10;
      }

      const deviceScore = navigator.userAgent.includes('Mobile') ? 10 : 20;
      score += deviceScore;

      if (score >= 80) {
        rating = 'Excellent';
        color = '#27ae60';
        icon = '🚀';
      } else if (score >= 60) {
        rating = 'Good';
        color = '#2ecc71';
        icon = '✅';
      } else if (score >= 40) {
        rating = 'Moderate';
        color = '#f39c12';
        icon = '⚠️';
      } else if (score >= 20) {
        rating = 'Warning';
        color = '#e67e22';
        icon = '🐌';
      } else {
        rating = 'Bad';
        color = '#e74c3c';
        icon = '❌';
      }

      setPerformanceRating({ rating, color, icon, score });
      setPerformanceDetails({ memoryUsed, memoryLimit, loadTime });
    };

    calculatePerformanceRating();

    // Network connection info
    const navAny: any = navigator as any;
    const connection = navAny?.connection || navAny?.mozConnection || navAny?.webkitConnection;
    if (connection) {
      const updateConnection = () => {
        setConnectionInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        });
      };
      updateConnection();
      connection.addEventListener?.('change', updateConnection);
    }

    // Battery info (optional API)
    if ((navigator as any).getBattery) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryInfo({
            level: Math.round(battery.level * 100),
            charging: battery.charging,
          });
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      }).catch(() => {/* ignore */});
    }

    // Storage estimate
    if (navigator.storage?.estimate) {
      navigator.storage.estimate().then((est) => setStorageEstimate({ usage: est.usage, quota: est.quota })).catch(() => undefined);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCustomNotification('Copied to clipboard!', 'success', true);
    } catch (err) {
      showCustomNotification('Failed to copy to clipboard', 'error', true);
    }
  };

  const showPerformanceSuggestions = (rating: string) => {
    let suggestions = '';
    const details: any = performanceDetails;
    const score: any = performanceRating?.score;

    switch (rating) {
      case 'Excellent':
        suggestions = `🚀 EXCELLENT PERFORMANCE\n\nYour device is performing exceptionally well!\n\n• Memory Usage: Optimal (${details.memoryUsed}MB / ${details.memoryLimit}MB)\n• Load Time: Very Fast (${details.loadTime}ms)\n• Performance Score: ${score}/100`;
        break;
      case 'Good':
        suggestions = `✅ GOOD PERFORMANCE\n\nYour device is performing well with room for optimization.\n\n• Memory Usage: Good (${details.memoryUsed}MB / ${details.memoryLimit}MB)\n• Load Time: Fast (${details.loadTime}ms)\n• Performance Score: ${score}/100`;
        break;
      case 'Moderate':
        suggestions = `⚠️ MODERATE PERFORMANCE\n\nYour device performance is acceptable but could be improved.\n\n• Memory Usage: Moderate (${details.memoryUsed}MB / ${details.memoryLimit}MB)\n• Load Time: Moderate (${details.loadTime}ms)\n• Performance Score: ${score}/100`;
        break;
      case 'Warning':
        suggestions = `🐌 WARNING - PERFORMANCE ISSUES\n\nYour device is experiencing performance issues.\n\n• Memory Usage: High (${details.memoryUsed}MB / ${details.memoryLimit}MB)\n• Load Time: Slow (${details.loadTime}ms)\n• Performance Score: ${score}/100`;        
        break;
      case 'Bad':
        suggestions = `❌ CRITICAL PERFORMANCE ISSUES\n\nYour device is severely underperforming.\n\n• Memory Usage: Critical (${details.memoryUsed}MB / ${details.memoryLimit}MB)\n• Load Time: Very Slow (${details.loadTime}ms)\n• Performance Score: ${score}/100`;
        break;
      default:
        suggestions = 'Performance rating information not available.';
    }

    showCustomNotification(suggestions, rating === 'Bad' ? 'error' : rating === 'Warning' ? 'warning' : 'info', false);
  };

  const clearLocalStorage = () => {
    showCustomConfirmation('Are you sure you want to clear all local storage?', () => {
      localStorage.clear();
      showCustomNotification('Local storage cleared!', 'success', true);
    });
  };

  const clearSessionStorage = () => {
    showCustomConfirmation('Are you sure you want to clear all session storage?', () => {
      sessionStorage.clear();
      showCustomNotification('Session storage cleared!', 'success', true);
    });
  };

  const clearCookies = () => {
    showCustomConfirmation('Are you sure you want to clear all cookies?', () => {
      document.cookie.split(';').forEach((c) => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      showCustomNotification('Cookies cleared!', 'success', true);
    });
  };

  const clearCaches = () => {
    showCustomConfirmation('Clear Cache Storage (caches API)?', async () => {
      if ('caches' in window) {
        const names = await caches.keys();
        await Promise.all(names.map((n) => caches.delete(n)));
      }
      showCustomNotification('Cache storage cleared!', 'success', true);
    });
  };

  const unregisterServiceWorkers = () => {
    showCustomConfirmation('Unregister all service workers?', async () => {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      showCustomNotification('Service workers unregistered!', 'success', true);
    });
  };

  const purgeAllData = () => {
    showCustomConfirmation('Permanently clear Local, Session, Cookies, Cache, and unregister Service Workers?', async () => {
      try {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach((c) => {
          document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
        if ('caches' in window) {
          const names = await caches.keys();
          await Promise.all(names.map((n) => caches.delete(n)));
        }
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
        }
        showCustomNotification('All application data cleared!', 'success', true);
      } catch {
        showCustomNotification('Failed to clear some data', 'error', true);
      }
    });
  };

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
  };

  const getStorageInfo = () => {
    let ls = 'Local Storage:\n';
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) ls += `${key}: ${localStorage.getItem(key)}\n`;
    }
    let ss = 'Session Storage:\n';
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) ss += `${key}: ${sessionStorage.getItem(key)}\n`;
    }
    copyToClipboard(ls + '\n' + ss);
  };

  const getCookieInfo = () => copyToClipboard(document.cookie || 'No cookies');

  const copyDebugReport = () => {
    const mem = performanceDetails;
    const conn = connectionInfo;
    const est = storageEstimate;
    const report = `SiteLVA Debug Report\nTime: ${new Date().toISOString()}\nURL: ${location.href}\nUserAgent: ${navigator.userAgent}\nOnline: ${navigator.onLine}\nLang: ${navigator.language}\nConn: ${JSON.stringify(conn)}\nBattery: ${JSON.stringify(batteryInfo)}\nStorage: usage=${est.usage}, quota=${est.quota}\nPerf: ${JSON.stringify(mem)}\nSystem: ${JSON.stringify(systemInfo, null, 2)}\n`;
    copyToClipboard(report);
  };

  return (
    <div className="debug-page">
      <button className={`debug-toggle-btn ${showDebugButton ? 'visible' : ''}`} onClick={() => window.history.back()} title="Go Back">←</button>

      <div className="debug-page-header">
        <h1>🔧 Debug Panel</h1>
        <p>System information and debugging tools</p>
        <div className="debug-clock">{currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}</div>
      </div>

      <div className="debug-page-content">
        {/* Performance Rating */}
        <div className="debug-section">
          <h2>📊 Performance Rating</h2>
          {performanceRating && (
            <div className="performance-rating-container">
              <div className="performance-rating-item" style={{ borderColor: performanceRating.color }} onClick={() => showPerformanceSuggestions(performanceRating.rating)}>
                <div className="performance-icon" style={{ color: performanceRating.color }}>{performanceRating.icon}</div>
                <div className="performance-info">
                  <h3 style={{ color: performanceRating.color }}>{performanceRating.rating}</h3>
                  <p>Score: {performanceRating.score}/100</p>
                  <span className="performance-click-hint">Click for detailed suggestions</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* System Status */}
        <div className="debug-section">
          <h2>⚡ System Status</h2>
          <div className="debug-status-grid">
            <div className="debug-status-item online">
              <div className="status-indicator" />
              <span>Online Status: {navigator.onLine ? '🟢 Online' : '🔴 Offline'}</span>
            </div>
            <div className="debug-status-item">
              <div className="status-indicator" />
              <span>Cookies: {navigator.cookieEnabled ? '🟢 Enabled' : '🔴 Disabled'}</span>
            </div>
            <div className="debug-status-item">
              <div className="status-indicator" />
              <span>Local Storage: {typeof Storage !== 'undefined' ? '🟢 Available' : '🔴 N/A'}</span>
            </div>
            <div className="debug-status-item">
              <div className="status-indicator" />
              <span>Session Storage: {typeof Storage !== 'undefined' ? '🟢 Available' : '🔴 N/A'}</span>
            </div>
            <div className="debug-status-item">
              <div className="status-indicator" />
              <span>Connection: {connectionInfo?.effectiveType || 'Unknown'} ({connectionInfo?.downlink || '?'}Mbps)</span>
            </div>
            {batteryInfo?.level != null && (
              <div className="debug-status-item">
                <div className="status-indicator" />
                <span>Battery: {batteryInfo.level}% {batteryInfo.charging ? '⚡' : ''}</span>
              </div>
            )}
            {(storageEstimate.usage || storageEstimate.quota) && (
              <div className="debug-status-item">
                <div className="status-indicator" />
                <span>Storage: {Math.round((storageEstimate.usage || 0) / 1048576)}MB / {Math.round((storageEstimate.quota || 0) / 1048576)}MB</span>
              </div>
            )}
          </div>
        </div>

        {/* System Information */}
        <div className="debug-section">
          <h2>📊 System Information</h2>
          <div className="debug-grid">
            {Object.entries(systemInfo).map(([key, value]) => (
              <div key={key} className="debug-info-item">
                <strong>{key}:</strong>
                <span className="debug-value" onClick={() => copyToClipboard(String(value))}>{String(value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Utilities */}
        <div className="debug-section">
          <h2>🛠️ Utilities</h2>
          <div className="debug-buttons-grid">
            <button onClick={getStorageInfo} className="debug-btn">📋 Copy Storage Info</button>
            <button onClick={getCookieInfo} className="debug-btn">🍪 Copy Cookie Info</button>
            <button onClick={clearLocalStorage} className="debug-btn debug-btn-danger">🗑️ Clear Local Storage</button>
            <button onClick={clearSessionStorage} className="debug-btn debug-btn-danger">🗑️ Clear Session Storage</button>
            <button onClick={clearCookies} className="debug-btn debug-btn-danger">🍪 Clear Cookies</button>
            <button onClick={clearCaches} className="debug-btn debug-btn-danger">🗂️ Clear Caches</button>
            <button onClick={unregisterServiceWorkers} className="debug-btn debug-btn-warning">🧹 Unregister SW</button>
            <button onClick={() => window.location.reload()} className="debug-btn debug-btn-warning">🔄 Reload Page</button>
            <button onClick={toggleDarkMode} className="debug-btn">🌙 Toggle Dark Mode</button>
            <button onClick={copyDebugReport} className="debug-btn">📋 Copy Debug Report</button>
            <button onClick={purgeAllData} className="debug-btn debug-btn-danger">🔥 Purge All App Data</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="debug-section">
          <h2>⚡ Quick Actions</h2>
          <div className="debug-buttons-grid">
            <button onClick={() => copyToClipboard(window.location.href)} className="debug-btn">📋 Copy Current URL</button>
            <button onClick={() => copyToClipboard(document.title)} className="debug-btn">📋 Copy Page Title</button>
            <button onClick={() => copyToClipboard(navigator.userAgent)} className="debug-btn">📋 Copy User Agent</button>
            <button onClick={() => window.print()} className="debug-btn">🖨️ Print Page</button>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className={`debug-notification-container ${notificationType}`}>
          <div className="debug-notification-content">
            <div className="debug-notification-icon">
              {notificationType === 'success' && '✅'}
              {notificationType === 'warning' && '⚠️'}
              {notificationType === 'error' && '❌'}
              {notificationType === 'info' && 'ℹ️'}
            </div>
            <div className="debug-notification-message">
              {typeof notificationMessage === 'string'
                ? notificationMessage.split('\n').map((line, index) => <div key={index}>{line}</div>)
                : notificationMessage.message.split('\n').map((line, index) => <div key={index}>{line}</div>)}
            </div>
            <button className="debug-notification-close" onClick={() => setShowNotification(false)} title="Close">✕</button>
          </div>
          {typeof notificationMessage === 'object' && (notificationMessage as any).isConfirmation && (
            <div className="debug-notification-actions">
              <button className="debug-notification-btn debug-notification-btn-cancel" onClick={(notificationMessage as any).onCancel}>Cancel</button>
              <button className="debug-notification-btn debug-notification-btn-confirm" onClick={(notificationMessage as any).onConfirm}>Confirm</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DebugPage;


