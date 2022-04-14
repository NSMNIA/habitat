import { useState } from "react";
import Image from "next/image";
import SpaceLayout from "../layouts/SpaceLayout";
import SpaceViewer from "../components/SpaceViewer";

function Upload() {
  const [image, setImage] = useState(null);

  const handleFiles = (e) => {
		const maxAllowedSize = 5 * 1024 * 1024; /* Maximum allowed size in bytes 5MB Example */
		if (e.target.files[0].size < maxAllowedSize) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = () => setImage(reader.result);
    	reader.onerror = (error) => console.log(error);
		}
  };

  return (
    <SpaceLayout>
			<SpaceViewer />
      {/* {image && <Image src={image} alt="Image" layout={"fill"} />}
      <input
        id="uploadInput"
        type="file"
				accept="image/png, image/jpeg"
        name="myFiles"
        onChange={(e) => handleFiles(e)}
      /> */}
    </SpaceLayout>
  );
}

export default Upload;
