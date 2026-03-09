import type { Notification } from 'shared/remote-types';

interface NotificationPayload {
  deeplink_path?: string;
  issue_title?: string;
  actor_user_id?: string;
  comment_preview?: string;
  old_status_id?: string;
  new_status_id?: string;
  assignee_user_id?: string;
}

export function getPayload(n: Notification): NotificationPayload {
  return (n.payload ?? {}) as NotificationPayload;
}

export function getDeeplinkPath(n: Notification): string | null {
  return getPayload(n).deeplink_path ?? null;
}

export function getNotificationMessage(n: Notification): string {
  const title = getPayload(n).issue_title ?? 'an issue';

  switch (n.notification_type) {
    case 'IssueCommentAdded':
      return `New comment on ${title}`;
    case 'IssueStatusChanged':
      return `Status changed on ${title}`;
    case 'IssueAssigneeChanged':
      return `You were assigned to ${title}`;
    case 'IssueDeleted':
      return `${title} was deleted`;
    default:
      return 'New notification';
  }
}
