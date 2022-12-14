export interface PushNotification {
    id: number;
    title: string | null;
    message: string | null;
    data: Record<string, any> | null;
    url: string | null;
    actionId: string | null;
}
