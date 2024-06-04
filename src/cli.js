import fs from "fs";
import ErrorsManager from "./errors/cases.js";
import {ParagraphManager, CreateFile} from "./index.js";

// Fazer o tratamento da string que sai no arquivo resultado.txt

const filePath = process.argv;
const file = filePath[2];
const pathForCreate = filePath[3];

fs.readFile(file, "utf-8", (error, data) => {
	try {
		const text = ParagraphManager(data);
		CreateFile(text, pathForCreate);
	} catch (error) {
		ErrorsManager(error);
	}
	ErrorsManager(error);
});
