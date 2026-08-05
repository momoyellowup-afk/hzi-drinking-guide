import fs from "node:fs";
import path from "node:path";

const sampleRate = 22050;
const bpm = 118;
const beat = 60 / bpm;
const bars = 8;
const duration = bars * 4 * beat;
const length = Math.floor(duration * sampleRate);
const pcm = new Int16Array(length);
const roots = [110, 87.31, 130.81, 98]; // A2, F2, C3, G2
const chordSets = [
  [220, 261.63, 329.63, 392],
  [174.61, 220, 261.63, 329.63],
  [261.63, 329.63, 392, 493.88],
  [196, 246.94, 293.66, 329.63],
];

const noise = (i) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};
const phase = (freq, t) => Math.sin(Math.PI * 2 * freq * t);

for (let i = 0; i < length; i++) {
  const t = i / sampleRate;
  const beatIndex = Math.floor(t / beat);
  const beatPhase = (t % beat) / beat;
  const barIndex = Math.floor(beatIndex / 4);
  const chordIndex = Math.floor(barIndex / 2) % 4;
  let s = 0;

  // Four-on-the-floor kick with a fast pitch drop.
  if (beatPhase < 0.34 / beat) {
    const kt = beatPhase * beat;
    const kf = 46 + 110 * Math.exp(-kt * 20);
    s += Math.sin(Math.PI * 2 * kf * kt) * Math.exp(-kt * 10) * 0.72;
  }

  // Bright off-beat hat and a short 2/4 clap.
  const halfPhase = ((t + beat * 0.5) % beat) / beat;
  if (halfPhase < 0.13 / beat) {
    const ht = halfPhase * beat;
    s += noise(i) * Math.exp(-ht * 28) * 0.095;
  }
  if ((beatIndex % 4 === 1 || beatIndex % 4 === 3) && beatPhase < 0.16 / beat) {
    const ct = beatPhase * beat;
    s += noise(i * 3) * Math.exp(-ct * 18) * 0.11;
  }

  // Warm deep-house bass.
  const bassT = beatPhase * beat;
  const root = roots[chordIndex];
  s += (phase(root, bassT) + 0.18 * phase(root * 2, bassT)) * Math.exp(-bassT * 5.2) * 0.23;

  // Soft fashion-lounge pad, changing every two bars.
  const chord = chordSets[chordIndex];
  for (const f of chord) {
    s += phase(f, t) * 0.018 + phase(f * 2.002, t) * 0.006;
  }

  // Small airy pluck every two beats.
  if (beatIndex % 2 === 0 && beatPhase > 0.2 && beatPhase < 0.5) {
    const pt = (beatPhase - 0.2) * beat;
    const melody = [440, 523.25, 659.25, 783.99, 659.25, 523.25, 392, 493.88];
    const f = melody[(Math.floor(beatIndex / 2)) % melody.length];
    s += phase(f, pt) * Math.exp(-pt * 13) * 0.11;
  }

  pcm[i] = Math.max(-32767, Math.min(32767, Math.round(Math.tanh(s * 1.35) * 27000)));
}

const dataSize = pcm.length * 2;
const buffer = Buffer.alloc(44 + dataSize);
buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(1, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28);
buffer.writeUInt16LE(2, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(dataSize, 40);
for (let i = 0; i < pcm.length; i++) buffer.writeInt16LE(pcm[i], 44 + i * 2);

const output = path.resolve("public/brand/young-house.wav");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, buffer);
console.log(`Generated ${output} (${(buffer.length / 1024).toFixed(0)} KB)`);
