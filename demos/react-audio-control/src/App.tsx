import './App.css'
import '@guidestar/react-audio-control/dist/react-audio-control.css'
import {useState} from "react";
import {AudioUrlProvider, RACCanvas, RACPlayPause, ReactAudioControl} from "@guidestar/react-audio-control";

function App() {
  const [audioProvider1, setAudioProvider1] = useState(new AudioUrlProvider({url: 'chillin39-20915.mp3'}));
  const [audioProvider2, setAudioProvider2] = useState(new AudioUrlProvider({url: 'chillin39-20915.mp3'}));
  const [audioProvider3, setAudioProvider3] = useState(new AudioUrlProvider({url: 'chillin39-20915.mp3'}));
  const [audioProvider4, setAudioProvider4] = useState(new AudioUrlProvider({url: 'chillin39-20915.mp3'}));

  return <div className="root">
    <header>
      <h1>@guidestar/react-audio-control</h1>
    </header>
    <h2>Default Layout</h2>
    <ReactAudioControl audioProvider={audioProvider1}/>

    <h2>Custom Layout #1</h2>
    <ReactAudioControl audioProvider={audioProvider2}>
      <RACCanvas className="default"/>
      <RACPlayPause className="default"/>
    </ReactAudioControl>

    <h2>Custom Layout #2</h2>
    <ReactAudioControl audioProvider={audioProvider3} channelOptions={[{
      backgroundColor: 0xFF000000,
      foregroundColor: 0xFFFF0000
    }]} className="night wide">
      <RACCanvas className="night" profile/>
      <RACPlayPause className="night"/>
    </ReactAudioControl>

    <h2>Custom Layout #3</h2>
    <ReactAudioControl audioProvider={audioProvider4} channelOptions={[{
      backgroundColor: 0xFF333333,
      foregroundColor: 0xFF00EE00,
      verticalLineColor: 0xFFFFFFFF
    }]} className="night">
      <RACCanvas className="night" profile/>
      <RACPlayPause className="night"/>
    </ReactAudioControl>
  </div>;
}

export default App
