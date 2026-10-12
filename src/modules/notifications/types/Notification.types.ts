export interface StoredNotification {
  id: string;
  title: string;
  body?: string;
  imageUrl?: string;
  receivedAt: number;
  isRead?: boolean;
  // only advisory notifications have this; it makes the card tappable
  advisory?: AdvisoryNotificationLink;
}

export interface AdvisoryNotificationLink {
  orchardProfileId: number;
  recipientId?: string;
}
