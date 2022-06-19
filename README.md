# pretex

| 変換前   | 変換後 |
| -------- | ------ |
| 、  OR , | ，     |
| . OR 。  | ．     |

# install

`yarn add @kaiiy/pretex`

# how to use

`yarn pretex [targetDir/srcFileName] (-o [distFileName](default: out.tex))`

example: `yarn pretex ./src/main.tex -o output.tex`

# rules

1. 変換対象は`\begin{document} ..... \end{document}`内の文字
2. コメント行`% ......`は無視
3. コマンド行`\......`は無視 (例外: `caption`, `cite`)
4. コマンドブロック`\begin{} ...... \end{}`は無視 (例外: `enumerate`, `itemize`)
