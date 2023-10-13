export type AudioProviderEvent = {
  type: AudioProviderEventTypes
}

export enum AudioProviderEventTypes {
  AUDIO_UPDATED = 'AUDIO_UPDATED',
  AUDIO_TIME_UPDATE = 'AUDIO_TIME_UPDATE'
}

export interface IAudioProvider {
  load(): Promise<IAudioProvider>;

  get loaded(): boolean;

  getAudioContext(): AudioContext;

  getAudioBuffer(): AudioBuffer;

  getAudio(): HTMLAudioElement

  getSamples(channel: number): number[];

  addListener(callback: (event: AudioProviderEvent) => void): void;

  removeListener(callback: (event: AudioProviderEvent) => void): void;
}
