// material-ui
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "assets/images/users/logo.svg";

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <img src={logo} alt="Mantis" width="40" />
      <Typography style={{ fontWeight: 600, fontSize: "24px" }}>
        Inventron
      </Typography>
    </>
  );
};

export default Logo;
