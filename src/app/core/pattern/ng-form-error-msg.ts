export class NgFormErrorMesssage {
    public getMessages(): Array<string> {
        return [
            'O campo é obrigatório.', // id: 0
            'Mínimo de 8 caracteres.', // id: 1
            'Não pode conter espaços em branco.',  // id: 2
            'Senhas não coincidem.' // id: 3
        ];
    }
}