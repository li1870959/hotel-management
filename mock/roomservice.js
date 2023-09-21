const Mock = require('mockjs');

let List = [];
let historyList = [];
const hotelPositions = ['前台接待', '客房服务', '餐饮服务', '洗衣/干洗服务', '行李及行程安排服务', '礼宾服务'];

function pageList(page, size) {
    List = [];
    for (let i = 0; i < Number(size); i++) {
        List.push(
            Mock.mock({
                id: '@increment',
                employeeName: '@cname',
                'categoryName|1': hotelPositions,
                roomNumber: '@integer(100, 500)',
                createTime: '@datetime',
                remark: '@cword(5, 10)'
            })
        );
    }
    return List;
}
function pageHistoryList(page, size) {
    historyList = [];
    for (let i = 0; i < Number(size); i++) {
        historyList.push(
            Mock.mock({
                id: '@increment',
                roomNumber: '@integer(100, 500)',
                employeeName: '@cname',
                'categoryName|1': hotelPositions,
                serviceStartTime: '@datetime',
                serviceEndTime: '@datetime'
            })
        );
    }
    return historyList;
}

module.exports = [
    {
        url: '/roomService/listHistory',
        type: 'get',
        response: (config) => {
            const { page, size } = config.query;
            const historyData = pageHistoryList(page, size);

            return {
                code: 0,
                data: historyData,
                total: historyData && historyData.length
            };
        }
    },
    {
        url: '/roomService/list',
        type: 'get',
        response: (config) => {
            const { page, size } = config.query;
            const returnData = pageList(page, size);

            return {
                code: 0,
                data: returnData,
                total: returnData && returnData.length
            };
        }
    }
];
