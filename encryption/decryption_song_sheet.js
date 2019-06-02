/*
 * @Descripttion: 对歌单数据进行解密
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-30 15:03:39
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 20:14:41
 */
exports.decrySongSheet =  function(data,key,bte4i){
    let  crV6P  = k1x.bUp1x;
    return decodeURIComponent(crV6P(data, 'undefined' + key + bte4i));
}

let l1x = {}, k1x = {}, x1x = {}, a0x = {}, bh1x = {}, de3x = {};

l1x.rv7o = function () {
    return "网易云音乐"
}

//let
var csT7M = function (xL9C) {
    
    var bb1x = 0;
    bb1x += (xL9C[0] & 255) << 24;
    bb1x += (xL9C[1] & 255) << 16;
    bb1x += (xL9C[2] & 255) << 8;
    bb1x += xL9C[3] & 255;
    return bb1x
};

//let
var bmK3x = function (cZ3x, bmJ3x, sD7w, csO7H, bs1x) {
    
    if (cZ3x == null || cZ3x.length == 0) {
        return sD7w
    }
    if (sD7w == null) {
        throw new Error("1004")
    }
    if (cZ3x.length < bs1x) {
        throw new Error("1003")
    }
    for (var i = 0; i < bs1x; i++) {
        sD7w[csO7H + i] = cZ3x[bmJ3x + i]
    }
    return sD7w
};


//let
var ctN7G = function (bak7d) {
    
    if (bak7d == null) {
        return bak7d
    }
    var rq7j = [];
    var ctM7F = bak7d.length;
    for (var i = 0, bs1x = ctM7F; i < bs1x; i++) {
        rq7j[i] = CO0x(0 - bak7d[i])
    }
    return rq7j
};

//let
var cty7r = function (blL2x, UM5R) {
    
    blL2x = CO0x(blL2x);
    UM5R = CO0x(UM5R);
    return CO0x(blL2x ^ UM5R)
};

//let
var bTQ1x = function (UK5P, blV2x) {
    
    if (UK5P == null || blV2x == null || UK5P.length != blV2x.length) {
        return UK5P
    }
    var rq7j = [];
    var cts7l = UK5P.length;
    for (var i = 0, bs1x = cts7l; i < bs1x; i++) {
        rq7j[i] = cty7r(UK5P[i], blV2x[i])
    }
    return rq7j
};


//let
var csE7x = function (baC7v) {
    
    if (baC7v == null || baC7v.length % NI3x != 0) {
        throw new Error("1005")
    }
    var bns3x = [];
    var bk1x = 0;
    var csB7u = baC7v.length / NI3x;
    for (var i = 0; i < csB7u; i++) {
        bns3x[i] = [];
        for (var j = 0; j < NI3x; j++) {
            bns3x[i][j] = baC7v[bk1x++]
        }
    }
    return bns3x
};

//let
var CO0x = function (ix4B) {
    
    if (ix4B < -128) {
        return CO0x(128 - (-128 - ix4B))
    } else if (ix4B >= -128 && ix4B <= 127) {
        return ix4B
    } else if (ix4B > 127) {
        return CO0x(-129 + ix4B - 127)
    } else {
        throw new Error("1001")
    }
};

//let
var cut7m = function (ix4B, bk1x) {
    
    return CO0x(ix4B + bk1x)
};

//let
var cus7l = function (bag7Z, blw2x) {
    
    if (bag7Z == null) {
        return null
    }
    if (blw2x == null) {
        return bag7Z
    }
    var rq7j = [];
    var ctX7Q = blw2x.length;
    for (var i = 0, bs1x = bag7Z.length; i < bs1x; i++) {
        rq7j[i] = cut7m(bag7Z[i], blw2x[i % ctX7Q])
    }
    return rq7j
};


//ok
var csK7D = function (bs1x) {
    
    var bu1x = [];
    for (var i = 0; i < bs1x; i++) {
        bu1x[i] = 0
    }
    return bu1x
};

//ok
var csP7I = function (cZ3x, bmJ3x, bs1x) {
    
    var dK3x = [];
    if (cZ3x == null || cZ3x.length == 0) {
        return dK3x
    }
    if (cZ3x.length < bs1x) {
        throw new Error("1003")
    }
    for (var i = 0; i < bs1x; i++) {
        dK3x[i] = cZ3x[bmJ3x + i]
    }
    return dK3x
};
var bav7o = 64;
var bTr1x = 4;
//let
var csH7A = function (rA7t) {
    
    var bTq1x = [];
    if (rA7t == null || rA7t == undefined || rA7t.length == 0) {
        return csK7D(bav7o)
    }
    if (rA7t.length >= bav7o) {
        return csP7I(rA7t, 0, bav7o)
    } else {
        for (var i = 0; i < bav7o; i++) {
            bTq1x[i] = rA7t[i % rA7t.length]
        }
    }
    return bTq1x
};
var NI3x = 64;
//let
var bTk1x = function (NF3x, rA7t) {
    
    console.log("242        "+ NF3x.length);

    if (NF3x == null) {
        return null
    }
    if (NF3x.length == 0) {
        return []
    }
    if (NF3x.length % NI3x != 0) {
        throw new Error("1005")
    }
    rA7t = csH7A(rA7t);
    var bnM3x = rA7t;
    var bnN3x = csE7x(NF3x);
    var Ug5l = [];
    var cst6n = bnN3x.length;
    for (var i = 0; i < cst6n; i++) {
        var bnQ3x = bTm1x(bnN3x[i]);
        bnQ3x = bTm1x(bnQ3x);
        var bnT3x = bTQ1x(bnQ3x, bnM3x);
        var cso6i = cus7l(bnT3x, ctN7G(bnM3x));
        bnT3x = bTQ1x(cso6i, rA7t);
        bmK3x(bnT3x, 0, Ug5l, i * NI3x, NI3x);
        bnM3x = bnN3x[i]
    }
    var bTf1x = [];
    bmK3x(Ug5l, Ug5l.length - bTr1x, bTf1x, 0, bTr1x);
    var bs1x = csT7M(bTf1x);
    if (bs1x > Ug5l.length) {
        throw new Error("1006")
    }
    var rq7j = [];
    bmK3x(Ug5l, 0, rq7j, 0, bs1x);
    return rq7j
};


//ok
var bTy1x = function (cQ3x) {
    
    if (cQ3x == null || cQ3x == undefined) {
        return cQ3x
    }
    var Us5x = encodeURIComponent(cQ3x);
    var wD8v = [];
    var bTx1x = Us5x.length;
    for (var i = 0; i < bTx1x; i++) {
        if (Us5x.charAt(i) == "%") {
            if (i + 2 < bTx1x) {
                wD8v.push(bTI1x(Us5x.charAt(++i) + "" + Us5x.charAt(++i))[0])
            } else {
                throw new Error("1009")
            }
        } else {
            wD8v.push(Us5x.charCodeAt(i))
        }
    }
    return wD8v
};



var csJ7C = [82, 9, 106, -43, 48, 54, -91, 56, -65, 64, -93, -98, -127, -13, -41, -5, 124, -29, 57, -126, -101, 47, -1, -121, 52, -114, 67, 68, -60, -34, -23, -53, 84, 123, -108, 50, -90, -62, 35, 61, -18, 76, -107, 11, 66, -6, -61, 78, 8, 46, -95, 102, 40, -39, 36, -78, 118, 91, -94, 73, 109, -117, -47, 37, 114, -8, -10, 100, -122, 104, -104, 22, -44, -92, 92, -52, 93, 101, -74, -110, 108, 112, 72, 80, -3, -19, -71, -38, 94, 21, 70, 87, -89, -115, -99, -124, -112, -40, -85, 0, -116, -68, -45, 10, -9, -28, 88, 5, -72, -77, 69, 6, -48, 44, 30, -113, -54, 63, 15, 2, -63, -81, -67, 3, 1, 19, -118, 107, 58, -111, 17, 65, 79, 103, -36, -22, -105, -14, -49, -50, -16, -76, -26, 115, -106, -84, 116, 34, -25, -83, 53, -123, -30, -7, 55, -24, 28, 117, -33, 110, 71, -15, 26, 113, 29, 41, -59, -119, 111, -73, 98, 14, -86, 24, -66, 27, -4, 86, 62, 75, -58, -46, 121, 32, -102, -37, -64, -2, 120, -51, 90, -12, 31, -35, -88, 51, -120, 7, -57, 49, -79, 18, 16, 89, 39, -128, -20, 95, 96, 81, 127, -87, 25, -75, 74, 13, 45, -27, 122, -97, -109, -55, -100, -17, -96, -32, 59, 77, -82, 42, -11, -80, -56, -21, -69, 60, -125, 83, -103, 97, 23, 43, 4, 126, -70, 119, -42, 38, -31, 105, 20, 99, 85, 33, 12, 125];

//ok
var csA7t = function (bTo1x) {
    
    var qc6W = bTo1x >>> 4 & 15;
    var qe6Y = bTo1x & 15;
    var bk1x = qc6W * 16 + qe6Y;
    return csJ7C[bk1x]
};


//let
var bTm1x = function (bnG3x) {
    
    if (bnG3x == null) {
        return null
    }
    var bTl1x = [];
    for (var i = 0, bs1x = bnG3x.length; i < bs1x; i++) {
        bTl1x[i] = csA7t(bnG3x[i])
    }
    return bTl1x
};



//let
k1x.crT6N = function (bok3x, K1x) {
    console.log("331    "+bok3x.length);
    var boe3x = bTk1x(bok3x, bTy1x(K1x));
    var Jz2x = new String(bTM1x(boe3x));
    var zF9w = [];
    var boj3x = Jz2x.length / 2;
    var bk1x = 0;
    for (var i = 0; i < boj3x; i++) {
        zF9w.push("%");
        zF9w.push(Jz2x.charAt(bk1x++));
        zF9w.push(Jz2x.charAt(bk1x++))
    }
    return zF9w.join("")
}


//ok
var bTM1x = function (wD8v) {
    
    var bs1x = wD8v.length;
    if (wD8v == null || bs1x < 0) {
        return new String("")
    }
    var NQ3x = [];
    for (var i = 0; i < bs1x; i++) {
        NQ3x.push(ctp7i(wD8v[i]))
    }
    return NQ3x.join("")
};

var bTP1x = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
var ctp7i = function(dr3x) {
    
    var NQ3x = [];
    NQ3x.push(bTP1x[dr3x >>> 4 & 15]);
    NQ3x.push(bTP1x[dr3x & 15]);
    return NQ3x.join("")
}
//let
var bXL2x = function () {
    
    var sM7F = /\n|\r|=/g;
    return function (i1x) {
        
        var r1x = 0
            , m1x = [];
        i1x = i1x.replace(sM7F, "");
        for (var i = 0, l = i1x.length; i < l; i += 4)
            m1x.push(HD1x[i1x.charAt(i)] << 2 | HD1x[i1x.charAt(i + 1)] >> 4, (HD1x[i1x.charAt(i + 1)] & 15) << 4 | HD1x[i1x.charAt(i + 2)] >> 2, (HD1x[i1x.charAt(i + 2)] & 3) << 6 | HD1x[i1x.charAt(i + 3)]);
        var bs1x = m1x.length
            , eJ3x = i1x.length % 4;
        if (eJ3x == 2)
            m1x = m1x.slice(0, bs1x - 2);
        if (eJ3x == 3)
            m1x = m1x.slice(0, bs1x - 1);
            // console.log(m1x);
        return m1x
    }
}();

var bXM2x = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    Vq5v = {},
    HD1x = {};
for (var i = 0, l = bXM2x.length, c; i < l; i++) {
    c = bXM2x.charAt(i);
    Vq5v[i] = c;
    HD1x[c] = i
}

//let
k1x.cDA9r = function (i1x) {
    
    var iR4V = bXL2x(i1x),
        dy3x = iR4V.length,
        iP4T;
    var r1x = 0;
    while (iP4T = iR4V[r1x]) {
        if (iP4T > 128) {
            iR4V[r1x] = iP4T - 256
        }
        r1x++
    }
    console.log(iR4V.length);
    return iR4V
}

//let
k1x.bUp1x = function (bok3x, K1x) {
    
    return k1x.crT6N(k1x.cDA9r(bok3x), K1x)
}


//ok
k1x.be1x = function (j1x, cD2x, O1x) {
    

    if (!j1x || !j1x.length || !k1x.gW4a(cD2x))
    {       
        console.log("460");
         return this;
    
    }
    if (!!j1x.each) {
        console.log("465");
        j1x.each(cD2x, O1x);
        return this
    }

    for (var i = 0, l = j1x.length; i < l; i++)
        cD2x.call(O1x, j1x[i], i, j1x);
    return this
}
//ok
k1x.gW4a = function (i1x) {
    
    return FA1x(i1x, "function")
}

let bc1x = {};
//ok
var FA1x = function (i1x, u1x) {
    
    try {
        u1x = u1x.toLowerCase();
        if (i1x === null)
            return u1x == "null";
        if (i1x === undefined)
            return u1x == "undefined";
        return bc1x.toString.call(i1x).toLowerCase() == "[object " + u1x + "]"
    } catch (e) {
        return !1
    }
};




//ok
a0x.F1x = function (G1x, gb3x) {
    
    G1x = a0x.A1x(G1x);
    return !G1x ? null : bh1x.bAY6S(G1x, gb3x.trim())
}


//ok
k1x.fS3x = function (i1x) {
    return FA1x(i1x, "string")
}
//ok
k1x.um8e = function (i1x) {
    return FA1x(i1x, "number")
}
let byg5l = {};
//ok
a0x.A1x = de3x.A1x = function (G1x) {
    
    console.log(chalk.red(G1x));
    var g1x = byg5l["" + G1x];
    if (!!g1x)
        return g1x;
    if (!k1x.fS3x(G1x) && !k1x.um8e(G1x))
        return G1x;
    return $(G1x);
}
//ok
a0x.gX4b = de3x.gX4b = function (G1x, X1x, C1x) {
    
    G1x = a0x.A1x(G1x);
    if (!G1x)
        return "";
    if (C1x !== undefined && !!G1x.setAttribute)
        G1x.setAttribute(X1x, C1x);
    return bh1x.bqd3x(G1x, X1x)
}
//ok
bh1x.bqd3x = function (G1x, X1x) {
    
    if (!!G1x.getAttribute)
        return G1x.getAttribute(X1x);
    return ""
}

//ok
k1x.RC4G = function () {
    
    var bZH2x = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    return function (bs1x) {
        bs1x = bs1x || 10;
        var m1x = [];
        for (var i = 0, bZO2x; i < bs1x; ++i) {
            bZO2x = Math.floor(Math.random() * bZH2x.length);
            m1x.push(bZH2x.charAt(bZO2x))
        }
        console.log("595    "+m1x);
        return m1x.join("")
    }
}();



//ok
a0x.mf5k = de3x.mf5k = function (G1x) {
    
    G1x = a0x.A1x(G1x);
    if (!G1x)
        return;
    var D1x = !!G1x.id ? G1x.id : "auto-id-" + k1x.RC4G(16);
    G1x.id = D1x;
    if (a0x.A1x(D1x) != G1x)
        byg5l[D1x] = G1x;
    return D1x
}
//ok
a0x.t1x = de3x.t1x = function () {
    
    var bsH4L = {}
        , fF3x = "data-"
        , dl3x = /\-(.{1})/gi;
    var Az9q = function (G1x) {
        var D1x = a0x.mf5k(G1x);
        if (!!bsH4L[D1x])
            return;
        var bA1x = {};
        k1x.be1x(G1x.attributes, function (g1x) {
            var K1x = g1x.nodeName;
            if (K1x.indexOf(fF3x) != 0)
                return;
            K1x = K1x.replace(fF3x, "").replace(dl3x, function ($1, $2) {
                return $2.toUpperCase()
            });
            bA1x[K1x] = g1x.nodeValue || ""
        });
        bsH4L[D1x] = bA1x
    };
    return function (G1x, K1x, C1x) {
        
        G1x = a0x.A1x(G1x);
        if (!G1x)
            return null;
        var bfJ9A =G1x.dataset;
        if (!bfJ9A) {
            Az9q(G1x);
            bfJ9A = bsH4L[G1x.id]
        }
        if (C1x !== undefined)
            bfJ9A[K1x] = C1x;
        return bfJ9A[K1x]
    }
}();
