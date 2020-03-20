var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var myJSON
$(document).ready(function(){
    
    $.getJSON("https://covid19.mathdro.id/api", function(result){
        //console.log(result);
        $("#confirmed").text(result.confirmed.value);
        $("#recovered").text(result.recovered.value);
        $("#deaths").text(result.deaths.value);
        var rp = result.recovered.value / result.confirmed.value * 100;
        $("#recoveredPercentage").text(rp.toFixed(1)+"% recovery rate");
        var dp = result.deaths.value / result.confirmed.value * 100;
        $("#deathsPercentage").text(dp.toFixed(2)+"% fatality rate");
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
            $.getJSON( ipurl, function(r){
                $("#ipcountryName").text(res.country_name);
                $("#ipcountryConfirmed").text(r.confirmed.value);
                $("#ipcountryRecovered").text(r.recovered.value);
                $("#ipcountryDeaths").text(r.deaths.value);
                $("#ipcountryActive").text(r.confirmed.value - (r.recovered.value+r.deaths.value));
                var iprecovery = r.recovered.value/r.confirmed.value * 100;
                var ipdeath = r.deaths.value/r.confirmed.value * 100;
                var active = r.confirmed.value - (r.recovered.value+r.deaths.value)
                var ipactive = active/r.confirmed.value * 100;
                $("#ipcountryRecoveredper").text(iprecovery.toFixed(2)+"% recovery rate");
                $("#ipcountryDeathspre").text(ipdeath.toFixed(2)+"% fatality rate");
                $("#ipcountryActivepre").text(ipactive.toFixed(2)+"% affected rate");
                console.log(r.confirmed.value);
                console.log(r.recovered.value);
                console.log(r.deaths.value);
                console.log(r.confirmed.value/res.country_population);
                var manoj = res.country_population
                console.log(manoj.length);
                console.log(res.country_name);
                console.log(res.country_capital);
                var total = $("#confirmed").text();
                console.log(total);
                var ippre = r.confirmed.value/total * 100;
                console.log(ippre);
                var ippre = ippre.toFixed(2);
                console.log(ippre);
                $("#ipcountryConfirmedpre").text(ippre+"% across global");
                
                
            });  
            });
        });
    
  
   $.getJSON( "https://covid19.mathdro.id/api/daily", function( data ) {
       $.each( data, function(key, val) {
           var d = new Date(val.reportDate);
           $("#dailyStat").append("<tr><td>"+months[d.getMonth()]+" "+d.getDate()+"</td><td>"+val.mainlandChina+"</td><td>"+val.otherLocations+"</td><td>"+val.totalConfirmed+"</td><td>"+val.deltaConfirmed+"</td><td>"+val.totalRecovered+"</td><td>"+val.deltaRecovered+"</td></tr>");
           var cp = val.otherLocations/val.totalConfirmed * 100;
           $("#confirmedPercentage").text("outside china "+cp.toFixed(1)+"%");
       })
   });
    
    $.getJSON( "https://covid19.mathdro.id/api/confirmed", function( data ){
         $.each( data, function(key, val) {
             state = (val.provinceState == null) ? "-" : val.provinceState;
             $("#CountryStat").append("<tr id="+val.iso3+" ><td>"+val.countryRegion+"</td><td>"+state+"</td><td>"+val.confirmed+"</td><td>"+val.recovered+"</td><td>"+val.deaths+"</td><td>"+val.active+"</td></tr>");  
         });     
    });
    
    
    
    
    
    
    
    

    
    
});
