import { useState } from 'react'
import axios from 'axios'
import { ServerName } from "../../../serverName";
import { s3Domain } from "../../../s3Domain";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { setUserGif } from "../../../modules/member";


import './Images.css'

const FlexContainer = styled.div`
  font-family: koverwatch;
`

async function postImage({image, token}) {
  const formData = new FormData();
  formData.append("image", image);
  console.log(image)
  console.log(formData)
  const result = await axios.post(`${ServerName}/api/gifs/images`, formData, { 
    headers: {
      "Content-Type": "multipart/form-data;", 
      "ACCEPT": "*/*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Max-Age": "8000",
      token: token
    },
  });
  console.log(result)
  return result.data
}


function Images() {
  const dispatch = useDispatch();

  const token = useSelector((state) => ({
    token: state.member.member.tokenInfo.token
  }));
  const [file, setFile] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, token: token.token});
    console.log(result.imagePath);
    dispatch(setUserGif(result.imagePath));
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    console.log(file)
    setFile(file)
	}

  return (
    <div className="App">
      <FlexContainer>
        <h2>나의 비장의 무기</h2>
        <img src={`${s3Domain}bf46728d-46c1-4d36-b3bb-7987e61c62d720170105_011853_-1910004446.gif`}></img>
        <form onSubmit={submit} enctype = "multipart/form-data" accept-charset="UTF-8">
          <input onChange={fileSelected} type="file" accept="image/*"/>
          <button type="submit">Submit</button>
        </form>
      </FlexContainer>
    </div>
  );
}

export default Images;
