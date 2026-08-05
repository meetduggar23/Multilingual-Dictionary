import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '..', 'client', 'public', 'icons');

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function makePng(size, pixelFn) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  let offset = 0;
  for (let y = 0; y < size; y++) {
    raw[offset++] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixelFn(x, y);
      raw[offset++] = r;
      raw[offset++] = g;
      raw[offset++] = b;
      raw[offset++] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const NAVY = [20, 33, 61];
const WHITE = [255, 255, 255];
const ORANGE = [249, 115, 22];

function sample(x, y, size) {
  const nx = x / size;
  const ny = y / size;

  const stem = nx >= 0.2 && nx <= 0.32 && ny >= 0.18 && ny <= 0.82;
  const cx = 0.56;
  const cy = 0.5;
  const r = 0.32;
  const dx = nx - cx;
  const dy = ny - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const bowl = dist <= r && nx >= 0.32;

  const isD = stem || bowl;

  const dotCx = 0.9;
  const dotCy = 0.24;
  const dotR = 0.07;
  const ddx = nx - dotCx;
  const ddy = ny - dotCy;
  const isDot = Math.sqrt(ddx * ddx + ddy * ddy) <= dotR;

  if (isDot) return ORANGE;
  if (isD) return WHITE;
  return NAVY;
}

function pixelFn(size) {
  const ss = 4;
  return (x, y) => {
    let r = 0;
    let g = 0;
    let b = 0;
    for (let sy = 0; sy < ss; sy++) {
      for (let sx = 0; sx < ss; sx++) {
        const [cr, cg, cb] = sample(x + (sx + 0.5) / ss, y + (sy + 0.5) / ss, size);
        r += cr;
        g += cg;
        b += cb;
      }
    }
    const n = ss * ss;
    return [Math.round(r / n), Math.round(g / n), Math.round(b / n), 255];
  };
}

mkdirSync(OUT_DIR, { recursive: true });
for (const size of [192, 512]) {
  writeFileSync(resolve(OUT_DIR, `icon-${size}x${size}.png`), makePng(size, pixelFn(size)));
  console.log(`Generated icon-${size}x${size}.png`);
}
