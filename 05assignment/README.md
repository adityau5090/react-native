# Welcome to your Quick app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
<video controls src="Screenrecording_20260512_231918.mp4" title="Title"></video>

- Demo -
https://github.com/user-attachments/assets/50098ef9-d093-4d33-94c6-a9a7f4c2c199





- This is the main page pop-up when first open or reload app. Press "Get Started" button to close this page.
<img src="./assets/images/main-page.jpeg" width="300" />

- This is the home page of app. Here all the cards are displayed using flatlist. tap on the card to open the view/edit screen.
- There is a search bar on top of cards to search card. And right side there is a pusle icon tap it to add new card.
<img src="./assets/images/home-page.jpeg" width="300" />

- This is view/edit screen.
<img src="./assets//images/view-note.jpeg" width="300" />

- This is a pop-up Modal to add new note.
<img src="./assets//images//add-note.jpeg" width="300" />

- This is home page in dark theme.
<img src="./assets//images/dark-theme.jpeg" width="300" />

- use useColorSceheme() to track the system theme.
```bash
 useColorSceheme()
``` 
- add manual dark and light mode toggle also.

- use useWindowDimension() to track the width of device to make my app responsive for all type of devices.
```bash
useWindowDimension()
```

- use ActivityIndicator to show a loading animation.
```bash
<ActivityIndicator />
```
- add a loading page with a delay of 1 sec to make it look more realistic.

- use FlatList to list all the note cards on home page.
```bash
<FlatList> </FlatList>
```

- use KeyboardAvoidingView to avoid keyboard interrupting my app's UI.
```bash
<KeyboardAvoidingView> </KeyboardAvoidingView>
```

- use Platform.OS to track the OS type to adjust height or padding based on OS type. If OS == "ios" then add padding else add height.
```bash
Platform.OS
```

- use Pressable to make cards pressable
```bash
<Pressable> </Pressable>
```

- use ScrollView to render items on view/edit page.
```bash
<ScrollView> </ScrollView>
```

- use TouchableWithoutFeedback to disable the keyboard when tap anywhere on UI screen.
```bash
<TouchableWithoutFeedback onPress={Keyboard.dismiss} />
```

- use ImageBackground to display images as background.
```bash
<ImageBackground> </ImageBackground>
```

- use SafeAreaView to prevent UI to go and interrupt with notch,status bar or bottom gesture area on phones.
```bash
<SafeAreaView> </SafeAreaView>
