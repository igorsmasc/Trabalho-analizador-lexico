const Token = require("./token.model");

function analisadorLexico(x) {

    myOperators = ['+', '-', '*', '**', '/'];
    myPointers = [')', '('];
    myNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    myArray = x.replace(/\s/g, '').split('').join(' ');
    myArray = myArray.replace(' * * ', ' ** ');

    ajustArray = myArray.split(' ');
    ajustArray.push('x');

    ajustmentIndexs = [];

    for (let i = 0; i < ajustArray.length - 1; i++) {
        if (ajustArray[i].match("-?([0-9]\\d*)") && ajustArray[i + 1].match("-?([0-9]\\d*)")) {
            ajustmentIndexs.push(i);
        }
    }

    myArray = myArray.split(' ');

    myArray.forEach(element => {

        if (!myOperators.includes(element) && !myNumbers.includes(element) && !myPointers.includes(element)) {
            throw Error('Caractere inválido!')
        }

    })

    for (let i = 0; i < myArray.length; i++) {
        if (i + 2 <= myArray.length) {
            while ((!myOperators.includes(myArray[i]) && !myPointers.includes(myArray[i]))
                && (!myOperators.includes(myArray[i + 1]) && !myPointers.includes(myArray[i + 1]))) {
                let aux = myArray[i + 1];
                myArray.splice(i + 1, 1);
                myArray[i] = myArray[i] + '' + aux;
            }
        }
    }

    for (let i = 0; i < myArray.length; i++) {
        if (i + 2 <= myArray.length) {
            if ((myArray[i] == '-')
                && (myArray[i + 1] == '-') && myNumbers.includes(myNumbers[i+2]) ) {
                    myArray[i+2] = '-'+myArray[i+2];
                    myArray.splice(i + 1, 1);
            }
        }
    }

    for (let i = 0; i < myArray.length; i++) {
        if (i + 2 <= myArray.length) {
            while (((myArray[i] == '(' || myArray[i] == ')' ))
                && (myArray[i + 1] == '-') && myNumbers.includes(myNumbers[i+2]) ) {
                    myArray[i+2] = '-'+myArray[i+2];
                    myArray.splice(i + 1, 1);
            }
        }
    }

    myArray = myArray.join(' ');

    auxArray = myArray.split(' ').map(x => {
        if (myOperators.includes(x)) {
            return 'Operador'
        } else if (myNumbers.includes(x)) {
            return 'Numero'
        } else  {
            return 'Numero'
        }
    });


    if (!auxArray.join('').includes('Operador')
        || !auxArray.join('').includes('Numero')
    ) {
        myArray = 'erro sintático';
    } else {
        myArray = myArray.split(' ').map(x => {
            let token;
            if (myOperators.includes(x)) {
                let valor;

                switch (x) {
                    case '+':
                        valor = 'SOMA'
                        break;
                    case '-':
                        valor = 'SUB'
                        break;
                    case '*':
                        valor = 'MULT'
                        break;
                    case '/':
                        valor = 'DIV'
                        break;
                    case '**':
                        valor = 'EXP'
                        break;
                    default:
                        break;
                }

                token = new Token(x, 'Operador', valor);
                return token
            } else if (myPointers.includes(x)) {
                let valor;

                if (x == '(') {
                    valor = 'PARESQ'
                } else {
                    valor = 'PARDIR'
                }

                token = new Token(x, 'Pontuacao', valor);
                return token
            } else {
                token = new Token(x, 'Número', x);
                return token
            }
        });
    }

    result = [];

    myArray.forEach(element => {
        let contains = false;
        result.forEach(element2 => {
            if (element.valor == element2.valor) {
                contains = true;
            }
        })
        if (!contains) {
            result.push(element)
        }
    });

    console.table(result)

}



analisadorLexico('12+  -(-4)');

