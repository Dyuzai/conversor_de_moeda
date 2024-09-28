function converterMoeda() {
    const valor = document.getElementById('valor').value;
    const moedaBase = document.getElementById('moedaBase').value;
    const moedaDestino = document.getElementById('moedaDestino').value;
    const resultadoDiv = document.getElementById('resultado');
    const debugDiv = document.getElementById('debug');

    if (moedaBase === moedaDestino) {
        resultadoDiv.textContent = 'As moedas são iguais.';
        return;
    }

    // Requisição para a API
    fetch(`https://economia.awesomeapi.com.br/json/last/${moedaBase}-${moedaDestino}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const moedaInfo = data[`${moedaBase}${moedaDestino}`];
            if (moedaInfo) {
                const valorConvertido = (valor * moedaInfo.ask).toFixed(2);
                resultadoDiv.textContent = `Resultado: R$ ${valor} ${moedaBase} = R$ ${valorConvertido} ${moedaDestino}`;
                
            } else {
                resultadoDiv.textContent = 'Moeda não encontrada.';
            }
        })
        .catch(error => {
            resultadoDiv.textContent = 'Erro: ' + error.message;
        });
}