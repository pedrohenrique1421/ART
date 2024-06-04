export default function ErrorsManager(error) {
	if (error) {
		switch (true) {
			case error.code == "ENOENT":
				throw new Error(
					"Error na busca do arquivo, verifique o caminho do arquivo"
				);
				break;
			case error.code == "EMPTY":
				throw new Error("Arquivo vazio, verifique seu arquivo");
				break;
			default:
				console.log(error.code);
				throw error;
				break;
		}
	}
}
