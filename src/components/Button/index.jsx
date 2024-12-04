import { ButtonContainer } from './styles';

export const Button = ({label, onClick}) => {
  return (
    <ButtonContainer onClick={onClick}>
      {label}
    </ButtonContainer>
  )
}
