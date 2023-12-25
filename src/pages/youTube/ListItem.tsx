import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DownloadIcon from "@mui/icons-material/Download";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
// import PeopleIcon from "@mui/icons-material/People";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Home } from "@mui/icons-material";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
export const mainListItems = (
  <Box>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <Home
            sx={{
              width: "2rem",
              height: "2rem",
              mx: 1,
              // fill: dark ? "#fff !important" : null,
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link to="/shorts">
      <ListItemButton>
        <ListItemIcon>
          <SlideshowIcon
            sx={{
              width: "2rem",
              height: "2rem",
              mx: 1,
              // fill: dark ? "#fff !important" : null,
            }}
          />
        </ListItemIcon>{" "}
        <ListItemText primary="Shorts" />
      </ListItemButton>
    </Link>
    <Link to="/tradingVideos">
      <ListItemButton>
        <ListItemIcon>
          <AutoAwesomeMotionIcon
            sx={{
              width: "2rem",
              height: "2rem",
              mx: 1,
              // fill: dark ? "#fff !important" : null,
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Trading videos" />
      </ListItemButton>
    </Link>
  </Box>
);

export const secondaryListItems = (
  <Box>
    <ListSubheader component="div" inset></ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon
          sx={{
            width: "2rem",
            height: "2rem",
            mx: 1,
            // fill: dark ? "#fff !important" : null,
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Your channel" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <RotateLeftIcon
          sx={{
            width: "2rem",
            height: "2rem",
            mx: 1,
            // fill: dark ? "#fff !important" : null,
          }}
        />
      </ListItemIcon>
      <ListItemText primary="History" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <VideoLibraryIcon
          sx={{
            width: "2rem",
            height: "2rem",
            mx: 1,
            // fill: dark ? "#fff !important" : null,
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Your videos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <WatchLaterIcon
          sx={{
            width: "2rem",
            height: "2rem",
            mx: 1,
            // fill: dark ? "#fff !important" : null,
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Watch later" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DownloadIcon
          sx={{
            width: "2rem",
            height: "2rem",
            mx: 1,
            // fill: dark ? "#fff !important" : null,
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Dowlands" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ContentCutIcon
          sx={{
            width: "2rem",
            height: "2rem",
            mx: 1,
            // fill: dark ? "#fff !important" : null,
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Your clips" />
    </ListItemButton>
  </Box>
);
