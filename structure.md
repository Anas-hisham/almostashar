src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   └── lawyers/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── client/
│   │   │   ├── cases/page.tsx
│   │   │   ├── requests/page.tsx
│   │   │   ├── offers/page.tsx
│   │   │   └── disputes/page.tsx
│   │   ├── lawyer/
│   │   │   ├── cases/page.tsx
│   │   │   ├── requests/page.tsx
│   │   │   └── offers/page.tsx
│   │   └── admin/
│   │       ├── disputes/page.tsx
│   │       └── escrows/page.tsx
│   ├── layout.tsx
│   └── providers.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── auth/
│   │   ├── auth-api.ts
│   │   ├── auth-slice.ts
│   │   ├── auth-thunks.ts
│   │   ├── auth-types.ts
│   │   └── components/
│   │
│   ├── cases/
│   │   ├── cases-api.ts
│   │   ├── cases-slice.ts
│   │   ├── cases-thunks.ts
│   │   ├── cases-types.ts
│   │   ├── cases-selectors.ts
│   │   └── components/
│   │
│   ├── requests/
│   ├── offers/
│   ├── lawyers/
│   ├── chats/
│   ├── disputes/
│   ├── documents/
│   ├── payments/
│   ├── escrows/
│   ├── withdrawals/
│   └── profile/
│
├── store/
│   ├── index.ts
│   ├── hooks.ts
│   └── provider.tsx
│
├── lib/
│   ├── axios.ts
│   ├── constants.ts
│   └── utils.ts
│
└── types/
    ├── api-response.ts
    └── common.ts