import React from 'react';
import { RenderWaveFormOptions } from '@guidestar/sparkline';
import { IAudioProvider } from "./IAudioProvider";
import './ReactAudioControl.css';
export type ChannelOptions = RenderWaveFormOptions & {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};
export interface ReactAudioControlProps {
    audioProvider: IAudioProvider;
    channelOptions?: ChannelOptions[];
    className?: string;
}
declare const ReactAudioControl: ({ audioProvider, channelOptions, className }: ReactAudioControlProps) => React.JSX.Element;
export { ReactAudioControl };
