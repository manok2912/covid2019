var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
$(document).ready(function(){

    
    $.getJSON("https://covid19.mathdro.id/api", function(result){
        //console.log(result);
        $("#confirmed").text(numberWithCommas(result.confirmed.value));
        $("#recovered").text(numberWithCommas(result.recovered.value));
        $("#deaths").text(numberWithCommas(result.deaths.value));
        var active = result.confirmed.value - (result.recovered.value + result.deaths.value);
        $("#active").text(numberWithCommas(active));
        var ap = active / result.confirmed.value * 100;
        $("#activePercentage").text(ap.toFixed(1)+"% affected rate");
        var rp = result.recovered.value / result.confirmed.value * 100;
        $("#recoveredPercentage").text(rp.toFixed(1)+"% recovery rate");
        var dp = result.deaths.value / result.confirmed.value * 100;
        $("#deathsPercentage").text(dp.toFixed(1)+"% fatality rate");
        var d = new Date()
        var str = result.lastUpdate;
        var arr = str.split("T");
        var res = arr[1].slice(0, 8);
        $("span").text(arr[0]+" "+res);
    });
    
    $.getJSON( "https://worldtimeapi.org/api/ip", function( data ){
        var ip = data.client_ip;
        var url = "https://ipapi.co/"+ip+"/json";
        console.log(ip+"--"+url);
        $.getJSON( url, function(res){
            $("#CountryStat").find("#"+res.country_code_iso3).children().css("background-color", "yellow");
            var ipurl = "https://covid19.mathdro.id/api/countries/"+res.country_code_iso3;
            var curlimg = "https://www.countryflags.io/"+res.country+"/shiny/48.png"
            $("#cflag").attr("src",curlimg);
            $.getJSON( ipurl, function(r){
                $("#ipcountryName").text(res.country_name);
                $("#ipcountryConfirmed").text(numberWithCommas(r.confirmed.value));
                $("#ipcountryRecovered").text(numberWithCommas(r.recovered.value));
                $("#ipcountryDeaths").text(numberWithCommas(r.deaths.value));
                $("#ipcountryActive").text(numberWithCommas(r.confirmed.value - (r.recovered.value+r.deaths.value)));
                var iprecovery = r.recovered.value/r.confirmed.value * 100;
                var ipdeath = r.deaths.value/r.confirmed.value * 100;
                var active = r.confirmed.value - (r.recovered.value+r.deaths.value)
                var ipactive = active/r.confirmed.value * 100;
                $("#ipcountryRecoveredper").text(iprecovery.toFixed(2)+"% recovery rate");
                $("#ipcountryDeathspre").text(ipdeath.toFixed(2)+"% fatality rate");
                $("#ipcountryActivepre").text(ipactive.toFixed(2)+"% affected rate");
                console.log(res.country_name);
                var total = $("#confirmed").text().replace(/,/g,"");
                var ippre = r.confirmed.value/total * 100;
                var ippre = ippre.toFixed(2);
                $("#ipcountryConfirmedpre").text(ippre+"% across global");
            });  
            });
    });
    

    $.getJSON("https://covid19.mathdro.id/api/countries",function(data){
        $.each(data , function(key , val){
            val.forEach(function(item){
                if (item.hasOwnProperty('iso3')){
                    var url = "https://covid19.mathdro.id/api/countries/"+item.iso3
                    $.getJSON(url , function(data){
                        var activecountry = data.confirmed.value - (data.recovered.value + data.deaths.value);
                        $("#CountryStat").append("<tr id="+item.iso3+"><td class='text-center'>"+item.name+"</td><td class='text-center text-danger backred'>"+numberWithCommas(data.confirmed.value)+"</td><td class='text-center text-primary backblue'>"+numberWithCommas(activecountry)+"</td><td class='text-center text-success backgreen'>"+numberWithCommas(data.recovered.value)+"</td><td class='text-center text-secondary backgray'>"+numberWithCommas(data.deaths.value)+"</td></tr>");
                    });
                }
            });
        });

    $.getJSON( "https://covid19.mathdro.id/api/daily", function( data ) {
       $.each( data, function(key, val) {
           var d = new Date(val.reportDate);
           $("#dailyStat").append("<tr><td class='text-center'>"+months[d.getMonth()]+" "+d.getDate()+"</td><td class='text-center text-danger backred'>"+numberWithCommas(val.otherLocations)+" <span class='deltaconfrim'>&#x25B2;"+numberWithCommas(val.deltaConfirmedDetail.outsideChina)+"</span></td><td class='text-center text-danger backred'>"+numberWithCommas(val.mainlandChina)+" <span class='deltaconfrim'>&#x25B2;"+numberWithCommas(val.deltaConfirmedDetail.china)+"</span></td><td class='text-center text-danger backred'>"+numberWithCommas(val.totalConfirmed)+" <span class='deltaconfrim'>&#x25B2;"+numberWithCommas(val.deltaConfirmedDetail.total)+"</span></td><td class='text-center text-secondary backgray'>"+numberWithCommas(val.deaths.outsideChina)+"</td><td class='text-center text-secondary backgray'>"+numberWithCommas(val.deaths.china)+"</td><td class='text-center text-secondary backgray'>"+numberWithCommas(val.deaths.total)+"</td></tr>");
           var cp = val.otherLocations/val.totalConfirmed * 100;
           $("#confirmedPercentage").text("outside china "+cp.toFixed(1)+"%");
       });
    });


    });
    
    
    
    
    
    
    
    

    
    
});
