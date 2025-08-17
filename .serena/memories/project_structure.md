# プロジェクト構造

## ディレクトリ構造
```
punihoppe/
├── src/
│   ├── routes/           # ページルート
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── auth/         # 認証関連
│   │   ├── portfolio/    # ポートフォリオ
│   │   ├── mypage/       # マイページ
│   │   ├── search/       # 検索
│   │   ├── favorite/     # お気に入り
│   │   ├── compiling/    # コンピレーション
│   │   ├── about/        # アバウト
│   │   └── term/         # 利用規約
│   ├── lib/
│   │   ├── components/   # 再利用可能コンポーネント
│   │   │   ├── ui/       # UIコンポーネント（Shadcn/ui）
│   │   │   ├── header.svelte
│   │   │   └── footer.svelte
│   │   ├── server/       # サーバーサイドロジック
│   │   │   ├── auth.ts   # Google認証
│   │   │   ├── firebase.ts
│   │   │   ├── storage.ts
│   │   │   ├── session.ts
│   │   │   ├── user-store.ts
│   │   │   └── compilation-store.ts
│   │   ├── types/        # 型定義
│   │   │   ├── user.ts
│   │   │   └── compilation.ts
│   │   └── utils.ts
│   ├── app.html          # HTMLテンプレート
│   ├── app.css           # グローバルCSS
│   ├── app.d.ts          # アプリ型定義
│   └── hooks.server.ts   # サーバーフック
├── static/               # 静的ファイル
├── package.json
├── svelte.config.js      # Svelte設定
├── vite.config.ts        # Vite設定
├── tailwind.config.ts    # TailwindCSS設定
├── tsconfig.json         # TypeScript設定
├── Dockerfile            # Docker設定
└── README.md
```

## 重要なエントリーポイント
- **メインページ**: `src/routes/+page.svelte`
- **認証**: `src/routes/auth/`
- **サーバーロジック**: `src/lib/server/`
- **共通コンポーネント**: `src/lib/components/`
- **型定義**: `src/lib/types/`