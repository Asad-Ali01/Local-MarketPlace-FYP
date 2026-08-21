export function useCurrentLocation(){
    const getCurrentLocation = () => new Promise<{lat:number,lng:number}>((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                resolve({
                    lat:pos.coords.latitude,
                    lng:pos.coords.longitude
                });
            },
            reject
        )
    })
    return {getCurrentLocation}
}