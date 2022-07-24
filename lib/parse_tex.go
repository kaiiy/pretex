package lib

import (
	"fmt"
	"regexp"
)

func ReplaceAllCommasAndPeriods(str string) string {
	reComma := regexp.MustCompile(`(,|、)( |　)*`)
	rePeriod := regexp.MustCompile(`(\W)(\.|。)( |　)*`)

	buf := reComma.ReplaceAllString(str, "，")
	result := rePeriod.ReplaceAllString(buf, "$1．")

	return result
}

func ParseTexText(srcText string) {
	reLines := regexp.MustCompile("\r\n|\n")
	srcLines := reLines.Split(srcText, -1)

	beginDocRe := regexp.MustCompile(`\\begin\{\s*document\s*\}`)
	endDocRe := regexp.MustCompile(`\\end\{\s*document\s*\}`)
	var beginIdx, endIdx int
	for i, v := range srcLines {
		bufBeginIdx := beginDocRe.FindIndex([]byte(v))
		bufEndIdx := endDocRe.FindIndex([]byte(v))

		if len(bufBeginIdx) > 0 {
			beginIdx = i
		} else if len(bufEndIdx) > 0 {
			endIdx = i
			break
		}
	}

	fmt.Println(beginIdx, endIdx)
}
