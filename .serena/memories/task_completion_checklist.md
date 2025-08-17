# タスク完了時の実行項目

## 必須チェック項目

### 1. コード品質チェック
```bash
# TypeScript型チェック
npm run check

# フォーマットチェック
npm run lint
```

### 2. フォーマット適用
```bash
# コード自動フォーマット
npm run format
```

### 3. ビルドテスト
```bash
# プロダクションビルドが通ることを確認
npm run build
```

### 4. 動作確認
```bash
# 開発サーバーで動作確認
npm run dev

# プロダクションビルドの動作確認
npm run preview
```

## Git操作（必要に応じて）

### ブランチ運用
1. 新機能開発時は必ずブランチを切る
2. 作業完了後はマスターブランチにマージ

```bash
# 作業前にブランチ作成
git checkout -b feature/task-name

# 作業完了後
git add .
git commit -m "descriptive commit message"
git push origin feature/task-name

# マスターブランチにマージ（必要に応じて）
git checkout master
git pull origin master
git merge feature/task-name
git push origin master
```

## 本番デプロイ前チェック
- 環境変数の設定確認
- Firebase設定の確認
- Google Cloud Storage設定の確認
- ドメイン・SSL証明書の確認

## エラーハンドリング
- コンソールエラーがないことを確認
- ネットワークエラーの適切な処理
- 認証エラーの適切な処理