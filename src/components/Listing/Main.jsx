import * as React from "react";
import { getAssets } from "../../services/api";
import { useState, useEffect } from "react";
import AssetCard from "./AssetCard";
import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../Notification";
import ClipLoader from "react-spinners/ClipLoader";

export default function Main() {
  const [assets, setAssets] = useState([]);
  const [notification, setNotification] = useState(false);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    getAssets().then((res) => {
      if (res.Status === 401 && res.Message === "Unauthorized") {
        setNotification(true);
        setLoading(false);
        setTimeout(() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("firstName");
          localStorage.removeItem("address");
          localStorage.removeItem("fullAddress");
          navigate("/SignIn", { replace: true });
        }, 2000);
      } else {
        setAssets(res);
        setLoading(false);
      }
    });
  }, [result]);
  const onDelete = (id) => {
    const newData = assets.filter((asset) => asset.id !== id);
    setAssets(newData);
  };

  return (
    <div>
      {notification && (
        <CustomizedSnackbars
          severity={"error"}
          message={"Session Expired Login Again"}
        />
      )}
      {loading && (
        <h1 className="f1 lh ma pa2 tc">
          <ClipLoader color={"black"} size={40} /> Loading
        </h1>
      )}
      {assets &&
        assets.map((asset, index) => {
          return (
            <AssetCard
              id={asset.id}
              key={index}
              title={asset.title}
              description={asset.description}
              imagePath={asset.imagePath}
              onDelete={onDelete}
              type={asset.type}
              price={asset.price}
              result={setResult}
            />
          );
        })}
      {assets.length === 0 && !loading && (
        <h1 className="f1 lh ma pa2 tc">Assets not found <br /> You can create a new asset , Click on Mint</h1>
      )}
    </div>
  );
}
