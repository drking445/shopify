import "./App.css";
import React, { useState, useEffect } from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Button } from "@shopify/polaris";
import { CommonLoading } from "react-loadingg";

function App() {
  const key = "g4xk1gooLdtYH1Rl9QsmniVVbnlvrhDlqUiDo59S";
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  var containerClass = "";

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
          <CommonLoading />{" "}
        </div>
      ) : (
        <div class="timeline" style={{ backgroundColor: "#474e5d" }}>
          <link
            rel="stylesheet"
            href="https://unpkg.com/@shopify/polaris@7.3.1/build/esm/styles.css"
          />
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

              if (containerClass === "") {
                containerClass = "container left";
              } else if (containerClass === "container left") {
                containerClass = "container right";
              } else {
                containerClass = "container left";
              }

              return (
                <div class={containerClass}>
                  <div class="content">
                    <img
                      style={{
                        height: 300,
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
                    <div style={{ marginBottom: "50px" }}>
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
                          }}
                        >
                          {status}
                        </Button>
                      </AppProvider>
                    </div>
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
