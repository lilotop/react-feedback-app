Header.defaultProps = {
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95'
  };
  
type Props = {
    text: string, 
    bgColor?: string, 
    textColor?: string
}

function Header({ text, bgColor = 'rgba(0,0,0,0.4)', textColor = '#ff6a95'}: Props) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor
  };
  return (
    <header style={headerStyles}>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
}

export { Header };
