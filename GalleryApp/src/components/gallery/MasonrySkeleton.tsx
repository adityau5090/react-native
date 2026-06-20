// import {ScrollView, View} from 'react-native'
// import { PhotoSkeleton } from "./PhotoSkeleton"

// const leftHeights = [180,250,220,300]
// const rightHeights = [260,180,320,200]

// const MasonrySkeleton = () => {
//     return (
//         <ScrollView
//             contentContainerStyle={{ paddingTop: 60, paddingHorizontal: 10 }}
//         >
//             <View style={{flexDirection: "row", gap: 10}}>
//                 <View style={{flex:1, gap: 10}}>
//                     {leftHeights.map((height, index) => (
//                         <PhotoSkeleton 
//                             key={index}
//                             height={height}
//                         />
//                     ))}
//                 </View>
//                 <View style={{flex:1, gap: 10}}>
//                     {rightHeights.map((height, index) => (
//                         <PhotoSkeleton 
//                             key={index}
//                             height={height}
//                         />
//                     ))}
//                 </View>
//             </View>
//         </ScrollView>
//     )
// }

// export { MasonrySkeleton }

import { View } from "react-native";
import PhotoSkeleton from "./PhotoSkeleton";

export default function MasonrySkeleton() {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 10,
        paddingTop: 100,
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 10,
        }}
      >
        <PhotoSkeleton height={180} />
        <PhotoSkeleton height={260} />
        <PhotoSkeleton height={220} />
      </View>

      <View
        style={{
          flex: 1,
          gap: 10,
        }}
      >
        <PhotoSkeleton height={250} />
        <PhotoSkeleton height={170} />
        <PhotoSkeleton height={300} />
      </View>
    </View>
  );
}