# Games
キャッシュ対象のファイルが変更になったときは、
コミット前に、ターミナルで node .\lib\generate_offline.js を実行してurlsTOCache.json を更新すること


## 別プロジェクトでの変更を元リポジトリに反映する方法（clone & cherry-pick）

0. Github 上で、このテンプレートをもとに新規リポジトリを作る

1. 新しいリポジトリをcloneする

   親フォルダで
   ```powershell
   git clone https://github.com/あなたのユーザー名/新リポジトリ名.git
   ```

2. 変更をコミット＆pushする（新リポジトリで作業・コミット・push）

3. 元のリポジトリをremoteとして追加する

   ```powershell
   git remote add original https://github.com/あなたのユーザー名/元リポジトリ名.git
   git fetch original
   ```

4. cherry-pickしたいコミットのハッシュを調べる

   ```powershell
   git log --oneline
   ```

5. cherry-pickで元リポジトリのブランチに反映

   ```powershell
   git checkout main  # 元リポジトリのmainブランチに移動
   git cherry-pick <コミットハッシュ>
   ```

6. 必要ならpush

   ```powershell
   git push origin main
   ```

この手順で、新リポジトリでの特定の変更だけを元リポジトリに反映できます。

