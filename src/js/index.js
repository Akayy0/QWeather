const buscarPrevisao = async () => {

    try {

        const cidadeInput = document.getElementById('cidadeInput');
        const cidade = cidadeInput.value;

        if (cidade.trim() === '') {
            alert('Por favor, insira o nome de uma cidade');
            return
        }

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

        
    } catch (error) {
        console.error(error)
        
    }

}