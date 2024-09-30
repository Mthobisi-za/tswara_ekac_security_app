export default async function SendNotification(tokenn, latitude, longitude, profile) {
    await fetch(`http://192.168.0.210:3000/${tokenn}/${latitude}/${longitude}`).then(res => { console.log(res) })

}