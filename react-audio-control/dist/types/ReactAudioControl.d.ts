import React from 'react';
import { RenderWaveFormOptions } from '@guidestar/sparkline';
import { IAudioProvider } from "./IAudioProvider";
import './ReactAudioControl.scss';
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
    children?: React.JSX.Element | React.JSX.Element[];
}
declare const ReactAudioControl: ({ audioProvider, channelOptions, className, children }: ReactAudioControlProps) => React.JSX.Element;
export { ReactAudioControl };
