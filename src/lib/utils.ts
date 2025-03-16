import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function generateWaveformData(audioBuffer: AudioBuffer, samples: number = 100): number[] {
  const channelData = audioBuffer.getChannelData(0)
  const blockSize = Math.floor(channelData.length / samples)
  const waveform = []

  for (let i = 0; i < samples; i++) {
    const start = blockSize * i
    let sum = 0
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(channelData[start + j])
    }
    waveform.push(sum / blockSize)
  }

  // Normalize values between 0 and 1
  const max = Math.max(...waveform)
  return waveform.map(val => val / max)
}
