import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import NavigationIcon from "@material-ui/icons/Navigation";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import {
  logout,
  isAuthenticated,
  isSocialAuthenticated,
  sociallogout
} from "../bookhouseapi/Bookhouseuserapi";
import { itemTotal } from "./Cart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const options = [
  "Create a merge commit",
  "Squash and merge",
  "Rebase and merge"
];
const images = [
  {
    url:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/15979/404-character-new.png",
    title: "Breakfast",
    width: "50%"
  },
  {
    url:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/283591/login-background.jpg",
    title: "Burgers",
    width: "50%"
  }
];

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(2)
  },
  input: {
    display: "none"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%"
  },
  image: {
    position: "relative",
    height: 50,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
}));

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#760B0B" };
  } else {
    return { color: "#ffffff" };
  }
};

const BookHouseBottomMenu = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [value, setValue] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const showcontent = () => {
    return (
      <div>
        <ul className="nav nav-tabs bg-light">
          <li className="nav-item">
            <Button variant="contained" className={classes.button}>
              Default
            </Button>
          </li>

          <li className="nav-item">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Primary
            </Button>
          </li>

          <li className="nav-item">
            <Fab variant="extended" aria-label="like" className={classes.fab}>
              <NavigationIcon className={classes.extendedIcon} />
              Extended
            </Fab>
          </li>

          <li className="nav-item">
            <Fab disabled aria-label="like" className={classes.fab}>
              <FavoriteIcon />
            </Fab>
          </li>

          <li className="nav-item"></li>

          {!isAuthenticated() && !isSocialAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/login")}
                  to="/login"
                >
                  <h3>Login</h3>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/register")}
                  to="/register"
                >
                  <h3>Register</h3>
                </Link>
              </li>
            </Fragment>
          )}

          {!isSocialAuthenticated() && !isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/sociallogin")}
                  to="/sociallogin"
                >
                  <h3>Social Login</h3>
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#E88014" }}
                  onClick={() =>
                    logout(() => {
                      history.push("/login");
                    })
                  }
                >
                  <h3>LogOut</h3>
                </span>
              </li>
            </Fragment>
          )}
          {isSocialAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#E88014" }}
                  onClick={() =>
                    sociallogout(() => {
                      history.push("/");
                    })
                  }
                >
                  <h3>SocialLogOut</h3>
                </span>
              </li>
            </Fragment>
          )}

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/search")}
              to="/search"
            >
              <h3>Search Book</h3>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return <div>{showcontent()}</div>;
};

export default withRouter(BookHouseBottomMenu);
