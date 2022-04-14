import './App.css';
import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import { AiFillGithub } from 'react-icons/ai';

export const actions = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case actions.ADD_DIGIT:
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case actions.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand === null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case actions.DELETE_DIGIT:
      return {};
    case actions.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return '';
  }
  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;

    default:
      break;
  }
  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className='App'>
      <div className='container'>
        <div className='output'>
          <div className='previous-operand'>
            {previousOperand} {operation}
          </div>
          <div className='current-operand'>{currentOperand}</div>
        </div>
        <div className='grid-container'>
          <button
            operation='AC'
            className='span-two-col'
            onClick={() => dispatch({ type: actions.DELETE_DIGIT })}
          >
            AC
          </button>
          <OperationButton operation='/' dispatch={dispatch} />
          <OperationButton operation='*' dispatch={dispatch} />
          <DigitButton digit='7' dispatch={dispatch} />
          <DigitButton digit='8' dispatch={dispatch} />
          <DigitButton digit='9' dispatch={dispatch} />
          <OperationButton operation='-' dispatch={dispatch} />
          <DigitButton digit='4' dispatch={dispatch} />
          <DigitButton digit='5' dispatch={dispatch} />
          <DigitButton digit='6' dispatch={dispatch} />
          <OperationButton operation='+' dispatch={dispatch} />
          <DigitButton digit='1' dispatch={dispatch} />
          <DigitButton digit='2' dispatch={dispatch} />
          <DigitButton digit='3' dispatch={dispatch} />
          <button
            operation='='
            className='span-two-row'
            onClick={() => dispatch({ type: actions.EVALUATE })}
          >
            =
          </button>
          <DigitButton digit='0' dispatch={dispatch} />
          <DigitButton digit='.' dispatch={dispatch} />
          <a
            href='https://github.com/cuongvu3009/javascript-calculator'
            className='intro'
          >
            <AiFillGithub size='80px' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
