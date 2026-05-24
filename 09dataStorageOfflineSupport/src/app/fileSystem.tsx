import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { Paths,File, Directory } from 'expo-file-system'

const FileSystem = () => {
    const router = useRouter()
    const [output, setOutput] = useState("")
    const [downloadImage, setDownloadImage] = useState<string | null>(null)

    const goHome = () => {
        router.replace("/")        
    } 

    // not a function just creating object
    const file = new File(
        Paths.document,
        "demo.txt"
    )

    const writeFile = () => {
        file.write("Hello from Expo file system")
        setOutput("File written ✅")
    }

    const readFile = () => {
        const data = file.textSync();
        setOutput(data)
        // console.log(data)
        // console.log(file.uri)
    }

    const appendFile = () => {
        const oldData = file.textSync()

        file.write(oldData + "\n New Data Appended in file")
        setOutput("New Data appended");
    }

    const copyFile = () => {
        const copiedFile = new File(Paths.cache, "example-copy.txt") // create a file in cache to store copied file in it
        file.copy(copiedFile)
        // console.log(copiedFile.uri)
        setOutput("File copied")
        // now read copied file
        const data = copiedFile.textSync()
        console.log(data)
    }

    const moveFile = () => {
        const movedFile = new File(Paths.document, "moved-demo.txt") // create a file to move my file in it
        file.move(movedFile)
        setOutput("File moved")
        // now read its data
        const data = movedFile.textSync()
        console.log(data)
    }

    const deleteFile = async () => {
        await file.delete()
        setOutput("File deleted")
    }

    const getFileInfo = () => {
        const info = {
            exists: file.exists,
            size: file.size,
            uri: file.uri,
            name: file.name,
        }
        setOutput(JSON.stringify(info, null, 2))
    }

    // now let's create folder

    const myFolder = new Directory(Paths.document, "notes")

    const createFolder = () => {
      myFolder.create()
      setOutput("Folder created")
      console.log(myFolder.uri)
    }

    const readDir = () => {
      const files = myFolder.list();
      setOutput(JSON.stringify(files.map((f)=> f.uri), null, 2))
    }
    
    const downloadFile = async () => {
      const folder = new Directory(Paths.cache, "images");
      folder.create()

      const downloadedFile = await File.downloadFileAsync("https://picsum.photos/300", folder)

      setDownloadImage(downloadedFile.uri)

      setOutput(JSON.stringify(
        {
          uri: downloadedFile.uri,
          exists: downloadedFile.exists,
          size: downloadedFile.size,
        }, 
        null,
        2
      ))
    } 


  return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Secure Store</Text>
          <Pressable style={styles.link} onPress={goHome}><Text>Home</Text></Pressable>
        </View>
        <Pressable style={styles.btn}  onPress={writeFile} ><Text style={styles.btnText}>WriteFile</Text></Pressable>
        <Pressable style={styles.btn}  onPress={readFile} ><Text style={styles.btnText}>ReadFile</Text></Pressable>
        <Pressable style={styles.btn}  onPress={appendFile} ><Text style={styles.btnText}>AppendFile</Text></Pressable>
        <Pressable style={styles.btn}  onPress={copyFile} ><Text style={styles.btnText}>CopyFile</Text></Pressable>
        <Pressable style={styles.btn}  onPress={moveFile} ><Text style={styles.btnText}>MoveFile</Text></Pressable> 
        <Pressable style={styles.btn}  onPress={deleteFile} ><Text style={styles.btnText}>DeleteFile</Text></Pressable> 
        <Pressable style={styles.btn}  onPress={getFileInfo} ><Text style={styles.btnText}>GetFileInfo</Text></Pressable> 
        <Pressable style={styles.btn}  onPress={createFolder} ><Text style={styles.btnText}>CreateFolder</Text></Pressable> 
        <Pressable style={styles.btn}  onPress={readDir} ><Text style={styles.btnText}>ReadFolder</Text></Pressable> 
        <Pressable style={styles.btn}  onPress={downloadFile} ><Text style={styles.btnText}>DownloadImage</Text></Pressable> 
  
        <View>
          <Text>Output : {output}</Text>
        </View>
        {downloadImage ? (
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Downloaded Image
          </Text>

          <Image
            source={{ uri: downloadImage }}
            style={{
              width: 300,
              height: 300,
              borderRadius: 10,
            }}
            // contentFit="cover"
          />
        </View>
      ) : null}
      </View>
    );

}

export default FileSystem   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  link: {
    backgroundColor: "red",
    color: "#fff",
    padding: 10,
    borderRadius: 8
  },
  btn:{
    backgroundColor: "#184fcf",
    width: "100%",
    padding: 10,
    marginVertical: 5,
    textAlign: "center",
    borderRadius: 10
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  }
});