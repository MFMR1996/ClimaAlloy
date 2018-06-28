function init(wetherData){
	
	//Datos clima y lugar
	$.lb_temp_data.setText(wetherData.temp);
	$.lb_air.setText(wetherData.air);
	$.lb_hum.setText(wetherData.hum);
	$.lb_place.setText(wetherData.place);
	
	//Datos de pronostico
	$.lb_max_temp_data.setText(wetherData.max_temp+ '°');
	$.lb_min_temp_data.setText(wetherData.min_temp + '°');
	$.lb_temp_prom_data.setText(wetherData.temp_prom + '°');
	$.lb_precipitacion_data.setText(wetherData.precipitacion);
	$.lb_ray_uv_data.setText(wetherData.ray_uv);
}


function ApiClima(){
	var url = "http://api.apixu.com/v1/forecast.json?key=8a75c0e69e4a410a872150718181904&q=Mexico";
//"http://api.apixu.com/v1/current.json?key=4c1af01122744ff0938220636181804&q=Mexico";

	var client = Ti.Network.createHTTPClient({
	    onload : function(e) {
	        var datos = this.responseText;
	        try {
	        	consultaAireCDMX = JSON.parse(datos);
	        	datos = null;
	            var temp = Math.round(consultaAireCDMX.current.temp_c);
	            temp = temp + '°';
	            var place = consultaAireCDMX.location.name + ", " + consultaAireCDMX.location.country;
	            var hum = consultaAireCDMX.current.humidity;
	            var air = consultaAireCDMX.current.wind_kph + consultaAireCDMX.current.wind_dir;
	            var max_temp=consultaAireCDMX.forecast.forecastday[0].day.maxtemp_c;
	            var min_temp=consultaAireCDMX.forecast.forecastday[0].day.mintemp_c;
	            var temp_prom=consultaAireCDMX.forecast.forecastday[0].day.avgtemp_c;
	            var precipitacion=consultaAireCDMX.forecast.forecastday[0].day.totalprecip_mm;
	            var ray_uv=consultaAireCDMX.forecast.forecastday[0].day.uv;
	            var jsonWetherData = {
	            	temp : temp,
	            	place: place,
	            	hum: hum,
	            	air: air,
	            	max_temp:max_temp,
	            	min_temp:min_temp,
	            	temp_prom:temp_prom,
	            	precipitacion:precipitacion,
	            	ray_uv:ray_uv
	            };
	
	            init(jsonWetherData);
	            
	        } catch(e_2) {
	        	var a = Ti.UI.createAlertDialog({
					title : 'SmartCDMX',
					ok : 'Aceptar',
					message : 'Verifique su conexión a internet'
				});
				a.show();
	        };
	        
	    },
	    onerror : function(e) {
	        
	        Ti.API.debug(e.error);
	        var a = Titanium.UI.createAlertDialog({
	            title : 'SmartCDMX',
	            ok : 'Aceptar',
	            message : 'Verifique su conexión a internet.'
	        });
	        a.show();
	
	    },
	    timeout : 10000
	});
	
	client.open("GET", url);
	client.send();
}

ApiClima();
$.index.open();
