import { CameraType, CameraView, useCameraPermissions, type FlashMode } from 'expo-camera'
import { Image } from 'expo-image'
import React, { useRef, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const CameraZoom = () => {
    const [permission, requestPermission] = useCameraPermissions()
    const cameraRef = useRef<CameraView>(null)
    const [photoUri, setPhotoUri] = useState<string | null>(null)
    const [facing, setFacing] = useState<CameraType>("back")
    const [zoom, setZoom] = useState(0)

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
  return (
    <View style={{flex: 1}}>
      <CameraView 
      ref={cameraRef}
      style={{flex: 1}}
      facing={facing}
      zoom={zoom}
      mirror={facing === "front"}
      />  
      <Button title='Flip Camera' 
      onPress={() => setFacing((f) => (f === 'back' ? "front" : "back"))}/>

      <Button title='zoom out -'
      onPress={() => setZoom((z) => Math.max(0, z - 0.1))} />
      
      <Button title='zoom in +'
      onPress={() => setZoom((z) => Math.min(1, z + 0.1))} />
    </View>
  )
}

export default CameraZoom

const styles = StyleSheet.create({})