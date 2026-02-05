/**
 * DOM Helper Utilities
 * Shared DOM manipulation and query functions
 */

export const DOMHelpers = {
  /**
   * Safely query selector with error handling
   */
  querySelector(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      return null;
    }
  },

  /**
   * Safely query all elements with error handling
   */
  querySelectorAll(selector, context = document) {
    try {
      return Array.from(context.querySelectorAll(selector));
    } catch (error) {
      return [];
    }
  },

  /**
   * Create element with attributes and styles
   */
  createElement(tag, attributes = {}, styles = {}) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'textContent' || key === 'innerHTML') {
        element[key] = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    Object.entries(styles).forEach(([key, value]) => {
      element.style[key] = value;
    });

    return element;
  },

  /**
   * Safely set text content (prevents XSS)
   */
  setTextContent(element, text) {
    if (element) {
      element.textContent = text;
    }
  },

  /**
   * Apply multiple styles to an element
   */
  applyStyles(element, styles) {
    if (!element) return;
    Object.entries(styles).forEach(([key, value]) => {
      element.style[key] = value;
    });
  },

  /**
   * Create a link element
   */
  createLink(href, text, attributes = {}) {
    return this.createElement('a', {
      href,
      textContent: text,
      target: '_blank',
      rel: 'noopener noreferrer',
      ...attributes
    });
  }
};
