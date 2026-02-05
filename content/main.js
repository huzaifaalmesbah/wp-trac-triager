/**
 * WP Trac Triager - Main Content Script
 * Orchestrates all extension functionality
 */

import { ContributorHighlighter } from './modules/contributor-highlighter.js';
import { SidebarManager } from './modules/sidebar-manager.js';

class WPTracTriager {
  constructor() {
    this.contributorData = null;
    this.settings = null;
  }

  /**
   * Initialize the extension
   */
  async init() {
    try {
      // Load settings
      await this.loadSettings();

      // Inject page script to access wpTracContributorLabels
      this.injectPageScript();

      // Listen for contributor data
      document.addEventListener('wpt-data-ready', () => {
        this.onDataReady();
      });
    } catch (error) {
      this.handleError('Initialization failed', error);
    }
  }

  /**
   * Load user settings from storage
   */
  async loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['config'], (result) => {
        this.settings = result.config || {
          highlightComments: true,
          showKeywordSidebar: true,
          showMaintainerInfo: true,
          customUsers: {
            coreCommitters: [],
            leadTesters: []
          }
        };
        resolve();
      });
    });
  }

  /**
   * Inject script into page context
   */
  injectPageScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('content/page-inject.js');
    script.onload = () => {
      script.remove();
    };
    (document.head || document.documentElement).appendChild(script);
  }

  /**
   * Handle when contributor data is ready
   */
  onDataReady() {
    try {
      const dataElement = document.getElementById('wpt-contributor-data');
      if (!dataElement) {
        this.handleError('Data element not found');
        return;
      }

      this.contributorData = JSON.parse(dataElement.getAttribute('data-contributors'));

      // Merge custom users with contributor data
      this.mergeCustomUsers();

      // Execute features based on settings
      this.executeFeatures();
    } catch (error) {
      this.handleError('Failed to process contributor data', error);
    }
  }

  /**
   * Merge custom user lists from settings into contributor data
   */
  mergeCustomUsers() {
    if (!this.settings.customUsers) return;

    const { coreCommitters, leadTesters } = this.settings.customUsers;

    coreCommitters.forEach(username => {
      if (!this.contributorData[username]) {
        this.contributorData[username] = 'Core Committer';
      }
    });

    leadTesters.forEach(username => {
      if (!this.contributorData[username]) {
        this.contributorData[username] = 'Lead Tester';
      }
    });
  }

  /**
   * Execute enabled features
   */
  executeFeatures() {
    // Highlight comments
    if (this.settings.highlightComments) {
      const highlighter = new ContributorHighlighter(this.contributorData);
      highlighter.highlightAll();
    }

    // Create sidebar with delay to ensure highlighting completes
    if (this.settings.showKeywordSidebar) {
      setTimeout(() => {
        const sidebarManager = new SidebarManager(this.contributorData);
        sidebarManager.create();
      }, 500);
    }
  }

  /**
   * Handle errors gracefully
   */
  handleError(message, error = null) {
    // Only log in development mode
    if (window.location.search.includes('wpt_debug')) {
      console.error(`[WP Trac Triager] ${message}`, error);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const triager = new WPTracTriager();
    triager.init();
  });
} else {
  const triager = new WPTracTriager();
  triager.init();
}
