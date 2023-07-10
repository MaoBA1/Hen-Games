









const ImagePlaceHolder = ({ isEmpty, width, height, setImage, image, array, setCanIPublish }) => {
    const [ isInProcess, setIsInProcess ] = useState(false);
    
    const deleteImageFromStorage = () => {
        const imageRef = ref(storage, "Games-Images/" + image.name);
        deleteObject(imageRef)
        .then(() => {
            setImage(array.filter(i => i.downloadUrl !== image.downloadUrl));
        })
        .catch(error => {
            console.log(error.message);
        })
    }




    const onImageSelected = (e) => {
        if (e.target.files.length) {
            const fileObj = e.target.files && e.target.files[0];
            const imageName = generateUniqueFileName();
            const imageRef = ref(storage, "Games-Images/" + imageName);
            const uploadTask = uploadBytesResumable(imageRef, fileObj);
            uploadTask.on('state_changed', 
                (snapshot) => {
                    setIsInProcess(true);
                    setCanIPublish(false)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log(error.message);
                }, 
                () => {
                    
                    setIsInProcess(false);
                    setCanIPublish(true);
                    return getDownloadURL(uploadTask.snapshot.ref)
                    .then(downloadUrl => {
                        setImage([...array, {name: imageName, downloadUrl}]);
                    })
                }
            )
        }
    }

    const handelImageSelection = () => {
        const selector = document.getElementById("upload-button");
        selector.click();
    }
    console.log(array);
    return(
        !isEmpty ? 
        (
            <div style={{ position:"relative" }}>
            <Image 
                src={image.downloadUrl}
                style={{ 
                    width: image === array[0] ? "320px" : "150px",
                    height: image === array[0] ? "320px" : "150px",
                    margin:"10px",
                    borderRadius:"20px"
                }}
            />
            <AiFillCloseCircle
                style={{ 
                    position:"absolute",
                    zIndex:1,
                    top:25,
                    right:20
                }}
                color='#FFFFFF'
                size={"25px"}
                onClick={deleteImageFromStorage}
            />
            </div>
        )
        :
        (
            
            <button 
                className='image-Placeholder'
                style={{
                    width,
                    height,
                    margin:"10px",
                    backgroundColor: "#F8F9FA"
                }}
                onClick={handelImageSelection}
            >
                
                {
                    isInProcess ?
                    (
                        <div>
                            <Spinner animation='border' role='status'/>
                        </div>
                    )
                    :
                    (
                        <div>
                            <IoMdAddCircle
                                style={{ marginRight:"5px" }}
                                size={"30px"}
                            />
                            <label>ADD PHOTO</label>
                        </div>
                    )
                }
                <input
                    type='file'
                    style={{ display: "none" }}
                    id="upload-button"
                    onChange={onImageSelected}
                />
            </button>
            
        )
    )
}

export default ImagePlaceHolder;