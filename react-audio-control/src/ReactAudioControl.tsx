import React, {useRef, useState} from 'react';
import {RenderWaveFormOptions} from '@guidestar/sparkline';
import {IAudioProvider} from "./IAudioProvider";
import './ReactAudioControl.scss';
import classNames from "classnames";
import {RACContext, RACContextType} from "./ReactAudioControlContext";
import RACCanvas from "./components/RACCanvas";
import RACPlayPause from "./components/RACPlayPause";

export type ChannelOptions = RenderWaveFormOptions & {
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface ReactAudioControlProps {
  audioProvider: IAudioProvider
  channelOptions?: ChannelOptions[]
  className?: string,
  children?: React.JSX.Element | React.JSX.Element[]
}

const ReactAudioControl = ({audioProvider, channelOptions, className, children}: ReactAudioControlProps) => {
  const classes: string = classNames('rac', className);

  const rootRef = useRef<HTMLDivElement>(null);

  function togglePlay() {
    if (state.playing) {
      state.audioProvider?.getAudio().pause();
    } else {
      state.audioProvider?.getAudio().play();
    }

    setState({...state, playing: !state.playing});
  }

  const [state, setState] = useState<RACContextType>({
    audioProvider,
    playing: false,
    percent: 0,
    channelOptions,
    togglePlay
  });

  children = children || <>
    <RACPlayPause className="default"/>
    <RACCanvas className="default"/>
  </>;

  return <RACContext.Provider value={{...state, togglePlay}}>
    <div className={classes}
         ref={rootRef}>
      {children}
    </div>
  </RACContext.Provider>;
};

export {ReactAudioControl};
