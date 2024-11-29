import React, { useState, useEffect, useCallback } from 'react';
import Window from '../Window';

// Define types
type Shape = number[][];
type BlockType = {
  shape: Shape;
  width: number;
  height: number;
};

type BlockPosition = {
  x: number;
  y: number;
};

// Define block shapes
const SHAPES: Shape[] = [
  [[1,1,1,1]],                  // Long bar
  [[1,1],[1,1]],                // Square
  [[0,1,1],[1,1,0]],            // S-shape
  [[1,1,0],[0,1,1]],            // Z-shape
  [[1,0,0],[1,1,1]],            // L-shape
  [[0,0,1],[1,1,1]]             // Reverse L-shape
];

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const BlockStackerGame: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentBlock, setCurrentBlock] = useState<BlockType | null>(null);
  const [blockPosition, setBlockPosition] = useState<BlockPosition>({ x: 0, y: 0 });
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Generate a random block
  const generateBlock = useCallback((): BlockType => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return {
      shape,
      width: shape[0].length,
      height: shape.length
    };
  }, []);

  // Check if block can move
  const canMove = useCallback((block: BlockType, offsetX: number, offsetY: number): boolean => {
    if (!block) return false;

    for (let y = 0; y < block.height; y++) {
      for (let x = 0; x < block.width; x++) {
        if (block.shape[y][x]) {
          const newX = blockPosition.x + x + offsetX;
          const newY = blockPosition.y + y + offsetY;

          if (
            newX < 0 || 
            newX >= BOARD_WIDTH || 
            newY >= BOARD_HEIGHT || 
            (newY >= 0 && board[newY][newX])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board, blockPosition]);

  // Move block down
  const moveDown = useCallback(() => {
    if (!currentBlock) return;

    if (canMove(currentBlock, 0, 1)) {
      setBlockPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      // Lock the block in place
      const newBoard = board.map(row => [...row]);
      for (let y = 0; y < currentBlock.height; y++) {
        for (let x = 0; x < currentBlock.width; x++) {
          if (currentBlock.shape[y][x]) {
            const boardY = blockPosition.y + y;
            const boardX = blockPosition.x + x;
            if (boardY >= 0) {
              newBoard[boardY][boardX] = 1;
            }
          }
        }
      }

      // Check for completed lines
      const completedLines: number[] = newBoard.reduce((acc: number[], row, index) => {
        if (row.every(cell => cell === 1)) {
          acc.push(index);
        }
        return acc;
      }, []);

      // Remove completed lines and add new empty lines at the top
      if (completedLines.length > 0) {
        completedLines.forEach(lineIndex => {
          newBoard.splice(lineIndex, 1);
          newBoard.unshift(Array(BOARD_WIDTH).fill(0));
        });

        // Update score
        setScore(prev => prev + completedLines.length * 100);
      }

      setBoard(newBoard);
      
      // Generate new block
      const newBlock = generateBlock();
      setCurrentBlock(newBlock);
      setBlockPosition({ 
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newBlock.width / 2), 
        y: 0 
      });

      // Check for game over
      if (!canMove(newBlock, 0, 0)) {
        setGameOver(true);
      }
    }
  }, [board, currentBlock, blockPosition, canMove, generateBlock]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    // Initialize first block if not exists
    if (!currentBlock) {
      const newBlock = generateBlock();
      setCurrentBlock(newBlock);
      setBlockPosition({ 
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newBlock.width / 2), 
        y: 0 
      });
    }

    // Move down every second
    const gameLoop = setInterval(moveDown, 1000);
    return () => clearInterval(gameLoop);
  }, [currentBlock, moveDown, gameOver, generateBlock]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || !currentBlock) return;

      switch (e.key) {
        case 'ArrowLeft':
          if (canMove(currentBlock, -1, 0)) {
            setBlockPosition(prev => ({ ...prev, x: prev.x - 1 }));
          }
          break;
        case 'ArrowRight':
          if (canMove(currentBlock, 1, 0)) {
            setBlockPosition(prev => ({ ...prev, x: prev.x + 1 }));
          }
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          // Rotate block
          const rotatedBlock: BlockType = {
            ...currentBlock,
            shape: currentBlock.shape[0].map((val, index) => 
              currentBlock.shape.map(row => row[index]).reverse()
            ),
            width: currentBlock.height,
            height: currentBlock.width
          };

          if (canMove(rotatedBlock, 0, 0)) {
            setCurrentBlock(rotatedBlock);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentBlock, canMove, moveDown, gameOver]);

  // Render block on board
  const renderBoard = (): number[][] => {
    const displayBoard = board.map(row => [...row]);

    if (currentBlock && !gameOver) {
      for (let y = 0; y < currentBlock.height; y++) {
        for (let x = 0; x < currentBlock.width; x++) {
          if (currentBlock.shape[y][x]) {
            const boardY = blockPosition.y + y;
            const boardX = blockPosition.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = 2;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  const restartGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentBlock(null);
    setBlockPosition({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <Window title="Block Stacker">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-xl font-bold">Score: {score}</div>
        <div className="grid grid-cols-10 gap-1 bg-gray-100 border-2 border-gray-300">
          {renderBoard().map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`w-6 h-6 
                  ${cell === 1 ? 'bg-blue-500' : 
                    cell === 2 ? 'bg-green-500' : 
                    'bg-white border border-gray-200'}`}
              />
            ))
          )}
        </div>
        {gameOver && (
          <div className="mt-4 text-center">
            <div className="text-red-500 text-2xl mb-2">Game Over!</div>
            <div className="text-gray-600 mb-4">Your Score: {score}</div>
            <button 
              onClick={restartGame}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Restart Game
            </button>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-600">
          Use Arrow Keys: ← → to move, ↑ to rotate, ↓ to drop faster
        </div>
      </div>
    </Window>
  );
};

export default BlockStackerGame;