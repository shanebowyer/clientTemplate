export const environment = {
    "auth":             "https://auth.bitid.co.za:443",
    "appName":          "billing",
    "billing":          "https://billing.bitid.co.za:443",
    "production":       true,
    "clientIdAuth":     "000000000000000000000008",
    "scopes":[
        {'url':'/users/list','role':4},

        {'url':'/billing/admins/add','role':4},
        {'url':'/billing/admins/list','role':4},
        {'url':'/billing/admins/update','role':4},
        {'url':'/billing/admins/delete','role':4},
        {'url':'/billing/admins/isadmin','role':4},

        {'url':'/billing/stores/add','role':4},
        {'url':'/billing/stores/list','role':4},
        {'url':'/billing/stores/share','role':4},
        {'url':'/billing/stores/update','role':4},
        {'url':'/billing/stores/delete','role':4},
        {'url':'/billing/stores/unsubscribe','role':4},
        
        {'url':'/billing/departments/add','role':4},
        {'url':'/billing/departments/list','role':4},
        {'url':'/billing/departments/share','role':4},
        {'url':'/billing/departments/update','role':4},
        {'url':'/billing/departments/delete','role':4},
        {'url':'/billing/departments/unsubscribe','role':4},
    ],
    "roles": [
        {
            "value":        1,
            "description":  "Read"
        },
        {
            "value":        2,
            "description":  "Write"
        },
        {
            "value":        3,
            "description":  "Read/Write"
        },
        {
            "value":        4,
            "description":  "Admin"
        }
    ],
    "organizationOnly": [
        {
            "value":        0,
            "description":  "Anyone Can Share"
        },
        {
            "value":        1,
            "description":  "Organization Only"
        }
    ],
    "adminRoles": [
        {
            "role":        "viewStorePanel",
            "value":       false,
            "description": "View Store Panel"
        },
            {
            "role":        "viewDepartmentPanel",
            "value":       false,
            "description": "View Department Panel"
        },
        {
            "role":        "viewAdminPanel",
            "value":       false,
            "description": "View Admin Panel"
        },
        {
            "role":        "viewMainAdminPanel",
            "value":       false,
            "description": "View Main Admin Panel"
        },
        {
            "role":        "createAdminAccount",
            "value":       false,
            "description": "Create Admin account"
        },
        {
            "role":        "listAdminAccount",
            "value":       false,
            "description": "Get All Admins"
        },
        {
            "role":        "updateAdminAccount",
            "value":       false,
            "description": "Update An Admin"
        },
        {
            "role":        "removeAdminAccount",
            "value":       false,
            "description": "Remove An Admin"
        }
    ]
};