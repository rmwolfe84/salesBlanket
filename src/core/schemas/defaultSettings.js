// src/core/schemas/defaultSettings.js

export const DEFAULT_SETTINGS = {
    system: {
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: 'MM/DD/YYYY',
        autoSave: true,
        dataSync: true
    },
    notifications: {
        emailNotifications: false,
        textNotifications: false,
        appNotifications: true,
        quietHours: {
            start: '22:00',
            end: '07:00'
        }
    },
    appearance: {
        theme: 'light',
        fontSize: 'medium',
        colorScheme: 'default'
    },
    preferences: {
        defaultView: 'dashboard',
        startingPage: 'daily-view',
        timeFormat: '12h'
    }
};

// Helper to get a nested setting value
export function getDefaultSetting(path) {
    return path.split('.').reduce((obj, key) => 
        obj && obj[key] !== undefined ? obj[key] : null
    , DEFAULT_SETTINGS);
}

// Helper to check if a value matches default
export function isDefaultValue(path, value) {
    const defaultValue = getDefaultSetting(path);
    return JSON.stringify(value) === JSON.stringify(defaultValue);
}

// Helper to validate a setting path exists
export function isValidSettingPath(path) {
    return getDefaultSetting(path) !== null;
}