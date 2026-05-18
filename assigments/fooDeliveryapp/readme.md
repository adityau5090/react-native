        (App Start)
             |
     -------------------
     |                 |
 Not Logged In     Logged In
     |                 |
  Login Stack      Main App
                        |
                Bottom Tabs
      ---------------------------------
      |        |        |            |
     Home    Search   Orders     Profile
      |
  Restaurant Stack
      |
  -------------------------
  |           |           |
Home → Restaurant → Cart







ROOT STACK
│
├── AuthStack
│     └── Login Screen
│
└── MainApp (Tabs)
      │
      ├── HomeTab
      │     └── RestaurantStack
      │           ├── Home Screen
      │           ├── Restaurant Detail
      │           └── Cart
      │
      ├── SearchTab
      │
      ├── OrdersTab
      │
      └── ProfileTab
            └── Drawer
                  ├── Profile Screen
                  ├── My Orders
                  ├── Settings
                  ├── Help
                  └── Logout

