import axios from "axios";
import { create } from "zustand";

const useStore = create((set) => ({
  searchValue: "",
  searchVideos: [],
  dark: false,
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
        "X-RapidAPI-Key": "1d48b52a30msh402aef233dd2b53p13823djsn07843b2bbce3",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      set({
        searchVideos: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  darkClick: () => {
    set((state: any) => ({ dark: !state.dark }));
  },
}));
export default useStore;
