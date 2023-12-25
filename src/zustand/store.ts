import axios from "axios";
import { create } from "zustand";

const useStore = create((set) => ({
  searchValue: "",
  searchVideos: [],
  handleSubmit: async (e: any) => {
    e.preventDefault();
    set({ searchValue: e.target[0].value });
  },
  fetchInputValues: async (searchValue: any) => {
    const options = {
      method: "GET",
      url: `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=$news${
        searchValue ? searchValue : "News"
      }`,
      params: {
        playlistId: "RDZiQo7nAkQHU",
        part: "snippet",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "b4d3951735mshc2ec91a7c330cafp1fcff0jsn5d7b628e34d9",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      set({
        searchVideos: data,
      });
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
}));
export default useStore;
