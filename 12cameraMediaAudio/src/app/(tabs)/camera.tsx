import { Ionicons } from "@expo/vector-icons"
import {
  CameraView, useCameraPermissions, useMicrophonePermissions,
  type BarcodeScanningResult
} from "expo-camera"
import { Image } from 'expo-image'
import React, { useRef, useState } from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import { VideoView, useVideoPlayer } from 'expo-video';

const Camera = () => {
  const [permission, requestPermission] = useCameraPermissions()
  const [micPermission, requestMicPermission] = useMicrophonePermissions()
  const [ready, setReady] = useState(false)
  const cameraRef = useRef<CameraView>(null)
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const [videoUri, setVideoUri] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const [mode, setMode] = useState<"picture" | "video">("picture")

  const [result, setResult] = useState<BarcodeScanningResult | null>(null)
  const lastScanned = useRef<string | null>(null)


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
        <Button title='Camera Access' onPress={requestPermission} />
      </View>
    )
  }



  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 1 })
    if (photo?.uri) setPhotoUri(photo.uri)
  }

  const startRecording = async () => {
    if (recording) return;

    if (!micPermission?.granted) {
      const result = await requestMicPermission();
      if (!result?.granted) return;
    }
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result?.granted) return;
    }

    setRecording(true);
    const video = await cameraRef.current?.recordAsync({ maxDuration: 15 })
    setVideoUri(video?.uri ?? null)
    setRecording(false)
  }

  const stopRecording = async () => {
    cameraRef.current?.stopRecording()
  }

  function VideoPreview({ uri }: { uri: string }) {
    const player = useVideoPlayer(uri, (player) => {
      player.loop = true;
    });

    return (
      <VideoView
        player={player}
        style={{ width: "100%", height: 250 }}
        nativeControls
      />
    );
  }
  const onBarCodeScanned = (scan: BarcodeScanningResult) => {
    if (lastScanned.current === scan.data) return;
    lastScanned.current = scan.data
    setResult(scan)
  }



  return (
    <View style={{ flex: 1 }}>

      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing='back'
        mode={mode}
        // barcodeScannerSettings={{barcodeTypes:["qr"]}}
        // onBarcodeScanned={onBarCodeScanned }
        onCameraReady={() => setReady(true)}
        onMountError={({ message }) => console.warn(message)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 16,
          gap: 30,
        }}
      >
        <Pressable onPress={() => setMode("picture")}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: mode === "picture" ? "bold" : "normal",
            }}
          >
            PHOTO
          </Text>
        </Pressable>

        <Pressable onPress={() => setMode("video")}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: mode === "video" ? "bold" : "normal",
            }}
          >
            VIDEO
          </Text>
        </Pressable>

      </View>
      <View
        style={{
          alignItems: "center",
          padding: 5,
        }}
      >
        {mode === "picture" ? (
          <Pressable
            onPress={takePhoto}
            disabled={!ready}
            style={{
              width: 50,
              height: 50,
              borderRadius: 40,
              borderWidth: 2,
            }}
          />
        ) : (
          <Pressable
            onPress={recording ? stopRecording : startRecording}
            style={{
              width: 50,
              height: 50,
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={recording ? "stop-circle" : "videocam"}
              size={60}
              color={recording ? "red" : "black"}
            />
          </Pressable>
        )}
      </View>



      <Text style={{ padding: 12 }}>
        {ready ? "Camera ready" : "Starting camera"}
      </Text>
      {mode === "picture" && photoUri && (
        <Image source={{ uri: photoUri }} style={{ height: 200 }} contentFit="cover" />
      )}
      {mode === "video" && videoUri && (
        <Text>{videoUri}</Text>
      )}
      {videoUri && (
        <VideoPreview
          uri={videoUri}
        />
      )}
    </View>
  )
}

export default Camera

const styles = StyleSheet.create({})