# コードスタイル・規約

## コーディングスタイル
- **Prettier設定**:
  - `useTabs: true` - タブを使用
  - `singleQuote: true` - シングルクォート使用
  - `trailingComma: "none"` - 末尾カンマなし
  - `printWidth: 100` - 行の最大長100文字

## プラグイン
- `prettier-plugin-svelte` - Svelteファイル用
- `prettier-plugin-tailwindcss` - TailwindCSS用

## 命名規則
- **ファイル命名**: 
  - ページ: `+page.svelte`
  - レイアウト: `+layout.svelte`
  - サーバーロジック: `+page.server.ts` / `+server.ts`
  - コンポーネント: kebab-case (例: `header.svelte`)

## ディレクトリ構造のエイリアス
```
$components: src/lib/components
$util: src/lib/util  
$server: src/lib/server
$stores: src/stores
```

## 型定義
- 全てのTypeScriptファイルで厳密な型定義を使用
- インターフェースを `src/lib/types/` に分類
- `UserProfile`, `CompilationSettings` などの主要な型を定義済み

## UIコンポーネント
- Shadcn/ui + bits-ui ベースのコンポーネントシステム
- `src/lib/components/ui/` に再利用可能なUIコンポーネント
- TailwindCSSでスタイリング