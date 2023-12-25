import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { mainListItems, secondaryListItems } from "./ListItem";
import "./youtube.scss";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Stack, TextField } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import Videos from "./Videos";
import useStore from "../../zustand/store";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const handleSubmit = useStore((state: any) => state.handleSubmit);
  // console.log(searchValue);
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
              bgcolor: "#fff",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ fill: "#000", width: "2rem", height: "2rem" }} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <button
                onClick={() => location.reload()}
                style={{ background: "#fff", border: "none" }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    position: open ? "absolute" : null,
                    left: open ? "-20%" : null,
                    top: open ? "17%" : null,
                    cursor: "pointer",
                  }}
                >
                  <YouTubeIcon
                    className="youtubeicon"
                    sx={{
                      width: "4rem",
                      height: "4rem",
                      color: "#FF0000",
                      cursor: "pointer",
                    }}
                  />
                  <Typography variant="h4" sx={{ color: "#000" }}>
                    YouTube
                  </Typography>
                </Stack>
              </button>
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                size="small"
                placeholder="Search..."
                sx={{
                  width: "50rem",
                  fontSize: "4rem",
                  marginRight: "32rem",
                }}
              />
              <Button
                type="submit"
                sx={{
                  position: "absolute",
                  top: "23%",
                  left: "63.8%",
                  color: "#000",
                  width: "2.5rem",
                  height: "3rem",
                  bgcolor: "#F8F8F8",
                  px: 4,
                  py: 2,
                  cursor: "pointer",
                  borderTopRightRadius: "5rem",
                  borderBottomRightRadius: "5rem",
                }}
              >
                <SearchIcon />
              </Button>
              <Button
                sx={{
                  position: "absolute",
                  left: "71%",
                  color: "#000",
                  // borderRadius: "50%",
                  bgcolor: "#F8F8F8",
                  px: 1,
                  py: 1,
                  cursor: "pointer",
                }}
              >
                <MicIcon />
              </Button>
            </form>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon
                  sx={{ fill: "#000", width: "3rem", height: "3rem" }}
                />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <PermIdentityIcon
                sx={{ fill: "#000", width: "3rem", height: "3rem" }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{ fill: "#000" }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Videos />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
