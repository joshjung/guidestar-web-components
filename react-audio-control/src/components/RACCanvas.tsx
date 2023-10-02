import React, {useContext, useEffect, useRef, useState} from "react";
import {RACContext, RACContextType} from "../ReactAudioControlContext";
import {AudioProviderEvent} from "../IAudioProvider";
import Sparkline from "@guidestar/sparkline";
import {ChannelOptions} from "../ReactAudioControl";
import classNames from "classnames";
import {useInterval} from 'usehooks-ts'

const sparkline: Sparkline = new Sparkline();

type RACCanvasProps = {
  className?: string
  profile?: boolean
}

export default function RACCanvas({className, profile}: RACCanvasProps): React.JSX.Element {
  const c: string = classNames('rac-wrapper', className);

  const context: RACContextType = useContext(RACContext);

  const {audioProvider, channelOptions} = context;

  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [renderTrigger, setRenderTrigger] = useState<number>(0);

  function render(canvasWidth: number, canvasHeight: number) {
    if (canvasRef?.current && audioProvider?.loaded && canvasWidth && canvasHeight) {
      window.requestAnimationFrame(() => {
        sparkline.options.profile = profile;

        // For now, default to just mono if not otherwise specified
        const _channelOptions: ChannelOptions[] = channelOptions || [{
          backgroundColor: 0x00000000,
          foregroundColor: 0xFFCC4433,
          fillBackground: true
        }];

        _channelOptions.forEach((channelOption: ChannelOptions, ix: number): void => {
          if (ix < audioProvider.getAudioBuffer().numberOfChannels) {
            const _x: number = channelOption.x ?? 0;
            const _y: number = channelOption.y ?? 0;
            const _w: number = channelOption.width ?? canvasWidth;
            const _h: number = channelOption.height ?? canvasHeight;
            const _bg: number = channelOption.backgroundColor ?? 0x00000000;
            const _fg: number = channelOption.foregroundColor ?? 0xFFFFFFFF;
            const _fbg: boolean = channelOption.fillBackground ?? false;
            const _vlc: number = channelOption.verticalLineColor ?? 0xFFFF0000;

            let audio = audioProvider.getAudio();
            let percentComplete: number = audio.currentTime / audio.duration;

            let x: number = Math.round(_w * percentComplete);

            sparkline.renderWaveForm(canvasRef.current as HTMLCanvasElement, audioProvider.getSamples(ix), _x, _y, _w, _h, {
              backgroundColor: _bg,
              foregroundColor: _fg,
              fillBackground: _fbg,
              alpha: true,
              verticalLineX: isNaN(x) ? -1 : x,
              verticalLineColor: _vlc,
            });

          } else {
            console.warn(`Unable to render wave form for channel ${ix}`);
          }
        })
      });
    }
  }

  function calcSizeAndTriggerRender() {
    if (canvasWrapperRef?.current) {
      const bcr: DOMRect = canvasWrapperRef.current.getBoundingClientRect();

      setCanvasWidth(Math.ceil(bcr.width));
      setCanvasHeight(Math.ceil(bcr.height));
    }

    render(canvasWidth, canvasHeight);
  }

  useInterval(() => {
    render(canvasWidth, canvasHeight);
  }, context.playing ? 30 : null);

  useEffect(() => {
    const callback = (event: AudioProviderEvent) => {
      setRenderTrigger(renderTrigger + 1);
    };

    audioProvider?.addListener(callback);

    return () => audioProvider?.removeListener(callback)
  }, [renderTrigger]);

  useEffect(() => {
    render(canvasWidth, canvasHeight);
  }, [canvasWidth, canvasHeight, renderTrigger]);

  useEffect(() => {
    calcSizeAndTriggerRender();
  }, [audioProvider]);

  function root_onResizeHandler() {
    calcSizeAndTriggerRender();
  }

  return <div className={c}
              onResize={root_onResizeHandler}
              ref={canvasWrapperRef}>
    <canvas className="rac-canvas"
            width={canvasWidth}
            height={canvasHeight}
            ref={canvasRef}/>
  </div>
}
