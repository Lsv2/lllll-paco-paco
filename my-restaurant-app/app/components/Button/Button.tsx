import React from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  buttonStyle?: 'btn--primary' | 'btn--outline' | 'btn--test'; // Define possible button styles
  buttonSize?: 'btn--medium' | 'btn--large'; // Define possible button sizes
  onClick?: () => void; // Define onClick event handler
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  buttonStyle = 'btn--primary',
  buttonSize = 'btn--medium',
  onClick,
}) => {
  const checkButtonStyle = `btn ${className} ${buttonStyle} ${buttonSize}`;

  return (
    <button className={checkButtonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
