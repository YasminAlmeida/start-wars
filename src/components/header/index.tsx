import logoDark from "../../assets/images/logoWhite.png";
import logoLight from "../../assets/images/logoBlack.png";

export interface IHeader {
  theme: "light" | "dark";
}

export const Header = ({ theme }: IHeader) => {
  const logo = theme === "light" ? logoLight : logoDark;

  return (
    <img
      src={logo}
      alt="Star Wars"
      style={{ width: 100, marginBottom: 20, marginTop: 20 }}
    />
  );
};
