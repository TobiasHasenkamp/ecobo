import axios from "axios";


export default function getLonAndLatForAddress(address, lonLatOfRequest, setLonLatOfRequest){

    console.log(address);

    const options = {
        method: 'GET',
        url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search',
        params: {
            format: 'jsonv2',
            q: "Bochum, " + address,
            polygon_threshold: '0.0',
            'accept-language': 'en'
        },
        headers: {
            'x-rapidapi-key': '5b5cd9bab9msh9f3af998ff7107bp1f8cadjsn0688cf3fdecd',
            'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com'
        }
    };

    axios.request(options).then(response => response.data).then((data) => setLonLatOfRequest(data));
}






