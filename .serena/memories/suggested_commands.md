# 推奨コマンド集

## 開発コマンド

### 基本的な開発フロー
```bash
# 開発サーバー起動
npm run dev

# 開発サーバー起動（ブラウザ自動オープン）
npm run dev -- --open

# プロダクションビルド
npm run build

# プロダクションビルドのプレビュー
npm run preview
```

### コード品質管理
```bash
# TypeScript型チェック
npm run check

# TypeScript型チェック（ウォッチモード）
npm run check:watch

# コードフォーマット実行
npm run format

# コードフォーマットチェック（CI用）
npm run lint
```

### Git操作
```bash
# 現在の状況確認
git status

# リモートの最新を取得
git pull

# ブランチ作成・切り替え
git checkout -b feature/new-feature

# 変更をステージング
git add .

# コミット
git commit -m "commit message"

# プッシュ
git push origin branch-name
```

### システムコマンド（Linux）
```bash
# ファイル・ディレクトリ一覧
ls -la

# ディレクトリ移動
cd /path/to/directory

# ファイル検索
find . -name "*.svelte"

# 文字列検索
grep -r "search_term" src/

# プロセス確認
ps aux | grep node

# ポート使用状況確認
netstat -tulpn | grep :3000
```

### Node.js/npm管理
```bash
# 依存関係インストール
npm install

# 依存関係追加
npm install package-name

# 開発用依存関係追加
npm install -D package-name

# パッケージ削除
npm uninstall package-name

# キャッシュクリア
npm cache clean --force
```