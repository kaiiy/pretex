# pretex

| Before  | After |
| ------- | ----- |
| , or 、 | ，    |
| . or 。 | ．    |

# Installation

`yarn add -D kaiiy/pretex`

# Usages

## Command Line

`yarn pretex [targetDir/srcFileName] (-o [distFileName](default: out.tex))`

example: `yarn pretex ./src/main.tex -o output.tex`

## API

```js
import { parseTexStr } from "@kaiiy/pretex"

const distText = parseTexStr(srcText)
```

# Conversion Rules

1. 変換対象は`\begin{document} ..... \end{document}`内の文字
2. コメント行`% ......`は無変換
3. コマンド行`\......`は無変換 (例外: `caption`, `cite`)
4. コマンドブロック`\begin{} ...... \end{}`は無変換 (例外: `enumerate`, `itemize`)
5. アルファベット、数字と`.`が連続する場合は無変換
