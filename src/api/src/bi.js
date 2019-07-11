
let type = 'application/json'

export default {

  // 是否生效
  'make':{
    url:`/security/invoice/v1/make`,
    method:'post',
  },
  // 获取开票列表
  'list': {
    url: `/security/invoice/v1/list`,
    method: 'get',
  },
  'repeatList':{
      url: `/security/repeat/v1/list?type={type}`,
      method: 'get',
  },
  // 部门 - 查询
  'i_menu_system_depart':{
    url:`/security/depart/v1/query`,
    method:'get',
    contentType:type
  },

  // 部门 - 删除
  'i_menu_system_depart_delete':{
    url:`/security/depart/v1/delete`,
    method:'post',
    params: ['id'],
    contentType:type
  },

  // 部门 - 更新
  'i_menu_system_depart_update':{
    url:`/security/depart/v1/update`,
    method:'post',
    params: ['id','departName'],
    contentType:type
  },

    'test':{
        url:`/security/depart/v1/update`,
        method:'post',
        params: ['id','departName'],
        contentType:'application/x-www-form-urlencoded'
    },
}
