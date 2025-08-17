# Punihoppe プロジェクト概要

## プロジェクトの目的
Punihoppe は SvelteKit で構築されたWebアプリケーションです。
ユーザーのポートフォリオ作成・管理機能を提供し、Google認証、画像アップロード、コンピレーション機能などを含む包括的なWebサービスです。

## 主な機能
- ユーザー認証（Google OAuth2）
- ポートフォリオ作成・管理
- 画像アップロード・管理
- ユーザープロフィール管理
- コンピレーション機能
- 検索機能
- お気に入り機能

## 技術スタック
- **フロントエンド**: SvelteKit + Svelte 5
- **型システム**: TypeScript
- **スタイリング**: TailwindCSS + Shadcn/ui (bits-ui)
- **認証**: @auth/sveltekit + Google OAuth2
- **バックエンド**: SvelteKit Server-side
- **データベース**: Firebase
- **ストレージ**: Google Cloud Storage
- **デプロイ**: Node.js (adapter-node)

## 開発環境
- Node.js: v20.0.0
- npm: v9.6.5
- Git: origin https://github.com/tomoakari/punihoppe.git