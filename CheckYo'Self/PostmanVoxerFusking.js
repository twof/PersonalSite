function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

for (var i = 10000000000; i >= 99999999999; i++) {
	var hexString = i.toString(16);
	var URL = "https://www.voxer.com/v/" + hexString
	Console.log.out(URL)
};