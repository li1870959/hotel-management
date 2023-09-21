import request from '@/utils/request';

// 查询客房列表
export const getroomList = (params) => {
    return request({ url: '/room/list', method: 'get', params: params });
};
// 查询客房类型
export const getAllRoomTypeList = (params) => {
    return request({ url: '/room/roomType', method: 'get', params: params });
};
// 查询床型列表
export const getCategoryList = (params) => {
    return request({ url: '/room/bedType', method: 'get', params: params });
};

// 新增客房列表
export const addroom = (params) => {
    return request({ url: '/HotelManagement/json/room/add', method: 'post', params: params });
};

// 根据ID查询客房列表
export const getroomById = (roomId) => {
    return request({ url: '/HotelManagement/json/room/getRoomById?roomId=' + roomId, method: 'get', params: roomId });
};

// 修改客房列表
export const updateroom = (params) => {
    return request({ url: '/HotelManagement/json/room/update', method: 'put', params: params });
};

// 删除客房列表
export const delroom = (roomId) => {
    return request({ url: '/HotelManagement/json/room/delete?roomId=' + roomId, method: 'delete', params: roomId });
};
