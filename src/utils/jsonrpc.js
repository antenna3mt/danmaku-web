import request from './request';

const url = 'http://danmaku.solidmatrices.com/api';


function jsonrpc_request(url, method, params, id = 1) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: id
    })
  }).then(({data}) => {
    if (data.result === undefined) {
      throw data.error.message;
    } else {
      return data.result;
    }
  });
}

export default function (method, params) {
  return jsonrpc_request(url, method, params);
}
