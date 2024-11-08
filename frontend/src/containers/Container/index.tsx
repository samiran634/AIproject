import styled from 'styled-components';

interface Props {
  text: string;
}

const StyledComponent = styled.div`
  /* Add your styles here */
`;

const Container = ({ text }: Props) => {
  return (
    <StyledComponent>
      {text}
    </StyledComponent>
  );
};

export default Container;

