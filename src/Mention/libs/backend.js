/**
 * Created by vjtc0n on 1/10/17.
 */
import _ from 'underscore';

import * as config from '../../store/globalConfig'
var XMLHttpRequestPromise = require('xhr-promise');
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

    request.open('GET', 'http://orm.vn:2930/LoginApi.aspx?username=admin@orm.vn&pass=InfoRe28111');
    request.send();
}

export async function getAllProjects(user_id, user_name, password) {
    var xhrPromise = new XMLHttpRequestPromise();

    return await xhrPromise.send({
        method: 'GET',
        url: 'http://orm.vn:2930/ProjectListApi.aspx?userId='+ user_id +'&username='+ user_name +'&pass='+ password +''
        //url: 'http://orm.vn:2930//ProjectListApI.aspx?userId='+ user_id +'username='+ user_name +'&pass=' + password + ''
    })
        .then((results) => {
            if (results.status !== 200) {
                throw new Error('request failed');
            } else {
                //console.log(JSON.parse(results.responseText))
                return JSON.parse(results.responseText)
            }


        })
        .catch((e) => {
            console.log('XHR error');
            // ...
        });
}

export async function getAllMentions(key, user_name, password, p, rt, se) {
    var xhrPromise = new XMLHttpRequestPromise();
    //log('http://orm.vn:2930/PagingApi.aspx?key='+ key +'&username='+ user_name +'&pass='+ password +''+)
    return await xhrPromise.send({
        method: 'GET',
        url: 'http://orm.vn:2930/PagingApi.aspx?key='+ key + '&se=' + se + '&rt=' + rt + '&p='+ p +'&username='+ user_name +'&pass='+ password +''
        //url: 'http://orm.vn:2930//ProjectListApI.aspx?userId='+ user_id +'username='+ user_name +'&pass=' + password + ''
    })
        .then((results) => {
            if (results.status !== 200) {
                throw new Error('request failed');
            } else {
                data = results.responseText.substring(16, results.responseText.length - 1);
                return JSON.parse(data)
            }


        })
        .catch((e) => {
            console.log('XHR error');
            // ...
        });
}

export async function getAllAnalysis(key, user_name, password) {
    var xhrPromise = new XMLHttpRequestPromise();

    return await xhrPromise.send({
        method: 'GET',
        url: 'http://orm.vn:2930/PagingApi.aspx?key='+ '[{"main_keyword":"smcc","require_keywords":"","exclude_keywords":""}]' +'&username=admin@orm.vn&pass=1b4727a96eb05921e68228341642b529'
        //url: 'http://orm.vn:2930//ProjectListApI.aspx?userId='+ user_id +'username='+ user_name +'&pass=' + password + ''
    })
        .then((results) => {
            if (results.status !== 200) {
                throw new Error('request failed');
            } else {
                data = results.responseText.substring(16, results.responseText.length - 1);
                return JSON.parse(data)
            }


        })
        .catch((e) => {
            console.log('XHR error');
            // ...
        });
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
