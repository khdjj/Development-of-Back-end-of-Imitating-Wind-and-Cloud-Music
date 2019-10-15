/*
 * @Descripttion: 实现对网易云音乐参数的加密 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-20 15:26:12
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-14 20:57:39
 */

'use strict'


exports.getSearchData = function(type,s,limit,offset){
    let data = `{"csrf_token":"","hlposttag":"</span>","hlpretag":"<span class='s-fc7'>","limit":"${limit}","offset":"${offset}","s":"${s}","total":"true","type":"${type}"}`,
        rand ="8Nb0yBH0GKTKhom4",
        encSecKey = "043ab1b3ccb22ab76bf6b648d3e9adba255df4360befd419f63874c0ab17d8cbf0db5bc62f426b579b27d6fe2aa0a9c7d8cbf3d052d30ae883f2890064f42faf7cb79100b6c65139aa54f2b0bc53bd8c2cd3f78eee12be1366a8bbb26744da487b0257aca6c5f29189295e7a73bc47d6fcc03bbc960072c2da5e4620beb08450";
        console.log(JSON.parse(data));
        return d(data, '0CoJUm6Qyw8W8jud', rand, encSecKey);
 }

var crypto = require('crypto');
/**
 * id 为歌曲的id
 * type类型 song  歌曲 lyric 歌词,评论,歌单
*/
exports.aes = function (id, type, limit, offset) {
    var encSecKey,
        rand,
        data;
    if (type == 'song') {
        data = `{"encodeType":"aac","ids":"[${id}]","csrf_token":"","level":"standard"}`
        rand = 'YWuHRHqSLsNt0AP3';
        encSecKey = 'b5bff26f3a9b71e099e062e2a6f35fc9a23722ca891be869bd372b80f262236cef1a4169400b914837f3dfa71d8651e26e6708e76c26f57b5bad8b85575080d11ba68dc916e9cbea6cf95d9d5bfb89fcb8915f8b37f57d4376ea46c7c967d110c5c9e0e8fbf7889e30ab1ebce96a396197f780d525b76dc927d094ff01ca2a93';
    } else if (type == 'lyric') {
        data = `{csrf_token:"",id:${id},lv:-1,tv:-1}`;
        encSecKey = '041f44920916a3c9158fa40d9f313ba49d89b776de0f1b6ec775bfc3e3ef59951ce5c0bf849500dbc02cbaf26664bbce0b70ad99abb434b6adc711df72c863a4d31304feb109a4b7a104b10d91b13089d523cccbca20d807ade673c5c28a99ad70574798771d03f671e91f0eb395284a49b59ee2f578af53ff9be97aaeb8efb4';
        rand = 'O76mHocFkQQMZttn';
    } else if (type == "songComment") {
        data = `{"csrf_token": "","limit": ${limit},"offset": ${offset},"rid":"R_SO_4_${id}","total": "true"}`;
        encSecKey = 'd2e6fd544e1722ddcb879082aabafee5cf5024ca777bf660f0a62fd43ba740fc7592487033e885e9d5a97eba44daaa7c3fb2e02dc840a4d5287c60033c797419d34d940c2e6981dbbaf22bd2ec42395a99fb52b6ef3480a17175b5880c5e23005530070f6a9a808d966a43983bc9ced23fabbd7cf56c45a654c99210988656e8'
        rand = 'lZoDFqAWYHuFZDWY';
    } else if (type == "playListComment") {
        data = `{"csrf_token": "", "limit": ${limit},"offset": ${offset},"rid": "A_PL_0_${id}","total": "true"}`;
        encSecKey = '1ad71e651d6451d45a7ef7e30cc5eca024b6438bc719fdeab85de7bdfd77e99d65fa62b348dc08de95eed205e378410accee8fca968d8501c84505c3c8d20bb10b6190b6ca69b1395c11f6c78572cf11521f3acb11973b8150fbf830737a8b64e8b3a48bae183ad052dd8c0d7d7cb5435b6592f6168046e960ac1f16b98cbe30';
        rand = 'XjuXObTyl4LsPCmi';
    } else if (type == "mvComment") {
        data = `{"csrf_token": "", "limit": ${limit},"offset": ${offset},"rid": "R_MV_${id}","total": "true"}`;
        encSecKey = "adb5e012c78208521556d1ce41c1561f5ff2358654db186f7aa0ca34ad48298ea689f4f1d2dfb90032212f620bb7b80874ff4950137099fedbd20cf054276912b92898e2981f960559a9b3f0f92798f26a5332b3c46f66c687956d81e9b71558cb7c1d60d6077c63cd22920e4bb61cc9bc6c140526a261ac4437bb6ede451c31";
        rand = 'jnkBpIpyYOdniK2J';
    } else if(type == "mv"){
        data = `{"csrf_token": "", "id": ${id},"r":"1080"}`;
        rand = "1BvaqROTUIinHgJF";
        encSecKey = "4e61ff3c2fb375a2a8d0006da7504bfefd24f7ec42db4169793fa81edb307acea6b6ea474cc70e9b7767f7c011a7f9c13b86574d0569d90e5b84bae61689b840dfd1a47904138aec7a3d0e81021e6c8863b6d88526e96107e2543a1afa0c4dd9144db885bdfdae17da4826c6dfaccb5062e02049b3a72771ae5db13d38955f42";
    }
    console.log(data);
    return d(data, '0CoJUm6Qyw8W8jud', rand, encSecKey);
}

/**
* aes加密
* @param data 待加密内容
* @param key 必须为32位私钥
* @returns {string}
*/

function b(data, key) {
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-128-cbc', key, '0102030405060708');   //该方法使用指定的算法、密码与初始向量、来创建cipher对象 方法返回一个被创建的cipher对象。
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
function d(d, g, rand, encSecKey) {
    var h = {};
    return h.encText = b(d, g),
        h.encText = b(h.encText, rand),
        h.encSecKey = encSecKey,
        h
}