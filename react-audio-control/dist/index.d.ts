import React from 'react';
import { RenderWaveFormOptions } from '@guidestar/sparkline';

type AudioProviderEvent = {
    type: AudioProviderEventTypes;
};
declare enum AudioProviderEventTypes {
    AUDIO_UPDATED = "AUDIO_UPDATED"
}
interface IAudioProvider {
    load(): Promise<IAudioProvider>;
    get loaded(): boolean;
    getAudioContext(): AudioContext;
    getAudioBuffer(): AudioBuffer;
    getAudio(): HTMLAudioElement;
    getSamples(channel: number): number[];
    addListener(callback: (event: AudioProviderEvent) => void): void;
}

declare class AudioUrlProvider implements IAudioProvider {
    private _url?;
    private _loadPromise?;
    private _blob;
    private _arrayBuffer?;
    private _audioBuffer?;
    private _audioContext?;
    private _audio?;
    private _listeners;
    constructor({ url, autoload }: {
        url: string;
        autoload?: boolean;
    });
    get url(): string;
    get loaded(): boolean;
    load(): Promise<IAudioProvider>;
    getSamples(channel: number): number[];
    getAudio(): HTMLAudioElement;
    getAudioBuffer(): AudioBuffer;
    getAudioContext(): AudioContext;
    addListener(callback: (event: AudioProviderEvent) => void): void;
    private dispatch;
}

type ChannelOptions = RenderWaveFormOptions & {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};
interface ReactAudioControlProps {
    audioProvider: IAudioProvider;
    channelOptions?: ChannelOptions[];
    className?: string;
}
declare const ReactAudioControl: ({ audioProvider, channelOptions, className }: ReactAudioControlProps) => React.JSX.Element;

export { AudioUrlProvider, type IAudioProvider, ReactAudioControl };
