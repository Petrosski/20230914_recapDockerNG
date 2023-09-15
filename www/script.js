document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cep-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const cepInput = document.getElementById('cep');
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP

        if (cep.length === 8) {
            // Faz a requisição à API dos Correios para obter a cidade
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.localidade) {
                        const cidade = data.localidade;
                        resultDiv.innerHTML = `A cidade correspondente ao CEP ${cep} é: ${cidade}`;
                    } else {
                        resultDiv.innerHTML = 'CEP não encontrado.';
                    }
                })
                .catch(error => {
                    resultDiv.innerHTML = 'Ocorreu um erro ao buscar o CEP.';
                    console.error(error);
                });
        } else {
            resultDiv.innerHTML = 'CEP inválido. Digite um CEP válido com 8 dígitos.';
        }
    });
});
