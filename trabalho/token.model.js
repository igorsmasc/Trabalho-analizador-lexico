module.exports = class Token {
    constructor(lexema, tipo, valor){
        this.lexema = lexema;
        this.tipo = tipo;
        this.valor = valor;
    }
}