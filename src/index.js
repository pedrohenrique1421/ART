import fs from "fs";

class ErrorLocal extends Error {
	constructor(message, code) {
		super(message); // Chama o construtor da classe Error
		this.name = this.constructor.name; // Define o nome da classe de erro
		this.code = code; // Adiciona a propriedade code
		Error.captureStackTrace(this, this.constructor); // Captura o stack trace corretamente
	}
}

export const ParagraphManager = (text) => {
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
		return objForReturn;
	} else {
		throw new ErrorLocal("Arquivo vazio", "EMPTY");
	}
};

export const CreateFile = async (wordsList, path, fileName) => {
	const pathForCreate = String(
		`${path}/result_${fileName
			.substring(0, fileName.length - 4)
			.toUpperCase()}.txt`
	);
	const textOfWords = Formatter(wordsList);
	try {
		await fs.promises.writeFile(pathForCreate, textOfWords);
		console.log("Arquivo criado");
	} catch (e) {
		throw e;
	}
};

const Formatter = (arrayObj) => {
	let formattedtext = `ART - Result\n------------------------\n\nEstrutura:\n Parágrafo em que está a palavra: palavra repetida: número de vezes que foi repetida, ...;\n\nPalavras repetidas no:\n\n`;

	arrayObj.forEach((e, index) => {
		let itsEmpty = true;
		Object.entries(e).forEach((e, index) => {
			if (parseInt(e[1]) > 1) {
				if (itsEmpty) {
					formattedtext += `Parágrafo ${index + 1}: `;
					itsEmpty = false;
				}
				formattedtext += `${e[0]}: ${e[1]}, `;
			}
		});
		if (!itsEmpty) {
			formattedtext = formattedtext.substring(
				0,
				formattedtext.length - 2
			);
			formattedtext += `;\n`;
		}
	});

	formattedtext +=
		"\nObrigado por utilizar nosso sistema :)\nDesenvolvido por pption/pedrohenrique1421";
	return formattedtext;
};
