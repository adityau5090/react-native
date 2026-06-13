import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { CameraView, useCameraPermissions } from "expo-camera"
import { Image } from 'expo-image'

const Camera = () => {
  const [permission, requestPermission] = useCameraPermissions()
  const [ready, setReady] = useState(false)
  const cameraRef = useRef<CameraView>(null)
  const [photUri, setPhotoUri] = useState<string | null>(null)

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
  return (
    <View style={{flex:1}}>

      <CameraView 
        ref={cameraRef}
        style={{flex:1}}
        facing='back'
        onCameraReady={() => setReady(true)}
        onMountError={({ message }) => console.warn(message)}
      />
      <Button title='take Photo' onPress={takePhoto} disabled={!ready} />
      {photUri && (
        <Image source={{uri: photUri}} style={{ height: 200 }} contentFit="cover" />
      )}
      <Text style={{ padding: 12 }}>
        {ready ? "Camera ready" : "Starting camera"}
      </Text>

    </View>
  )
}

export default Camera

const styles = StyleSheet.create({})