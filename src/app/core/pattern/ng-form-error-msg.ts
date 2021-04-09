export class NgFormErrorMesssage {
    public getMessages(qtdCharRule = 8): Array<string> {
        return [
            'O campo é obrigatório.', // id: 0
            `Mínimo de ${qtdCharRule} caracteres.`, // id: 1
            'Não pode conter espaços em branco.',  // id: 2
            'Senhas não coincidem.', // id: 3,
            'Mínimo de 2 caracteres.', // id: 4,
            'E-mail inválido.', // id: 5,
            'O campo não pode ser em branco.', // id: 6,
        ];
    }
}