import {
  ModeEdit,
  PersonAddAlt1Rounded,
  ShoppingCart,
} from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import ShoppingModal from "../Shop/ShoppingModal";
import { DrawerHeader } from "../UI/StyledMUI";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: red[500],
    color: "white",
    right: -4,
    padding: "0 4px",
    border: `1px solid ${theme.palette.background.paper}`,
  },
}));

export default function Navigation(props) {
  const theme = useTheme();
  const ctx = React.useContext(AuthContext);
  const cartContext = React.useContext(CartContext);
  // const [open, setOpen] = React.useState(false);

  const numberOfCartItem = cartContext.items.reduce(
    (acc, cur) => (acc += cur.qty),
    0
  );

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const menu = (index) => {
    switch (index) {
      case 0:
        return "/product";
      case 1:
        return "/shop";
      case 2:
        return "/";

      default:
        return "/shop";
    }
  };

  const mapIndexToIcon = (index) => {
    switch (index) {
      case 0:
        return <ModeEdit />;
      case 1:
        return <ShoppingCart />;
      case 2:
        return <PersonAddAlt1Rounded />;

      default:
        return <ShoppingCart />;
    }
  };

  const handleDrawerOpen = () => {
    props.onDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    props.onDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {ctx.storeIsLoggedIn && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={props.isDrawerOpen}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(props.isDrawerOpen && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography sx={{ flex: 1 }} variant="h6" noWrap component="div">
                My shop
              </Typography>

              <IconButton
                sx={{ marginRight: 2 }}
                onClick={handleClickOpenModal}
              >
                <StyledBadge
                  badgeContent={numberOfCartItem}
                  // sx={{
                  //   "& .MuiBadge-badge": {
                  //     color: "black",
                  //     backgroundColor: red[500],
                  //   },
                  // }}
                >
                  <ShoppingCart sx={{ width: 28, height: 28, color: "#fff" }} />
                </StyledBadge>
              </IconButton>

              <Button color="inherit" onClick={props.onFetchProduct}>
                Fetch
              </Button>
              <Button
                color="inherit"
                //  onClick={props.logoutHandler}
                onClick={ctx.logout}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={props.isDrawerOpen}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {["Manage Product", "Shop", "Register user"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to={menu(index)}>
                      <ListItemIcon>
                        {/* {index % 2 === 0 ? <ModeEdit /> : <ShoppingCart />} */}
                        {mapIndexToIcon(index)}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Drawer>
        </Box>
      )}
      <ShoppingModal
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
      />
    </React.Fragment>
  );
}
