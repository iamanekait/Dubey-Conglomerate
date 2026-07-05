// Safe Storage utility to prevent security/access exceptions inside sandboxed cross-origin iframes
const memoryStorage: Record<string, string> = {};

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      console.warn(`[Safe Storage] localStorage.getItem blocked or unavailable for key "${key}". Using in-memory fallback.`, err);
      return memoryStorage[key] || null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      console.warn(`[Safe Storage] localStorage.setItem blocked or unavailable for key "${key}". Using in-memory fallback.`, err);
      memoryStorage[key] = value;
    }
  },

  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn(`[Safe Storage] localStorage.removeItem blocked or unavailable for key "${key}".`, err);
      delete memoryStorage[key];
    }
  }
};
