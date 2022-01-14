import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Button} from '@shopify/polaris';

function App() {

  const [key, setKey] = useState("g4xk1gooLdtYH1Rl9QsmniVVbnlvrhDlqUiDo59S");
  const [images, setImages] = useState([]);
/*
  const loadMoreCommit = () => {
    setPage(page + 1);
  };
*/
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/EPIC/api/natural/images?api_key=${key}`,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(response => {
        setImages(response);
      })
      .catch(error => console.log(error));
  }, [key]);


  return (
    <div style={{backgroundColor: "grey"}}>
      <link
  rel="stylesheet"
  href="https://unpkg.com/@shopify/polaris@7.3.1/build/esm/styles.css"
/>
      {images.length != 0 && (
        images.map(image => {
          image.date = image.date + '';
          var newImage = image.date.split(" ");
          var date = newImage[0];
          date = date.replace(/-/g , '/');
          return <div style={{backgroundColor: "white", display: "block", alignContent: "center", alignItems: "center", justifyContent: "center"}}>
            <img style={{height: 500, alignContent: "center", alignItems: "center"}} src={"https://epic.gsfc.nasa.gov/archive/natural/" + date + "/png/" + image.image + ".png"} />
            <div>
              <b>
              {image.caption}
              </b>
            </div>
            <br />
            <div style={{paddingBottom: "50px"}}>
              {image.date}
            </div>
            <div style={{marginBottom: "50px"}}>
            <AppProvider i18n={enTranslations}>
            <Button size="large" onClick={(e) => {e.target.innerHTML === "Like" ? e.target.innerHTML = "Unlike" : e.target.innerHTML = "Like"}}>Like</Button>
            </AppProvider>
            </div>
          </div>
        })
      )}

    </div>
  );
}

export default App;
