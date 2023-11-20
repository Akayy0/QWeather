const geolocation = async (location) => {
    try {
        const city = encodeURIComponent(location);
        const apikey = "9fc96d52a596e2be108a8ac211a78c1b"
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`

        response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erro ao buscar informações de geolocalização")
        }

        data = await response.json();

        const lat = data[0].lat.toFixed(1);
        const lon = data[0].lon.toFixed(2);

        

        return { lat, lon }

    } catch (err) {
        console.error(err)
    }
}

const getTime = async (location) => {
    try {
        const coordinates = await geolocation(location);
        const apiKey = "BHREFD4SVZ2J";
        const timezoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${coordinates.lat}&lng=${coordinates.lon}`;

        const response = await fetch(timezoneUrl);

        if (!response.ok) {
            throw new Error("Erro ao buscar informações de tempo");
        }

        const timezoneData = await response.json();

    
        const localDate = new Date();
        const options = { weekday: 'long', timeZone: timezoneData.zoneName };
        const formatter = new Intl.DateTimeFormat('pt-BR', options);
        const formattedDayOfWeek = formatter.format(localDate).replace(/^\w/, (c) => c.toUpperCase());

        const formattedTime = new Intl.DateTimeFormat('pt-BR', { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: timezoneData.zoneName }).format(localDate);

        

        return { formattedTime, formattedDayOfWeek };

    

    } catch (err) {
        console.error(err);
    }
}




const buscarPrevisao = async () => {

    try {

        const cidadeInput = document.getElementById('cidadeInput');
        const cidade = cidadeInput.value;

        if (cidade.trim() === '') {
            alert('Por favor, insira o nome de uma cidade');
            return
        }

        const coordinates = await geolocation(cidade);
        const timeData = await getTime(cidade);

        const apiKey = '9fc96d52a596e2be108a8ac211a78c1b';
        const cidadeCodificada = encodeURIComponent(cidade);
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeCodificada}&appid=${apiKey}&units=metric&lang=pt_br`;

        response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error('Nao foi possivel obter os dados')
        }

        data = await response.json();

        const temperatura = data.main.temp;

        // const clima = data.weather[0].description;
        const clima = data.weather[0].description.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());



        const climaElement = document.getElementById('clima')
        const cidadeElement = document.getElementById('cidade')
        const temperaturaElement = document.getElementById('temperatura')

        climaElement.textContent = clima;
        cidadeElement.textContent = cidade;
        temperaturaElement.textContent = `${temperatura} C°`;


        const hourElement = document.getElementById('hour');
        const dateElement = document.getElementById('date');


        hourElement.textContent = timeData.formattedTime; 
        dateElement.textContent = timeData.formattedDayOfWeek; 

        
    } catch (error) {
        console.error(error)
        
    }

}