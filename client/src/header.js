import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { FaPaypal, FaGithub, FaFacebookMessenger } from "react-icons/fa";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Armsclii to Unicode
          </Typography>
          <IconButton
            aria-owns="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            href="https://github.com/webfalcon/armscii-to-unicode-docx-js"
            target="_blank"
          >
            <FaGithub />
          </IconButton>
          <IconButton
            aria-owns="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            href="https://m.me/aramvardanyan.me"
            target="_blank"
          >
            <FaFacebookMessenger />
          </IconButton>
          <IconButton
            aria-owns="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            href="https://paypal.me/AramVardanyan"
            target="_blank"
            title="Աջակցել ծրագրի զարգացմանը"
          >
            <FaPaypal />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
