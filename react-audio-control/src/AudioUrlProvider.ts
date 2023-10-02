import {AudioProviderEvent, AudioProviderEventTypes, IAudioProvider} from "./IAudioProvider";

export class AudioUrlProvider implements IAudioProvider {
  private _url?: string = undefined;
  private _loadPromise?: Promise<IAudioProvider> = undefined;

  private _blob: Blob | null = null;
  private _arrayBuffer?: ArrayBuffer = undefined;
  private _audioBuffer?: AudioBuffer = undefined;
  private _audioContext?: AudioContext = undefined;
  private _audio?: HTMLAudioElement = undefined;

  private _listeners: ((event: AudioProviderEvent) => void)[] = [];

  constructor({url, autoload = true}: { url: string, autoload?: boolean }) {
    if (typeof window === undefined) {
      throw new Error('AudioUrlProvider is only available on the browser/client.');
    }

    this._url = url;

    if (autoload) {
      this.load();
    }
  }

  get url(): string {
    return this._url as string;
  }

  get loaded(): boolean {
    return !!this._audioBuffer;
  }

  load(): Promise<IAudioProvider> {
    if (this._loadPromise) {
      return this._loadPromise;
    }

    this._loadPromise = fetch(this.url)
      .then((result: Response) => {
        return result.blob();
      })
      .then((blob: Blob) => {
        this._blob = blob;
        return this._blob.arrayBuffer();
      })
      .then((arrayBuffer: ArrayBuffer) => {
        this._arrayBuffer = arrayBuffer;
        const ac: AudioContext = new AudioContext();
        return ac.decodeAudioData(arrayBuffer);
      })
      .then((audioBuffer: AudioBuffer) => {
        this._audioBuffer = audioBuffer;

        this.dispatch({type: AudioProviderEventTypes.AUDIO_UPDATED});

        return this as IAudioProvider;
      });

    return this._loadPromise;
  }

  getSamples(channel: number): number[] {
    if (!this._audioBuffer) return [];

    // TODO probably should cache this, as I think slice call will duplicate the data.
    return Array.prototype.slice.call(this._audioBuffer.getChannelData(channel));
  }

  getAudio(): HTMLAudioElement {
    if (!this._audio && this._blob) {
      this._audio = new Audio();
      this._audio.src = URL.createObjectURL(this._blob as Blob);

      this._audio.addEventListener('timeupdate', () => {
        this.dispatch({type: AudioProviderEventTypes.AUDIO_TIME_UPDATE});
      })
    }

    return this._audio as HTMLAudioElement;
  }

  getAudioBuffer(): AudioBuffer {
    return this._audioBuffer as AudioBuffer;
  }

  getAudioContext(): AudioContext {
    return this._audioContext as AudioContext;
  }

  addListener(callback: (event: AudioProviderEvent) => void): void {
    this._listeners.push(callback);
  }

  removeListener(callback: (event: AudioProviderEvent) => void): void {
    const ix = this._listeners.indexOf(callback);
    if (ix >= 0) this._listeners.splice(ix, 1);
  }

  private dispatch(event: AudioProviderEvent) {
    this._listeners.forEach(l => l(event));
  }
}
