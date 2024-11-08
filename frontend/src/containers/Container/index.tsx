interface Props {
  text: string;
  style?: React.CSSProperties; // Add this line to include the style prop
}

const Container: React.FC<Props> = ({ text, style }) => (
  <div style={style}>
    {text}
  </div>
);

export default Container;

