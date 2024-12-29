// src/core/schemas/userSchema.js

export const USER_SCHEMA = {
    // System Fields
    system: {
        uid: { type: 'string', editable: false, required: true },
        email: { type: 'string', editable: false, required: true },
        role: { type: 'string', editable: false, required: true, default: 'pending' },
        status: { type: 'string', editable: false, required: true, default: 'active' },
        createdAt: { type: 'timestamp', editable: false, required: true },
        lastActive: { type: 'timestamp', editable: false, required: true }
    },
    
    // Basic Information
    basicInfo: {
        firstName: { type: 'string', editable: true, required: true },
        lastName: { type: 'string', editable: true, required: true },
        dateOfBirth: { type: 'date', editable: true, required: true },
        mobilePhone: { type: 'string', editable: true, required: true }
    },

    // Address Information
    address: {
        line1: { type: 'string', editable: true, required: true },
        line2: { type: 'string', editable: true, required: false },
        city: { type: 'string', editable: true, required: true },
        state: { type: 'string', editable: true, required: true },
        zip: { type: 'string', editable: true, required: true },
        country: { type: 'string', editable: true, required: true }
    },

    // Current Location
    location: {
        currentLocation: { type: 'geopoint', editable: true, required: false }
    },

    // User Settings & Preferences
    settings: {
        system: {
            language: { type: 'string', editable: true, required: true, default: 'en' },
            timezone: { 
                type: 'string', 
                editable: true, 
                required: true, 
                default: () => Intl.DateTimeFormat().resolvedOptions().timeZone 
            },
            dateFormat: { type: 'string', editable: true, required: true, default: 'MM/DD/YYYY' },
            autoSave: { type: 'boolean', editable: true, required: true, default: true },
            dataSync: { type: 'boolean', editable: true, required: true, default: true }
        },
        notifications: {
            emailNotifications: { type: 'boolean', editable: true, required: true, default: false },
            textNotifications: { type: 'boolean', editable: true, required: true, default: false },
            appNotifications: { type: 'boolean', editable: true, required: true, default: true },
            quietHours: {
                start: { type: 'string', editable: true, required: true, default: '22:00' },
                end: { type: 'string', editable: true, required: true, default: '07:00' }
            }
        },
        appearance: {
            theme: { type: 'string', editable: true, required: true, default: 'light' },
            fontSize: { type: 'string', editable: true, required: true, default: 'medium' },
            colorScheme: { type: 'string', editable: true, required: true, default: 'default' }
        },
        preferences: {
            defaultView: { type: 'string', editable: true, required: true, default: 'dashboard' },
            startingPage: { type: 'string', editable: true, required: true, default: 'daily-view' },
            timeFormat: { type: 'string', editable: true, required: true, default: '12h' }
        }
    },

    // Personal Information (optional)
    personal: {
        favoriteColor: { type: 'string', editable: true, required: false },
        favoriteHobby: { type: 'string', editable: true, required: false },
        favoriteFood: { type: 'string', editable: true, required: false }
    },

    // Family Information (optional)
    family: {
        children: {
            type: 'array',
            items: {
                firstName: { type: 'string' },
                birthday: { type: 'date' }
            },
            editable: true,
            required: false
        },
        pets: { type: 'array', items: { type: 'string' }, editable: true, required: false },
        partner: {
            firstName: { type: 'string', editable: true, required: false },
            lastName: { type: 'string', editable: true, required: false },
            birthday: { type: 'date', editable: true, required: false }
        }
    },

    // Goals
    goals: {
        personal: {
            oneYear: { type: 'string', editable: true, required: false },
            fiveYear: { type: 'string', editable: true, required: false },
            tenYear: { type: 'string', editable: true, required: false }
        },
        company: {
            oneYear: { type: 'string', editable: true, required: false },
            fiveYear: { type: 'string', editable: true, required: false },
            tenYear: { type: 'string', editable: true, required: false }
        }
    }
};

// Function to create a new user document with all defaults
export function createNewUserDocument(authUser) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { createdAt: timestamp, lastActive: timestamp };
    
    // Recursively build document using schema defaults
    function buildFromSchema(schema, target = {}) {
        Object.entries(schema).forEach(([key, field]) => {
            if (field.type === 'object') {
                target[key] = buildFromSchema(field.properties);
            } else if (field.default !== undefined) {
                target[key] = typeof field.default === 'function' ? field.default() : field.default;
            }
        });
        return target;
    }

    // Build full document from schema
    const userDoc = buildFromSchema(USER_SCHEMA);

    // Override with auth user data
    return {
        ...userDoc,
        'system.uid': authUser.uid,
        'system.email': authUser.email,
        createdAt: timestamp,
        lastActive: timestamp
    };
}

// Validate user document against schema
export function validateUserDocument(data) {
    const errors = [];
    
    function validateField(fieldData, fieldSchema, path) {
        if (fieldSchema.required && !fieldData) {
            errors.push(`${path} is required`);
        }
        
        if (fieldData && fieldSchema.type === 'date') {
            const date = new Date(fieldData);
            if (isNaN(date.getTime())) {
                errors.push(`${path} must be a valid date`);
            }
        }
    }
    
    function traverseSchema(data, schema, parentPath = '') {
        Object.entries(schema).forEach(([key, value]) => {
            const currentPath = parentPath ? `${parentPath}.${key}` : key;
            
            if (value.type === 'object') {
                traverseSchema(data[key] || {}, value.properties, currentPath);
            } else {
                validateField(data[key], value, currentPath);
            }
        });
    }
    
    traverseSchema(data, USER_SCHEMA);
    return errors;
}