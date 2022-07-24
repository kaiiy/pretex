package lib

import "regexp"

func ReplaceAllCommasAndPeriods(str string) string {
	reComma := regexp.MustCompile(`(,|、)( |　)*`)
	rePeriod := regexp.MustCompile(`(\W)(\.|。)( |　)*`)

	buf := reComma.ReplaceAllString(str, "，")
	result := rePeriod.ReplaceAllString(buf, "$1．")

	return result
}
