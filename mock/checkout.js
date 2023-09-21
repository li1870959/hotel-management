const Mock = require('mockjs');

let List = [];

function pageList(page, size) {
    List = [];
    for (let i = 0; i < Number(size); i++) {
        List.push(
            Mock.mock({
                id: '@increment',
                number: '@integer(100, 600)',
                checkinTime: '@datetime',
                'checkinDay|1-10': 1,
                checkoutTime: '@datetime',
                'money|100-1000': 1,
                expectCheckoutTime: '@datetime'
            })
        );
    }
    return List;
}

module.exports = [
    {
        url: '/checkout/list',
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
