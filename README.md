# Games
キャッシュ対象のファイルが変更になったときは、
コミット前に、ターミナルで node .\lib\generate_offline.js を実行してurlsTOCache.json を更新すること


## 別プロジェクトの作成方法

0. Github 上で、このテンプレートをもとに新規リポジトリを作る

1. 新しいリポジトリをcloneする

   親フォルダで
   ```powershell
   git clone https://github.com/あなたのユーザー名/新リポジトリ名.git
   ```

## 別リポジトリでの変更をこのリポジトリに反映させる方法

1. このリポジトリをリモートリポジトリとして追加する

   ```powershell
   git remote add uic https://github.com/JJJ-J7/UIComponets.git   # uic リモートリポジトリ名。任意の文字列。
   ```

2. 別リポジトリで、コミットする（余計なものが混ざらないように注意）

3. cherry-pickしたいコミットのハッシュを調べる

   コミットログを見ればわかる

5. cherry-pickで元リポジトリのブランチに反映

   ```powershell
   git fetch uic
   git checkout uic/main -B uic-main   # uic の main ブランチに移動
   git cherry-pick <コミットハッシュ>
   git push uic uic-main:main   # push して反映
   ```


