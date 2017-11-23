import _ from 'underscore';

import * as config from '../../store/globalConfig'
import md5 from "react-native-md5";
var baseUrl = config.baseUrl;


export async function login(email, password) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', request.responseText);
      } else {
        console.warn('error');
      }
    };
    console.log(md5.str_md5(password))
    request.open('GET', 'http://orm.vn:2930/LoginApi.aspx?username=admin@orm.vn&pass=InfoRe28111');
    request.send();
    // return await this._fetch({
    //         method: 'GET',
    //         url: baseUrl + 'LoginApi.aspx?username=' + email + '&pass=' + password,
    //         // body: {
    //         //   email: email,
    //         //   password: password
    //         // }
    //     })
    //     .then((res) => {
    //         if (res.status === 200 || res.status === 201) {
    //             return res.json
    //         } else {
    //             throw (res.json)
    //         }
    //     })
    //     .catch((error) => {
    //         throw (error)
    //     })
}

export async function _fetch (opts) {
    opts = _.extend({
        method: 'GET',
        url: null,
        body: null,
        callback: null
    }, opts);

    var reqOpts = {
        method: opts.method,
        headers: {
        }
    };

    if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
        reqOpts.headers['Accept'] = 'application/json';
        reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
        reqOpts.body = JSON.stringify(opts.body)
    }

    let url = baseUrl + opts.url;
    //console.log(url)
    let res = {};

    let response = await fetch(url, reqOpts);
    //console.log(response);
    res.status = response.status;
    res.code = response.code;

    return response.json()
        .then((json) => {
            res.json = json;
            return res
        })
}
