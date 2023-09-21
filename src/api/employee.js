import request from '@/utils/request';
// 员工查询
export const getempDataList = (params) => {
    return request({ url: '/employee/list', method: 'get', params: params });
};

// 职位查询
export const getPositionDataList = (params) => {
    return request({ url: '/employee/getPosition', method: 'get', params: params });
};
