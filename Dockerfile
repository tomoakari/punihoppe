# ビルドステージ
FROM node:18 as build

WORKDIR /app

# my-app-name ディレクトリの内容をコピー
COPY kawaraboard ./

# 依存関係のインストール
RUN npm install

# ビルドの実行
RUN npm run build

RUN ls -la


# 実行ステージ
FROM node:18-slim

WORKDIR /app

# ビルド成果物のコピー
# COPY --from=build /app/build ./build

COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "build"]