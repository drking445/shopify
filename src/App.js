import "./App.css";
import React, { useState, useEffect } from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Button } from "@shopify/polaris";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

function App() {
  const key = "g4xk1gooLdtYH1Rl9QsmniVVbnlvrhDlqUiDo59S";
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClick, setClick] = useState(false);
  let color = "#ffffff";
  let loading = true;

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.nasa.gov/EPIC/api/natural/images?api_key=${key}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          setImages(response);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timer);
  }, [key]);

  function setStatus(index, status) {
    localStorage.setItem(index, status);
  }

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <ClipLoader
            color={color}
            loading={loading}
            css={override}
            size={150}
          />{" "}
          <div
            style={{
              display: "block",
              margin: "0 auto",
              borderColor: "red",
              marginTop: 10,
            }}
          >
            <b>Loading...</b>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "grey" }}>
          <link
            rel="stylesheet"
            href="https://unpkg.com/@shopify/polaris@7.3.1/build/esm/styles.css"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          ></link>
          {images.length != 0 &&
            images.map((image, index) => {
              image.date = image.date + "";
              var newImage = image.date.split(" ");
              var date = newImage[0];
              date = date.replace(/-/g, "/");
              let status;

              if (localStorage.getItem(index) !== null) {
                status = localStorage.getItem(index);
              } else {
                status = "Like";
              }

              return (
                <div
                  style={{
                    backgroundColor: "white",
                    display: "block",
                  }}
                >
                  <img
                    style={{
                      height: 500,
                    }}
                    src={
                      "https://epic.gsfc.nasa.gov/archive/natural/" +
                      date +
                      "/png/" +
                      image.image +
                      ".png"
                    }
                  />
                  <div>
                    <b>{image.caption}</b>
                  </div>
                  <br />
                  <div style={{ paddingBottom: "15px" }}>{image.date}</div>
                  <div style={{ marginBottom: "50px"}}>
                    <AppProvider i18n={enTranslations}>
                      <Button
                        onClick={(e) => {
                          status === "Like"
                            ? (e.target.innerHTML = "Unlike")
                            : (e.target.innerHTML = "Like");
                          status === "Like"
                            ? (status = "Unlike")
                            : (status = "Like");
                          setStatus(index, status);
                          setClick(!isClick)
                        }}
                      >
                        {status}
                      </Button>
                    </AppProvider>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default App;
