let model = require('./models/topListModels'),
    db = require('./mongodb/db');
db.openDataSource();


model.find({},{cover:1},function(err,doc){
    let coverList = doc;
    for(let i = 0;i<coverList.length;i++){
        coverList[i].cover = coverList[i].cover.replace(/param=\w*/,'param=150y150');
        model.update({_id:coverList[i]._id},{cover:coverList[i].cover},function(err,raw){
            if(err){
                console.log(err);
            }else{
                console.log("成功");
            }
        })
    }
  
})

// http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150
// http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=150y150
// http://p1.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg?param=150y150
// http://p1.music.126.net/TuGxihwbiPmoHoFGvIuu_w==/109951163781770038.jpg?param=150y150
// http://p2.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=150y150
// http://p2.music.126.net/WTpbsVfxeB6qDs_3_rnQtg==/109951163601178881.jpg?param=150y150
// http://p2.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=150y150
// http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=150y150
// http://p2.music.126.net/CUqQp33MZf_m0BwH4u0V6A==/109951163078922993.jpg?param=150y150
// http://p1.music.126.net/bZvjH5KTuvAT0YXlVa-RtQ==/109951163326845001.jpg?param=150y150
// http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150
// http://p2.music.126.net/vs-cMh49e6qPEorHuhU07A==/18737877162497499.jpg?param=150y150
// http://p2.music.126.net/c0iThrYPpnFVgFvU6JCVXQ==/109951164091703579.jpg?param=150y150
// http://p2.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=150y150
// http://p1.music.126.net/BzSxoj6O1LQPlFceDn-LKw==/18681802069355169.jpg?param=150y150
// http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=150y150
// http://p2.music.126.net/Zb8AL5xdl9-_7WIyAhRLbw==/109951164091690485.jpg?param=150y150