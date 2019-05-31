const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundryDetection = require('sbd')

async function robot(content){
	await fetchContentFromWikipedia(content)
	sanitizeContent(content)
        breakContentIntoSentences(content)
	
        console.log(content)

	async function fetchContentFromWikipedia(content){
	    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
	    const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')  
	    const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
	    const wikipediaContent = wikipediaResponde.get()
	    
	    content.sourceContentOriginal = wikipediaContent.content	
	}

	function sanitizeContent(content){
		const withoutBlankLinesAndMarkDown = removeBlankLinesAndMarkDown(content.sourceContentOriginal)
                //const withoutBlankLinesAndMarkDown = removeBlankLinesAndMarkDown(content)
                content.sourceContentSanitized = withoutBlankLinesAndMarkDown 

	//}
	
	function removeBlankLinesAndMarkDown(text){
                const allLines = text.split('\n') 
		const withoutBlankLinesAndMarkDown = allLines.filter(line=> {
			if(line.trim().length === 0 || line.trim().startsWith('=')){
				return false
			}
			
			return true})
                return withoutBlankLinesAndMarkDown.join(' ')
	}
	}
		
        /*function sanitizeContent(content){
		
		content.sourceContentSanitized = "teste"
	}*/
        }

        function breakContentIntoSentences(content){
		content.sentences = []
		
		const sentences = sentenceBoundryDetection.sentences(content.sourceContentSanitized)
		sentences.forEach((sentence) => {
			content.sentences.push({
				text: sentence,
				keywords: [],
				images: []})
		})
        }

module.exports = robot
