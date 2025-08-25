import { useCallback, useMemo, useRef, useEffect } from 'react';

// Debounce hook for performance optimization
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
};

// Throttle hook for performance optimization
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastCall = useRef(0);
  const lastCallTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        callback(...args);
        lastCall.current = now;
      } else {
        if (lastCallTimer.current) {
          clearTimeout(lastCallTimer.current);
        }
        lastCallTimer.current = setTimeout(() => {
          callback(...args);
          lastCall.current = Date.now();
        }, delay - (now - lastCall.current));
      }
    }) as T,
    [callback, delay]
  );
};

// Memoized value with custom comparison
export const useMemoizedValue = <T>(
  value: T,
  deps: any[],
  isEqual?: (prev: T, next: T) => boolean
): T => {
  const prevValueRef = useRef<T>(value);
  
  return useMemo(() => {
    const prevValue = prevValueRef.current;
    const shouldUpdate = isEqual ? !isEqual(prevValue, value) : prevValue !== value;
    
    if (shouldUpdate) {
      prevValueRef.current = value;
    }
    
    return prevValueRef.current;
  }, deps);
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const currentTime = performance.now();
    const timeSinceLastRender = currentTime - lastRenderTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[${componentName}] Render #${renderCount.current} (${timeSinceLastRender.toFixed(2)}ms)`
      );
    }
    
    lastRenderTime.current = currentTime;
  });

  return {
    renderCount: renderCount.current,
    timeSinceLastRender: performance.now() - lastRenderTime.current
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return elementRef;
};

// Memory efficient event listener hook
export const useEventListener = (
  eventName: string,
  handler: EventListener,
  element: EventTarget = window,
  options?: AddEventListenerOptions
) => {
  const savedHandler = useRef<EventListener | undefined>(undefined);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => savedHandler.current?.(event);
    
    element.addEventListener(eventName, eventListener, options);
    
    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
};
