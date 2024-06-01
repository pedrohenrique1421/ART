const fs = require("fs");

const filePath = process.argv;
const file = filePath[2];
let words = {};

const handleSnapWord = (texto) => {
	const wordsTrue = [];
	const wordList = texto
		.toLowerCase()
		.replace(/[.,\/#!$%\&\*;:{}\r=\-_()]/g, "")
		.split(" ");
	for (let i = 0; i < wordList.length; i++) {
		const wordTrue = wordList[i].includes("\n")
			? wordList[i].split("\n")
			: wordList[i];

		if (typeof wordTrue == "object") {
			for (let a = 0; a < Object.keys(wordTrue).length; a++) {
				if (wordTrue[a] != "" || wordTrue != "\n") {
					if (wordTrue[a].length > 0) {
						wordsTrue.push(wordTrue[a]);
					}
				}
			}
		} else {
			wordsTrue.push(wordTrue);
		}
	}
	for (let e = 0; e < wordsTrue.length; e++) {
		console.log(wordsTrue[e]);
		if (wordsTrue[e] in words) {
			words[wordsTrue[e]] = words[wordsTrue[e]] + 1;
		} else {
			words[wordsTrue[e]] = 1;
		}
	}
};

fs.readFile(file, "utf-8", (erro, dados) => {
	handleSnapWord(dados);

	let chavesOrdenadas = Object.keys(words).sort();
	let objOrdenado = {};

	chavesOrdenadas.forEach((chave) => {
		objOrdenado[chave] = words[chave];
	});

	console.log(objOrdenado);
});
// node src/index.js caminhoDoArquivo
