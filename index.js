const readline = require('readline-sync')

function start(){
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()	

    function askAndReturnSearchTerm() {
	    return readline.question('Digite um termo de busca: ')
    }

    function askAndReturnPrefix(){
            const prefixes = ['Quem e', 'O que e', 'A historia']
	    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opcao: ')
	    const selectedPrefixText = prefixes[selectedPrefixIndex]

	    return selectedPrefixText
    }

    console.log(content)	

}

start()
