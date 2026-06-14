import { CameraView, useCameraPermissions, useMicrophonePermissions,
  type BarcodeScanningResult } from "expo-camera"
import { Image } from 'expo-image'
import React, { useRef, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Camera = () => {
  const [permission, requestPermission] = useCameraPermissions()
  const [micPermission, requestMicPermission] = useMicrophonePermissions()
  const [ready, setReady] = useState(false)
  const cameraRef = useRef<CameraView>(null)
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const [videoUri, setVideoUri] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)

  const [result, setResult] = useState<BarcodeScanningResult | null>(null)
  const lastScanned = useRef<string | null>(null)

  if(!permission){
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Loading Permission..</Text>
      </View>
    )
  }
  if(!permission?.granted){
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Allow camera access</Text>
        <Button title='Camera Access' onPress={requestPermission} />
      </View>
    )
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({quality: 1})
    if(photo?.uri) setPhotoUri(photo.uri)
  }

  const startRecording = async () => {
    if(recording) return;
     
    if(!micPermission?.granted){
      const result = await requestMicPermission();
      if(!result?.granted) return;
    }

    setRecording(true);
    const video = await cameraRef.current?.recordAsync({maxDuration: 15})
    setVideoUri(video?.uri ?? null)
    setRecording(false)
  }

  const stopRecording = async () => {
    cameraRef.current?.stopRecording()
  }

  const onBarCodeScanned = (scan: BarcodeScanningResult) => {
    if(lastScanned.current === scan.data) return;
    lastScanned.current = scan.data
    setResult(scan)
  }
  return (
    <View style={{flex:1}}>

      <CameraView 
        ref={cameraRef}
        style={{flex:1}}
        facing='back'
        // mode="video"
        barcodeScannerSettings={{barcodeTypes:["qr"]}}
        onBarcodeScanned={onBarCodeScanned }
        onCameraReady={() => setReady(true)}
        onMountError={({ message }) => console.warn(message)}
      />
      <Button title={recording ? "stop" : "Record"} 
      onPress={recording ? stopRecording : startRecording} 
      disabled={!ready}
      />
      {videoUri && <Text selectable >{videoUri}</Text>}
      {/* <Button title='take Photo' onPress={takePhoto} disabled={!ready} />
      {photoUri && (
        <Image source={{uri: photoUri}} style={{ height: 200 }} contentFit="cover" />
      )} */}
      <Text style={{ padding: 12 }}>
        {ready ? "Camera ready" : "Starting camera"}
      </Text>

    </View>
  )
}

export default Camera

const styles = StyleSheet.create({})