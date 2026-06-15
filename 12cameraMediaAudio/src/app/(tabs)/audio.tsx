import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useAudioPlayer, useAudioPlayerStatus, AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from "expo-audio"


const SAMPLE_URL = require("@/assets/Sonali.mp3")

const formatTime = (seconds: number) => {
    if(!Number.isFinite(seconds) || seconds < 0) return "0:00"
    const m = Math.floor(seconds/ 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2,"0")}`
}
const Audio = () => {
    const [recordingUri, setRecordingUri] = useState<string | null>(null)

    const player = useAudioPlayer(SAMPLE_URL, { downloadFirst: true })
    const status = useAudioPlayerStatus(player)

    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)
    const state = useAudioRecorderState(recorder)
    
    useEffect(() => {
        (async () => {
            const permission  = await AudioModule.requestRecordingPermissionsAsync()
            if(!permission.granted){
                Alert.alert("Microphone required", "Grant mic permission to acces it")
                return;
            }
            await setAudioModeAsync({
                playsInSilentMode: true,
                allowsRecording: true
            })
        })();
    }, [])

    const start = async () => {
        await recorder.prepareToRecordAsync();
        recorder.record()
    }

    const stop = async () => {
        await recorder.stop()
        setRecordingUri(recorder.uri)
        Alert.alert("Saved", recorder?.uri ?? "No uri")
    }

    const toggle = () => {
        if(status.playing){
            player.pause()
        }else{
            player.play()
        }
    }

    const playSample = () => {
        player.replace(SAMPLE_URL)
        player.seekTo(0)
        player.play()
    }

    const playRecording = () => {
        if(!recordingUri){
            Alert.alert("No recording available")
            return;
        }
        player.replace(recordingUri)
        player.seekTo(0)
        player.play();
    }
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", gap: 3, padding: 20}}>
      <View>
        <Button title='Play Smaple' onPress={playSample} />
        <Button title='Play Recording' onPress={playRecording} />
        <Text>
        {status.playing ? "Playing" : "Paused"} .{" "}
      {formatTime(status.currentTime)}/ {formatTime(status.duration)}
      </Text>
      <Button title={status.playing ? "Pause" : "Play"} onPress={toggle}/>
        
      <Button title='Replay' onPress={() => {player.seekTo(0), player.play()}} />
      </View>

      <Text>
        {state.isRecording ? "Recording" : "Ready"} .{" "}
        {Math.round(state.durationMillis/ 1000)}s
      </Text>
      <Button
        title={state.isRecording ? "Stop" : "Record"}
        onPress={state.isRecording ? stop : start}
      />

      {recorder.uri && (
        <Text selectable numberOfLines={2}>
            {recorder.uri}
        </Text>
      )}
           
    </View>
  )
}

export default Audio

const styles = StyleSheet.create({})