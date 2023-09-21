import request from '@/utils/request';
// 职位查询
export const getPositionData = (params) => {
    return request({ url: '/position/list', method: 'get', params: params });
};

