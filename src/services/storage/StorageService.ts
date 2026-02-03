import { STORAGE_PREFIX } from "@/config/flipCoinConfig";

export class StorageService {
    constructor(private prefix: string = STORAGE_PREFIX) { }

    get<T>(key: string, defaultValue: T): T {
        const fullKey = this.getKey(key);
        const stored = localStorage.getItem(fullKey);

        if (!stored) return defaultValue;

        try {
            return JSON.parse(stored) as T;
        } catch {
            return defaultValue;
        }
    }

    set<T>(key: string, value: T): void {
        const fullKey = this.getKey(key);
        localStorage.setItem(fullKey, JSON.stringify(value));
    }

    remove(key: string): void {
        const fullKey = this.getKey(key);
        localStorage.removeItem(fullKey);
    }

    clear(): void {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }

    private getKey(key: string): string {
        return `${this.prefix}_${key}`;
    }
}
