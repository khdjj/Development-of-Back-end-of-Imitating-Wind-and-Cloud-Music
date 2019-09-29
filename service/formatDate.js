exports.formatDate = function(date){
    var m = date.getMonth()+1,
        d = date.getDate(),
        y = date.getFullYear();
    return y+'-'+m+'-'+d;
}
