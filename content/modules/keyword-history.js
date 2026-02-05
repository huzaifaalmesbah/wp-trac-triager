/**
 * Keyword History Module
 * Extracts keyword change history from ticket
 */

import { DOMHelpers } from './dom-helpers.js';
import { SELECTORS } from './config.js';

export class KeywordHistory {
  /**
   * Extract keyword history from change log
   */
  static extract() {
    const history = {};
    const changes = DOMHelpers.querySelectorAll(SELECTORS.comments);

    changes.forEach(change => {
      const changeItems = DOMHelpers.querySelectorAll(SELECTORS.changeItems, change);

      changeItems.forEach(item => {
        const text = item.textContent;

        // Look for keyword changes
        if (text.includes('Keywords') && (text.includes('added') || text.includes('removed'))) {
          const match = text.match(/Keywords?\s+(.+?)\s+(added|removed)/);

          if (match) {
            const keywordStr = match[1].trim();
            const action = match[2];
            const keywords = keywordStr.split(/\s+/);

            const commentId = change.id;
            const commentLink = commentId ? `#${commentId}` : null;
            const timeText = this.extractTime(change);
            const author = this.extractAuthor(change);

            keywords.forEach(kw => {
              if (action === 'added') {
                history[kw.toLowerCase()] = {
                  date: timeText,
                  commentLink,
                  author,
                  action: 'added'
                };
              }
            });
          }
        }
      });
    });

    return history;
  }

  /**
   * Extract time from change element
   */
  static extractTime(change) {
    const changeHeader = DOMHelpers.querySelector(SELECTORS.changeHeader, change);
    if (!changeHeader) return 'unknown';

    const headerText = changeHeader.textContent;
    const timeMatch = headerText.match(/(\d+\s+(?:years?|months?|days?|hours?|minutes?)\s+ago)/);

    return timeMatch ? timeMatch[1] : 'unknown';
  }

  /**
   * Extract author from change element
   */
  static extractAuthor(change) {
    const authorElement = DOMHelpers.querySelector(SELECTORS.authorLink, change);
    return authorElement ? authorElement.textContent.trim() : 'unknown';
  }
}
