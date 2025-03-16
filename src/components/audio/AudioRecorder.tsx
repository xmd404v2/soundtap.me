'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { formatDuration } from '@/lib/utils'

export function AudioRecorder() {
  const {
    isRecording,
    isPaused,
    duration,
    audioUrl,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
  } = useAudioRecorder()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const analyserRef = useRef<AnalyserNode>()

  useEffect(() => {
    if (isRecording && !analyserRef.current) {
      const audioContext = new AudioContext()
      analyserRef.current = audioContext.createAnalyser()
      analyserRef.current.fftSize = 256

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const source = audioContext.createMediaStreamSource(stream)
          source.connect(analyserRef.current!)
          visualize()
        })
        .catch(err => console.error('Error accessing microphone:', err))
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isRecording])

  const visualize = () => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')
    if (!canvasCtx) return

    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationFrameId.current = requestAnimationFrame(draw)
      analyserRef.current!.getByteFrequencyData(dataArray)

      canvasCtx.fillStyle = 'rgb(255, 255, 255)'
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

      const barWidth = (WIDTH / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2

        const gradient = canvasCtx.createLinearGradient(0, 0, 0, HEIGHT)
        gradient.addColorStop(0, '#3b82f6')
        gradient.addColorStop(1, '#1d4ed8')

        canvasCtx.fillStyle = gradient
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }

    draw()
  }

  return (
    <Card className="w-full max-w-2xl p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">
            {isRecording ? 'Recording...' : 'Ready to Record'}
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDuration(duration)}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={600}
          height={100}
          className="w-full h-[100px] bg-white rounded-md"
        />

        <div className="flex justify-center gap-4">
          {!isRecording && !audioUrl && (
            <Button onClick={startRecording}>
              Start Recording
            </Button>
          )}

          {isRecording && (
            <>
              {!isPaused ? (
                <Button variant="outline" onClick={pauseRecording}>
                  Pause
                </Button>
              ) : (
                <Button variant="outline" onClick={resumeRecording}>
                  Resume
                </Button>
              )}
              <Button onClick={stopRecording}>
                Stop Recording
              </Button>
            </>
          )}

          {audioUrl && (
            <>
              <audio src={audioUrl} controls className="w-full" />
              <Button variant="outline" onClick={clearRecording}>
                Clear
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
} 