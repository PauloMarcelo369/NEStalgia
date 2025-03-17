// jsnes.d.ts
declare module "jsnes" {
  export class NES {
    constructor(options?: any);

    loadROM(romData: string): void;
    frame(): void;
    reset(): void;
  }

  export interface NESOptions {
    onFrame: (frameBuffer: Uint8Array) => void;
    onAudioSample: (left: number, right: number) => void;
  }
}
