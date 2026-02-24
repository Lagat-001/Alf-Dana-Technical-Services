export interface UserProfile {
  name: string
  phone: string
  email?: string
}

export interface AuthCredential {
  method: 'email' | 'phone'
  identifier: string
  password: string
  name: string
}

export type RequestStatus = 'Quote Sent' | 'Assigned' | 'In Progress' | 'Completed'

export interface QuoteRequest {
  id: string
  service: string
  name: string
  phone: string
  message?: string
  date: string
  status: RequestStatus
}

export interface AppNotification {
  id: string
  title: string
  body: string
  date: string
  read: boolean
}

const KEYS = {
  profile: 'alfdana-profile',
  requests: 'alfdana-requests',
  notifications: 'alfdana-notifications',
  credential: 'alfdana-credential',
  session: 'alfdana-session',
} as const

function safeGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable (private mode, storage full)
  }
}

export const AppStorage = {
  // ── Profile ──────────────────────────────────────────────
  getProfile(): UserProfile | null {
    return safeGet<UserProfile>(KEYS.profile)
  },
  saveProfile(profile: UserProfile): void {
    safeSet(KEYS.profile, profile)
  },
  clearProfile(): void {
    try { localStorage.removeItem(KEYS.profile) } catch { /* noop */ }
  },

  // ── Requests ─────────────────────────────────────────────
  getRequests(): QuoteRequest[] {
    return safeGet<QuoteRequest[]>(KEYS.requests) ?? []
  },
  saveRequest(req: QuoteRequest): void {
    const existing = AppStorage.getRequests()
    // Prepend so newest shows first
    safeSet(KEYS.requests, [req, ...existing])
  },
  clearRequests(): void {
    try { localStorage.removeItem(KEYS.requests) } catch { /* noop */ }
  },

  // ── Notifications ─────────────────────────────────────────
  getNotifications(): AppNotification[] {
    return safeGet<AppNotification[]>(KEYS.notifications) ?? []
  },
  saveNotification(n: AppNotification): void {
    const existing = AppStorage.getNotifications()
    safeSet(KEYS.notifications, [n, ...existing])
  },
  markAllNotificationsRead(): void {
    const notifications = AppStorage.getNotifications().map((n) => ({ ...n, read: true }))
    safeSet(KEYS.notifications, notifications)
  },
  getUnreadCount(): number {
    return AppStorage.getNotifications().filter((n) => !n.read).length
  },

  // ── Auth Credential ───────────────────────────────────────
  saveCredential(c: AuthCredential): void {
    safeSet(KEYS.credential, c)
  },
  getCredential(): AuthCredential | null {
    return safeGet<AuthCredential>(KEYS.credential)
  },

  // ── Session ───────────────────────────────────────────────
  hasSession(): boolean {
    try {
      return localStorage.getItem(KEYS.session) === 'true'
    } catch {
      return false
    }
  },
  setSession(active: boolean): void {
    try {
      if (active) {
        localStorage.setItem(KEYS.session, 'true')
      } else {
        localStorage.removeItem(KEYS.session)
      }
    } catch { /* noop */ }
  },
  clearAuth(): void {
    try {
      localStorage.removeItem(KEYS.credential)
      localStorage.removeItem(KEYS.session)
    } catch { /* noop */ }
  },
}
