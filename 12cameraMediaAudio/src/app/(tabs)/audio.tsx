import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio"

const SAMPLE_URL = require("@/assets/Sonali.mp3")

const formatTime = (seconds: number) => {
    if(!Number.isFinite(seconds) || seconds < 0) return "0:00"
    const m = Math.floor(seconds/ 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2,"0")}`
}
const Audio = () => {
    const player = useAudioPlayer(SAMPLE_URL, { downloadFirst: true })
    const status = useAudioPlayerStatus(player)

    const toggle = () => {
        if(status.playing){
            player.pause()
        }else{
            player.play()
        }
    }
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", gap: 3, padding: 20}}>
      <Text>
        {status.playing ? "Playing" : "Paused"} .{" "}
      {formatTime(status.currentTime)}/ {formatTime(status.duration)}
      </Text>
      <Button title={status.playing ? "Pause" : "Play"} onPress={toggle}/>
        
      <Button title='Replay' onPress={() => {player.seekTo(0), player.play()}} />
           
    </View>
  )
}

export default Audio

const styles = StyleSheet.create({})