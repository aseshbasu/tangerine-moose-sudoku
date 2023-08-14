'use client'

import React, { useState , useEffect} from 'react';

export default function Board() {
  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => new Array(9).fill(0)));


  const solve = () => {
    console.log(grid)
    const isValidRow = (row) => {
      const seen = new Set();
      for (let num of row) {
        if (parseInt(num) !== 0 && seen.has(parseInt(num))) {
          return false;
        }
        seen.add(num);
      }
      return true;
    };

    const rowValidities = grid.map((row) => isValidRow(row));
    const isSudokuValid = rowValidities.every((validity) => validity);

    if (isSudokuValid) {
      alert('Atleast one row is  valid!');
    } else {
      alert('Atleast one row is NOT valid.');
    }
  };

  useEffect(() => {
      // Generate a 9x9 grid with random values from 1 to 9
      const newGrid = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () =>'-')
      );
      setGrid(newGrid);
    }, []);

  const handleCellClick = (row, col) => {
    // Prompt the user to input a number between 1 and 9
    const userInput = prompt('Enter a number between 1 and 9:');
    const parsedNumber = parseInt(userInput, 10);

    if (!isNaN(parsedNumber) && parsedNumber >= 1 && parsedNumber <= 9) {
      const updatedGrid = [...grid];
      updatedGrid[row][col] = parsedNumber;
      setGrid(updatedGrid);
    } else {
      alert('Invalid input. Please enter a number between 1 and 9.');
    }
  };

  return (
    <>
    <div className="sudoku-grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="sudoku-cell"
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell !== 0 ? cell : ''}
          </div>
        ))
      )}
    </div>
    <br />
    
    <div>
      <button onClick={solve}>Solve</button>
    </div>
    </>
  );
};
