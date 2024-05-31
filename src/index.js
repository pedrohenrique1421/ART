const fs = require("fs");

const filePath = process.argv;
const file = filePath[2];
let words = {};

const handleSnapWord = (texto) => {
    const wordListBrute = texto.split(" ");
    let wordList = [];
    const wordsVerified = [];
    if (wordListBrute.length > 0) {
        for (let c = 0; wordListBrute.length > c; ) {
            let partes = wordListBrute[c].split("\n"); // Divide a string em partes usando "\n" como separador
            wordList = wordList.concat(partes); // Adiciona as partes ao novo array
            c++;
        }

        for (let d = 0; wordList.length > d; ) {
            wordList[d] = wordList[d].replace(")", "");
            wordList[d] = wordList[d].replace("(", "");
            wordList[d] = wordList[d].replace(",", "");
            wordList[d] = wordList[d].replace(".", "");
            wordList[d] = wordList[d].replace(":", "");
            wordList[d] = wordList[d].replace(";", "");
            wordList[d] = wordList[d].replace("/", "");
            wordList[d] = wordList[d].replace("?", "");
            wordList[d] = wordList[d].replace('"', "");
            d++;
        }

        for (let i = 0; wordList.length > i; ) {
            const wordSelected = wordList[i];
            let verify = false;

            for (let b = 0; wordsVerified.length > b; ) {
                if (wordSelected == wordsVerified[b]) {
                    verify = true;
                }
                b++;
            }

            if (!verify) {
                let numberOftimes = 0;
                for (let a = 0; wordList.length > a; ) {
                    if (wordList[a] == wordSelected) {
                        numberOftimes++;
                    }
                    a++;
                }
                words[wordSelected] = numberOftimes;
                wordsVerified.push(wordSelected);
            }

            i++;
        }
    }
};

fs.readFile(file, "utf-8", (erro, dados) => {
    handleSnapWord(dados);
    console.log(words);
});

// node src/index.js caminhoDoArquivo
