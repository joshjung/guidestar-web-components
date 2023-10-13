import React, {useContext} from "react";
import {RACContext} from "../ReactAudioControlContext";
import {FaPlay, FaStop} from 'react-icons/fa';
import classNames from "classnames";

type RACPlayPauseProps = {
  className?: string
}

export default function RACPlayPause({className}: RACPlayPauseProps) {
  const c: string = classNames('rac-play-pause', className);

  const {togglePlay, playing} = useContext(RACContext);

  function playPause_onClickHandler() {
    togglePlay();
  }

  return <div className={c}>
    <button onClick={playPause_onClickHandler}>{playing ? <FaStop/> : <FaPlay/>}</button>
  </div>;
}
