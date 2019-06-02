/*
 * @Descripttion: 实现对网易云音乐参数的加密 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-20 15:26:12
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 11:17:23
 */

'use strict'

var crypto = require('crypto');
 /**
  * id 为歌曲的id
  * type类型 song  歌曲 lyric 歌词
 */
 exports.aes = function(id,type){
     var encSecKey,
         rand,
         data;
    if(type == 'song'){
        data = `{"ids":"[${id}]","br":128000,"csrf_token":""}`
        rand = 'a8LWv2uAtXjzSfkQ';
        encSecKey = '2d48fd9fb8e58bc9c1f14a7bda1b8e49a3520a67a2300a1f73766caee29f2411c5350bceb15ed196ca963d6a6d0b61f3734f0a0f4a172ad853f16dd06018bc5ca8fb640eaa8decd1cd41f66e166cea7a3023bd63960e656ec97751cfc7ce08d943928e9db9b35400ff3d138bda1ab511a06fbee75585191cabe0e6e63f7350d6';
    }else if(type == 'lyric'){
        data = `{csrf_token:"",id:${id},lv:-1,tv:-1}`;
        encSecKey = '041f44920916a3c9158fa40d9f313ba49d89b776de0f1b6ec775bfc3e3ef59951ce5c0bf849500dbc02cbaf26664bbce0b70ad99abb434b6adc711df72c863a4d31304feb109a4b7a104b10d91b13089d523cccbca20d807ade673c5c28a99ad70574798771d03f671e91f0eb395284a49b59ee2f578af53ff9be97aaeb8efb4';
        rand = 'O76mHocFkQQMZttn';
    }else{
        return ;
    }
    return  d(data,'0CoJUm6Qyw8W8jud',rand,encSecKey);
 }

 /**
 * aes加密
 * @param data 待加密内容
 * @param key 必须为32位私钥
 * @returns {string}
 */

function b(data,key) {
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-128-cbc',key, '0102030405060708');   //该方法使用指定的算法、密码与初始向量、来创建cipher对象 方法返回一个被创建的cipher对象。
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));  //使用该对象的update方法来指定需要被加密的数据
    cipherChunks.push(cipher.final(cipherEncoding));  //可以使用cipher对象的final方法来返回加密数据。当该方法被调用时，任何cipher对象中所缓存的数据都将被加密。在使用了cipher对象的final方法
    return cipherChunks.join('');
}


/**
 * 
 * @param {*} d 要加密的数据
 * @param {*} g  //为常数，不需要改变
 * @param {*} rand  //生成的16位随机数
 * @param {*} encSecKey  //通过rsa加密得到的数据
 */
function d(d,g,rand,encSecKey) {
    var h = {};
    return h.encText = b(d, g),
    h.encText = b(h.encText, rand),
    h.encSecKey =  encSecKey,  
    h
}