const fs = require("fs");
const ErrorsManager = require("./errors/cases");

class ErrorLocal extends Error {
	constructor(message, code) {
		super(message); // Chama o construtor da classe Error
		this.name = this.constructor.name; // Define o nome da classe de erro
		this.code = code; // Adiciona a propriedade code
		Error.captureStackTrace(this, this.constructor); // Captura o stack trace corretamente
	}
}

const filePath = process.argv;
const file = filePath[2];

const ParagraphManager = (text) => {
	const objForReturn = [];
	const paragraphs = text.split("\n");

	paragraphs.forEach((element) => {
		const paragraph = element.split(" ");
		const objForAdd = {};
		paragraph.forEach((word) => {
			const wordReplaced = word.replace(
				/[.,\/#!$%\^&\*;:{}=\-_`~()\r]/g,
				""
			);
			if (wordReplaced.length > 2) {
				objForAdd[wordReplaced] =
					wordReplaced in objForAdd
						? (objForAdd[wordReplaced] =
								objForAdd[wordReplaced] + 1)
						: (objForAdd[wordReplaced] = 1);
			}
		});
		if (Object.keys(objForAdd).length > 1) {
			objForReturn.push(objForAdd);
		}
	});

	if (objForReturn.length > 0) {
		console.log(objForReturn);
	} else {
		throw new ErrorLocal("eita", "empty");
	}
};

fs.readFile(file, "utf-8", (error, data) => {
	try {
		ParagraphManager(data);
	} catch (error) {
		ErrorsManager(error);
	}
	ErrorsManager(error);
});
// node src/index.js caminhoDoArquivo
