// Scroll Animation Utility
let scrollObserver: IntersectionObserver | null = null;

export const initScrollAnimations = (): IntersectionObserver => {
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Create observer only once
  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
  }

  // Observe all elements with animation classes that aren't already observed
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, .stagger-item'
  );

  animatedElements.forEach(el => {
    // Only observe if not already being observed
    if (!(el as HTMLElement).dataset.observed) {
      scrollObserver!.observe(el);
      (el as HTMLElement).dataset.observed = 'true';
    }
  });

  return scrollObserver;
};

// Parallax effect
export const initParallax = (): (() => void) => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = (element as HTMLElement).dataset.speed || '0.5';
      const yPos = -(scrolled * parseFloat(speed));
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  };

  window.addEventListener('scroll', handleScroll);
  
  return () => window.removeEventListener('scroll', handleScroll);
};

// Smooth scroll to element
export const smoothScrollTo = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Add stagger animation to grid items
export const addStaggerAnimation = (containerSelector: string): void => {
  const container = document.querySelector(containerSelector);
  if (container) {
    const items = container.children;
    Array.from(items).forEach((item, index) => {
      // Only add classes if not already added
      if (!item.classList.contains('stagger-item')) {
        item.classList.add('stagger-item');
      }
      // Only set animation delay if not already set
      if (!(item as HTMLElement).style.animationDelay) {
        (item as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      }
    });
  }
};

// Typing animation
export const initTypingAnimation = (elementSelector: string, text: string, speed: number = 100): void => {
  const element = document.querySelector(elementSelector);
  if (!element) return;

  let i = 0;
  element.textContent = '';
  element.classList.add('typing-animation');

  const typeWriter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  };

  typeWriter();
};

// Ripple effect for buttons
export const initRippleEffect = (): void => {
  const buttons = document.querySelectorAll('.ripple');
  
  buttons.forEach(button => {
    // Only add event listener if not already added
    if (!(button as HTMLElement).dataset.rippleInitialized) {
      button.addEventListener('click', function(this: HTMLElement, e: Event) {
        const mouseEvent = e as MouseEvent;
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = mouseEvent.clientX - rect.left - size / 2;
        const y = mouseEvent.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
      
      (button as HTMLElement).dataset.rippleInitialized = 'true';
    }
  });
};

// Add floating animation to cards
export const addFloatingAnimation = (selector: string): void => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.classList.add('floating-card');
    (el as HTMLElement).style.animationDelay = `${index * 0.2}s`;
  });
};

// Initialize all animations
export const initAllAnimations = (): void => {
  initScrollAnimations();
  initParallax();
  initRippleEffect();
  
  // Add stagger animation to team grid
  addStaggerAnimation('.team-grid');
  
  // Add floating animation to service cards
  addFloatingAnimation('.service-card');
  
  // Add hover effects
  document.querySelectorAll('.team-member').forEach(member => {
    member.classList.add('hover-bounce');
  });
  
  document.querySelectorAll('.expertise-tag').forEach(tag => {
    tag.classList.add('hover-glow-blue');
  });
};
