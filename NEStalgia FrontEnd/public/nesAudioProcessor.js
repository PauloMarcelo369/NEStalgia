class NesAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.audioBuffer = new Float32Array(8192 * 2); // Buffer de áudio (8192 amostras * 2 canais)
    this.audioBufferIndex = 0;

    this.port.onmessage = (event) => {
      const { left, right } = event.data;
      this.audioBuffer[this.audioBufferIndex++] = left; // Canal esquerdo
      this.audioBuffer[this.audioBufferIndex++] = right; // Canal direito
    };
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const len = output[0].length;

    // Verifica se há dados suficientes no buffer
    if (this.audioBufferIndex < len * 2) {
      // Se não houver dados suficientes, preenche com silêncio
      output[0].fill(0); // Canal esquerdo
      output[1].fill(0); // Canal direito
      return true;
    }

    // Preenche os buffers de saída com os dados de áudio
    for (let i = 0; i < len; i++) {
      output[0][i] = this.audioBuffer[this.audioBufferIndex++]; // Canal esquerdo
      output[1][i] = this.audioBuffer[this.audioBufferIndex++]; // Canal direito
    }

    this.audioBufferIndex = 0; // Reinicia o índice do buffer
    return true;
  }
}

registerProcessor("nes-audio-processor", NesAudioProcessor);
