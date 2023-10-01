export type AudioProviderEvent = {
    type: AudioProviderEventTypes;
};
export declare enum AudioProviderEventTypes {
    AUDIO_UPDATED = "AUDIO_UPDATED"
}
export interface IAudioProvider {
    load(): Promise<IAudioProvider>;
    get loaded(): boolean;
    getAudioContext(): AudioContext;
    getAudioBuffer(): AudioBuffer;
    getAudio(): HTMLAudioElement;
    getSamples(channel: number): number[];
    addListener(callback: (event: AudioProviderEvent) => void): void;
}
