# Games
キャッシュ対象のファイルが変更になったときは、
コミット前に、ターミナルで node .\lib\generate_offline.js を実行してurlsTOCache.json を更新すること

# ここから別プロジェクトを作る方法

GitHubでfork（フォーク）する手順は以下の通りです。

1. GitHub上でforkする
    保存したいテンプレートリポジトリのGitHubページを開く
    右上の「Fork」ボタンをクリック
    自分のアカウントまたは所属Organizationを選択
    数秒で自分のアカウント配下に「コピー」が作成される

2. forkしたリポジトリをローカルにclone
git clone https://github.com/あなたのユーザー名/リポジトリ名.git
cd リポジトリ名

3. 開発・修正・コミット
通常のGitリポジトリと同じように開発・コミット・pushできる

4. 元リポジトリへ変更を提案（PR）
    変更を元のテンプレートリポジトリに反映したい場合は、GitHub上で「Pull Request」を作成
    PRは「Compare across forks」から作成できる

5. fork後の運用
fork元の更新を取り込みたい場合は、fork元をremote追加し、git fetch→git mergeやgit rebaseで取り込む

参考: fork元の更新を取り込む例
git remote add upstream https://github.com/元のユーザー名/リポジトリ名.git
git fetch upstream
git merge upstream/main

これでforkの基本的な流れはOKです。
forkは「テンプレートを自分用にカスタマイズしつつ、必要なら元にPRも送れる」便利な方法です。