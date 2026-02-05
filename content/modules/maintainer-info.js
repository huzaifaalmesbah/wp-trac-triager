/**
 * Maintainer Info Module
 * Handles component maintainer information
 */

import { DOMHelpers } from './dom-helpers.js';
import { SELECTORS } from './config.js';

export class MaintainerInfo {
  constructor() {
    this.componentMaintainers = typeof COMPONENT_MAINTAINERS !== 'undefined' ? COMPONENT_MAINTAINERS : {};
    this.maintainerProfiles = typeof MAINTAINER_PROFILES !== 'undefined' ? MAINTAINER_PROFILES : {};
  }

  /**
   * Get maintainer information for the current ticket
   */
  getInfo() {
    const componentElement = DOMHelpers.querySelector(SELECTORS.componentField);
    if (!componentElement) return null;

    const component = componentElement.textContent.trim();
    const maintainers = this.componentMaintainers[component];

    if (!maintainers || maintainers.length === 0) {
      return null;
    }

    const maintainerList = maintainers.map(username => {
      const profile = this.maintainerProfiles[username];
      const displayName = profile ? profile.name : username;
      const profileUrl = profile ? profile.profile : `https://profiles.wordpress.org/${username}/`;
      const role = profile ? profile.role : '';
      const lastComment = this.findLastComment(username);

      return {
        username,
        displayName,
        profileUrl,
        role,
        lastComment
      };
    });

    return {
      component,
      maintainers: maintainerList
    };
  }

  /**
   * Find last comment by specific user
   */
  findLastComment(username) {
    const changes = DOMHelpers.querySelectorAll(SELECTORS.comments);

    // Search backwards (most recent first)
    for (let i = changes.length - 1; i >= 0; i--) {
      const change = changes[i];
      const authorElement = DOMHelpers.querySelector(SELECTORS.authorLink, change);

      if (authorElement && authorElement.textContent.trim() === username) {
        const commentId = change.id;
        const date = this.extractDate(change);

        return {
          link: `#${commentId}`,
          date
        };
      }
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
