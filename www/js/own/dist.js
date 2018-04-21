function distancia(lat,lon, latitude, longitude){
    lat = lat * Math.PI / 180;
    lon = lon * Math.PI / 180;
    latitude = latitude * Math.PI / 180;
    longitude = longitude * Math.PI / 180;
    Alat = latitude - lat;
    Alon = longitude - lon;

    
    

    a = Math.pow(Math.sin(Alat/2),2) + Math.cos(lat) * Math.cos(latitude) * Math.pow(Math.sin(Alon/2),2);
    
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    dist = 6371 * c;

    return dist
}

//dist=distancia(40,0,41,0);
//console.log(dist);