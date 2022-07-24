package main

import "github.com/kaiiy/pretex/lib"

func main() {
	str := "\\begin{document}\ncscss\nipi\n\\end{document}"
	lib.ParseTexText(str)
}
