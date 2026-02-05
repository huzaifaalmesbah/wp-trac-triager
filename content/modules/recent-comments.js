/**
 * Recent Comments Module
 * Extracts and formats recent comment information
 */

import { DOMHelpers } from './dom-helpers.js';
import { ROLE_COLORS, SELECTORS } from './config.js';
import { ContributorHighlighter } from './contributor-highlighter.js';

export class RecentComments {
  constructor(contributorData = {}) {
    this.contributorData = contributorData;
  }

  /**
   * Get recent N comments from the page
   */
  get(count = 3) {
    const changes = DOMHelpers.querySelectorAll(SELECTORS.comments);
    if (changes.length === 0) return [];

    const recentComments = [];

    // Start from the end and go backwards
    for (let i = changes.length - 1; i >= 0 && recentComments.length < count; i--) {
      const comment = this.parseComment(changes[i]);
      if (comment) {
        recentComments.push(comment);
      }
    }

    return recentComments;
  }

  /**
   * Parse a single comment element
   */
  parseComment(change) {
    const commentId = change.id;
    if (!commentId) return null;

    // Extract comment number from ID
    const commentNumber = this.extractCommentNumber(commentId);
    if (!commentNumber) return null;

    // Extract author
    const authorElement = DOMHelpers.querySelector(SELECTORS.authorLink, change);
    const author = ContributorHighlighter.extractUsername(authorElement);

    // Check if author has a role
    const role = this.contributorData[author] || null;
    const roleColor = role ? (ROLE_COLORS[role]?.border || '#607D8B') : null;

    // Extract date
    const date = this.extractDate(change);

    return {
      number: commentNumber,
      author,
      role,
      roleColor,
      date,
      link: `#${commentId}`
    };
  }

  /**
   * Extract comment number from comment ID
   */
  extractCommentNumber(commentId) {
    if (commentId.startsWith('comment:')) {
      return commentId.replace('comment:', '');
    } else if (commentId.startsWith('trac-change-')) {
      const match = commentId.match(/trac-change-(\d+)-/);
      return match ? match[1] : null;
    }
    return null;
  }

  /**
   * Extract date from change element
   */
  extractDate(change) {
    const changeHeader = DOMHelpers.querySelector(SELECTORS.changeHeader, change);
    if (!changeHeader) return 'unknown';

    const headerText = changeHeader.textContent;
    const timeMatch = headerText.match(/(\d+\s+(?:years?|months?|days?|hours?|minutes?)\s+ago)/);

    return timeMatch ? timeMatch[1] : 'unknown';
  }
}
