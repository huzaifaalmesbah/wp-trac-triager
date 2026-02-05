// WordPress Release Schedule Data
// This file contains the release schedules for different WordPress major versions

const WP_RELEASE_SCHEDULES = {
  '7.0': {
    version: '7.0',
    finalRelease: '2026-04-09',
    releasePageUrl: 'https://make.wordpress.org/core/7-0/',
    releaseSquadUrl: 'https://make.wordpress.org/core/2026/01/22/announcing-the-wordpress-7-0-release-squad/',
    milestones: [
      {
        name: 'Alpha Begins',
        date: '2025-11-12',
        type: 'alpha'
      },
      {
        name: 'Beta 1',
        date: '2026-02-19',
        type: 'beta'
      },
      {
        name: 'Beta 2',
        date: '2026-02-26',
        type: 'beta'
      },
      {
        name: 'Beta 3',
        date: '2026-03-05',
        type: 'beta'
      },
      {
        name: 'Beta 4',
        date: '2026-03-12',
        type: 'beta'
      },
      {
        name: 'RC1',
        date: '2026-03-19',
        type: 'rc'
      },
      {
        name: 'RC2',
        date: '2026-03-26',
        type: 'rc'
      },
      {
        name: 'RC3',
        date: '2026-04-02',
        type: 'rc'
      },
      {
        name: 'Dry Run',
        date: '2026-04-08',
        type: 'pre-release'
      },
      {
        name: 'WordPress 7.0',
        date: '2026-04-09',
        type: 'final'
      }
    ]
  }
};

// Helper function to get the next upcoming milestone
function getNextMilestone(version) {
  const schedule = WP_RELEASE_SCHEDULES[version];
  if (!schedule) return null;

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Start of today

  // Find the next milestone that hasn't passed yet
  for (const milestone of schedule.milestones) {
    const milestoneDate = new Date(milestone.date + 'T00:00:00');
    if (milestoneDate >= now) {
      return {
        ...milestone,
        dateObj: milestoneDate
      };
    }
  }

  // All milestones have passed
  return null;
}

// Helper function to calculate days until a date
function daysUntil(dateString) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const targetDate = new Date(dateString + 'T00:00:00');
  const diffTime = targetDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

// Helper function to format date in a readable way
function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
