'use client'

import { AudioRecorder } from '@/components/audio/AudioRecorder'

export default function CreatePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4">
      <div className="w-full space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Create New Sound
          </h1>
          <p className="text-lg text-muted-foreground max-w-[42rem] mx-auto">
            Record your audio directly in the browser. Click the button below to start recording.
          </p>
        </div>

        <div className="flex justify-center w-full">
          <AudioRecorder />
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Tip: For best results, use headphones to prevent audio feedback while recording.
          </p>
        </div>
      </div>
    </div>
  )
} 