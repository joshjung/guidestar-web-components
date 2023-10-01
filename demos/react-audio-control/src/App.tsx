import './App.css'
import '@guidestar/react-audio-control/dist/esm/react-audio-control.css'
import {useState} from "react";
import {AudioUrlProvider, ReactAudioControl} from "@guidestar/react-audio-control";

function App() {
  const [audioProvider, setAudioProvider] = useState(new AudioUrlProvider({ url: 'chillin39-20915.mp3' }));

  return <div className="root">
    <h1>Default Layout</h1>
    <ReactAudioControl audioProvider={audioProvider} />
  </div>;
}

export default App
