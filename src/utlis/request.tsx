import axios from 'axios';

// URL config
const domain = 'http://192.168.12.190:60000';
const URL = {
  getYml: domain + '/getYamlList',
  getDetail: domain + '/getYamlDetail',
};

const Request = (data: object, success: any) => {
  axios({
    ...data
  }).then(success);
};

export {
  URL,
  Request
}