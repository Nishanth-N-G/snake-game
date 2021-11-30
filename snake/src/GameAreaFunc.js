import React, { useState, useEffect } from 'react'
import Snake from './components/Snake'
import Food from './components/Food'

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
}

const initialState = {
    food: getRandomCoordinates(),
    speed: 3000,
    direction: 'RIGHT',
    snakeDots: [
        [0, 0],
        [2, 0]
    ]
}

function GameAreaFunc() {
    const [state, setState] = useState(initialState)
    const { food, speed, direction, snakeDots } = initialState

    useEffect(() => {
        console.log('useEffect called');
        let timer = setInterval(moveSnake, speed)
        document.onkeydown = onKeyDown;
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        console.log('useEffect called');
        // clearInterval()
        let timer = setInterval(moveSnake, speed)
        // document.onkeydown = onKeyDown;
        return () => clearInterval(timer)
    }, [direction])

    useEffect(() => {
        checkIfOutOfBorder();
        checkIfCollapsed();
        checkIfEat();
    })

    const onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                setState({ ...state, direction: 'UP' });
                break;
            case 40:
                setState({ ...state, direction: 'DOWN' });
                break;
            case 37:
                setState({ ...state, direction: 'LEFT' });
                break;
            case 39:
                setState({ ...state, direction: 'RIGHT' });
                break;
        }
    }

    const moveSnake = () => {
        let dots = [...snakeDots];
        console.log("moveSnake working", dots);
        let head = dots[dots.length - 1];
        console.log(head + " " + direction);

        switch (direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
        }
        dots.push(head);
        dots.shift();
        setState({
            ...state,
            snakeDots: dots
        })
        console.log(dots);
    }

    const checkIfOutOfBorder = () => {
        let head = snakeDots[snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            gameOver();
        }
    }

    const checkIfCollapsed = () => {
        let snake = [...snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach((dot) => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                gameOver();
            }
        })
    }

    const checkIfEat = () => {
        let head = snakeDots[snakeDots.length - 1];
        // let food = food;
        if (head[0] === food[0] && head[1] === food[1]) {
            setState({
                food: getRandomCoordinates()
            })
            enlargeSnake();
            increaseSpeed();
        }
    }

    const enlargeSnake = () => {
        let newSnake = [...snakeDots];
        newSnake.unshift([])
        setState({
            snakeDots: newSnake
        })
    }

    const increaseSpeed = () => {
        setState({
            speed: speed - 10
        })
    }

    const gameOver = () => {
        alert(`Game over. Snake length = ${snakeDots.length} `);
        setState(
            initialState
        )
    }

    return (
        <div className="game-area">
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
        </div>
    )
}

export default GameAreaFunc
