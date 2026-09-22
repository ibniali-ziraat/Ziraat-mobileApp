export interface StoredNotification {
  id: string;
  title: string;
  body?: string;
  imageUrl?: string;
  receivedAt: number;
  isRead?: boolean;
}
