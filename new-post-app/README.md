## Post App

### Project Structure

src/
│
├── app/ ← App bootstrap layer
│ ├── router.tsx
│ ├── store.ts
│ ├── hooks.ts
│ ├── providers.tsx
| ├── RootLayout.tsx
│
├── features/ ← BUSINESS FEATURES (most code lives here)
│ ├── auth/
│ │ ├── api/ ← API calls
│ │ ├── components/
│ │ ├── pages/
│ │ ├── authSlice.ts ← Redux slice
│ │ ├── authSelectors.ts
│ │ ├── authThunks.ts
│ │ ├── routes.tsx
│ │ └── types.ts
│ │
│ ├── posts/
│ │ ├── api/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── postsSlice.ts
│ │ ├── postsSelectors.ts
│ │ ├── postsThunks.ts
│ │ ├── routes.tsx
│ │ └── types.ts
│
├── layouts/
│ └── Layout.tsx
│
├── shared/ ← Reusable cross-feature code
│ ├── components/
│ ├── hooks/
│ ├── utils/
│ ├── constants/
│ └── types/
│
└── main.tsx
