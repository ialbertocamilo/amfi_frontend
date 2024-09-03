'use client';

interface StorageItem<T> {
    key: string;
    value: T;
}

interface StorageState<T> {
    items: StorageItem<T>[];
    loading: boolean;
    error: string | null;
}

export function storage<T>(storageKey: string) {
    let key = storageKey;

    const removeItem = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    };

    const get = () => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem(key);
            if (data) return JSON.parse(data);
        }
        return null;
    };

    const set = (data: any | null) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(data));
        }
    };

    return { get, set, removeItem };
}
