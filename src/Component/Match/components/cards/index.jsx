import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactSwing from "react-swing";
import infoUserApi from "../../../../api/infoUserApi";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import AvaUser from "./ava-user";
import TabPanel from "../../../common/components/tab-pannel";
import './styles.css'

MatchingUser.propTypes = {};

function MatchingUser(props) {
  const [cardData, setCardData] = useState([]);
  const [indexTab, setIndexTab] = useState(0);
  const [userMatchingState, setUserMatching] = useState([]);
  const stackEl = useRef();
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (!userMatchingState) {
      return;
    }
    const listUserMatching = JSON.stringify(userMatchingState);
    localStorage.setItem("listUserMatching", listUserMatching);
  }, [userMatchingState]);

  const getUser = async () => {
    const dataUser = await infoUserApi.getAll();
    setCardData((prevCardData) => {
      return prevCardData.concat(dataUser.results);
    });
  };
  function changeTabByIndex(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }

  const handleChangeTab = (newValue) => {
    setIndexTab(newValue);
  };

  const saveListFavorites = (value) => {
    if (!cardData) return;
    getUser();
    const newDataValue = value;
    const userMatching = newDataValue[newDataValue.length - 1];
    setUserMatching([...userMatchingState, userMatching]);
  };

  const renderCards = useMemo(() => {
    if (!cardData) {
      return;
    }
    const cards = [];
    const newCardData = cardData;
    for (let i = 0; i < newCardData.length; i++) {
      const data = newCardData[i % newCardData.length];
      const { user } = data;
      const { picture, email, username } = user;
      cards.push(
        <div
          key={i}
          className={`card ${username}`}
          ref={`card${i}`}
          throwoutright={() => saveListFavorites(newCardData)}
          style={{
            border: "1px solid #d9d9d9",
            width: 300,
            height: 350,
            position: "absolute",
            top: 20,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #d9d9d9",
              position: "relative",
              height: "50%",
              backgroundColor: "#f9f9f9",
            }}
          >
            <AvaUser srcDetail={picture} altDetail={`card ${username}`} />
          </div>
          <div style={{ height: "50%", width: "100%", position: "relative" }}>
            <Tabs
              value={indexTab}
              onChange={(e, indx) => {
                handleChangeTab(indx);
              }}
              variant="fullWidth"
              indicatorColor="primary"
              style={{
                flex: 1,
                justifyContent: "space-between",
                position: "absolute",
                bottom: 20,
                width: "100%",
                color: "#d9d9d9"
              }}
            >
              <Tab
                style={{ minWidth: 40 }}
                icon={<PhoneIcon fontSize="small" />}
                {...changeTabByIndex(0)}
              ></Tab>
              <Tab
                style={{ minWidth: 40 }}
                icon={<FavoriteIcon />}
                {...changeTabByIndex(1)}
              ></Tab>
              <Tab
                style={{ minWidth: 40 }}
                icon={<PersonPinIcon />}
                {...changeTabByIndex(2)}
              ></Tab>
              <Tab
                style={{ minWidth: 40 }}
                icon={<HelpIcon />}
                {...changeTabByIndex(3)}
              ></Tab>
            </Tabs>
            <div style={{ marginTop: 20 }}>
              <TabPanel
                value={indexTab}
                index={0}
                title="My Name Is"
                subTitle={username}
              ></TabPanel>
              <TabPanel value={indexTab} index={1}></TabPanel>
              <TabPanel value={indexTab} index={2}></TabPanel>
              <TabPanel value={indexTab} index={3}></TabPanel>
            </div>
          </div>
        </div>
      );
    }
    return cards;
  }, [cardData, indexTab]);

  console.log("cardData", cardData);
  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        id="viewport"
        style={{
          position: "relative",
          width: 350,
          height: 400,
          overflow: "hidden",
          margin: "auto",
        }}
      >
        <ReactSwing
          className="stack"
          ref={stackEl}
          throwoutright={(e) => saveListFavorites(e)}
          throwoutleft={(e) => getUser()}
        >
          {renderCards}
        </ReactSwing>
      </div>
    </div>
  );
}


export default MatchingUser;
