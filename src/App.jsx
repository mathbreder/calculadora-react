import { useState } from 'react';
import { BackspaceIcon } from './components/BackspaceIcon';
import { Button } from './components/Button';
import { Visor } from './components/Visor';
import { Container, Content, Row } from './styles';

function App() {
  const [operations, setOperations] = useState([]);
  const [currentNumber, setCurrentNumber] = useState('');
  const [result, setResult] = useState('');
  const [finished, setFinished] = useState(false);

  const handleOnBackspace = () => {
    const newNumberIsValid = !Number.isNaN(currentNumber.slice(0, -1));
    setCurrentNumber(newNumberIsValid ? currentNumber.slice(0, -1) : '');
  }

  const handleOnClear = () => {
    setOperations([]);
    setCurrentNumber('0')
  }

  const handleAddNumber = (number) => {
    if (finished) {
      setCurrentNumber(number);
      setOperations([])
      setFinished(false);
    } else {
      setCurrentNumber(prev => `${prev === '0' ? '' : prev}${number}`)
    }
  }

  const handleAddDecimal = () => {
    if (currentNumber.includes('.')) return;
    setCurrentNumber(prev => `${prev === '0' ? '' : prev}.`)
  }

  const handleInvertSignal = () => {
    let number = currentNumber || result;
    if (number.startsWith('-')) number = number.substring(1);
    else number = '-' + number;
    setCurrentNumber(number)
  }

  const sum = (firstNumber, secondNumber) => Number(firstNumber) + Number(secondNumber);
  const subtract = (firstNumber, secondNumber) => Number(firstNumber) - Number(secondNumber);
  const multiply = (firstNumber, secondNumber) => Number(firstNumber) * Number(secondNumber);
  const divide = (firstNumber, secondNumber) => Number(firstNumber) / Number(secondNumber);
  const exponentiation = (firstNumber, secondNumber) => Number(firstNumber) ** Number(secondNumber);

  const handleOperation = (op) => {
    const newOperations = [...operations];
    if (newOperations.length === 0) newOperations.push({ type: "+", number: '0' });
    newOperations[newOperations.length - 1].number = currentNumber || result;
    newOperations.push({ type: op, number: ''});
    setOperations(newOperations);
    setCurrentNumber('');
    setResult('');
    if (newOperations.length > 2) handleResult(newOperations);
  }

  const getOperation = (op) => {
    if (op === '+') return sum;
    if (op === "-") return subtract;
    if (op === "x") return multiply;
    if (op === "/") return divide;
    if (op === "^") return exponentiation;
    return (firstNumber, secondNumber) => firstNumber ?? secondNumber;
  }

  const calculate = () => {
    const operationTypes = [['^'], ['x', '/'], ['+', '-']];
    const newOperations = operations.map((op) => ({...op}));
    for (let typeList of operationTypes) {
      let index = newOperations.findIndex((op, i) => i > 0 ? typeList.includes(op.type) : false) ?? -1;
      while (index > -1) {
        const runOperation = getOperation(newOperations[index].type);
        newOperations[index - 1].number =  runOperation(
          newOperations[index - 1].number,
          newOperations[index].number,
        );
        newOperations.splice(index, 1);
        index = newOperations.findIndex((op, i) => i > 0 ? typeList.includes(op.type) : false) ?? -1;
      }
    }
    return newOperations[0].number;
  }

  const handleResult = (operations) => {
    if (operations.length === 0) return;
    const result = calculate();
    setCurrentNumber('');
    setResult(String(result));
  }

  const handleEqual = () => {
    setFinished(true);
    if (operations.length === 0) return;
    operations[operations.length - 1].number = currentNumber;
    handleResult(operations);
  };

  return (
    <Container>
      <Content>
        <Visor operations={operations} result={currentNumber || result} />
        <Row>
          <Button
            label={<>x<sup style={{fontSize: '0.65em'}}>y</sup></>}
            onClick={() => handleOperation('^')}
          />
          <Button label="/" onClick={() => handleOperation('/')} />
          <Button label="C" onClick={handleOnClear} />
          <Button label={<BackspaceIcon />} onClick={handleOnBackspace} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="x" onClick={() => handleOperation('x')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="-" onClick={() => handleOperation('-')} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="+" onClick={() => handleOperation('+')} />
        </Row>
        <Row>
          <Button label="+/-" onClick={handleInvertSignal} />
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="," onClick={handleAddDecimal} />
          <Button label="=" onClick={handleEqual} />
        </Row>
      </Content>
    </Container>
  )
}

export default App
