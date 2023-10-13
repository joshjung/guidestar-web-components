import React from 'react';
import { IAudioProvider } from "./IAudioProvider";
import { ChannelOptions } from "./ReactAudioControl";
export type RACContextType = {
    audioProvider?: IAudioProvider;
    playing: boolean;
    percent: number;
    channelOptions?: ChannelOptions[];
    togglePlay(): void;
};
export declare const RACContext: React.Context<RACContextType>;
