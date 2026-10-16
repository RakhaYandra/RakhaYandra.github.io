/**
 * Utility function to get image URL with proper path resolution
 * @param {string} path - The relative path to the image in assets folder
 * @returns {string} - The resolved image URL
 */
const assetUrls = import.meta.glob("../assets/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

/**
 * Utility function to get image URL with proper path resolution
 * @param {string} path - The relative path to the image in assets folder
 * @returns {string} - The resolved image URL
 */
export const getImageUrl = (path) => {
  return assetUrls[`../assets/${path}`];
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} - True if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Smooth scroll to element with accessibility consideration
 * @param {string} elementId - ID of target element
 * @param {Object} options - Scroll options
 */
export const smoothScrollTo = (elementId, options = {}) => {
  const element = document.getElementById(elementId.replace('#', ''));
  if (!element) return;

  const defaultOptions = {
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
    ...options
  };

  element.scrollIntoView(defaultOptions);
  
  // Focus management for accessibility
  element.focus({ preventScroll: true });
};

/**
 * Lazy load images with intersection observer
 * @param {HTMLElement} img - Image element
 * @param {string} src - Image source
 * @param {Object} options - Observer options
 */
export const lazyLoadImage = (img, src, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = src;
        image.classList.remove('lazy');
        observer.unobserve(image);
      }
    });
  }, defaultOptions);

  observer.observe(img);
};

/**
 * Format date string for display
 * @param {string} dateString - Date string to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  try {
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(dateString));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Invalid date string:', dateString);
    return dateString;
  }
};

/**
 * Generate unique ID for elements
 * @param {string} prefix - Prefix for the ID
 * @returns {string} - Unique ID
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Visibility threshold (0-1)
 * @returns {boolean} - True if element is visible
 */
export const isInViewport = (element, threshold = 0.1) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const verticalVisible = (rect.top + rect.height * threshold) < windowHeight && 
                         (rect.top + rect.height * (1 - threshold)) > 0;
  const horizontalVisible = (rect.left + rect.width * threshold) < windowWidth && 
                           (rect.left + rect.width * (1 - threshold)) > 0;
  
  return verticalVisible && horizontalVisible;
};

/**
 * Preload critical images
 * @param {Array<string>} imagePaths - Array of image paths to preload
 */
export const preloadImages = (imagePaths) => {
  imagePaths.forEach(path => {
    const img = new Image();
    img.src = getImageUrl(path);
  });
};

/**
 * Get optimal image format based on browser support
 * @param {string} imagePath - Original image path
 * @returns {string} - Optimal image path
 */
export const getOptimalImageFormat = (imagePath) => {
  // Check for WebP support
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  if (supportsWebP && !imagePath.includes('.svg')) {
    return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }

  return imagePath;
};

/**
 * Performance monitoring utility
 * @param {string} name - Performance mark name
 * @param {Function} callback - Function to measure
 */
export const measurePerformance = async (name, callback) => {
  if (typeof performance === 'undefined') {
    return await callback();
  }

  performance.mark(`${name}-start`);
  const result = await callback();
  performance.mark(`${name}-end`);
  performance.measure(name, `${name}-start`, `${name}-end`);
  
  return result;
};
