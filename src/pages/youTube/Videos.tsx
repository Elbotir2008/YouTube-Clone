import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";
import useStore from "../../zustand/store";

const Videos = () => {
  const [videosData, setVideosData] = useState<any>([]);
  const [selectedButton, setSelectedButton] = useState("");
  const dark = useStore((state: any) => state.dark);
  console.log(dark);
  const fetchVideos = async () => {
    const options = {
      method: "GET",
      url: `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=$news`,
      params: {
        playlistId: "RDZiQo7nAkQHU",
        part: "snippet",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "b87e71253bmsh4087579332e4b83p1726c5jsn95d11fef2cb4",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      setVideosData(data.items); // Set the items array to state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
    // fetchInputValues();
  }, []);

  const handleClick = async (e: any) => {
    setSelectedButton(e.currentTarget.innerText);
    const options = {
      method: "GET",
      url: `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=$${e.currentTarget.innerText}`,
      params: {
        playlistId: "RDZiQo7nAkQHU",
        part: "snippet",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "b87e71253bmsh4087579332e4b83p1726c5jsn95d11fef2cb4",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      setVideosData(data.items); // Set the items array to state
    } catch (error) {
      console.log(error);
    }
  };

  //   setVideosData(searchVideos);

  return (
    <Box
      sx={{
        backgroundColor: dark ? "#1D1A17" : null,
        color: dark ? "#fff" : null,
      }}
    >
      <Box
        className="btns flex-class"
        sx={{
          color: dark ? "#fff !important" : null,
          fill: dark ? "#fff !important" : null,
        }}
      >
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "New" ? "selectedButton" : ""}
        >
          New
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Movie" ? "selectedButton" : ""}
        >
          Movie
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "New" ? "selectedButton" : ""}
        >
          Live
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Live" ? "selectedButton" : ""}
        >
          Gaming
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Education" ? "selectedButton" : ""}
        >
          Education
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Sport" ? "selectedButton" : ""}
        >
          Sport
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Comedy" ? "selectedButton" : ""}
        >
          Comedy
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Podcast" ? "selectedButton" : ""}
        >
          Podcast
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Fashion" ? "selectedButton" : ""}
        >
          Fashion
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Crypto" ? "selectedButton" : ""}
        >
          Crypto
        </Button>
        <Button
          sx={{
            border: dark ? "1px solid #fff !important" : null,
            color: dark ? "#fff !important" : null,
          }}
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "GYM" ? "selectedButton" : ""}
        >
          GYM
        </Button>
      </Box>
      <div className="cards grid-class">
        {videosData?.length > 0 ? (
          videosData?.map((vd: any, index: any) => (
            <div className="card" key={index}>
              <Link to={`/videos/${vd.id.videoId}`}>
                <img src={vd.snippet.thumbnails.high.url} alt="Error" />
              </Link>
              <h1>{vd.snippet.title}</h1>
              <Link to={`/channel/${vd.snippet.channelId}`}>
                <div className="flex-class">
                  <img
                    src={vd.snippet.thumbnails.default.url}
                    className="channelImg"
                    alt="Eror"
                  />
                  <h4
                  // style={{
                  //   backgroundColor: dark ? "#1D1A17 !important" : null,
                  //   color: dark ? "#fff" : null,
                  // }}
                  >
                    {vd.snippet.channelTitle}
                  </h4>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </Box>
  );
};

export default Videos;
