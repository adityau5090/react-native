import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
  plugins: [expo()],
  database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: { 
    enabled: true, 
  }, 
  account: {
    accountLinking: {
    enabled: true,
    trustedProviders: ["github", "google", "emailAndPassword"],
    trustedOrigins: [
  "expoauthentication://",
  "exp://**",
]
  },
  },
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  }, 
  trustedOrigins: [
        "expoauthentication://",
        
        // Development mode - Expo's exp:// scheme with local IP ranges
        ...(process.env.NODE_ENV === "development" ? [
            "exp://",                      // Trust all Expo URLs (prefix matching)
            "exp://**",                    // Trust all Expo URLs (wildcard matching)
            "exp://192.168.*.*:*/**",      // Trust 192.168.x.x IP range with any port and path
        ] : [])
    ]
});