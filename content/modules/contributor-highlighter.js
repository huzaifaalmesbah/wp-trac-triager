/**
 * Contributor Highlighter Module
 * Handles highlighting of comments from important contributors
 */

import { DOMHelpers } from './dom-helpers.js';
import { ROLE_COLORS, SELECTORS, BADGE_STYLES } from './config.js';

export class ContributorHighlighter {
  constructor(contributorData) {
    this.contributorData = contributorData || {};
  }

  /**
   * Highlight all contributor comments on the page
   */
  highlightAll() {
    const comments = DOMHelpers.querySelectorAll(SELECTORS.comments);
    let highlightedCount = 0;

    comments.forEach(comment => {
      const highlighted = this.highlightComment(comment);
      if (highlighted) highlightedCount++;
    });

    return highlightedCount;
  }

  /**
   * Highlight a single comment element
   */
  highlightComment(comment) {
    const authorLink = DOMHelpers.querySelector(SELECTORS.authorLink, comment);
    if (!authorLink) return false;

    const username = authorLink.textContent.trim();
    const role = this.contributorData[username];

    if (!role) return false;

    const colors = ROLE_COLORS[role] || ROLE_COLORS['default'];

    // Apply visual highlight to comment container
    DOMHelpers.applyStyles(comment, {
      borderLeft: `4px solid ${colors.border}`,
      backgroundColor: colors.bg,
      paddingLeft: '12px'
    });

    // Clean up h3.change styles
    const h3 = DOMHelpers.querySelector(SELECTORS.changeHeader, comment);
    if (h3) {
      DOMHelpers.applyStyles(h3, {
        borderLeft: 'none',
        backgroundColor: 'transparent',
        paddingLeft: '8px'
      });
    }

    // Add or update role badge
    this.addRoleBadge(authorLink, role, colors);

    return true;
  }

  /**
   * Add role badge to author link
   */
  addRoleBadge(authorLink, role, colors) {
    const authorContainer = authorLink.closest('.username-line') || authorLink.parentElement;
    if (!authorContainer) return;

    // Hide Trac's original badge
    const tracBadge = DOMHelpers.querySelector('.contributor-label', authorContainer);
    if (tracBadge) {
      tracBadge.style.display = 'none';
    }

    // Check if our badge already exists
    let ourBadge = DOMHelpers.querySelector('.wpt-role-badge', authorContainer);

    if (!ourBadge) {
      ourBadge = DOMHelpers.createElement('span', {
        className: 'wpt-role-badge',
        textContent: role
      });

      const usernameSpan = DOMHelpers.querySelector('.username', authorLink);
      if (usernameSpan) {
        usernameSpan.parentElement.insertBefore(ourBadge, usernameSpan.nextSibling);
      } else {
        authorLink.appendChild(ourBadge);
      }
    }

    // Apply badge styles
    DOMHelpers.applyStyles(ourBadge, {
      ...BADGE_STYLES,
      background: colors.badge
    });
  }

  /**
   * Extract username from author element
   */
  static extractUsername(authorElement) {
    if (!authorElement) return 'unknown';

    // Try to get username from href first
    const href = authorElement.getAttribute('href');
    if (href) {
      const patterns = [
        /[?&](?:reporter|owner|author)=([^&]+)/,
        /profiles\.wordpress\.org\/([^\/]+)/
      ];

      for (const pattern of patterns) {
        const match = href.match(pattern);
        if (match) return match[1];
      }
    }

    // Fallback: extract from text content
    const text = authorElement.textContent.trim();
    return text.replace(/\s*(Core Committer|Lead Tester|Project Lead|Lead Developer|Emeritus Committer|Themes Committer).*$/, '');
  }
}
