import { CameraView, useCameraPermissions, type FlashMode, CameraType } from 'expo-camera'
import { Image } from 'expo-image'
import React, { useRef, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const CameraflashTorch = () => {
  const [permission, requestPermission] = useCameraPermissions()
  const [flash, setFlash] = useState<FlashMode>("off")
  const [torch, setTorch] = useState(false)
  const cameraRef = useRef<CameraView>(null)
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const [facing, setFacing] = useState<CameraType>("back")
  const [zoom, setZoom] = useState(0)

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Permission..</Text>
      </View>
    )
  }
  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Allow camera access</Text>
        <Button title='Camera Access' onPress={() => requestPermission()} />
      </View>
    )
  }

  const cycleFlash = () => {
    setFlash((f) => (f === "off" ? "on" : f === "on" ? "auto" : "off"));
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 1 })
    if (photo?.uri) setPhotoUri(photo.uri)
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        mirror={facing === "front"}
        zoom={zoom}
        enableTorch={torch}
        flash={flash}

      />
      <Button title={`Flash: ${flash}`} onPress={cycleFlash} />

      <Button title={`Torch: ${torch ? "On" : "Off"}`} onPress={() => setTorch((t) => !t)} />

      <Button title='Flip Camera'
        onPress={() => setFacing((f) => (f === 'back' ? "front" : "back"))} />

      <Button title='zoom out -'
        onPress={() => setZoom((z) => Math.max(0, z - 0.1))} />

      <Button title='zoom in +'
        onPress={() => setZoom((z) => Math.min(1, z + 0.1))} />
      {photoUri && (
        <Image source={{ uri: photoUri }} style={{ height: 200 }} contentFit="cover" />
      )}
      <Button title='CLick Picture' onPress={takePhoto} />
    </View>
  )
}

export default CameraflashTorch

const styles = StyleSheet.create({})