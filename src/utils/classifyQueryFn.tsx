import {getComingSoon, getNowPlaying, getPopular} from "../api.ts";

export default function classifyQueryFn(pathname: string) {
  if(pathname === "/") {
    return getPopular;
  }

  if(pathname === "/coming-soon") {
    return getComingSoon;
  }

  if(pathname === "/now-playing") {
    return getNowPlaying;
  }
}