/**
 * Configuration and Constants
 */

export const ROLE_COLORS = {
  'Project Lead': { border: '#9C27B0', bg: '#F3E5F5', badge: '#9C27B0' },
  'Lead Developer': { border: '#2196F3', bg: '#E3F2FD', badge: '#2196F3' },
  'Core Committer': { border: '#4CAF50', bg: '#E8F5E9', badge: '#4CAF50' },
  'Emeritus Committer': { border: '#FF9800', bg: '#FFF3E0', badge: '#FF9800' },
  'Lead Tester': { border: '#E91E63', bg: '#FCE4EC', badge: '#E91E63' },
  'Themes Committer': { border: '#00BCD4', bg: '#E0F7FA', badge: '#00BCD4' },
  'default': { border: '#607D8B', bg: '#ECEFF1', badge: '#607D8B' }
};

export const SELECTORS = {
  comments: '.change',
  authorLink: '.trac-author',
  changeHeader: 'h3.change',
  keywordsField: '#ticket td[headers="h_keywords"]',
  componentField: '#ticket td[headers="h_component"]',
  changeItems: 'ul.changes li'
};

export const STORAGE_KEYS = {
  sidebarPosition: 'wpt-sidebar-position',
  sidebarCollapsed: 'wpt-sidebar-collapsed'
};

export const BADGE_STYLES = {
  display: 'inline-block',
  color: 'white',
  padding: '2px 8px',
  borderRadius: '3px',
  fontSize: '11px',
  fontWeight: 'bold',
  marginLeft: '8px'
};
