//use html5sql to prepopulate the datas
$(document).on("pageinit", "#detailPage", function(){
	var id = getUrlVars()["id"];
	console.log(id);
	
});

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}