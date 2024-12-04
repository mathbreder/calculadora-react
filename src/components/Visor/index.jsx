import { toSuperscript } from "../../lib/utils";

import { VisorContainer } from './styles';

/**
 * Visor component that displays a list of operations and their result.
 *
 * @param {Object} props
 * @prop {Array} props.operations - An array of objects where each object
 *                                   contains a number and an operation type.
 *                                   Example: [{number: '1', type: '+'}]
 * @prop {Number} props.result - The result of the operations.
 *
 * @return {ReactElement}
 */
export const Visor = ({operations, result}) => {
  const getOperations = () => {
    const ops = [...operations];
    return ops.reduce((acc, current, i) => {
      if (i === 0) return current.number;
      if (current.type === '^') {
        const supNumber = toSuperscript(current.number);
        return `${acc}${supNumber}`
      }
      if (current.number === '') return `${acc} ${current.type}`;
      return `${acc} ${current.type} ${current.number}`;
    }, '');
  };
  return (
    <VisorContainer>
      <input id="operations" value={getOperations()} disabled />
      <input id="result" value={result} disabled />
    </VisorContainer>
  )
}
