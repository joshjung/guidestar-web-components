import React, {useCallback, useEffect, useRef, useState} from 'react';
import Sparkline, {RenderWaveFormOptions} from '@guidestar/sparkline';
import {AudioProviderEvent, AudioProviderEventTypes, IAudioProvider} from "./IAudioProvider";
import './ReactAudioControl.css';
import classNames from "classnames";

export type ChannelOptions = RenderWaveFormOptions & {
  x? : number
  y? : number
  width?: number
  height? : number
}

export interface ReactAudioControlProps {
  audioProvider: IAudioProvider
  channelOptions? : ChannelOptions[]
  className? : string
}

const sparkline : Sparkline = new Sparkline();

const ReactAudioControl = ({ audioProvider, channelOptions, className }: ReactAudioControlProps) => {
  const classes : string = classNames('gs-rac', className);

  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [renderTrigger, setRenderTrigger] = useState(0);

  function render(canvasWidth : number, canvasHeight : number) {
    console.log(canvasRef?.current, audioProvider.loaded, canvasWidth, canvasHeight);

    if (canvasRef?.current && audioProvider.loaded && canvasWidth && canvasHeight) {
      // For now, default to just mono if not otherwise specified
      channelOptions = channelOptions || [{
        backgroundColor: 0xFF000000,
        foregroundColor: 0xFFFFFFFF,
        fillBackground: true
      }];

      channelOptions.forEach((channelOption, ix) => {
        if (ix < audioProvider.getAudioBuffer().numberOfChannels) {
          const _x : number = channelOption.x ?? 0;
          const _y : number = channelOption.y ?? 0;
          const _w : number = channelOption.width ?? canvasWidth;
          const _h : number = channelOption.height ?? canvasHeight;
          const _bg : number = channelOption.backgroundColor ?? 0xFF000000;
          const _fg : number = channelOption.foregroundColor ?? 0xFFFFFFFF;
          const _fbg : boolean = channelOption.fillBackground ?? false;

          sparkline.renderWaveForm(canvasRef.current as HTMLCanvasElement, audioProvider.getSamples(ix), _x, _y, _w, _h, {
            backgroundColor: _bg,
            foregroundColor: _fg,
            fillBackground: _fbg
          });
        } else {
          console.warn(`Unable to render wave form for channel ${ix}`);
        }
      })
    }
  };

  function calcSizeAndTriggerRender() {
    if (canvasWrapperRef?.current) {
      const bcr : DOMRect = canvasWrapperRef.current.getBoundingClientRect();

      setCanvasWidth(Math.ceil(bcr.width));
      setCanvasHeight(Math.ceil(bcr.height));
    }

    render(canvasWidth, canvasHeight);
  }

  useEffect(() => {
    render(canvasWidth, canvasHeight);
  }, [canvasWidth, canvasHeight, renderTrigger]);

  useEffect(() => {
    audioProvider.addListener((event : AudioProviderEvent) => {
      if (event.type === AudioProviderEventTypes.AUDIO_UPDATED) {
        setRenderTrigger(renderTrigger+1);
      }
    });

    calcSizeAndTriggerRender();
  }, []);

  function root_onResizeHandler() {
    calcSizeAndTriggerRender();
  }

  function playPause_onClickHandler() {
    audioProvider.getAudio().play();
  }

  return <div className={classes}
              onResize={root_onResizeHandler}
              ref={rootRef}>
    <button onClick={playPause_onClickHandler}>Play</button>
    <div className="gs-rac-wrapper"
         ref={canvasWrapperRef}>
      <canvas className="gs-rac-canvas"
              width={canvasWidth}
              height={canvasHeight}
              ref={canvasRef} />
    </div>
  </div>;
};

export { ReactAudioControl };
