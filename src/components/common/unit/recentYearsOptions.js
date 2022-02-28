/**
 * 获取最近几年选择集options
 * @param self this
 * @param years 截至当前年,几年
 * @returns {*[] }
 */
export default function recentYears(self,years) {
    var yearList = [];
    var date = new Date();
    let year = date.getFullYear(); //获取完整的年份(4位)
    for (let i = 0; i < years; i++) {
        let obj = {};
        obj.value = year-i;
        obj.label = year-i;
        yearList.push(obj);
    }
    return yearList;
}
