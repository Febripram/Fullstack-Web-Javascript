export interface CustomInputProps {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface classProp {
  label: string;
  value: string;
}

export interface selectAirportProp {
  value: number;
  label: JSX.Element;
}
