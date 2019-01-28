import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UploadFile from "./uploadFile";
import Header from "./header";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 30,
    maxWidth: 900,
    margin: "0 auto",
    marginTop: 30,
    minHeight: 250
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <br />
        <Grid className={classes.root} container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="headline" gutterBottom>
                Վերբեռնել Armsclii ֆորմատով .docx ֆայլը
              </Typography>
              <Typography gutterBottom noWrap>
                Ուշադրություն ֆայլը պետք է լինի .docx ֆորմատի այլապես
                փոխակերպումը չի աշխատի։ <br />
                Եթե ֆայլը .doc ֆորմատի է կարող եք բացել այն Microsoft Word
                ծրագրով և պահպանել .docx ֆորմատով։
              </Typography>
              <br />
              <UploadFile />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
