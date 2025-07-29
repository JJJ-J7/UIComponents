# UI Components

## PWAとしての注意点
キャッシュ対象のファイルが増減したときは、
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
   git remote add uic https://github.com/JJJ-J7/UIComponents.git   # uic リモートリポジトリ名。任意の文字列。プロジェクトごとに一回のみ
   ```

2. 別リポジトリで、コミットする（余計なものが混ざらないように注意）

3. cherry-pickしたいコミットのハッシュを調べる

   コミットログを見ればわかる

5. cherry-pickで元リポジトリのブランチに反映

   おそらくプロジェクトごとに一回のみの設定：
   ```powershell
   git fetch uic
   git checkout uic/main -B uic-main    # uic の main ブランチに移動
   ```

   続けて以下のコマンドをうつか、
   UIで左下のブランチを「uic-main」に変更した状態で、Source Control(左端の3番目。コミットするところ)
   → GRAPH で「origin/main」 を選択した状態で右クリック
   → cherrypick でもいける。
   完了後、ブランチを「main」に戻すこと
   ```powershell
   git cherry-pick <コミットハッシュ> 
   git push uic uic-main:main   # push して反映
   ```


