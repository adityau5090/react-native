import { CameraView, useCameraPermissions, type FlashMode } from 'expo-camera'
import { Image } from 'expo-image'
import React, { useRef, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const CameraflashTorch = () => {
    const [permission, requestPermission] = useCameraPermissions()
    const [flash, setFlash] = useState<FlashMode>("off")
    const [torch, setTorch] = useState(false)
    const cameraRef = useRef<CameraView>(null)
    const [photoUri, setPhotoUri] = useState<string | null>(null)
    // const cycleFlash = () => {
    //   const modes: FlashMode[] = ["off", "on", "auto", "torch"]
    //   const idx = modes.indexOf(flash)
    //   const next = modes[(idx + 1) % modes.length]
    //   setFlash(next)
    //   setTorch(next === 'torch')
    // }

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
            <Button title='Camera Access' onPress={() => requestPermission()} />
          </View>
        )
      }

      const cycleFlash = () => {
        setFlash((f) => (f === "off" ? "on" : f === "on" ? "auto" : "off"));
      }

      const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({quality: 1})
    if(photo?.uri) setPhotoUri(photo.uri)
  }

  return (
    <View style={{flex: 1}}>
      <CameraView 
      ref={cameraRef}
      style={{flex: 1}}
      facing='back'
      enableTorch={torch}
      flash={flash}
      />  
      <Button title={`Flash: ${flash}`} onPress={cycleFlash} />
      <Text>CameraflashTorch</Text>
      <Button title={`Torch: ${torch ? "On" : "Off"}`} onPress={()=> setTorch((t)=> !t)}/>
        {photoUri && (
        <Image source={{uri: photoUri}} style={{ height: 200 }} contentFit="cover" />
      )}
        <Button title='CLick Picture' onPress={takePhoto} />
    </View>
  )
}

export default CameraflashTorch

const styles = StyleSheet.create({})