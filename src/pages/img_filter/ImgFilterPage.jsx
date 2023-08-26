import './ImgFilterPage.css';
import {MatrixInputComponent} from "../../components/matrix/MatrixInputComponent";
import React from "react";

const matriz_1_16 = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]
]
export const ImgFilterPage = () => {
    return (
        <div className="img_filter_page">
            <h1 className="img_filter_title">
                Filtrado de imagen, halla la media y mediana de una imagen
            </h1>

            <MatrixInputComponent generate={true}/>

            <div className="matrix_filtro_media">
                <input type={'radio'} name={'filtro'} value={'apagado'} id={'apagado'} defaultChecked={true}/>
                <label htmlFor={'apagado'}>Apagado</label>

                <input type={'radio'} name={'filtro'} value={'1/9'} id={'1/9'}/>
                <label htmlFor={'1/9'}>1/9</label>

                <input type={'radio'} name={'filtro'} value={'1/16'} id={'1/16'}/>
                <label htmlFor={'1/16'}>1/16</label>
            </div>


            <div className="point_container">
                <label htmlFor="row">Fila</label>
                <input type="number" name="row" id="row" min={0} max={2} defaultValue={0}/>
                <label htmlFor="column">Columna</label>
                <input type="number" name="column" id="column" min={0} max={2} defaultValue={0}/>
            </div>

            < div className="button_container">
                <button className='matrix_calculate_btn' onClick={
                    () => {
                        handleCalculate()
                    }
                }>Calcular
                </button>


                <br></br>

                <button className={'matrix_calculate_btn'} onClick={
                    () => {
                        const list = document.querySelector('.resultados_lista');
                        list.innerHTML = ''
                    }
                }>Limpiar
                </button>
            </div>


            <div className={'resultados'}>
                <ol className={'resultados_lista'}>

                </ol>
            </div>
        </div>
    )
}

const getElements = (row, column) => {
    const matrix = document.querySelector('.matrix_component_matrix_matrix')

    let numberFromSearch = matrix.children[row].children[column].value
    console.log(numberFromSearch)

    // Print in console the elements arround the position, remeber search by 3x3 matrix
    let numbers = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = column - 1; j <= column + 1; j++) {
            // Ignore if the position is out of the matrix just ignore it
            let value = -1;
            try {
                value = matrix.children[i].children[j].value;
               let row_in = i - row + 1;
                let column_in = j - column + 1;
                if (row_in > 2 || column_in > 2) {
                    continue;
                }
                numbers[i - row + 1][j - column + 1] = parseInt(value);
            } catch (e) {

            }
        }
    }

    console.log(numbers)

    return numbers;

}

const handleCalculate = () => {
    let filter = document.querySelector('input[name="filtro"]:checked').value;
    let row = document.querySelector('#row').value;
    let column = document.querySelector('#column').value;

    if (row === '' || column === '') {
        alert('Ingresa un valor válido')
        return
    }

    console.log(filter)

    let result = calculateMedia(getElements(column, row), filter);

    console.log(result)

    const list = document.querySelector('.resultados_lista');

    const li = document.createElement('li');
    li.className = 'result_item';
    li.innerHTML = `g(${row},${column}) = ${result}`;
    list.appendChild(li);

}

const calculateMedia = (numbers, filter) => {
    let process = "";
    let array_numbers = [];
    for (let i = 0; i < numbers.length; i++) {
        const row = numbers[i];
        for (let j = 0; j < row.length; j++) {
            const number = row[j];
            if (number === -1) {
                continue;
            }
            array_numbers.push(number);
        }
    }

    let unorder =
        array_numbers.slice(0);
    array_numbers.sort((a, b) => a - b);
    let sum = array_numbers.reduce((a, b) => a + b, 0);

    if (filter === "apagado") {
        process += (unorder.join(', '));
        process += " -> " + (array_numbers.join(', '));
        if (array_numbers.length % 2 === 0) {
            let middle = array_numbers.length / 2;
            let middle_1 = array_numbers[middle];
            let middle_2 = array_numbers[middle - 1];
            let result = (middle_1 + middle_2) / 2;
            process += ` -> (${middle_1} + ${middle_2}) / 2 = ${result.toFixed(2)}`;
            process += ' -> ' + Math.round(result);
            return process;
        }
        let middle = Math.floor(array_numbers.length / 2);
        return process + ' -> ' + array_numbers[middle];
    }

    unorder = unorder.filter((value) => value !== 0);

    if (filter === "1/9") {
        process += "1/9 * (" + unorder.join(' + ') + ")";
        process += " -> " + sum + " / 9";
        let result = sum / 9;
        process += " -> " + result.toFixed(2);
        result = Math.round(result);
        process += " -> " + result;
        return process;
    } else {
        process += "1/16 * (";
        let multiply = []
        for (let i = 0; i < numbers.length; i++) {
            const row = numbers[i];
            for (let j = 0; j < row.length; j++) {
                const number = row[j];
                const in_matriz = matriz_1_16[i][j];
                if (number === -1) {
                    continue;
                }
                multiply.push(number * in_matriz);
                process += ` (${number} * ${in_matriz}) +`;
            }
        }
        process = process.slice(0, -1);
        process += ") -> ";
        process += multiply.join(' + ') + " / 16";
        let result = multiply.reduce((a, b) => a + b, 0);
        process += ` -> ${result} / 16`;
        result = result / 16
        process += ` -> ${result.toFixed(2)}`;
        result = Math.round(result);
        process += ` -> ${result}`;
        return process;
    }
}