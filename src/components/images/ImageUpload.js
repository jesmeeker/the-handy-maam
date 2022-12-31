import Axios from "axios"
import { Image } from "cloudinary-react"

export const ImageUpload = ({profileImageSetterFunction , user, setUser, profileImage}) => {
  const uploadImage = (files) => {
    const formData = new FormData()
    formData.append("file", files[0])  
    formData.append("upload_preset", "tsxmzesi") 
    
    Axios.post("https://api.cloudinary.com/v1_1/dry2hcdx9/image/upload", formData)
    // .then(res => res.json())
    .then((res)=> {
        profileImageSetterFunction(res.data.url)
      })
  }

  return <div>Profile Image<br></br>
    <input type="file" onChange={(e) => {
      // const copy = {...user}
      // copy.image = profileImage
      // setUser(copy)
      uploadImage(e.target.files)
    }} />
    </div>
}