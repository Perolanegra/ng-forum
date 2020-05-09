export class NgFormErrorType {
    public getTypes(): Array<string> {
        return [
            'required', // id: 0
            'minlength', // id: 1
            'whitespace',  // id: 2
            'matchValues' // id: 3
        ];
    }
}