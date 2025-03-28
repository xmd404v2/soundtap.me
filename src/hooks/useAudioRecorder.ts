import { useState, useCallback, useRef } from 'react'

interface AudioRecorderState {
  isRecording: boolean
  isPaused: boolean
  duration: number
  audioUrl: string | null
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    audioUrl: null,
  })

  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const startTime = useRef<number>(0)
  const durationInterval = useRef<NodeJS.Timeout | null>(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)
      audioChunks.current = []

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data)
      }

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setState((prev) => ({ ...prev, audioUrl }))
      }

      mediaRecorder.current.start()
      startTime.current = Date.now()
      
      durationInterval.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          duration: Date.now() - startTime.current,
        }))
      }, 100)

      setState((prev) => ({ ...prev, isRecording: true, isPaused: false }))
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && state.isRecording) {
      mediaRecorder.current.stop()
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop())
      if (durationInterval.current) {
        clearInterval(durationInterval.current)
      }
      setState((prev) => ({ ...prev, isRecording: false }))
    }
  }, [state.isRecording])

  const pauseRecording = useCallback(() => {
    if (mediaRecorder.current && state.isRecording && !state.isPaused) {
      mediaRecorder.current.pause()
      if (durationInterval.current) {
        clearInterval(durationInterval.current)
      }
      setState((prev) => ({ ...prev, isPaused: true }))
    }
  }, [state.isRecording, state.isPaused])

  const resumeRecording = useCallback(() => {
    if (mediaRecorder.current && state.isRecording && state.isPaused) {
      mediaRecorder.current.resume()
      startTime.current = Date.now() - state.duration
      durationInterval.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          duration: Date.now() - startTime.current,
        }))
      }, 100)
      setState((prev) => ({ ...prev, isPaused: false }))
    }
  }, [state.isRecording, state.isPaused, state.duration])

  const clearRecording = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl)
    }
    if (durationInterval.current) {
      clearInterval(durationInterval.current)
    }
    setState({
      isRecording: false,
      isPaused: false,
      duration: 0,
      audioUrl: null,
    })
  }, [state.audioUrl])

  return {
    ...state,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
  }
} 