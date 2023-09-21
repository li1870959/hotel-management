const Mock = require('mockjs');

const Random = require('mockjs').Random;
let List = [];
const hotelPositions = ['前台经理', '客房服务员', '餐厅经理', '大堂副理', '行政总厨'];

function pageList(page, limit) {
    List = [];
    for (let i = 0; i < Number(limit); i++) {
        List.push(
            Mock.mock({
                id: '@increment',
                number: '@name',
                headImg: Random.image('200x100', '#894FC4', 'png', '!'),
                readName: '@cname',
                'positionName|1': hotelPositions,
                telPhone: /^1[3456789]\d{9}$/,
                'sex|1': ['男', '女'],
                birthday: '@date("yyyy-MM-dd")',
                email: /^[a-zA-Z0-9_-]+@[a-z]+\.[a-z]{2,4}$/,
                weiXin: /^[a-z]{3,8}$/,
                'qq|100000000-999999999': 0
            })
        );
    }
    return List;
}

module.exports = [
    {
        url: '/employee/list',
        type: 'get',
        response: (config) => {
            const { page, limit, number, readName } = config.query;
            const returnData = pageList(page, limit);

            return {
                code: 0,
                data: returnData.filter((v) => v.number.includes(number) && v.readName.includes(readName)),
                total: returnData && returnData.length
            };
        }
    },
    {
        url: '/employee/getPosition',
        type: 'get',
        response: (config) => {
            return {
                code: 0,
                data: [
                    {
                        positionId: '1',
                        positionName: '前台经理'
                    },
                    {
                        positionId: '2',
                        positionName: '客房服务员'
                    },
                    {
                        positionId: '3',
                        positionName: '餐厅经理'
                    },
                    {
                        positionId: '4',
                        positionName: '大堂副理'
                    },
                    {
                        positionId: '5',
                        positionName: '行政总厨'
                    }
                ],
                message: 'success'
            };
        }
    }
];
