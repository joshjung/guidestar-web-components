import { AudioProviderEvent, IAudioProvider } from "./IAudioProvider";
export declare class AudioUrlProvider implements IAudioProvider {
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
