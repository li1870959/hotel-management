const Mock = require('mockjs');

let List = [];

function pageList() {
    List = [];
    for (let i = 0; i < 100; i++) {
        List.push(
            Mock.mock({
                id: '@increment',
                'orderCount|100-500': 0,
                'money|1000-10000.2': 0
            })
        );
    }
    return List;
}

module.exports = [
    {
        url: '/finance/list',
        type: 'get',
        response: (config) => {
            const returnData = pageList();

            return {
                code: 0,
                data: returnData
            };
        }
    }
];
