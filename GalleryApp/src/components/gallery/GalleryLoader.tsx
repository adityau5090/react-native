// import { Skeleton } from "moti/skeleton";
// import { View } from "react-native";

// const GalleryLoader = () => {

//     return  (
//         <View style={{paddingVertical: 20, paddingHorizontal: 10}}>
//             <Skeleton
//                 width={"100%"}
//                 height={150}
//                 radius={20}
//             />
//         </View>    
//     )
// }   

// export { GalleryLoader }

import { View } from "react-native";

import PhotoSkeleton from "./PhotoSkeleton";

const GalleryLoader = () => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingTop: 20,
      }}
    >
      <PhotoSkeleton height={180} />
    </View>
  );
}
export { GalleryLoader }