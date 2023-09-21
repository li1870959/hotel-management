const Mock = require('mockjs');

let List = [];
const hotelPositions = ['前台经理', '客房服务员', '餐厅经理', '大堂副理', '行政总厨'];

function pageList(page, size) {
    List = [];
    for (let i = 0; i < Number(size); i++) {
        List.push(
            Mock.mock({
                id: '@increment',
                'positionName|1': hotelPositions,
                introduce: Mock.Random.paragraph()
            })
        );
    }
    return List;
}

module.exports = [
    {
        url: '/position/list',
        type: 'get',
        response: (config) => {
            const { page, size, positionName, introduce } = config.query;
            const returnData = pageList(page, size);

            return {
                code: 0,
                data: returnData.filter((v) => v.positionName.includes(positionName) && v.introduce.includes(introduce)),
                total: returnData && returnData.length
            };
        }
    }
    // {
    //     url: '/position/list',
    //     type: 'get',
    //     response: (config) => {
    //         return {
    //             code: 0,
    //             data: [
    //                 {
    //                     positionId: '1',
    //                     positionName: '前台经理'
    //                 },
    //                 {
    //                     positionId: '2',
    //                     positionName: '客房服务员'
    //                 },
    //                 {
    //                     positionId: '3',
    //                     positionName: '餐厅经理'
    //                 },
    //                 {
    //                     positionId: '4',
    //                     positionName: '大堂副理'
    //                 },
    //                 {
    //                     positionId: '5',
    //                     positionName: '行政总厨'
    //                 }
    //             ],
    //             message: 'success'
    //         };
    //     }
    // }
];
