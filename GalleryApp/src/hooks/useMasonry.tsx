import { useMemo } from "react";

const useMasonry = (photos: any[]) => {
    return  useMemo(() => {
        const left: any[] = [];
        const right: any[] = [];

        let leftHeight = 0;
        let rightHeight = 0;

        const ids = new Set();

        photos.forEach((photo) => {
            if(ids.has(photo.id)) {
                console.warn("Duplicate photo id found: ", photo.id)
            } 
            ids.add(photo.id)

            const height = (photo.height/ photo.width) * 180;

            if(leftHeight <= rightHeight) {
                left.push(photo)
                leftHeight += height;
            }else{
                right.push(photo)
                rightHeight += height
            }
        })

        return {
            left,
            right
        }
    }, [photos])
}

export { useMasonry }