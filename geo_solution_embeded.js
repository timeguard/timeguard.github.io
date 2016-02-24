//baidu api
	function baiduGeoFun(lat,lon){
		// 创建地理编码实例      
		var myGeo = new BMap.Geocoder();      
		// 根据坐标得到地址描述    
		myGeo.getLocation(new BMap.Point(lon, lat), function(result){      
               if (result){      
                    var addressComponents = result.addressComponents;
                    var address = addressComponents.province + "-" + addressComponents.city +"  一周天氣";
                    var embeddedHtml =   '<iframe id="forecast_embed" type="text/html" frameborder="0" height="220" width="100%" ' + 
			      	'src="http://forecast.io/embed/#lat=' + lat +
			      	'&lon=' + lon + '&name=' + address +
			      	'&text-color=#333&color=#00aaff&font=Helvetica&units=si&lang=zh-tw"></iframe>' ;
				 	 $('#embedUI_wheather').html(embeddedHtml);
               }else{
               	 $('#embedUI_wheather').html('無法取得天氣預報定位，可能是地理位置無法取得或者您的地區未提供服務。');
               }      
		});
	}
//google  api
	function googleGeoFun(lat,lon){
		var geocoder = new google.maps.Geocoder();
		var coord = new google.maps.LatLng(lat, lon);
		// 傳入 latLng 資訊至 geocoder.geocode
		geocoder.geocode({'latLng': coord }, function(results, status) {
		 console.log(status);
		  if (status === google.maps.GeocoderStatus.OK) {
		    // 如果有資料就會回傳
			console.log(results);
		    if (results) { 
		    	var address_components =  results[0].address_components;
		    	//根據結構組成天氣預報顯示地址
		    	var address = buildGoogleAddress(address_components);
		    	var embeddedHtml =   '<iframe id="forecast_embed" type="text/html" frameborder="0" height="220" width="100%" ' + 
		      	'src="http://forecast.io/embed/#lat=' + lat +
		      	'&lon=' + lon + '&name=' + address + '  一周天氣' +
		      	'&text-color=#333&color=#00aaff&font=Helvetica&units=si&lang=zh-tw"></iframe>' ;
			 	 $('#embedUI_wheather').html(embeddedHtml);
			    }
		  }
		});
	}
	function buildGoogleAddress(address_components){
		console.log("buildGoogleAddress address_components :");
		console.log(address_components);
		var administrative_area_level_1  = "";
		var administrative_area_level_2  = "";
		var administrative_area_level_3  = "";
		var locality = "";
		for (var int = 0; int < address_components.length; int++) {
			switch (address_components[int].types[0]) {
			case "administrative_area_level_1":
				administrative_area_level_1 = address_components[int].long_name;
				break;
			case "administrative_area_level_2":
				administrative_area_level_2 = address_components[int].long_name;
				break;
			case "administrative_area_level_3":
				administrative_area_level_3 = address_components[int].long_name;
				break;
			case "locality":
				locality = address_components[int].long_name;
			default:
				break;
			}
		}
		var address = administrative_area_level_1 + administrative_area_level_2  + administrative_area_level_3 + locality;
		return address;
	}
//HTML5 Location Setting
    function locationSuccess(position) {
        latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		console.log(latitude + ',' + longitude);
		//google
		googleGeoFun(latitude,longitude); 
    }
    function locationFail(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
            	  $('#embedUI_wheather').html('您的所在地區禁制使用此方式定位。');
                break;
            case error.POSITION_UNAVAILABLE:
            	  $('#embedUI_wheather').html('無法取得您的所在位置。');
                break;
            case error.TIMEOUT:
            	  $('#embedUI_wheather').html('定位連線逾時');
                break;
            case error.UNKNOWN_ERROR:
            	  $('#embedUI_wheather').html('定位發生未知錯誤');
                break;
        }
    }
  	