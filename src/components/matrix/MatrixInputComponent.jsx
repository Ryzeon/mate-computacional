import './MatrixInputComponent.css'

export const MatrixInputComponent = (props) => {
    // Check if generate is true

    if (props.generate === true) {
        return (<div className='matrix_input_component'>

            <div className='matrix_input_component_cols_rows'>
                <input className='matrix_input_component_rows_input' type='number'
                       id='matrix_input_component_cols_rows_input'
                       placeholder='Ingresa las columnas'/>
                <input className='matrix_input_component_cols_input' type='number'
                       id='matrix_input_component_cols_rows_input'
                       placeholder='Ingresa las filas'/>

                <button className='matrix_input_component_cols_rows_button' onClick={
                    handleGenerateMatrix
                }>Generar matriz
                </button>
            </div>

            <div className='matrix_component_matrix'>
            </div>

        </div>);
    }

    return (<div className='matrix_input_component'>

        <div className='matrix_component_matrix'>
        </div>


    </div>);

}

const handleGenerateMatrix = () => {
    const cols = document.querySelector('.matrix_input_component_rows_input').value
    const rows = document.querySelector('.matrix_input_component_cols_input').value

    if (cols === '' || rows === '') {
        alert('Ingresa un valor válido')
        return
    }

    // check for negative values
    if (cols < 0 || rows < 0) {
        alert('Ingresa un valor válido')
        return
    }

    const matrix = generateMatrix(cols, rows) // Generate a matrix with input cols and rows

    const matrixContainer = document.querySelector('.matrix_component_matrix')

    matrixContainer.innerHTML = ''

    // render matrix
    matrixContainer.appendChild(matrix)
}

const generateMatrix = (rows, cols) => {
    const matrix = document.createElement('div')
    matrix.className = 'matrix_component_matrix_matrix'

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div')
        row.className = 'matrix_component_matrix_matrix_row'

        for (let j = 0; j < cols; j++) {
            const col = document.createElement('input')

            // Insert --matrix_cols in css
            col.className = 'matrix_component_matrix_matrix_row_col'
            col.type = 'number'
            col.placeholder = '0'
            row.appendChild(col)
        }

        matrix.appendChild(row)
    }

    return matrix
}

