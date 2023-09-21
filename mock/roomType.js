const Mock = require('mockjs');

let List = [];
const roomTypeList = ['标准间', '豪华间', '套房', '家庭房', '行政房', '主题套房', '海景房'];
const bedTypeList = ['单人床', '双人床', '大床/特大床', '双层床', '加床/折叠床'];

function pageList(page, size) {
    List = [];
    for (let i = 0; i < Number(size); i++) {
        List.push(
            Mock.mock({
                id: '@increment',
                'roomTypeName|1': roomTypeList,
                'floor|1-20': 1,
                'area|10-50': 1,
                'peopleNum|1-4': 1,
                'price|1-10': 1,
                'bedType|1': bedTypeList,
                bedDetail: '@sentence(5, 10)',
                'jiaChuang|1': ['是', '否'],
                facilities: '@sentence(10, 20)',
                'imageList|10': ['@image("200x200", "@color", "@city")']
            })
        );
    }
    return List;
}

module.exports = [
    {
        url: '/roomType/list',
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
    },
    {
        url: '/room/roomType',
        type: 'get',
        response: (config) => {
            return {
                code: 0,
                data: roomTypeList
            };
        }
    },
    {
        url: '/room/bedType',
        type: 'get',
        response: (config) => {
            return {
                code: 0,
                data: bedTypeList
            };
        }
    }
];
