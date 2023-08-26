import "./ImageSpacialFilter.css";

import {MatrixInputComponent} from "../../components/matrix/MatrixInputComponent";
import React from "react";

let actualMask = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]

export const ImageSpacialFilter = () => {
    return (
        <div className="img_spacial_page">
            <h1 className="img_spacial_page_title">
                Filtro de imagenes con mascara.
            </h1>

            <MatrixInputComponent generate={true}/>
            <h3 className="img_spacial_page_title">
            Mascara aca 
            </h3>
            <MatrixInputComponent masks={true}/>

            
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

const handleCalculate = () => {
    let row = document.querySelector('#row').value;
    let column = document.querySelector('#column').value;

    if (row === '' || column === '') {
        alert('Ingresa un valor válido')
        return
    }


    let result = calculateSpacial(getElements(column, row));

    console.log(result)

    const list = document.querySelector('.resultados_lista');

    const li = document.createElement('li');
    li.className = 'result_item';
    li.innerHTML = `g(${row},${column}) = ${result}`;
    list.appendChild(li);

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

};

const calculateSpacial = (numbers) => {
    get_actual_mask();
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
    unorder = unorder.filter((value) => value !== 0);


        process += "(";
        let multiply = []
        for (let i = 0; i < numbers.length; i++) {
            const row = numbers[i];
            for (let j = 0; j < row.length; j++) {
                const number = row[j];
                const in_matriz = actualMask[i][j];
                if (number === -1) {
                    continue;
                }
                multiply.push(number * in_matriz);
                process += ` (${number} * ${in_matriz}) +`;
            }
        }
        process = process.slice(0, -1);
        process += ") -> ";
        process += multiply.join(' + ');
        let result = multiply.reduce((a, b) => a + b, 0);
        process += ` -> ${result}`;
        result = result
        process += ` -> ${result.toFixed(2)}`;
        result = Math.round(result);
        process += ` -> ${result}`;
        return process;
}


const get_actual_mask = () => {
    const matrix = document.querySelector('.matrix_component_matrix_matrix_mask')
    const mask = []
    for (let i = 0; i < 3; i++) {
        const row = []
        for (let j = 0; j < 3; j++) {
            row.push(parseInt(matrix.children[i].children[j].value))
        }
        mask.push(row)
    }
    actualMask = mask
};