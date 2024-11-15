interface Session {
    id: string;
    userData: any;
}

export const sessions = new Map<string, Session>();

export function getSession(sessionId: string): Session | undefined {
    return sessions.get(sessionId);
}

export function createSession(userData: any): string {
    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, { id: sessionId, userData });
    return sessionId;
}

export function deleteSession(sessionId: string): void {
    sessions.delete(sessionId);
}