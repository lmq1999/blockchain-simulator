import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import "./App.css";
import LiteGraphJS from "litegraph.js/build/litegraph.js";
import "litegraph.js/css/litegraph.css";
import CustomNodes from "./CustomNodes";
import i18n from "./i18n";
import ICON from "./icon.png";
import StackGrid from "react-stack-grid";

import QrReader from "react-qr-reader";

import Dragger from "./Dragger.js";
import { useDrop } from "react-dnd";

import {
  Icon,
  Tooltip,
  Button,
  CardActions,
  Divider,
  Drawer,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { I18nextProvider, useTranslation } from "react-i18next";

import SaveDialog from "./dialogs/SaveDialog";
import LoadDialog from "./dialogs/LoadDialog";
import html2canvas from "html2canvas";

var codec = require("json-url")("lzw");
var QRCode = require("qrcode.react");
const axios = require("axios");

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: "5%",
  },
  media: {
    height: 140,
  },
  root: {
    flexGrow: 1,
  },
});

console.log("LOAD MODULES");
let dynamicallyloadedis = require("./Modules");
console.log("dynamicallyloadedis", dynamicallyloadedis);
global.modules = {
  price: {
    nodes: [
      {
        type: "Modules/Module",
        pos: [280, 310],
        size: { 0: 140, 1: 46 },
        flags: {},
        order: 0,
        mode: 0,
        outputs: [{ name: "price", type: 0, links: null }],
        properties: { enabled: "on", title: "Price", color: "7eccc2" },
        subgraph: {
          last_node_id: 16,
          last_link_id: 21,
          nodes: [
            {
              id: 3,
              type: "Control/Timer",
              pos: [180, 220],
              size: { 0: 140, 1: 26 },
              flags: {},
              order: 0,
              mode: 0,
              outputs: [
                { name: "on_tick", type: -1, links: [10], label: "30000ms" },
              ],
              properties: { interval: 30000, event: "tick" },
              boxcolor: "#222",
            },
            {
              id: 7,
              type: "Storage/Variable",
              pos: [1110, 190],
              size: { 0: 140, 1: 26 },
              flags: {},
              order: 8,
              mode: 0,
              inputs: [{ name: "in", type: 0, link: 19 }],
              outputs: [{ name: "out", links: [11] }],
              properties: { varname: "price", global: true },
            },
            {
              id: 10,
              type: "Modules/Output",
              pos: [1130, 310],
              size: [180, 40],
              flags: {},
              order: 10,
              mode: 0,
              inputs: [{ name: "", type: 0, link: 11 }],
              properties: { name: "price" },
            },
            {
              id: 11,
              type: "Input/Text",
              pos: [80, 360],
              size: [300, 50],
              flags: {},
              order: 1,
              mode: 0,
              inputs: [{ name: "", type: 0, link: null }],
              outputs: [{ name: "", type: "string", links: [] }],
              properties: {
                blockieSize: 50,
                placeholder: "enter text here",
                title: "Text",
                value: "https://api.radarrelay.com/v2/markets/WETH-DAI/ticker",
              },
            },
            {
              id: 2,
              type: "Input/Text",
              pos: [80, 70],
              size: [300, 50],
              flags: {},
              order: 2,
              mode: 0,
              inputs: [{ name: "", type: 0, link: null }],
              outputs: [{ name: "", type: "string", links: [12] }],
              properties: {
                blockieSize: 50,
                placeholder: "enter text here",
                title: "Text",
                value: "https://api.coinmarketcap.com/v1/ticker/ethereum/",
              },
            },
            {
              id: 1,
              type: "Network/Request",
              pos: [430, 160],
              size: { 0: 180, 1: 46 },
              flags: {},
              order: 4,
              mode: 0,
              inputs: [
                { name: "[url]", type: "string", link: 12 },
                { name: "request", type: -1, link: 10 },
              ],
              outputs: [
                { name: "output", type: "object", links: [14], label: 1 },
              ],
              properties: {
                url: "https://api.coinmarketcap.com/v1/ticker/ethereum/",
                debounce: 1000,
              },
            },
            {
              id: 14,
              type: "Input/Number",
              pos: [540, 360],
              size: [190, 50],
              flags: { collapsed: true },
              order: 3,
              mode: 0,
              inputs: [{ name: "", type: 0, link: null }],
              outputs: [{ name: "", type: "number", links: [15] }],
              properties: { placeholder: "#", title: "Number", value: "0" },
            },
            {
              id: 13,
              type: "Object/index",
              pos: [650, 320],
              size: [190, 60],
              flags: {},
              order: 5,
              mode: 0,
              inputs: [
                { name: "obj", type: 0, link: 14 },
                { name: "index", type: "number", link: 15 },
              ],
              outputs: [
                { name: "value", type: "string,object,array", links: [17] },
                { name: "index", type: "number", links: null },
              ],
              properties: {},
            },
            {
              id: 4,
              type: "Object/property",
              pos: [670, 190],
              size: [190, 30],
              flags: {},
              order: 6,
              mode: 0,
              inputs: [{ name: "obj", type: 0, link: 17 }],
              outputs: [{ name: "", type: "", links: [18] }],
              properties: { value: "price_usd" },
            },
            {
              id: 6,
              type: "Display/Watch",
              pos: [850, 70],
              size: [200, 60],
              flags: {},
              order: 9,
              mode: 0,
              inputs: [{ name: "", type: 0, link: 21, label: "" }],
              properties: {},
            },
            {
              id: 16,
              type: "Utils/To Float",
              pos: [900, 220],
              size: [170, 30],
              flags: {},
              order: 7,
              mode: 0,
              inputs: [{ name: "", type: 0, link: 18 }],
              outputs: [{ name: "", type: "number", links: [19, 21] }],
              properties: {},
            },
          ],
          links: [
            [10, 3, 0, 1, 1, -1],
            [11, 7, 0, 10, 0, 0],
            [12, 2, 0, 1, 0, "string"],
            [14, 1, 0, 13, 0, 0],
            [15, 14, 0, 13, 1, "number"],
            [17, 13, 0, 4, 0, 0],
            [18, 4, 0, 16, 0, 0],
            [19, 16, 0, 7, 0, 0],
            [21, 16, 0, 6, 0, 0],
          ],
          groups: [],
          config: {},
          version: 0.4,
        },
      },
    ],
    links: [],
  },
};

const touchHandler = (event) => {
  //console.log("global.showLibrary",global.showLibrary)

  var touches = event.changedTouches,
    first = touches[0],
    type = "";
  switch (event.type) {
    case "touchstart":
      type = "mousedown";
      break;
    case "touchmove":
      type = "mousemove";
      if (global.showLibrary == true) {
      } else {
        event.preventDefault();
      }
      break;
    case "touchend":
      type = "mouseup";
      break;
    default:
      return;
  }

  // initMouseEvent(type, canBubble, cancelable, view, clickCount,
  //                screenX, screenY, clientX, clientY, ctrlKey,
  //                altKey, shiftKey, metaKey, button, relatedTarget);

  var simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent(
    type,
    true,
    true,
    window,
    1,
    first.screenX,
    first.screenY,
    first.clientX,
    first.clientY,
    false,
    false,
    false,
    false,
    0 /*left*/,
    null
  );

  first.target.dispatchEvent(simulatedEvent);
};

function App() {
  console.log("APP");

  /*
  window.addEventListener("wheel", event => {
    console.info(event.deltaY)
    event.preventDefault();
  });*/

  const [menu, setMenu] = React.useState("");

  const [selectToolActive, setSelectToolActive] = React.useState(false);

  //  var defaultPrevent=function(e){e.preventDefault();}
  //document.addEventListener("touchstart", defaultPrevent);
  //document.addEventListener("touchmove" , defaultPrevent);
  //
  //
  //
  const [moreInfo, setMoreInfo] = React.useState(false);

  const [drawing, setDrawing] = React.useState(false);
  const [drawingColor, setDrawingColor] = React.useState("#03A9F4");

  const classes = useStyles();

  const [snackbar, setSnackbar] = React.useState({ msg: "", color: "" });
  global.setSnackbar = setSnackbar;

  const [readQr, setReadQr] = React.useState(false);

  const [live, setLive] = React.useState();
  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();
  const [playing, setPlaying] = React.useState(true);

  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
  const [openLoadDialog, setOpenLoadDialog] = React.useState(false);
  const [currentScreenShot, setCurrentScreenShot] = React.useState(null);

  const handleOpenSaveDialog = async () => {
    let canvas = await html2canvas(document.body);
    let canvasImg = canvas.toDataURL("image/png", 0.35);
    console.log({ canvasImg });
    setCurrentScreenShot(canvasImg);
    setOpenSaveDialog(true);
  };

  let showLibrary = localStorage.getItem("eth.build.showLibrary");
  if (showLibrary == "true") showLibrary = true;
  else if (showLibrary == "false") showLibrary = false;
  //console.log("showLibrary",showLibrary)
  const [showVideoLibrary, setShowVideoLibrary] = React.useState(showLibrary);
  global.showLibrary = showLibrary;

  const dynamicWidth = window.innerWidth / 3;
  /*
   document.ontouchstart = touchHandler
   document.ontouchmove = touchHandler
   document.ontouchend = touchHandler
   document.ontouchcancel = touchHandler
   */

  document.addEventListener("touchstart", touchHandler, { passive: false });
  document.addEventListener("touchmove", touchHandler, { passive: false });
  document.addEventListener("touchend", touchHandler, { passive: false });
  document.addEventListener("touchcancel", touchHandler, { passive: false });

  //console.log("ADDING KEY DOWN!!!",document.onkeydown)
  document.onkeydown = (keydown) => {
    //console.log("EVENT")
    if (keydown.key == "Escape") {
      setMenu("");
      setDrawing("");
      global.graph.canvas.drawing = false;
      global.graph.canvas.selectToolActive = false;
      setSelectToolActive(global.graph.canvas.selectToolActive);
    } else {
      //console.log(keydown)
    }
  };

  const [openAboutDialog, setOpenAboutDialog] = React.useState(false);

  function AboutDialog(props) {
    const { open, liteGraph } = props;

    return (
      <Dialog
        onClose={() => {
          setOpenAboutDialog(false);
        }}
        open={openAboutDialog}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="save-dialog" style={{ textAlign: "center" }}>
          <Icon style={{ verticalAlign: "middle" }}>info</Icon>
          <span style={{ fontsize: 38, fontWeight: "bold" }}>About</span>
        </DialogTitle>
        <Divider />
        <CardActions style={{ justifyContent: "center" }}>
          <div style={{ padding: "2%" }}>BLOCK SIM</div>
        </CardActions>
        {/* <CardActions style={{ justifyContent: "center" }}>
          <div style={{ padding: "2%" }}>
            <a target="_blank" href="https://eth.build">
              Eth.Build
            </a>{" "}
            (
            <a
              target="_blank"
              href="https://github.com/austintgriffith/eth.build"
            >
              source
            </a>
            ) created by{" "}
            <a target="_blank" href="https://twitter.com/austingriffith">
              Austin Griffith
            </a>
          </div>
        </CardActions>
        <CardActions style={{ justifyContent: "center" }}>
          <div style={{ padding: "2%" }}>
            With support from{" "}
            <a target="_blank" href="https://ethereum.org">
              the Ethereum Foundation
            </a>
            ,{" "}
            <a target="_blank" href="https://consensys.net/">
              Consensys
            </a>
            , and{" "}
            <a
              target="_blank"
              href="https://gitcoin.co/grants/122/austin-griffith-ethereum-rampd"
            >
              Gitcoin Grants
            </a>
          </div>
        </CardActions>
        <CardActions style={{ justifyContent: "center" }}>
          <div style={{ padding: "2%" }}>
            Special thanks to{" "}
            <a target="_blank" href="https://github.com/jagenjo">
              Javi Agenjo
            </a>{" "}
            for{" "}
            <a target="_blank" href="https://github.com/jagenjo/litegraph.js">
              litegraph
            </a>
          </div>
        </CardActions> */}
      </Dialog>
    );
  }

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: "node",
    drop(item, monitor) {
      //console.log("DROP!",item.monitor)
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isOver2, isOverCurrent2 }, drop2] = useDrop({
    accept: "node",
    drop(item, monitor) {
      //console.log("DROP!",item.monitor)
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
    },
    collect: (monitor) => ({
      isOver2: monitor.isOver(),
      isOverCurrent2: monitor.isOver({ shallow: true }),
    }),
  });

  React.useEffect(() => {
    console.log("MOUNT", LiteGraphJS);

    global.title = "eth.build";

    global.LiteGraphJS = LiteGraphJS;
    var graph = new LiteGraphJS.LGraph();

    global.graph = graph;

    //config
    LiteGraphJS.LiteGraph.debug = true;

    console.log("can we set grid here?", LiteGraphJS.LiteGraph);

    var canvas = new LiteGraphJS.LGraphCanvas("#main", graph);

    window.addEventListener("resize", function () {
      canvas.resize();
    });

    graph.onAfterExecute = function () {
      canvas.draw(true);
    };

    window.onpagehide = function () {
      var data = JSON.stringify(graph.serialize());
      localStorage.setItem("litegraph", data);
    };

    CustomNodes(LiteGraphJS);

    let url = window.location.pathname;
    console.log("URL", url);
    if (url && url.length > 1) {
      url = url.substring(1);

      if (url.indexOf("wof") == 0) {
        console.log("decompressing", url);
        codec.decompress(url).then((json) => {
          console.log("configure graph with:", json);
          graph.configure(json);
          //graph.start()
          graph.canvas = canvas;

          setLiteGraph(graph);
          setLiteGraphCanvas(canvas);

          window.history.pushState("", "", "/");

          setShowVideoLibrary(false);
          global.showLibrary = false;
        });
      } else if (url.indexOf("build") == 0) {
        console.log("THIS IS A BUILD");
        let key = window.location.hash.replace("#", "");

        //let result = await axios.get("https://network.eth.build:44386/build",{})
        axios
          .get("https://network.eth.build:44386/build", {
            params: {
              key,
            },
          })
          .then((result) => {
            console.log("GET BUILD RESULT", result);
            let compressed = result.data.compressed;
            codec.decompress(compressed).then((json) => {
              console.log("configure graph with:", json);
              graph.configure(json);
              //graph.start()
              graph.canvas = canvas;

              setLiteGraph(graph);
              setLiteGraphCanvas(canvas);

              window.history.pushState("", "", "/");

              setShowVideoLibrary(false);
              global.showLibrary = false;
            });
          });
      }
    } else {
      var viewedNewFrontPage = localStorage.getItem("viewedNewNewNEWFrontPage");
      var data = localStorage.getItem("litegraph");

      if (viewedNewFrontPage && data) {
        graph.configure(JSON.parse(data));
        //graph.start()
        graph.canvas = canvas;
        setLiteGraph(graph);
        setLiteGraphCanvas(canvas);
      } else {
        if (!viewedNewFrontPage)
          localStorage.setItem("viewedNewNewNEWFrontPage", "true");

        //THIS IS THE DEFAULT FIRST TIME LANDING CASE

        let defaultData =
          "wofCrGxhc3Rfbm9kZV9pZMONASfEgcSDxIVsaW5rxIvEjQI7wqXEh8SJc8OcABPCisKixIzEjhLCpHR5cGXCrElucHV0L051bWJlcsKjcG9zwpLDjQJ2w4zCqsKkc2l6ZcKSw4zCgjTCpWbEgmdzwoDCpW9yxIlyAMKkbcSIZQDCpsSVxLB0c8KRwoPCpG5hbWXCoMSoxKrFnMKkxJTElsOAwqdvxLHFoMWixaTFpsWoxarEqcSrwqZuxLXEt3LCpcWva8WixL8vwqpwcm_Eq3J0aWVzwoPCq3DEgmNlaG9sxZbCoSPCpcaOdGxlwqbEtMS2xLjCpXZhbHVlwqQxMzM3xKPEpQEUxavEq8KrTWF0aC9SYW5kb23EusS8xL4CbMSOIsWExYbFiMOMw4gexY3Fj8WRxZPFlcS4AcWZxZvFncWfxLHFtsWlxafFqca2ZcO_xa7ElWvFscWzdMW1wpHChMeexajGp8apxqvHocW9xb_GpsaDxoUCMMaCYcS3bMOLQ8Khw5QoG8OIw7NcxojGisaMxo7GkMKDwqlhxLHHgsa6aWPDg8KjbcSVAMiVYXjHvsKrw4FtZ07DiADGssSNARPHocKtxrnGuy9NdWzGjsaUeceExL3DjQN6x47Hi8WHwpJ4PMeRYcWQxZLFlMWWCceYxInHmsSvx5zCksW3x5_CoUHHssW-xqVyx6TElsaGyYvFqMKhQsmPx7TJksaDxL8wxbLFtMecxaPHrWXCoT3JmsmRxoLHpce3MciHxovEuMiKxpHJjcONBTnJmMe-yIDIgsiEXMKiT1DCoSrCicSkyKUWx6HCr0Rpc8aUYXkvQmxvY2vGj8izxL4ETMSOQMi5xYhGyL3Fjsi_x5PJgsS4D8mFxZzFnsmIxaHJo8W4x6DFu8WtyZ0CMsmuyInGj3PChMKrYsqQypLGj1PHjDLGk8aVxpfGmcWWwqDGnmnGoMWpx6_GqmXDmUIweGM4YjgwZmVmNTnLkmE4NmZhNzRkYTnHuzUyxIkyMTHLkDkwOMumMDXGrzNjOTg3YWUxZjTLljRjY2EyNcucNWHIpMSOGMqGQ3LEqnRvL0tleSBQYWnEucS7yLQBw4jEv8O4ypvCgsKhMMOKQ1PCmcKawqExQsi-yYDHlMWWDcqlyYfFtcmKyaTCrVvGiWnGqHRlIGvMk13HssSEcsSVZ8mTa8S_NsmWZcKoZ2VuxLjGusasyq3Ho8aDx6fJocWhwpPNisaTzYPMusy8zL55zYF0zYNuZ8mqxJbHtzjNisaIdcq4yJLMvcyTzaHNo82lx7bDgM2KwqdhZGRyxpBzzbHNhM2mxoTCkcS_OcqyybDKtMKAzIgBFcehwqvMjMyOzJBIxINoypXItcKixI5KypvIu8eQyp_MrcqicgzMscqnx6rNisKlx5t0yKjNgs2ELMmQxoDNhsS_Mcmgx6nJos2KwqRozpLNvs2kzoDItMqwxL86zoXGjc6HzokgyKjKiMqKxILKjVfGumPOk8yaypYkw4zCtM6ZyLUxyp7HksmBx5VyEM6hzqbFosesyqvFusWsxZjKrzrHuse8wqDOsceqz57Hn8-gxKsAzrrDgM-lZWzCoM6_ybHCgcuFy4fCpc-JdM-Lzokhx6HCqsSuxaAvVGV4dM6UAsKUxI7Dgs-SAn8yzKzKoc-YAs-byqjHnc-fx6HPoselzZbOssqpzYrPrMaizqnOuce2zoLEms-1yrTKtsq4ypHKk2XKvMWHyr7Ki8aWxpjGmsS4wq_Njsy7ciDMu9CHIGjEuGXPuMahwqtMZWFybiBNxZRlz6TGqMuKw5lIaHTHqXM6Ly930ZoueceozaxlLmPHgi_Ki3nElMSEP9GndD1QTEp6MUhydUXNj25DWEg3S1c3d0JDRUJuQkxPVsqTcUlpzokez4TKidGlL8-7z4vOlAHDvsS_ds-SA8-U0JLPl8WWEdCWz6nJpNCh0JvJlAI4z7HPs8-oyaLPqsW50JrPr9Kpz7TGicmvz4DGkM-3xp_Goc-6z4poyoLGs8eKyq3Cqs-F0pFRUs6UBcKWxI5Uz5IBwpDEjsKQ0p3MrsS4CtKh0qzSo9Cazq7EmtKp0ZHRk9GV0ZfRmdGb0Z3EsdGf0aHRo9Gl0arRqcqJ0avRrdGv0bHRs9G1zY7RuNG60bzRvtKA0oLShNKG0ohp0opp0KjGkMKCwqZxctCvZcyJyapn0ZPDgsKIyoPEjiPSj8-GyozQhMuGxqHKlUbFitOLw7TPrs6c0JPFlgPMsdO9c8KHwqhmb2501IMsyrfKudCt1IPQscuA0LTLg9GC0YFU1JLRgdGPxqvCqWXGuy5idWnGmsKq1KPUpUbFp9S-ecK8J1LNrGlr0YrUpG8gT82PJywgc8a_cy1zxLhpZsKl0aLKkHLCpyPNudWkZM6JGcyLzI1wzI_IrM2PxZpuyJLKlcOM04gDSMygzKLMpDpmZsypzKvUmtKexLgL05TNmM2qW23VrtSkyJLNgMqtwqbQo82FzZXNtlvElcSJeNaLxazHs8mRzYbNtcmkzYzNjs2QzLvHoc2Ux6XEvzXSq8WhzLTKq82bzLnNkc2vzaDWjNaOzrrQps2J1pzWh2XVr8iSzrjNs8mr0KY31J_Pt9aT0IYA0r3IpR_KhtOCz4cvQc25zbtzc86UAwzItdCVxYXIutOJUNOQzp7Ep8WayYbOos6z05bKrdKlzYcCzoTSs8qzyIvUqdCsyrvKvcq_YdCzy4LEuMuE0rhlwqfXis26zbzOiR3UjtKR0pPPjMeFxI7CpMi1x6zXlMWIyLXDvc-VyqDWgHIO1oPPndefz6HTmDfSsdam2I3Qmdeg0rDEgs-m1r7UsdK6z7xo1IrGsyTXhtKQ14hDx4LFqNSlypUew4zDsNSX1JnPltORcgTUntelzobGkMKE1KLUpNSmx4wS16zXrtC1csKu0Zgg0aJt2KfFoS7ZiNSxwqfYpdmF0LjLicary4zDsMKfwpPCnSBDUkVBVEUgQSBORVcgQlVJTEQ6CmjLhtmDzaJsK2HQu9WP1ZrGoWN0IMapbNC70L_Ridmr2bfEicahzLsg2J_IpSfYotSPyo3ZjNmG2KnEjl7YrdeYz5gF2LPIiNi1yrXYuNSl1IPYvNCyy4HYv9mBL9mD2KbQuHPZiC7ZitqK2Y7UtsuLwoTZksKVwrXZksKPwrvDosKAwo3DosKZwoLDr8K4wo8gU9mZUkNI14lE2ajQvtmsyorXrcy8YtGH2bjHgNC7xawKw6LCncKMIEVYSVTGvUXavFQ624TZt8aQzIHEqwrZqm92xLgg26TbpsyPxplz26fRica7zLzNg9SH255kzY0g1KPQusWazbsgLdu8270-2oTEjibah9KR2qfYqM-NHsSOw7Taj9W_2LAG2pPStMmx2LfVgdi6xYfamtSu16_ZgNmC2YTZhtqj2YnXstmL2qHUpdmPy4te2ZLCp8KQIEzavU7Rik_ZmNucY8SUypLZu9uIb9GUx4LQu3LKjNu2xZQgZXDKicWb26wK2ZLCksK-2rtBVkXcsNyy1YzVltulIMiS1KTdkdGJYty2zI9t3LnKjNyAASXcg9ik3KHQiM-NMsS_bNOLTQTakMWWB9yP16baltyT2pnYvdqcxZbantqg2Y3Updyd2qXcn9yFdNyjw5kg3YXCrNu2ZWVk24nKktucQMiOxITNhM2D1bvLhmggIM6JG8ehxK3KqMqOxLHMj27ajALDms6Zx47QkdSawoHCqdWfxIJw1Zpkw4LYsAjYjMqqz6vWodaa2JPWqN6wzZPWsdak0KDHocKuzqzEuCzdlsaZ0YZuz6_Un8KD3KPCqNyxyJLVjMeu17LCpkLemtSk1Z7Fs9SlEM66wpvTiAIvxKYAxI4TxZ3evHLflzDEjhTfm8imAdaYxoDflzHfnN-lFQDCrdaOzqvJm9-X3aTOit-lFgAA35c1xI4b36UZAsO_35c2xI4Z36UYxZ3Wjt-XN-CghQHEjh3fud-XOMyJ36Ue4KCRzoPMiQLEjh_goJcCOsSO367EjiDgoJ07xI4h36Ui37nCpmfGinXeqMKQwqbRom5maWfCgMKn26VyxYXUpMOLP8OZwpngoYDgoYDCmg";
        codec.decompress(defaultData).then((json) => {
          global.graph.configure(json);
          //graph.start()
          graph.canvas = canvas;
          setLiteGraph(graph);
          setLiteGraphCanvas(canvas);

          setShowVideoLibrary(false);
          global.showLibrary = false; //lets try starting down with the video up
        });
      }
    }
    setInterval(() => {
      //console.log(graph)
      graph.runStep();
    }, 250);
  }, []);

  const barHeight = 45;

  //let compressed = await codec.compress(liteGraph.serialize())
  //liteGraph?JSON.stringify( liteGraph.serialize(), null, 2 ):""
  //

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  let allCards = [];

  var lessons = [
    {
      header: t("Hash Function"),
      color: "#2196f3",
      // name: t("Hash Function"),
      image: "thumbs/hashfunction.png",
      desc: t("Des1"),
      save: "wofCrGxhc3Rfbm9kZV9pZCnEgcSDxIVsaW5rxItkGsKlxIfEiXPCmsKKwqLEjCDCpHR5cGXCqklucHV0L1RleHTCo3Bvc8KSWsOMwqDCpHNpemXCksONASwywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbEk8SqdHPCkcKDwqRuYW1lxLnEo8SlxY_EksSUw4DCp2_Eq8WXxZnFm8WdxZ_FocSkZcKmxIRyxJNnwqXFpWvFmRXCqnByb8SlcnRpZXPChMKrYmxvY2vGhFPEvGUywqtwxIJjZWhvbMWNwq9lbnRlciDGn8SwIGjGoGXCpcaDdGxlwqTErsSwwqV2YWx1xq3Gn8SEwojEn2QixKLFscKtRGlzxpRhecStacarZcSyxLTCkhQoxLrGkMS_AcO0AMWExYbFiMWKxYzGoAHFkMWSAMW9xb_GgcaDxoXCh8KoZm_GnsaPxL0sxojGisaMxo7GkMaSx4PGlsaYxprGoMKgxqnHh8aswqVUx7nGqMayxrRlwq1IxINoIEZ1bmPGg8enwqrHpsaeRsWeaWx5wrwnUnViaWsgTcenbyBPbmUnLCBzYW5zLXPGoGlmwqVjxpnFi8KnI2TItsi3xJ7EjCXGvcSlwqtDcsSkdG8vyINzaMeKxLXFgMO-xYDGvMS7xL3Ckngex5VhxYfCgcKpyLFsxIJwyKxkw4LHmMWNBcecxInFlMWWxKvFrMWcxZ7GqMmldMi8yIHFtMW2LG51bWLGoMKkxbkXxajFqsmmxZrJqMWfwqRoyITJrcWzdMW1bsW3xbnFmRjHn8aAxqDHosWIyLlkJMmtxKfEqcSrxK3Er8SxxLPEtVrJjMePyY_FgMWCyZPFh8WJxYvFjQLJosWTxZXKlsWYyb3FrsWgya3FpMSTa8Wnxal0xavKrsmpxbDEpcqEyobKiMqzxZkXyozHocaExobHrMaLxo1lx6nGkcaTxpXGl8aZxpvGncafxqHGo3TGpcanx7jHiMauypnGscazxrXEosaFdMqRJ8qUxKjFl8qYxLDJiMS2xYDCkMqfxL7KocWDxYXJlMeXyqbGoAPKqcmkyqzJp8qvyrvFk8m3yrPKtcm7yq3Frcq6yoPJr8qHxbjLgMKRGcuDyo7LhcaHxonLiMevxL3HscuOx7TLkcaexqDGosqZy5dyxqjGqsasy5vGsMe_xrXCpmFieGTEg8qRx47FomXIvsmAcMmCyYTIhMuqxYDDtMusy67JkMmSy7LJlcmXxpnJmsmcyZ7LtXIGy7jKq8q4zITFn8KlyavJrcKtzIdnybHJs8m1csu_xJQZybrKt8m8zYrGrcqByYbMhsqFxbbMicSUxZkazI3GgsuFwoDKkR_JrcywyYHJg8mFyYfKm8eRw7TEuMy6yZHKo8u0x5lyBM2HyavLu8mpzYzKrM2OzZDNksm0ybbFuRXNmc2Jyb7NncqCzK7Kvc2iyonCkRbNp8qPzarGuiHNjseAx4LEgseFV2F0Y82yx4vDjQLDms22yY7LrwMxPM25yqXNuwfNvsu6wpHChM6Ny73KssSUFsW4zKdlbMKgzovJvM62y7zKsc2jxbrDgM68ybXOv86Wy4XCgcuZx7rOoM6iaMqRJs6bx4HHg86fzqHOo8y2zqfKns6qxL_OrM6uzL3NusWNCM6zyrjPg8yFzK7OuWsYz4nOvs-AyrbPqM63z4XKic-IxILPisKgz4zGhc-OzKDGqM-RzqPKkSnPls6dx4Qv0IDOpMmJz50By63Pn8ONz6HOr8mfxqAJz6fPgs-0z6vNlmvEmM-4z7DPgcqtz6nFr8-1y4DPt869z4vFvsqNzajPvM-Pz7_PmmjPhnPClsKWFSAAHwDNj82hyofOhs2UwpYW0LYhAADClhckACXQt86FybLOh3LClhjRhybRgcKWGScAKNGI0LnNkdGK0Lwa0ZYp0YHCpmfFv3XJm8KQwqbIsW5maWfCgMKndsagxLvHp8OLP8OZwpnRtdG1wpo",
    },
    {
      header: t("Key Pair"),
      color: "#2196f3",
      // name: t("Key Pair"),
      image: "thumbs/keypair.png",
      desc: t("Des2"),
      save: "wofCrGxhc3Rfbm9kZV9pZMONAQ7EgcSDxIVsaW5rxItkw4zDq8KlxIfEiXPCnMKJwqLEjMSOAsKkdHlwZcKvRGlzcMSCeS9BZGRyZXNzwqNwb3PCksONBQrDjMKqwqRzaXplxL4BVk_CpWbEgmdzwoDCpW9yxIlyB8KkbcSIZQDCpsSVcHV0c8KRwoPCpG5hbWXCoMSmxKjFnMKkxJTElsOMw5_CqnByb8SpcnRpxLfChMKrYmxvY2vFu1PFhmUywqvEr2FjZWhvbMWWwqDCpcW6dGxlwqfEs8S1xLdzwqV2YWx1ZcOZKjB4MzJhOWU5MTljZjgyZMavOGQ1MDI0ZTHGuzBhNTNiMDM1NcarZTRmYsKKxKLEjQHFmMSnxKnCrkNyxKh0by9SZWNvdmVyxLrEvMS-AgjDjQLDuMWExobCgsKhMMOKQyEzM8KhMS7FjcWPxZHFk8WVx58JxZnFm8WdxZ_FocS9xaXFp8WpwqlbxanEuGFnZV3FrMSpwqbEhHLElWfFr8SVa8OMw6nIg8WoZcKrW8WFZ8WndHXEtsiNx5FlyJB0yJJuyJTFsMiXw6jCp2_FocWgxaLFpMWmyJvCp2HEtMS2xLjIjsinyJHIk8KlyK3EvcOMw6bDjMOnxbTFtsW4xbrEt8KCwqfIiHPIimXCo2FiY8KpyJ_IocijxqLChMalYTA3Zca-x4o4NmYwMMawNTfHgjg3yLkzZcexNWEzMGNkNjZjMzbGusmnYzI2NzA1NDjGrTPIuTjGq2HGscqDyaZhypEyN2PJoDIwOca6ZMa8ya7Jpzk5ypgyNTIyxofKiTk1ZGI0ypfGvDY4MMm9xrwyMTZkOGJlZsqTNsmzyroxY8eMxKMBCsi9wq3ErMSuxLAvV2F0Y2jHocS9w40DIMemwp7HqcWHx6MRPMe2yIrHuMWUxZbLhcWaxInHv27Is8WjwoTItsWpxavIpgDIlcWxw6bJgcmUZWzCoMiwyLLIgcKRy6nIhMWqyL0AyYHIlnPDgMuyyrnLtcmIxbfHn8mLc8KBxpNpxpVlwqXLjMuOaMShy4MLyL3Eq8StxorEscaZyLvEucS7y5IDKsuTNMuYxYjEjkBQy53FkMWSy6DHn8yXy6PFnMWey6bLuciay6vLvsuvyJfJh8W1zIjFucW7c8W9xb_GgcaDZcaFxYfGiMaKxozGjsaQx5_GksaUxpbGmMi6xpvGncafxqHGo8alxqfGqcarxq3GtMayxrTGtsa4xrrGvDHGvseAx4LHhMeGxqrHiWLCiMeNxI4My4bLiMybL1TMjsaWy5HCklBazKbFicO0y7_FjsuezK3HunLLrsyxAMyHyYrMv8KHwqhmb250zYZlLMW-xoDGgsaExobNiMSCzYrGj8aRzI3Mj8KlzbXOn8aexqBlwqhLZXkgUGFpcsKqzo3Oj0bFqGlsecK8J1J1YmlrIE3Ojm8gT25lJywgyZBucy1zx59pZsKlx5zGgHLCpyPEtM-XZMuCxJnDvci9wqxJzLR0L0LFoceXbs24w7bJhM28w4zDiDLMq8ufzoMBx73LpMyzy6fItcu8y6zFrcO_zLnDgMu3dMunwpLMtsu9yKbDv8yAxJbFo8OMw5rQgc-4x5JudW3KuXIsYm_Gj2VhbtCFa8yCzojMicy_woPNlM6kwqhjxJTGgiDFqc6expbCps-jdM-lz5HIsc6PAM-aw4zDvMyYx5THlseYzqfOqc6rzq3NuMOMw7rDjMOSzKbHq8etQ1PCmcKax7NCz67OgsWWBM-yzLLIgMWi0IDLqmXCrVvFtWnGnnRlIGvOqMilxa3IqMiqyKzIlsOA0IHCqMiLz4Ryy41lyL3Pusit0IjPvcunwpPQgcaJyJLRmtGc0Z55yL3RosmAyYLCkcOMw6DQgcW0zrrQpNGdzqjRvMi_yKvQmXPCkNCByLjNksi8yKbRvdKLyYLCksOMw57FstCczL7Et8KByYjRmdGs0LnDmULGpcmtOMa6yrDKu8qNNWbKqseBMDRjY2JkMsqoMcqXyaHKlcqlMmPKmTc1xrHKuc2nZcmtyoVjMTU5ZMmg04pjOM-axI7Pscimy4fMmsuKzJLLj824w40Ew7YezbzHpsub0YvHucWWBtGPy6XPtcu7yJvQi8Wu0bDDnsyEy7TLtsixz77LudOpzLfLrdKMzIPEgsyFwqDSm8yKzIzNj8yQ05ho05EB06XTlM2y05fLjdOZzKDEvgMCxI58058GScuczoDMrNOjx58I06bPtNO00ZTTq8uu0bDDo9Ovy7XRstSdz7fLvtO41KPTvMy8zonSndCo1IHUitSDza4B0Y7IpsKqz5_Is820ZXh0z6fEjsKa058BLM-t1JbPr8WWxKXOhtScyLTQisy4yK3PvNOyz7XVjNKT0opn0ozSl8OhyJjTvcy_zYHOlc2EzpHOmcaLxo3OnMefwq9lzo_HnyDRm9S8IGjHn8yQ1IDCpFTUu3TQoMahyZPJldSEA8i9wqvQtnDHly_Ghcig05oBw6DEjnLRgsesx646ZmbHs1bTosyucgXUm9GRc8KU0IHCrNGX0bfRrNG60aDIj9WUzLnSgdKD1prHncSMx5_Wnsi-yKnIk8-70IHIhsmPyZHWqNKU0aTFscOh0IHHqcig0a7WocOr1KXFotaX0ZTSkMaa0pLRodWU07jSj9avyIvSidaq0pXMgdGm0ZTJl2nIoMuNyZrXidGj1ZbDjMOjw4zDqNCByJDXkM-EZNGu07jVmsS3woXJjsabyZHVt2PSn9G40qLSpHg2M2NhMjPGs8m9ybUzOTjXusmqyqrStWXJoWXKt2bJoDkzx4o0NMqUxrNmZcmgyZTJs8eFyroyOGM1YjZi04DOpcy8dtamcsK6aNCscHM6Ly9hdcSEyJPIktaMzI5oLsecbdeP15HIosS2w4DCqNiox5fWgW7Dg9SEDc-d1LjFoc-iz6TOjs24w5DDhMemWM-qz6zPrsKBwqnPksSC2KPYgcOC1Jhy1brVidaVz7bTqta51Y7WvMiC1J7XoNG_xJrVksWtwq7QjdCPx5_QktCUxpbQl9eh1KzQncS30J_Oo8ah0KLQpM690KfUgNCq2YTQmMecdc6PA9KMwpvCltCIw4zDvQDQswHDv9qD0pnDvNSPAQEAANqDw5_Qs9qOAtqR2oPDoNCzAMSOA8Wd1ZTag8OhxI4E2pwB1I7WstqDw6PandqOBtqYyYTEjgfapQrarsOn2rDapQvarsOo2qvasAHaqMiY2qPapdqx2r7Dq8SODdqlAwPDv8KmZ8W2ddijwpDCpsecbmbXkMKAwqfHnnLFhc6Ow4s_w5nCmduf25_Cmg",
    },
    {
      header: t("Transactions"),
      color: "#565656",
      // name: t("Transactions"),
      image: "thumbs/transactions.png",
      desc: t("Des3"),
      save: "wofCrGxhc3Rfbm9kZV9pZMONATnEgcSDxIVsaW5rxIvEjQEdwqXEh8SJc8OcABfCisKixIzEjiPCpHR5cGXCrElucHV0L051bWJlcsKjcG9zwpLDjQPCtsS_wpjCpHNpemXCksOMwr4ywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbElcSwdHPCkcKDwqRuYW1lwqDEqMSqxZzCpMSUxJbDgMKnb8SxxaDFosWkxabFqMWqxKnEq8KmbsS1xLdywqXFr2vFosSOAcKqcHJvxKtydGllc8KEwqtwxIJjZWhvbMWWwqEjwqXGjnRsZcKmxLTEtsS4wqV2YWx1xqIwLjDGrzHCq2Jsb2Nrxo9TxYZlMsSjxKUBJMWrxKvCrFXGjmxzL1RvIFdlacS6xLzEvgTCsMWCxYTGusKCwqEww4zCqsKhMRrFjcWPxZHFk8WVxLgHxZnFm8WdxZ_EscW2xaXFp2XCpcepdMeBxqLFvsalcsWuxJVrxobFssW0x6rFo8esxajCpsWzdMWgx7LFvcW_xqbGg8aFAQLGiMaKxozGjsaQwoHCqMSJY2ltxqlzEsa9xJkix7LCqsSuxaDHiGV4dMePxL3EjsOMw40Cw7jHlcWHxL4Bw5Q1x59hxZDFksWUxZYBx6bEiceoxK_HvcW3x63FusWsxZjGg8WxyILFtce-xbjFqciFxIRyxJVnxoLHuMWiw4zDv8iNxovEuMiQxpHGssa0xrbGuMa6MsaTxpXGl8aZxZbCr2VudMS4IMmoyKQgaMS4x67Gn8ahwqRUyKN0xqfGqcarw5kqMHhCNDIzN2I1NjJiNEJkREI4Q2IzMjBlNjU5RDFkMDc3ODJmM8a7NMqIyJvEjhPHssKvQ3LEqnRvL0tleSBQYWnEucS7yKcCOseayK1lx5cww4pDU8KZwprHnELIs8i1x6LFlgrIusWcxZ7IvcWhwpLIv8Wowq1bxolpxqjJqCBryrBdyYt0yY1uZ8e3xJbEjg3LkmXCqGfJpsS4Ycmox7LDv8uja8mFx7zFocKTy6fGk8mNy5hly5rKsMuey6DJj8iJwpHDjMO-y6fGiHXGs2ljy7x5y77JjsmQxJZzwpDLp8KnYWRkcsaQc8yNy6HMj8aEwpPDjMO2xI4PxI4QyZXIj8aPc8KByI3Ll8utZcqvecOZQsm8OGY4N8qBxpYwOGM2N2E1NTHKm2ZlN8qTYsqeN2M0MDnMtWIwNWQyNMqQOTbMtWYxypHKnjTMu2TNmMqQOMy2ZsqkATDInsigxLHIosikyKbEvgPDqMOQwrrKvMivLMWMxY7ItMehyLfEuA7LjMi8yYfLp8mBxKvJg8e4zKTHu8iDyL7Hv8mKxbvGosmMzI7IicOAzKbJl8yoxpLGs8a1xrdlxrnFh8mfxpRhxpbGmMaaxLjJpcmnyanJq3TJrcmvxp5pxqBlybPJtcm3xqplybrJvGNjZGZmYzIyYzkzzr8yzYNmYTBiyo84MDTNoM-FzZthypzKmTDPg82mLM2py4_NrMilyrfCksORw7zDqsORw79gzbTEjs22y4fNusejcgLNvsuOzoDOis6Cxa3JhM6Hz6vJic-twqbOjsyczIHEjgvOksaNzpTJms6XyZ3Om8mgzp7Jos6hcs6jyahyyarJtc6ozJjOqs6szq7IpM6wyblFcnXGoSBldm_LmyDGqsa2yrHIl8aUy7vGjnAgxopvbcmqb2nGoc6nY8SDaNClZW3ElWTJqnLOnmsgc2Vjb27QtcijacSEzaYryqfKqcqryq1NbtCy0L7Mic2uw5HDvlzPni7KvMq-y4A6zrjLhc-kyLbPpgjPqcewc8u2zorCqltt0YvFmm7MicudzozPtMufyY7Lsc-4zJNb0LTIo9GrxazIhse1y7HDgMuny6nLq9C3y67OjMuwz6_Jhseqy5HOisu4zKzLmcubzIzRrM-1zIDJkcKRxI4M0bzRptGM0aljzJvSj8yQzpHGicmWz7vIkcev0L_IowDNpi3HssKtRNGCzp15L1fLrWNo0Y_DvcOGw4zCls-hAzE80ZvLicS4CdGfy4_FosKEz6zHss6Ey6QBDMaCYcS3bMKgz7DHvdOCz7LThMydyIoN04nTi8Kgz7rJmMKB0I3GocKl0q500rDCicSkxJkvyqfSqXPSqy9BzJbMmHNzza7DjQQuPM-hAVRQ0rvNu3IN0r_PscmA04TRsAEP05nMqMKDz73JnM6ZyZ7Qgc6fyaPEuMKg05xlwqfTq8yXzJnNpiXHssStz5ZCxLHKrG7TsATHkRDNtMOMw4jNt8eg0ZzFlgPTvc6J05HSgdG6047LkM6By6_Tk9KRAQPUss6Mwq7HtMaALGJvxpllYW7Tk9KcyI7Ok8aQwoPQkcuoY8SUxrYgxajUkMKm1Jt01J3CpdC9dcmnDc2mJtKn06fTqdOf0rDTsAfCqMiqwp7PoQoh0rrNuMuI07rUosWayLvPqtOP04POjNOFx7kBBNOWZdOM1LDTgdWzyYLVhNW504zUhNKgybHHrtWgaM2mKtSYzarEstWT1J3TsAXDptOxwojUo9Sl07nPpgTUq8WhyYjTv9Su0oPLtMS91LjFrMO_1LTEjhTWosSr1LrIh3LUvdS_xqHVgtWE1oNz1YnGqM6xwqjVjMyJ0LnVkNaF1ZLUnNC-1ZbFs8mnBM2mKdWd0qrEgtKs1ofTsAjCjsS_wqzSt9K51pfFlhTWmtW91K3JgtSBCNaB043ShNab05DWndW_zpDXm9ay05vWhdOe0q_WiNOjxI4o1JjHjMqPL1PJptC1VHjVomzEv8OK0ZXHmMuAKcuD0ZrVq8-lxZYR15XRosmJz7RpZ9GLZNKZ1IEHy6fCrFvOlsa20rDKtG7RtsW80o7UgQbLp8WE17LLr9SBFNW80obJicKkaNCv0pnWpQEIzJPMmMaWaXDHsdGsb2Jq0LzJts-3ARHWssKCzJTTrMyZwqDCqNKddsSMxLjDmTxo1ZRwczovL2dvxLjElC7ElWZ10LfZk8qtdjMvzaA0ZsqGNDbKncy8NDHMtjgzzrU2M82EMDHEt82Tz5LXqgEa161l169CxqnVgsaW1pDDusSOyJ3FhcWHyr7DjMOS17_Up9K8cgzYhMyTzJXUlNOu2IzGg8yg2I_Ykcmba9iUxJXYl86N0a7Locuxw4zDucun1ZbJrsa22J_akcO61bzCkdefxajCp2LZum7GlsiF1LvIiNKQw4zDvNaBwrE52ag2MDLNozfGr9q_2r_Yu9i92o5zzrN4zrXOt865zrvOvc6_ypDPgs-Ez4Yzz4jPitq6Ys-Nz4_Gr8-D2YHGitmDxZbZhtmIyIPZi9mN2Y_ZkWnZk27ZldmXadmZ2ZvZndmfyofZos68Ntml2afZqcy82axl2a7ZsMqeYc2mH8eywq7HhNCrx4dGxorQqMeMx47PmcONBwjZv9e6x5nCoMecx57YgNSoxLjKptWvy43RoNac1ZDHsNqw1qvancO82qfLp8iBy7Tcnse11LTDjMO916TIk9C8yJbImMia2bMg06bXh2HSrETGmcSCctOv3IoHwrLEjjbUo8K-N9eSxLgW15Xcm86L15jakcO93KLVvsW82rHGgc6Q1rLOldqVz7_Gu9SL0IPJpMmm0IfQicmsya7QjNaFwqfct2zcuXPVisOLP8K5LiPDjzENw6fNph3Wi9Sa1r7UntyKBUbIqNaV1KbNudyVcgXdh9aoZdKCx7jLs86I1LHdjt6D3KjDut6C1qrHtdat1YDWsN2S0p3Mp9WI1YrWt9WN1rrJsM6rxqHWvdWU1r_Vl8mnAc2mM9KnT9i02LYv3qfYtWPPmMeQ3IvCisSOwprPoQIcw4zCtN2Ecg_XlcKX3oLIgd6o3q3UgRvaoNa1xqvHssK00o4s3ZAs2LPerMexyYTYnGTLrWHfh9-J34vfjdi20brLp8KjZ8SD35Xam2ffitar34zfgN-P3oXRvN-dc1DJjdqvzozfiN-g36Lej9-Y34HfkM6KxJzQvt-txazfr8u_37HUvN-z36bFsMunwqLKrN-f37zfl9-l1K_XnXPevd6J3r_fjtWE34TJuM6t0azdkN-azorCpN-SdN-U0o3foOCglsmJ35zfnuCglNyf37XJicupxIPfq8yJ4KCT0bfgoJXgoKTHrd-32q7goKrdj-Cgo9-nzorgoINv2pDehd2T1ZHeq9i214DGtHLCpyM1zL_goYTCqGbQvnTOmmUQ1YrDmcKcewogICLfhWUiOiAx24DgoZvgoZss4KGR4KGT4KCZYeChl-Chk8m8IuChnuChkiLfqeCho8qA2r_goafgoZPfqeCgqMaW4KGj2aXgoZzGr-ChriLEh-CgsOChozfgobfKrOChoyLJvMm-yoDKgsqE2aDKicqLyo3Kj8qRypPKlcqXypnKm8qdyp_KocqIIgp9zaYcz5XIocm0za3cigLCvMiq4KKZ2oHFiM-i3bzVrM-mBt6B3onVtd6G077FudioyInMn8O5xI4GxI4c3ZPUh86Y4KGKzpzJoc6g3ZrOpNCIzqbQi96b0I7gopzJtuChlduf2YnbotmO2ZBy2ZLZlNmWYdmYL9ma2Zzbs9uv2aHZo9uz2abKnNu22avZrdmvZdmx273ZsyHHssKw167Zm1TQt25zzp7GjtC-07AGLMiqYtyPw4zDsMecw4zCut65C9eVwpnak9iS2pbYptqY4KC404Yc2pPLlsu60ovamdGty7_ancyE4KCXW8qs4KSN2JnakcO_0bLgoZXamcKt34vgpJbOhciL3KNb4KGh4KSV4KCd4KCt1ZBb36ngpJvgpJ3gpKXgoLTJidGk4KGw36xl4KSq36PgpJ7goIHOisKnW-ChucaW4KSz3o_gpLXLsticxYXYidqk4KSfA9W8wpTLt8uf1YLgo67erdurbsiF37_Yqd-DzorYh9iJ4KOi4KKwyZHIrwTEjtiO4KWT4KWB2IrUs8iJzJLgoJfYpnNo4KWXzJDUtR3WssKI1YrDjwAAWsOzEHpAAOCgr8aWw4DgoJjfk8KiybzgoKBzw41Zw5jgoKbfquCkscOOw7RhCQDbm2_bndmF2Yfgo4rZjOCjjNul26fbqeCjktur4KOU263go5fZoNux2aTgo5zZqNmq27jbuuCjotu8zKvLusyvzLHOtOChrMyWNmTNgcqCzL7ZqDcxYc6e4KasZDPgoYM0Nc62M86ez4jMvjFlzLbNjDbKj82e25JhzLTNjc2R2a3fkjbgoLbbhuCigsqByoPKhcqH4KKHyozKjsqQypLKlMqWypjKmsqcyp7KoM2UyqPZsznXhtOo14jSrdeo1aLcvgPaiuCio82v15HclNqIEt2H2qndic6D1IHEm8SC05fap-Cnt8-t4KW216Lgp7zVutOY3pTVh8yp1JDXp9Og16nGvjHgp6fVn-Cnq9yKCMKs07HHseCnsMiqWGTeuRXgp7bgoqvUgRHXm-CnvuCiq9aA4KiD1oLgqIbSn-CoiNem1ofTk8SgGMKWzKDKpQLEjhrFndKO4Kiv4KKzARwA4KizAeCkjsmO4Kiv2b7EmuCou9m0AsO_4Kivw7zgqLPgqYMfxZ3dkOCor8O9xI7gqYvEjiDgpa_gqK_Dvsql4KmDIeCoveCotsmT2b_gqZgC4Ki-y6HClsaGxKbgqYMk4KmM1qvgqaLIi8SO4KmmxI4hA-CknOCktN-g4KmpA8SOJeCpmAjgqYbEjuClmgHgqZnEjibgqZTgorTgorbgqYMo4Kma4Kmy4KWb4KmtAder4Ki14KqG2KrgqorEjingqoABC8-i4KmDK-Cqi8u_4KmpDMSO4KqWxI4t4KqRDeCqneCpgxPgqpfgqL_MouCoscSOL-CqkRDgqqfNp-CqkRHXq-CqiQEx4KqRFMSOKuCqg-CpheCpqRvgqa3gqYMzxZ3fv-CpqRzgqoLgqrzgqaBn4KmpHeCpreCptMSP4KWvwqZnxop12YrCkMKm0L3bqNiIwoDCp3bEuMWF0L7dqMOZwpngq5_gq5_Cmg",
    },
    {
      header: t("Encryption"),
      color: "#7e57c2",
      // name: t("Encryption"),
      image: "thumbs/encryption.png",
      desc: t("Des4"),
      save: "wofCrGxhc3Rfbm9kZV9pZFfEgcSDxIVsaW5rxItkScKlxIfEiXPCncKKwqLEjD_CpHR5cGXCqklucHV0L1RleHTCo3Bvc8KSPHjCpHNpemXCksONASwywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbEk8SqdHPCkcKDwqRuYW1lwqDEosSkxZLCpMSSxJTDgMKnb8SrxZbFmMWaxZzFnsWgxKPEpcKmxIRyxJNnwqXFpWvFmDHCqnByb8SlcnRpZXPChMKrYmxvY2vGhFPEu2UywqtwxIJjZWhvbMWMwq9lbnRlciDGn8SwIGjGoGXCpcaDdGxlwqTErsSwwqV2YWx1xqjGs2nGlsSexIw-xaHEpcKrQ3LEpHRvL0jEg2jEssS0xL4BwprDjMKCxLnGkMKSeB7Fg8WFxYfFicWLxqAFxY_FkcWTxZXEq8WsxZvFncaox590xr1lwq3FtMW2LG51bWLGoMWkxJNrMcWoxarHoMWZx6LFnsKkaMeHx6fFs3TFtW7Ft8W5xZgzxb3Fv8aBxoPGhcKAwonEn2REx6fCr0Rpc8aUYXkvQWRkcsaFc8eJxLXDjQNcUMeQxLzHi1RQx5VhxYbFiMWKxYwKx5zEiceexKnHuMWtx6PFsMWixY7FuTXIiMaAxqDIi8aGxojGisaMxo7GkMaSyJfGlsaYxprGoMKgxqlpxqtlwqfIm8idyJ_GscazxrXDmSoweDMyODgwOWJjODk0ZjnJoDA3NDE3ZDJkYWQ2YjdjOTk4YzFhZsm0YzbGumRNx6fCrciUyJbEgsiZV2F0Y8eIxLPIogRWw4zDnMinxL3Ev108yKzIrseYxYwLyLPFksWUyLbFl8KRwoTHusWfx6fIvMezPsW4YcewbMKgx7Z0xavKqMqqyLrEpQDFuMezc8OAyrDKssKgyL_IisaEc8KByZDJksKlyo7KkGjKhUbHp8Kux4DHgseERGVjx4FwxLHKk8S-yKTDjMOmypnCksOMwrQtyp7Hl8iwxqAIyqPItcWrwpLIuMWexpPFtcayxp8ga2V5x7_HqsiDx7LElD_Lr2XCqcady5jHgmVky7nIgcW2y7xrSMq1yrfLv8KpxInMg8uazIXHv29iasuXdMq9xJTFmD7LhMmBy4bCgMqFUcenwrFOZXR3xYprL1N1YnPLmGnHsMihwpJQw4zDusqZwoLCoTDEvxjCoTEuy6bIr8eZcgHLq8qlzI7KqsKpW8qRYW5uZWxdzIfIgmfMisWnxanKtsegy67KqsKnxZ5zc8itxq3FsWXIgM2WzJvFusKRQ8u_wqjInsaWaXbMlM2lw7_Nqcq_zJ_GgsuGwoLCp82OzZDNksKuaXBmcy7MqGguYnVpxprCp82RzKnMq8OZxqV0yrZzOi8vzo7MqnJrzoV0zofOic6LZDo0NDM4Ni_KhVPHp8SnyqbErcSvy5vHisS_wrjEvwTLocS_Y0PNg8qgxqAGzYjHpcehxa7Kq82lyq3ElEPMjci3yrnNlcW2zbbCkUjNuMmCxofGicaLxo1lxo_EvMmJxpXGl8aZxpvGncafxqHGo3TGpcany4nGrMauzrDJmMa0ZcOZw4TJnTDJt2E2ZWZlzqRjZmYwxpHPtDUwYzc1NDVkybE3Ys6lMDLJs9CCMjbQiTc2MTRlMWTPusmfz7g2ZDU1yb1iYtCBya7JvjVhybo2ybo3ybU4MTFjMzFl0LHOpjHPvTLQh8m7NsmgybYwyZ_QijBmyaIyZTc3OdC0Msm10JXRhWM1OWbQrTHQhzg0ybxlMDQ2ybU50I7RhtGDZGZj0KA1z7_KgzE4ZDHRm8-_z7nQlTXQgMqB0LRkYtCnY9CNYjNi0aA3wojIj1fKiMqKyJfImVTJkcaszLVuw5DCps63AcO0yrzFhMity6fNhc62xZDItM-Qy4bCh8KoZm_Gns-XZSzJhM-UyYfPmMaTz5rJjMWMyY_GqsaswqXSg8uKxrLPqsKuxrfGlkVuzJLGn2TCqtKZxp5GxZ3Oi3nCvCdSzK9payBN0ppvIE_NkScsIM2ibnMtc8agaWbCpWPGmcWKwqcjyJzTnGTKhULIksuTy5rHhEvLtyBQYWlyzLXDjQJEbsy6zLzDikNTwpnCms2AQs67y6hyB86_yqbEtcu_wq1bxb7NscqPZcu1y7fNlM2lzafMicW5M82tZ8adxqDUhsenw7_NmM-IxZfCk8u_y7HUhcu0y7bLuNSLy7rIhMq-wpHLvsqqxb3Mr8SSY9SI1KDFotSMyIPPjUnLv8KnybXJls2hz4vUsMiFwpHIvsW-yYDNucaFwoHIiNSdZdOlecOZQsmdOWPQidGu0KzQk2I5M8m7YTLJvDXRgNGD0IPJtdCQMM--0IPJp8-0zqYyyalmYcm7y5fQrTNlYjjRudG4MM-9MciOxIxUyJLMp86PzpsvUNSpyJXKks6yBMKIxL_DgtOxMMOMw7DTuNO6zYUM077Fq9SazYvNjce9zb7Nk9S4zZfFucOA1LPNoM2i1JHWlMyKRtSzxKrGidW91JXMikXSlcaFzbvNvc2RbM6AzoLOhM6GzojOis6MzpnOkM6SzpTOls6YzKjOms6c1q_OoMaazqPOpc6nzqnIj0XLkdOix4Mv0rLStNOsAcO-xL_Dvsuhy6PLpdKOyp_TuwnWjM2cy7_UqNah1KvUn9acxbnUss2e1pnNo9eex7M71JjUgMqqwqbMlsyYY8em1IvXq8yZzbbWl82LzILLmdK11pTPjUbWpsWHyoVWx6fCrMSoxZYvQsSrx4Nu06wCw5rEv8Ku15DDiMWC15PSkMWMAteXyqfLv8q6ZdSW1pbXp82dz4LYl8211LpF2JbLkcetx6_GoCxib8aZZc2P17LXu8KDz6nGtcKoY9Sq04PFns-lzabYhM6T0prTlsWpxp4ByoVLzqzYgcSrzq_EsNKG063LqsS6yKjEv8WB1onFjAPYlM-ByLnKrNSXzZrNitid17jUujvXu8-SyYXPldKcz5nQpc-byY1yxpzGnsagxqLOsM-jyJ7Yt8-nxrDSrca1xbPLl8iezJrIhcKbwpYxPwA-AMepzIjIg8esx67HsHLCljPZvELFk9SiwpY1QtOuAADCljtLAEUB1K9nwpY-RgBN2o_Clj_aiNqb2pfClkNRAFPankVWAFQCw7_ClkbalVTaltqKSNqoRtq02b_amElCAUXaidq6wqZnxb91cHPCkMKm05duZmlnwoDCp82ycsS60prDiz_DmcKZ25jbmMKa",
    },
    {
      header: t("Byzantine Generals"),
      color: "#7e57c2",
      // name: t("Byzantine Generals"),
      image: "thumbs/generals.png",
      desc: t("Des6"),
      save: "wofCrGxhc3Rfbm9kZV9pZMONAW_EgcSDxIVsaW5rxIvEjQIgwqXEh8SJc8OcAEbCisKixIzEjiHCpHR5cGXCrE9iamVjdC9QYXJzZcKjcG9zwpLDjQMWxL8-wqRzaXplwoLCoTDDjMKMwqExHsKlZsSCZ3PCgMKlb3LEiXIuwqRtxIhlAMKmxJVwdXRzwpHCg8KkbmFtZcKkanNvbsSoxKplwqbEhHLElWfCpMSUxJbDjQIfwqdvxaXFpMWmwpLFqcWrxa3Co2_Er8W0xKvCoMKlxb1rxafEjsaHxarFrGXCoMaOZcO_xpHElcaTw4DCqnByb8SrcnRpZXPCgcKldmFsdWXChMKkZsakbcKqZ2VuZXLGr0LGjMatxq_GscK1YXR0YWNrIMWebmRheSDHhSDHjnduxJzFsmNlAsKkd8WYa8OLQ8KeNMODIyhEw5TEo8SlARvGm8KtxK7EsMSyL8evxLF0xLrEvMS-BkDDjMKCxYTFhmXEvgI4w4zCqMWRxZPFlcWXxZnGvDnFncWfxaHFo8Wlc8KVxojGmMaaxKnEq8KmxozHsHTFvMafw4DIk8WtxrTGtsabwrTFuMW6LG51bWLGvCzImce0yJzFvgIMyJ9lx4HGsMWuyJZlyKR0xbluZ8inyKnIq3LIrcSvyK_GksW_Dci0x5dux5nIo8ilyL7JgMiqyKzIrsSyyLBrxb8OyLTHnMeeyY7IvMimyKjJksmDyZTIm8mHAg_GgsaEyJDIksaXxa3IlcW1yJjJhcSyxp7ElsS9xI7ClcSOw4DGs8aJxa7GtW9txpvFt8meyL7JlsOAybPGk8KRxb8QyYrGrsi3yoDJj8W7xpLInsmsyLXEh8mMyLjJr8mgyYLKhMmax51ya8qAypnGvMqExqLGpMamxqjGqsKEwqXGqHRsxbbHs8myY29sxZjCpyM1Ycq3yrfCqGbFsnRTx74QyLbGscOZansKICAiyb1tIjrLica5xrvGvWzGv2IiLMuHy4nKjMaxy43LiceFx4fHiceLxbLHjseQx5LHlG7LlsuYIsqVx5nLnDHLl8uIIsqda8ucNzI2NjAzMjUzMTU0MDU3OTAwCn3HqcSNASfHrURpc3DEgnkvV8eFY2jHtsm1C8KQxb8cx73Fh8S-AzE8yIVhxZTFlsWYxZo8yIzEiciObsaFxafJusiUxpsAyZbEjsKaxpFhyKtswqDJqHTMsMKRzLLJrcy0yoZzyoXEgsy7wqDKpMalxrzKp8aryqppyqzItcyVdMyXzInEjjXGm8KwU3TFmMymZS9WxLZpzLrKrcyZxL4JwroozJ_FiMWKxYzFjhrMpcynyIjFmkHMrMWgxaLMr8iQxajKk8SkxbPIucy1yYcBw4DMvs2Ax7zJu8aLxaXNhcahxqPNjManxqlzwoLCp8aucs6IzpTCpmfKs2LGr8ODzZcBJcabwqpJzbrEs1RleMe1xLvJtQTCusOMwrTNrMS-ASwyzbLIh8ypxrzMtcWezK3Nuc2AyLTJrsSrzoHInc6FzbvOvsqOyoJnzYXKiAINzYvKps6QwoTCq2LKs8eJxqnKv8WHMsKrzJHHiGVoyrLFmsKvxrp0xrwgz6LOqCBoxrzItcqryq3CpM6mzqjLgmXHhMeGx4jHiseMy6PHkXTHk2HHlc6eOMetQ8q9xqRsL1Rpxa1yzafDjQZUxb_Cns2sxYnFi8WNMc2xxZLMpsarwqnKsWzEgnDEuGTDg820xrwBzbcAz4PFps2BypPGgm5fxqjHicabxp3GksaUAcOGzLnMu8KlM8yFbXPPjc2NzpDCgsKoxJXPonLKjMSOLMKlZXbPocSoaceJwqhib3jQmcWYwqQjQdGVzp42zZrNnM2exrnNoc2jzaXEuc6qxL4IZsS_ZtCPza7QktCUyIbMqMiJctGYzrrNuMiP0KbItM2-zLTMtgHDgdClxafOh8aYzol0z4nEjsOC0LvOj8aqzpLOlMm7wqRkaWZmzpjOms6czp5pzI3Mj8-azJPNlMyX0IkKwqrFs8WFzKDDjQRFzKTQlc2zzrdyQ9CjzrzNu82CxpnRtsmlEtC0Zcy80brQp8m7zr_FoM6L0rDMvNKDzY7GrM-rzZPMlmjOntGmyLnCrcyOzJDMksyU04DQiQLDrsW_Ys6w0p_Soc610azFmi3SqNGyzLHKk9K2z4HIsR3Sucy9xoPMv9Kq05rNhNCwzYfMutKxzYrOjc-OxqrSvc2Ryq3CpdKX04HEpMyKIs-_0IHKsi9E0rHHj9OLwqjEv8OU0afQkc2w05PQoHIv05fOpMWnz4XIucO_zLYCHtKz1IzFtdCvxp_QscKU0rvOkMKBwqrGqMWtxIvQqtC5xI5ezp7Ii8i5wqzOo8aFL0LFpc2dbtCJA8Oy0p9MzrDDjMOIzrTSo8620a3Hm9GwzK7OvdOk1I3KhNG6xpbStdCu0oABw4jUk8SrwqfRjsqyZWHHltOm1JnGqsKDz7DCqGPElMugxa3NkM2SwqbUq8eGxbLCpcqxdW50Cs6eHsabwq5TxKtjzaTQg0xlZMa50IjRocONBcSNA1zTkALCgMSOaNSF0qU01InMsMKU0bR0eMqAyaPRt9WD0b1hZGTQrtG31oXQqMuQxqrMj9aJybHJpMidyYpyxqplyJvVgM6Cw4jRutaT1YTUpsS2xr15yYTIms6LyLTCqc6bxILKligpxpvKu9WjxLJp1aDTpsi0wqfLq2XWs9a1Zta3xqjWutSWyogBw4TItMKq0orSjNGLdWzEqcqgyYHGvNWGw4HVknPCiNWbyq3CrEHPs8ugUNaxc8Ks1p1xdWnWnU7HmGXDg9eL0otm147XkHkDwqnXpNem1p1Ub8OCwqnLmmVUya_Kj8KoxInVrW3Gr3MSwqdzz513R8SD0J_ElG3NkRTOnivGm9SnzqQvTteT1bTHt8ONCS7RpdS0wr7Ut9Gr1IbPvtS80qnRs9S_xbXTnMmXAcOC1JLYqsiXyqFy1YbCn9eXwoPPmcSCx5nPnWzFmsKhI9eaxbbYmcmhz7ADzp4q2JXUqMWl2JjYmtCJCUzFv8Oa2KHYo9CWwoHQmMqy0JvQndCf0qUD1oPPhNixxaDVgdOh1L7WpsqY2JrVhsKe2LfYuc-b2LzYvtmA0r7CptmDyYLPsMKhMs6eJM6h2YrOpc6nzqnYnATDhMyr0p3Hv9GE2ZTSpNGtBNme2KnZpc-A2aLJqdqKzLPIucqByL3PiNCwz4oM15fPkM-Sb8-UZc-WZc-Yz5rYu8-exrzPoNWkz6PPpc-5z6jWndmBz63ZvM-wxrjGusa8xr7GjM6eQsetzZzaky9Mx4XGqtm9xL3DkcO9wp7Ev9mI2oLQkM2vMULWgNGt2bjYp9OYwpPItMKhzbbOgNG3w4zbkNq225POgsON25DSp9uYxp_EjsOO2LDJu8iY2o7PhtqT1YbDlNeXwoDOnj3VqU3EiNePxqov265k27DNp8ORw7zDjMW_JtS0wowu24rFmgXQo9uhxpjJm8qe06XXhsSOw4vYt8KnxrrRn9Ce2YHCp1PPnsap2LTRkXLCpmNjNNybNMKoc3ViZ8a9cGjEgMSCxITEhsWfxJgTxJHcqMaSxJhLx5fEnsSgEsyJ0KLIucKrQ3LEqs2dL0jEg8yY1bUIcMSOQM6weMWQ1LjTlMa8CtqJ1IvKk8Kl0bLHrcqPyZHKmsaSEdyDyKBo3YDbpcW6zYXCkgEC26nMiceb04TThtKV04nNld2B2JwJEMSOVNOQzKLSotik0qUL3Y7StNqQ2KvJlgHTn9Kz0qvTm9K4zYjTqdeX067NktOx04DMidmdyLnNm8-HL1PcoNq4xbrZjhrEjsOW1ILDjMK-xY7bid2K1IYM3Y7bj8qT2pLFutKtxp8CyYrEhMS21qDZpsmhyZYDyLTCpsqtyL50aNeS3qzGkgTdmcW22aPFpd2dyL7PiQXXl8KCwqXeqManAt6wxrpn3rPZhtO02ojUptm62YzJodCJCMK2zJ3Zk8612ZbQmdmZ1bHZm9GtzrnIjdio3Y_ai9mhypHeudK2wqbYs8-JA9mq2qHPnNqjcti_2YHZsdmn17zZtcyJ3IHfjtiX2bLGvN-SNMW_bN-W3pzSpQbdt9WJ36PGnwrfpd612bPalQTfq9i6363Yvca837DZsN-62LTXvN-LxIzgoIPIucKxVcaobHPcvs6n17jgoJXSmR7EjsOq1LTDkt2J3bTRrQ3goITZoNisBeCgidqR36jalQbdo9O0CNmJ37nZjdW1CcKmxb_DpOCggOCgrMWa0KLbjdSKzbzfotiszoTeu9qPzYPgoLTZp9qVB-Cgjtms367goJPTr9mC37PHgmXFisyJCdKT04fHj92p0pjVtQfDhsy31LTDiDrbv8a8D9233b_epMSWCN294KGN05ngoYregdOo0rrTq9C8063Zgd6H3arMid2N3LhNx4VoL1LVj2TJvtCJBizEjtGY2oLCktS14KCr0Jbdi3LUu9-f05jgoYnducSr1I7fpOChtd241ZrXvOCgiteU2pUJ0rnHoMKTc8OmLcKwO8Oe2LfCqWHFpcm-x4XRi8ODwqPYkG4A4KK5YXjHoMKrw4FtZ07DiADMieCgrt6L0ZrGvdGczaLFudGf0IkHWMW_w4bel9Gp4KGsctmd4KGH2aTGmNG1253EluChjNqO0bvKk9G-z4nSmuChu9KEzpHOk8S20ojXjNKNzpnGjNKQ07QO0ZnNneCjjM2g4KOOzaTPktGg2b7CusSOwpDgo5bUhOCggdqH4KCvybvgo57duuCin-CjosKR0bzGitOhz4kL34Hgo6vOldG9zpfgo7DWsM6d07QRxpvCq8qvxLNKU09O4KORw6TEv8az4KKRxYzgopTahsWa4KGf4KOb2Z_OiMiZ4KGxaxDeucWvxbHNv9e_z4fPiRHehM-ww5lZe8uKxrbLjSLWlcuSy5TLliLXvOClg8uez7TLoceNx4_PuM-6x5XgpYjWvsuNy67Lscee4KWWOcu8NTg4MdybNjg2MTngpaAwzIjTtAfGm8Kx0IDVpNCCL-ClrtKK14TUrtW1CsSZ37_bhc2uxYkx277gpIPFmuCjtOCkrcaG25DbksW1wq3dlNizyZYG25bdk8-H3ZXKosaSB9WCyZrIvMaxxpvVi2_VjdWPz4kIyYrRh9GJ1I3PiRLYt9uRwqM1MDfCoUIAwqJPUMKiPT3Mid6eyLnCruCgnWngoJ_QhG_goKTgoaVOxI7TtuCkp8Kq4KSp1LncgOCkheCinOCghsSWCeCgs96r4KCL1JbCkhNF4KC4xIwS2JXdp9OITMyP2r7EvgvDoMW_worUtMO6w4zDuuCjmBDen-CghdisE8i0wqPWjtaQ1qHGnxLWnNae3qrgop3ajdOi4KaD4KCw1q3eocSCz6LEhNyHybTCkRTYt9qs4KeYxITKu8q92p4Swq7gorPNnUHWj05ld0nPom3DgsKJ07QT263br8qt4KCgT9qO0IkNUtOO1LTCtCjgo5jgpJrgpoLfoeCnh9is4KiB4KOo0rzKk9yFa8yJ4KGu04TgpJ3HstaZ0IkFWsSOwrjVuxXDjMK135fZl9CaYdCc35vUhuClq-CoqMmr36LJsMiayZYLyZrLi8md2pPgpo_JotaZypvdkOCio8i5yLvgqZPYs9aryYbWm92Q1r7gqZLJn9ia4KmeyZXKkcqcyZzgqZrgpojgqaXWiuCkieCntsiR4KCF4KmMx7TOi9KryKHJvt69ypDInc-JSdKrz7DgqbnKhM-JSuCpvuCpouChkN624Km72pVL4Kmp3Ibgqobdlsid2pjfseCkndWhyrLKtMq2yrjgqpfgqIbVpNqey4HXvOCkvsuGy7DLi8uc4KWE2rHgpYbGjMuoy7DgpYrLjiLgpYzVmcui4KWQy6XPu8uny6_LieCllcuOMOCqs-ClmMqey5zMhuClqcSM4Kel4Ki01pngqLbImuCijOCijgHgqLzgopHFv-CovuCpgNS435jZmOCphNma1IbgoLrgqYngqbLgqa7gqaDSiOCpkeCpq-CmjuCpneCrlcSWScqL4KGb4KmjyZDgq5vgqZbGkkrJiuCqhcW14Kmb4KmkyaHgqabWmsSW4KqK4Kivy7Lgq6HIv-Cro-CpjcaSRdG64KmK4KeH4KmzybLalcqK4Kiv4KuY4KS42pPgqZfJu-Cpv9qRyo_grITGmMmLyY3gqo3gppDgq5bchOCrsuCsjXLKo-Corc-P4KqR1pngqpPKs3LKtcq54KqYyrzgqprLgOCkvcuFy6ngqqHgqqrgpYXas8uV4Kq44Kqpy53Xns-14Kquy6TPucum4Kqn4Kq016rLreCquMuyy63gpZsz4KWd4KWf4KWh4KWj4KWl4KWnzIfNhcSgFMKWAQEAAgAAwpYC4K2IA-Cti8KWAwQAAwHfp9iawpYEBeCtld-G2LPClgXgrZAG4K2RBuCtowcA4KaH4Kua4K2ZBwgABwHgrangqZzgrZkI4K2nCeCtkQkKAAzgrZEKDQDgrZzgrYwLDgAPxaHJo8KWEBAAEeCtkRHgrozgrYjgrbHgq6vJgsKWEuCtrxIBw7_ClhPgrbsS4K2RFOCulxPgrZFF4K27EATgq6rgq6Lgqa3WmcKWSQ8BEAHgrqfgq7TgrqnImsKWSg8CEALgrrHgqZTgq63ClksPAxAD4K674Ku1x7TOmMakddCcwpDcmMWy169nwoDOk8a8xYXFssOLP8OZwpngr5jgr5jCms6eO-Comdu04Kib27LgqJrgo7zav8O8w4LgoajgpKfbveCjmOCgg9S84KS04KyR2KvVhsOJ3IvcjeCju9yP0r7ckdyT15TcltyY3JrcnNye3KDcouCphNyl3K3EhcSdxIrEjNys3KfEk8af3LDcssaq3LTctuCkm9y63Lxv3L7dgN-S3YQB3YbgopHdiOCjmN2N4Kio4KKb1ZrdktOE4Kms4KqHxJbdmOCioMma3ZvYieCpud2f3aHgp5Jk3aXgpobgp5bgoaLTstmO3a4B3bDgq4jdsuCjmN224LCf4KGw4KOfa9283oLSsuCioOCwv-Cvr9Om05_gpLzSvuChv82W07TeisW13ozaud6PYt6RyL7ek96V3pfemduI4KOY3p7gqKjeoNui4KyI4LGA3qbdkN-E4KezxbbgponGkt6u4Ke634jes-CipOCsk9633rnbo-CntuCwrNqV34DgrJXShd-Dx4ffhd-H3rJo4KCYZN-NxbXYltSp4Ka82Jzfk9-V4KSn2KLgqYHfmeCrj-CphtKl357Ou-CimuCnp-CnteCjnOChj-CnjOCipdeG36rgsbdz2LjfrNmt4KCS2a_goZjfstmE37TZttO037fgsoLfj-Cyhcm1CN-9AuCluce-4KKS4LKK4KW_xrzgr6vgopngoYjgspPGkuCgiOCwqNmg4K2Y2YTgoIzgoZTaouCgkd-v4LKh1ZzgoJXZhcyJ4KCaxbXgoJzgoJ7goKBI4KCi4Ka74KC92JwK4KCmAeCgqOCkp-CgquCjmOCgruCwn-Cyucaf4KCy4LK84KmL4KC114bgoLfgspvbquCgueCgu-CyhOCzksm14KC_4KGB4KGD4KKV1IbgoYbgsrfgspXSrOCxgOCjoeCpsOCwoOCztOCyl9i04KGS4LOB4KCQ2a7fseCzh9-0MOChnuChoN2o4LC14KGl4KGnAcKa4KGp4KGr4LK0cuChruCwvuCgsMmW4KGz4LGD06DgpIrgsYbPgOChuM2J4LGK4KGY4LGM07PEjOCigsW1wqvgooTes-Cih-CiieCii9W14KKN4KKP4KGp4KeD4KKW4KKY4LKR4LK42aDgop7PguCxheCpmOCroOCsks-J4KKn4LGD4KKp4KKr4KKt4KKv4KKx4KiL4KK10KzgorjgorrgorzYhOCiv0Pgo4Hgo4Pgo4Xgo4fTtOCjieCxkOCji82f0Z3go4_go7vgo5Hgo5MC4KOV4KW61IPQk-CjmOCjmuCzsuCkruCjncSV4KSx4LO2zobgo6TgpI7aleCjp8ql4KG84KOq0ofchOCjrtKO4KOxbOCkmMSM4KO04KOK4KO24LWS4KO54KOQ1bXOrOCjv-CkgeC1nOC0jtqI4LOczb3gtaLgs7XSs-CkjMS54LWn14bgpJDgspvShuCjrOCklMS24LWw4KSXzIngpJrcuOCoteCkn-CkoeCko-Ckpdu84LSt1IbgpKzgtZ_goY7gtojGjeCxgOCks-CzoNyExbDFsuCxtNeG4KS74LKbxqzgqp3gpL_gpYHJvuClg-Csp8uT4KqmLOClieChm-Cli-CsreCljs-34Kqw4KWT4La24Kq14KWX4Ky4OjjLucyFNOClpjfgpaPLvDcxMcyF4Kq9ZOClq-Cgm-Clrsi807ngpbLNkda54KW14LOT4KW43pfgpbzgpb7goYTGvOCmgeC2n8S94KaE4KaN4K2y4LCla-Cmi8qT4Kaq4Lem4K6S4KyOxJbgppLgobXWjMig4KaVypfVitWMyq3gppvaleCmnd2Q4Kaf1aTVhdqV4Kaj4LKbwoPbkcKkMjTgpaDgpqrgpqzgpq7gprDgprLTtOCmtMW14Ka24LON4Ka64LKrxL4H4Ka-AeCngOCyscOM4KeC4KOY3IHgtoLgoYrJluCniuC2peCyltiy4KGR4KeO4KeQ4LCv4KeU1KbgsLPMk-CohOCnmsON4Kec4Kee4Keg4Kei4Kek4Kem4LSSxpLgp6ngo6Tgp6zWkcaS4Kew3ZDWncS44LGm4LSz4KOg4KaT4Ke41rvgp7ravOCnvc6Az4ngqKzgtargo6nVlNK-wqTguK_gqpnKvse-4KiJ4LWB4KiNZOCoj-CokeCok-ColeCol-Cvntuw4Kic4Kie1bXgqKDgqKLgpKfgqKTgqKbgp4bguKXgp4hr4LmOzo7gqK7SiMuy4Kiyx63gqLXgpJ3gqLjgqLrgq4bgqL3gqL_gsovgq47gqYXcj9Kl4KmI4Lej4Ku64Lms4Ku84Kuua-Cpj-CsgMii4KuZ4LenyYLgq63grIngoqLgtLfgq6ngsKTguo7gq5xrypLgrIXgq6jEq-CvhOCus-Cpn-CjoOCqi8qf4LqM4Leu4KmV4Ku24LS04KOi4LqE4LO5yJfJo-CpteC6iuCpuOCsh8-H4KqB2pXgqb3gtLbKjeC6r-Csg8qR4KqC4KqE16rgsa7gurHXhuCrsOC5suCpquCzuuCslOC5j82OyqnZsOCqktyW4Kyc4KqXyrrgrJ_guZbFh-CqnOChm-CqnuCspOClguCspuCqpOCsqOCss-C2t8i34Kqi4Kqs4Kyu4KWP4Kyw4KWS4Kqyy6ngqrUg4Kq3y6ngt4Lgu6TMh8yJ4Kq_4KaG4Lm24Ki34LSp4KuF4KuH4LKx4KuJ4Lm84KuM4KmC35rguoDRreCrkuC6g-CrlOCrpOCsj8ig4KyB4Lqb4LqUyZPgu73gq53gq5_gurXgupPgrargq6zgupbgq6bgqaHgurvguqLgrqjgvIrgvIRr4Lq_4KyQ4LuB4LyB4LyJ4LqV4LyS4Ku44KG14Lqo36bguqvgq77gqZDguovgrILeo-CpqOC6tOCmluC6tuC8pOC7vsqU4LyO4LuC4Lyl4LuA4KqM4Lyt4KqP4LKb4LuG4LKi4LuI4KqU4Kyb4KqW4Kyd4LmV4Kqb4Kyi4Kqfy4ngrKXLj-C7luC2tOCsqcup4Kyr4Kqr4La6z7bgqq_grLHgqrHgu5jgu6PLruC7puClmcuO4LeE0Lcw4LeHMeC3iTbgt4vgt43MheCtgtCw4K2E4K2G4K2I4K2K4K2M4K2O4K2V4K2R4K2T4K2V4K2X4K2f4K2b4K2d4LK-4K6T4K2hAOCto-CtjOCtpeCtruCtqOC8gnLCluCtrOCtruCtsOC9tsKW4K20AOCttuCtjOCtuOCtuuCtvOCtvuCugMKW4K6C4K6E4K6G4K6q4K6J4K6L4K6N4K6P4L214LyYxrzgrpTgrpbgrpjgrprgrpzgrp7grqDgrqLgrqTgrqbgvbbgrr3grqzgrq7grrDgvp3grofgrrbgrrjgrrrgvqLgrqrgrr_gr4Hgr4PgvqfImuCvh8aD4K-K4K-MbuCvjuCvkNGIxLfgt5ngr5Xgr5fgr5nCmeCvm9O0xI7Fg9OE4LGVZ9q64LmK4Kea24BixI7DjOC1vt6b4Legcs6g4LGe4Lel4LGAxI7DieCmjOC_kQHDitub4KSx3IngsbHgoY3gtqngp7_EjsOT4LCvxI4_4Lmh4K-g27PbtdGh27fCuMW_w7jbvOC3n-Czr-C6gdyC4Likxa7gr67gtJnaleC_iOCvssWr4K-00J_gr7bckti93JTgrJnFmOCvu9yc3J3cn9yh3KPgsILgsIncqcSJ3KvgsINf3K_EjFjgsI3EnwDctdO03LfgtKLgsJJw3L3cv9iJ4LCX3YXdh-C2nNKl4LCe4Lej4LO43ZHOpOC3reC8kOCqjuCwpuCktOCwqt604Lyo3r7QsN2g3aLgs6XdpOC0hdOI4LSH3azgsLfgsLngu7LgsLvgtI7gsL3hgKTgtJjgua3gsYLgobngtJbgs7fhgYEA4LSa3oPgtqzgob7Tst6J4KO14LGS3pDPh-CxlwHeluC1mt6Y3prgsZzguLfgsaDgurDgsaLep-CxuuCxpuC9reC3r2vgsarbot6x34nhgK7gvLHElt644L-y4LGyxoXgv53Kh-CxtuC7hNC94LG53qnfhuGBpt-KzIngsoHEq-Cyg9mL4LiVw43gsocCzJ7gsonahdCX4LKM4Lm_35zFmuCykNGx4LSx4Lih4Kmv4LOz36bgs6Lgp7_gsprhgbLVk9mr4LOC4LO_4KCU4KGayLffteCyp-CzqOGBveCzqtGi4LKu4LKwzKDemOGChOCiluCytuC0sOGCj-CkseCyu-CkiuCpsuGCkcqH4KCN4LiD4YKW4LO-4LKg4LSA4YKaxrHgsb_gs4rEq-CzjOCmuOCzjuCzkOGBvuCzlOCgp-CgqeGAoeCgreC5q-C6qeC5reCzn-GCreCyveGCr8Wn4LOk4YKUxZXMieCgut-44LOp35HgoL7goYAC4KGC4YKD4KOY4LOx4YKp4LWg4Lms4KGL4KeL4Lim4LK_14bgoZPhgrLgsp7goZbgs4XKreCyo9mz4LSC4LSE3abSlOGAt9OK4LSI4K-n4Lib4KGq4KOY4LSQ4YGA4Li4xp_gtJThgYTdvuC5h9SW06fgtJvhgYvgsYvhgY3TtOC0ocSr4LSj4KKF4LSmx43gtKjYnOC0qgHgopDhg7Xhg4TFmuC0r-GCi-GCquCnruC5heC0teCsheCpmeCzuuC0ueCiqEPgoqrgoqzgoq7gorDguIPgorLgorTYhOC1g-CiucSV4LWG4KK-4KOA4KOC4KOE4KOG4KOI4KO10Zvgo7jRnuC1leChpeC1l-C1mce-24bgo5fgtI7gtZ7hg53gtqDgpIfajOGCjs274LaH4KOl4LWo4KSR4LWtyKDgta_gpJbgo7LgtbThhLPgo7fgtZPgo7rNpuC1u-CjvgHgpIDhgZbhhL3gv4zgtoHhgKTRtOC2hOCkiOC6puCzt-GFhuC2ieCnv-C2i-GDj-C2jeCkk8aK4KSV0o_gtbLgtpPgpJvgtpbgpKDgpKLgoaXgpKQD4KSm4LibwozhhJPGvOC2nuGFgOCoqeCkjeC2ouGFoMSW4Lak4YOK0ojgtqfgpLfIl8qP4KS64KS84Lau4KWA4Kyl4Kqjy5Hgu5fgtrbgqqngvYfLn-C7neC2vOC9i-C2vsuq4Ky1OuC3geC9kTk0M-ClpDQ4NDfLuTEyMTPgt4TgpajMieC3kuCzi-C3lOClsOC3l-CltNKZ4Lec4YGW4Lee4KOY4Lei4YW84Lez4KGc4KaFxKvgrpHhgKnhgaLgt6rJu-C3rOCwo-C-keCxr8af4Lex4KOi4Ya7xKhy4LynxbXgppjgpprVkNeG4Le84KyF4Le-4LmD4Kai4KakzbYxy7c24LiK4Kat4Kav4Kax4Kaz1angprfgprngoKPhgqDDjeC4l-Cmv9S04Lid4LSO4Lif4YWd4YO64KeJ4YOh4LGn4LinybTgp49S4Liq4KeV4YOw4KGi4Liv0InguLIC4Kef4KSn4Keh4Kej4LSO4Kel4L-P4Yewa-C4us6I4Li84YSYa-C4v-CsheC5gdaf4Li94YWhzLDhhrvegOC5iOGBpeC_hOCnvsqH4Lmv06zgspzgqIPgp5ngvLvguZfgqIrgorTguZrguZzgqJJl4KiU4KiW4LCH4L-k27HgqJ3gp7bgqJ_gqKEC04_guajgqKXgtI7gqKfhh6_hgo3Gn-GInOC1q8KB4Kuxx57gubTgq4DImuCrgse04Lm44Ki74Lm74KuLyIbgq43gqYPhgofgqYfdjuC8ndaY4LqlxJbguongq5fgvKLgvJfguo3gvIPhiZHgupfgvIbhh47hiZbguqPguo_gvK7grIrguprIuuC-rOC6nuGJmuGIvuC8sOGJneGHgOC6pOGJpeC1pMmq4Lu81qzTpuCptuC8gMW24KyI4Lq42pVW4Km-4YSc4YaH4Lqw4Ym214ZX4Lq6ypbgurzhib3gp79Y4Lqg4YqC4Lyy4YOP4Ly01ZzgvLbgrJrgu4rgvLrgu43gvLzhhovgu5PgtrHgu5Xhho_gvYPgu5jgvYbgu5zgtrvgvYrgu6DgvY3hhprgu6TgrLfgvZHgu6jgt5Dgu6vhhr7gu63gq4Pgu6_hiYbgq4gC4KuK4Lm94YmL4KuQ0qXgu7rhhbzhiY_akeC6luC6mNyE4Ymz4Lqc4LyR4YmZVuGJm-C3tuGJo-GHhuGJn8afV-Crp-C8rOGJqeCusuGKu-GJpeGKheGJp-C6oeC8iOGJl-GJq-Cpp8afUuCrueGJr-CptOC8oOC6rcm_4YCv4Km64Lqf4Lym4Yq_3qLKg-GJoNWa4Ymi4YGh4YeH4Yuc4Lyv4YuN4YOi4YCq4LqX4KqQ4LuH4KyY4LuJ4Ly54Kye4KiH4Kyh4Kqd4Kyj4Kqg4LuU4L2B4YqW4KWH4Kyq4La44Kqq4Yqa4L2J4Luf4Kyy4Kq44L2O4Yqh4Kq6y47hhp7hhqDgpaDhhqPhhqXLveGGqOGGquC9nH3grYMA4K2F4K2H4K2J4K2R4L2k4K2Q4K2M4L2n4K2W4Yuk4K2a4K2cA-CtnuCtmeC9r-C9scKW4L2z4K2n4Ya_4YuI4K6T4L254K2v4Yyn4KmU4L294K214K234K254K274K2M4K294K2_4K2R4L6I4K6F4LqG4K6I4K6K4K6M4K2M4K6OAOCukOC9vOCulQHgrpfgrpngrpvhgJTgvpgB4K6h4K2MUuC-m-GKuuC8meCutFbgrq3grq_hjY7hiZjHtMKWV-Cut-CuueGNlOGLkHTClljgr4Dgr4LhjZvgq63gvq7gr4lz4K-LyrHgvrJp4K-P4K-R4L624K-U4K-W4L664L67zp7hhr1lwq7gv6bgv6Xgr6LbtsO84L-qA3rgv63go5jhirLFoOCvreC8ltK34L-2AcOO4L-43I7gv7vgoZjgr7fgv77gr7ngvLfhgILgr73hgIXgsIDcpNymxJLhgIrgsIZk4LCI4Y6W4YCPZOGAkeCwheGAk-GAlcSM4YCX4YSI4YCZ4YCb4LCW3YLgsJjgsJrgsrHgsJzgtI7hgKPhhbzhgKXgsKLgpobgvbbJluCwp-GGg9yE4YCt4YGvxL3gsK7hgLTTtOCwseGGvuC4reCho92r4LOr4YC63bHMo-CwvOChr-GIh-GBg82J4YO-4KG34LGI4LSV4LSc3obhhIXEjOCxj8Sr4LGRxbrejuGBkdqT4YGT4YGV4YS7za7gsZrgv4vgv6_RreCxneC3o-Cxn8aY4YufxbvhgZ3gsaThgZ_hiofEluGBpOGPpuGBt-GBqOGLqeGBouGBq-GOtsWt4YGt3rzhi5rev9-B4YG04LG74Y-w4LG_4YG6xKzgsqrhh6fhgoDhgoLguJvgsrPhiYngu7bgso3gu7jhgonhg4bTm-CylOGDnuGDh-GLpN-p4LO94LKf4LOE4YK24LKk4KGb4YKcxIzgsqjhgbvhkILhg5XgsobhgqLgs67gpKrgsrXhkI3hgqvhh7LhkJLgs4Dhg6bgoI_hkJXgoZfgs4bhgrdl4YK54KWs4Yek4YK-eOGHpuGQn8m14YOB4LOW4YOD4LOa4ZCl4LGA4YOJ4LO34YKu4Ye0yofhg47gubDOkOCzpsSM4YOS4LKp4KC84ZC3zajhg5fhg5nhkIbhgqbgs7DhkL3hhoDgupfhkKfhg4zCkeGDpeGDj-CyneGQq-GDqOGQl-GDrOGQmeC0g9O04KGf4YOv4KGh0pbhg7LYnOChpuGDtOGCpOGDtuC0juGDuOGOr-GBh-C0k-ChtOC0l-GDv8m04YSB4YGK4YOP3oXTsOGPkmThhIdl4YSJ4LSl4KKI4YSMbeCrhOC0q-Ckp8OI4YW54KKX4ZGT4Ke04YWE0KbhibngupLhj7Lgs7vXhuC0uuChueC0vOGEouC0v-GEpeC1geGEqOCit-GEquCiu-CiveC1iOC1iuGEsOC1jcSM4LWP4Y-V4LWR4KON4YS24YWU4ZGo4YS54LW-0arhj6HFmuGEv-GEluGQkOGFguC5reGJrdCm4YWjzorhhYjgtozgpJLgo63XruC2keGFjmTgtbXgtZDgtbfhkqfgtZThkqnOq-GFluGFmOGPneC1m-GSreGQo3LhhZzhjq_hhZ7hhobhkrTgtobgtabhkrjgtorhhYngto7hhargtpDhhY3hha3gpJnhha_gq4HgtpfhhbLhkajhhbThhbbhgqThhbjgo5jhhbvhkrHgtqDGi-GFv-GFg8af4YaC4ZGA4Kiv4YaF4Y65wpHgtqvhkbjgpL3gtq_hho3gtrPhi7rgu5nLmzrhhpPgpY3hi7_gpZHhjIHhhpnKluClluC2tuC3guGGoDLMg-ClpcyAOTfLv-GUizTLuOC3kOGGruGCu-GGsOC3lsui4LeYxbLhhrTfvuC3ncWO4L-u4ZON4Ya54ZOq4Lek4Ler4Y2z4Yys4LGoxp_hh4LGmOGHhOGOsuGHhsmW4YeJ4Kmw4YeL4Le14KaX4Le41Y7hh5Lgp7_hh5TgrIrhh5bguIDXhuC4guGRmuC4hcu9zIDhh57guIzhh6HguI_hh6PguJPhkLbJguCjkeC4mOC4muGCpOGHrOC_jOGHruGTkOGIh-C4o-GPteGQkeGDjOGHtuGHuOC4rOGHuuC4ruCnmeGHveCnneGHv-C4tOGIg-C_jOGIheGPpOCzncSW4YiJ1o3Wj-GIksSW4YiO4KyK4YiQ4LmD4ZCP4Ke34Y-N4YSA3q_gp7vaveGImsWn4Yi74LmQ4Yif4KiF4YqQ4Yii4LmZ4KiO4KiQ4Yin4Yip4Lmg4Ka14Y224Yit4Lmk2JzguabhiLLgqKPhiLXgv4zhiLfhlZPhiLnEluGVu-C5seC8lcqe4YmA4Lus4KuB4Lm31bXgqLnhiqrgu7Lhiqzgu7ThkIjhgobhirDRreC6guGKs-GLleGLkeGJkuC8oeC6ruGLjuGJnuGKtuGKvuCrs-CuvOGWsOC8jeGKgeC8j-GMqOGNleGWquGJpuGLp-GWsuCvheGWuuGSteCpseCyveC8n-GEgOGJsuGJleGJtOGJvOCqiNeG4Ym44Yud4KqA4YqDyofhib_hlrXgrIzhgangupfPieGLi-GWvOCskuC7g-GRhcqo4KyX1qzhi6_grJ3gu4zhi7Lgu4_hk7jgvL7gtrDLjOGKldqy4YqX4Yu74Lua4Yu94L2I4Kyv4ZSD4L2M4YyC4Yqf4Luly7Dgu6fgqrzgu6rgubXhlpvgu67hhI7gu7DhiYfhiq7gu7fhgojGvOGOgNS94Ymu4ZeC4LyS4Yq34Lu_4ZeG4Y2i4LqW4Yq94ZeM4Za34Zaz4LyS4YuE4ZeR4Yq_4ZiK4LyS4ZeW4ZaX4Yuo4YuA4YuP4YuCxJbhi5PgvJzhlqnRv-GLl-GJlOGWreGJu-C6t-C8quCshuC8o-GLoOGYpuGLo-GUqeGLpuGYl-GPrOGLq-C8s-GXnOCptOGXnuC7i2HhiKHhl6Lhi7Thl6TgvYDhho7hl6jhi7rgvYXhi7zgrKzhhpThipvhjIDhl7Dgu6Lhip_gvY_hl7ThiqLhlIrhlIzhhp4w4ZSP4ZSRN-GUk-CqvOGMkeGMk-C9oeGMluCtj-C9puCtlOGMm-C9quGMnuGMoMmh4K2g4K2i4K2k4K2m4L6Q4YuP4L244K2t4Yyr4L284L2-4L6AwpbgvoLhjLLCluGMtOC-huGMt-C-iuCutOC-jOGMvMKW4Yy-4Y2A4YeG4L6T4Y2D4L6V4Y2G4K6d4K2M4K6f4Y2J4K2R4Y2MAOCupeGYlOGNkOGNkuC-oeGLgeCuh-GNmOC-peGah-GNluGNn-C-quGaj8Sy4Y2k4L6w4Y2o4L6z4Y2s4K-TbuC-uOGNsOC-vMeq3Ybhlofgr6LgoKDhlojhjbkYxL_WguCvqOGUoeCnhOGFuuC_seGVluCosOGVudeHw43hjojgv7rckOC_vdKK4Y6O4Kya4Y6Q3Jvgr77hgIbgsIHhjpXcqOCwheGAjOGAieGOnOGOnsWf4Y6g4LCQ3LjhjqXgsJThgJzhj4LRouGOqeGAoOCwneGDhuGApuGBruGHheGLj-GOtOGArN2c4Y-54YCx4Y674YOP4ZGH4LCw4YC24LC04ZGn4Y-D3a_hj4Xds-GSrsa84YC_4ZGv4Y-J4ZGy4YGG4ZG0xqDgsYnhhIPgtJ3hkbvhj5Rl4Y-WyL7hj5jgsZThgZLgoL7elOGBlOCxmeGBmOC0juGPo-GFvOGPpeGPtuCxoeGRlOCxo-CsheCxpeGYr-GPruGPtuGPsOGYr-GPtOGTsdui4L-c4Zua14bhgbHhl5rOkeGPvHThgbbgsazgsb7hgbnhgp7Es-GBvuGQhOGQouGCheC5vuGWpeGQjOC4oOCoquGVsuGFveGVl-GRgsWn4YKT4ZyW4ZGb4KGV4LOD4ZCt4YOq4LSB4ZCZ4LKm4ZCb4Zye35DhlYvdguGQoeGDmuC0juGCqOGUpOCzuOGQjuCyuuGRluGcrMKR4YKx4ZGa4YKz4ZCs4YOp4KGZ4ZCYyLfhkLHgoJvhkLPgoKHhkLXgs5HhkYzDjeGQueCzl-C4m-CzmeC0juCzm-GIuOGcqMaS4ZC_4YSX4YSd4KC24LCv4ZGJ4ZCd4ZGL4Zy73azhkY7hnKLgopbhg5zhnYHhlafhkZXgv7LhgpDhnYbhkZnhnK_hnYrhkZ3hgpnhnY7GseChneGRouGboOGRpt2q4KOR4LSJ4LSL4ZKG4LSN4L-M4ZGu4Z2B4ZGwxpLhg7zhj4vhhJrgqKrhgYngobrhk7fhhITeiOGEhuCkm-C0pOCihuGSgeCiiuGSg-GKqeGEkOC0rOCjmOGEleGYg-C2oNK24LmE4Z2x4ZGz4YSb4ZKP4Yez4YOj4Ke_4ZKTzLvHoMKaRBTCq8OVwo_Dn-C1gOGEp-CitmPgtYThhKvhkp7hhK7gtYvhhLHgtY7hhZDgtbjhkqjgr6PguJbhkqvhhZngpILgv4zhkrDhnqDhnKrhkrPhg6DgoqDhkrfhmKDXhuC1qeGcluGFqOGSvNKM4ZK-4ZOd4YWP4LW24YS04YWS4LW64KO94LW94Z-G4LW_4YWb4YOG4Z-M4Zyp4KSL4ZOV4Z-Q4YWl4ZOY4YWpxLnhhavgtbHgtbNk4LaU4LSi4YWw4LaY4YWz4Laa4K-o4ZKI4ZOp4Z-K4LO44ZOsauCkseGTsOCzs-CkteC2qOGck-Cnv-GTtuGcluC2reC7keGTueC7lOGYvOCqpeCsqeGTvWXgtrnhmYLhlILgtr3gqrLhlIXLrOGGm-GUiOC9kTgz4LeM4ZSQ4LeJNDLhhqjhjIvLuOGGrOClquClrOGUmNCD4Yay4LeZ4ZSd4LKv4ZSf4KW94Ya43Y7hhrvguIXhm5XguqPgporgv5ThlK7hm5bgppHguYbSiOGUtMi54YeQ4Le54ZS4yofhlLrVmuGUvOCmoeC4geGHmcKjNjfgpqngpqvhh5_guI3hh6LgprXhnZLhlYrfu-CmveGHquCngeGSiOGVkuGdr-GVlOGdheGeqcaT4ZWZ4Y684KeT4Ye54ZGl2rrhlZ7VteGHvuGIgOC4m-GIguC4tuGIhuGWk-GIiOCnquGIi9SUyZbhla7VmuGVsOGVrOGepOGUsuCnp-CnueGImOCnvOCxpuGBiNqV4ZaVzpDguZHgoZjguZPhiKDhlb_Fh-C5mOGIpOGWguC5neGIqOC5n-GIq-GaoeCvn-GWieGIr-C5peGIseGIs-C4m-C5qeGItuGSiuC5reGhv9Ot4YuM4ZaZ4Yqm4Ze54Yqo2Jzhlp7gubrhiqvhiq3gu7XhlqTgso7hlqbhiY7hmJ_gqY7hlqzhi5nhlq7hiarhmJvhlrvgrIrhibrhmJnhlq_hmIbhi4Xhlrbhoq_hlrjhjZzgupDgv7PhjoPhmpPguofhl4DhirTJr-GXg-GRteGXheGYo-GXh-GYpeCjoM-J4ZeL4Z6m4LyH4Zik4Lyp4aOL2pXhl5Dgupnhi4bhnqjhi6rNh9eG4ZiWyKDgv7Tho5fhgaLOjOGKieGYssqw4Ly34YqO4Yux4Kyg4Zi44aCI4Zi64Yu34aCL4YaQ4Zi_4Zer4ZmB4ZSB4Zeu4aCT4Yqe4ZSG4Kq24YyEy7Pgqrbgu6nTtOGKpWXHruGin-GJhOGem-C7sdKe4Zah4YmI2ZXhkInhiYzhirHhoqrhmIXhiZnhmIfJvOGYieGJpOGWuuGYjOGjjuGJnOGiteGisOC6luGYkeGjleGiueGLh-GYj-GJmeGjm-GivuGJqOGkleGiu-GiseGYneC6p-GYn8-J4Ku_4Zii4aKu4aOQ4Zip4Zit4LqR4aOP4aOJ4aOR4aKy4Yui4aOW4Yuk4aK94Zqv4ZeYypHhi6zgvLXhi67ho6Thi7Dhl6Dho6dl4LuQyLfLhOGjquGKlOGLuOGYveC2teGjruGTvuGjsOCqreC7nuGXr-C2vuGZhuGjtSDhmYjLieC7p-GgmuGgnMyC4Yaj4aCg4L2Xy7nhoKPgvZ3UluC9n-GMlOC9ouCtjeGZmOGMmeGZmuC9qeCtmeC9q-GMn-GMnOGMouGZouC9tOGUqOCtq-GZp-C9u-GZuuGZquGMsOC-g-GMs-C-heGMtuCug-GMuOCuh-GZteC-juGMv-GZpOC6o-GZu-GNhOC-luGNh-GagOC-meGNi-GNjeGkkOGNneGNkeC-oOGjgOGNl-GNmeC-puGai-CuquGakeGNoeGmi-GaleGNpuC-seGamOC-teGamuGanOC-uuGansyKzKvhoo7guaLgr6Hhoo_hjbkixI7DoOGNvuGOreGareGckOGYruC5jOGOhcOK4Zqzyq3gr7Xhjovhmrbgv7_gr7rcmeGAg-GavOGOk-GAiOGOluGbgeCwh-GAjeGOnNyx4Y6f4LCP4YCW4LCR3LvhgJrhm4vhjqfgsobhm4_gsJvhkojhjq7hoZngrIXhjrHhhr7hjrPdl-GbmOCwq-Ggg-GhneGbnOGcluGbnuGOvuGjveGPgOGAuOGbo-CwuOGbpeGPh-C0keGhrOGPitOp4Y-M4Z6O4Y-O4YGE4Y-Q4ZG64Z6T4Y-T4YGP4Y-X4LGT4L-B4Y-b4Zu-4LGb4ZyA4YGa4Y-m4ZyF4ZOuxJbhnIfgrIrhnInhpLjGn-Gci8W24ZyN4aiD4YGq4L-b26Thp5rFp-GcleGInd-C4LGl4Zya4LG94Y-_4Zy54Zyg35ThgoHhnKLhiYrhl7_UhuGCiuGfuuGdsOGXgOGdguCxruGQk-GQquGcseGCmOCyouGcteGCm-Gct2ThkJzhkIHhnajhoZPhkKDhlJ7hnL7gv4zhnYDhqJ7hiIfhgqzhpq7guoXhkZfhnYjhnbbhg6fhnLLhnYzhg6vXlOCgl-CzieGQsuC4k-Czj-GdlOGDgOCzleGdmeGCpOGdm-C_jOGdneGWkuGdn-CznuGhm-CnjeCnv-GRhOGIneGbnuGdpuGoreGDlOGdqeCzq-Gdq-GosuGbp3Lhna7hqLXhoazhqKDhkYHhoZzFp-GdteGIneGcsOGCl-GCteGdueGRn-GCm-GRocSM4ZGj4LCy4ZWc4Y-B4Z6B4ZGqx7_UteGeheGpn-Geh-GfuuGeieGDu-GbrM2A4YGH4Z6P06rhnpHhm7Lhp7HhkbzhnpXhhIrhnpjhhI3JteGEj-GEkeGRq-GSiOGen9-g4aih4YiM4aig4ZKO4aSv4ZCo4ZKS4YSf4Z6u4Z6w4Z6y4Z604ZKY4Z624YSp4LWF4Z674LWJ4YSv4LWM4YSy4Z-a4YWR4LW54YS34ZKq4KOU4ZKs4LWd4Z-j4YWf4ae-4aG24LWl4KSv4ZOW4Ke_4Z-S4aiP4ZK74LWu4ZK94ZOc4Z-v4ZOB4ZKl4ZOD4YS14ZOF4Z-D0p_hk4jhqq_gtoDhqrHhk5Lhn43gpIrhn4_gpI_hn6rOluGTm-GFrOGfr-GfseGEiOGfs-GTosm1B-GTpOC2m-GTqOGDhuGfvOGfvuCktOGTs-GojOGTteGGiuGjqeGXpeC2suC9guGTvOGGkuGLvuGjsuGGl-GglOC3gOGgmOGMhcu3NeGUjzbQt-GGp8yD4aCgy7vgt4_hhq3hoKbTuOGgqOGUmuGGs-CltuGGteGTise74ZSg4aCv4Kio4aCx4ZSn4aeW4ZSq4aC24aeV4ZSv4aC54Ley4KaU4YeN4Yq_4aC-4ZS34Kac4Kae0Yjgt7_hoYXhlL7hh5nCpMu-MznhlYThh6DguI7EjOC4kMSr4LiS4YK94LiU4Yen4Yep4LiZ4Yer4aGX4aKY2KzhlZXhqLjhnKvhqabgp4_gp5HhoZ9k4Lir4LKC4Y-A4Ye84aGl4ZWg4aGn4YKk4aGp4YiE4ae74YOfyZbhlanGiuGhr-GSi-Cnr-CnseC5guGhteGXgOGIleGVueGkjd6w4YiZ4aaw14bhoprhiJ7guZLguZThooVl4aKH4KiM4aKJ4ZaE4aKM4Y6Z4Yis4Lmj4aKR4ZaL4aKT4ZaO4Lmq4Zyn4a2GxpLhrZjhiL3hi6fhop3ho73hiqfhpIDhoqHgubnhpILag-GkhOGXvuGQiuGYgHLhlqfhlKTho4PguqrgvJLhiZPhirjhpI_hppPhpIzhlrHhmI7hlr7ho4Hhorjhl5LhpJvhrorhpLbho53ho4DhnKnhroDeuuCsmOGJseGLmOGXjeGXieCnv-C6s-Gkk-GLnuGJteGumsqH4KqD4ZiS4Ziv4aOZ4Ke_4LyU4aOc4Y6D4aS14aS54Zix4Yut4Zed4aS94Zef4Zi24a2c4aWCy4PgpL_hipPhl6bhpYfhoIzhipjhmYDhlIDhpY3hhpbhip3hl7HhpZLhl7PhpZXhiqLhl7bho7vhl7jhiYLhlpzhl7vhlp_hpIPhoqXhlqPhnKThoqjFmuGYgt-g4a6U4LqG4aS24Yq54aaLyZbgq57hmI3horrhpJzhiaXgvIzhpJnhro3hpKHhr53hlrrhrqfhpJ_hmJjhrpLgq7fhi5ThpIvhi5bXhuGkqOGuhOGjiOGPp-GiveGYp-Gkq-GLm-GksuC8q-GkmuGjnuGLpeGvtuGkt-GXk-GjoOGcluGKiuGDquGKjOCqleGusOGYt-GlgeC8veGutuCqouGTu-GlieCqqOGuu-GrrOGljuGjs-GvgOGgluGlk-Gjt8uc4auz4au14au34ZSLOeGruuCmp-GZk-C9nuGMkuC9oOGMleC9o-GlpeCtkuGlp-GMnOGlquGZnuC9ruGZoeC9suGZo-GlsOGZn-GMquGls-GZpeGlteC-geGMseC-hOGMteCugeGlu-GZs-GNluGlvuGMveC-j-GwreCuk-GNguGmhOGZvuGNiOGNisKW4K6j4ZqF4L6c4a6G4Y2W4L6f4Y2T4aaL4K614aaR4aaP4L6p4aaW4bGJ4ZqU3KLgvq_hppnhmpfhjargvrTgr5Lgvrfhja_hpp_Onkbat96N2rvhobvbtsO9bNS14L-K4KOY27vhoavhlKzhjbPYrMSOw4_hrI7gua3EjsOQ4L-Y4L-Vw5HhqIrgsbPhq6PEjsOS4L-hAUXhraThpqXgv6fHt9u3wq7Ejhjhpqvgv4zhm6nhjoHgv7Lhr7zgv7XciAHDkeGms-CphuC_vOCvuNyV4Y6P4aa64Y6R4K-_4YCH4Zq_4LCE3Krhp4Hhm4PgsIvhgJDhgJLhp4bhjqLhp4jgsJPgsJXhgJ3hjqjhgJ_hp4_hm5HhravIteGnlOGjveGsjOGAq-GyjeGOuOGojOGAsuCwr-Gnn9OF4am04aeizajhj4TgsLrhj4bhgL7hj4jhp6jhqoDTo-GVtOGRteGbsOGqheGPkeGqh-GbtOGbtuC_guGnteGbut2s4Zu84Y-cxYfbhuGPn-GBmeGxrOGchOGBnOGchuGBnt6p4ZyK4ZW24Zyb4ZyO4bG54ZuU4Zio2pThnJThj7vhqJHgsbzhgafhqJThg5Phgp_hnZbhnKHhqZ7FlOGomuGtu-GonOGsseGfpeGppeGpk8qH4Zyu4amp4Z234ai-4ZGe4amB4Zy237bhqJXhkIPhnL3hkZDgr6rhs7bhnYThnbLhqKLhkKnhnYnhqL3hqKbhkK7hnbrhkLDhqYPhnZHhqYXhgr_hh6fhnZjhkLvhnZzhtIjhqZHhtIrgtLjhnaThrLnhqZjhgbzhnJ_hh6fgs6zhg5jhnazhkZLhsq_hnYPhiJPhkJDhnbPhqabhkZjhkJThnbjhqKfhkK_hnbzhqbHhnb7hqbXhg7PgtIrgtIzhg7fhs4PhqZDgobLhs4Xhko3hm67NhuGzieGghuGBjOGqh-GRveGRv-Gel-C0p-GemuGviuGenOGShuGqkeGimOGeo-GqluGvm-GSkOGEnuC0u0N4wprDtsKCOXjCjOGetc2d4ZKa4Z644ZKc4YSs4ZKf4aqm4Z6-4ZKj4Z-A4ZOE4YWT4auF4KOS4aqu4Z-g4ZOM4Zqr4KOZ4auK4LWj4ZOU4aq24Z-oyofhqrngtavhn5Thqrzhn5bhqr7MieGrgOGbteGSpuGrg-G1q9CJ4LW84YWX4auI4Z-i4bKv4Z-k4ZKM4KOj4bW24auP4ZK64YWK4Z-s4auS4Z-u4YWu4LaV4ZOg4YWx4LaZ4YW14auc4LSO4Z-54aqT4Keq4KSw4Laj4auh4KS24ZO04aCF4Yid4aCH4aWD4aCJ4YqU4aOs4Zep4aCO4aCQ4aOx4bCP4auu4KWU4Yaa4Yac4YyF4YagNcu3OMyEOMu_4ZmROOGgoMyA4ZSV4au-4KWv4ZSZx43hlJvgt5rhkLjhrIThs5XgpbvhrIfgtI7hlKPhn4rhrIrhgKjhorvhoLXgt6vbl-Ggt-GgtOGskeGHiuGsk-GklOGsluC3uuGHk-GsmeCmoNSU4YeY4LiD4Kal4YanOOGso-GhjuGVh-GhkOGVieGdleGpm-C4luGVjeGsr-C4nuG0m-GHseG0neGdo-C4qOGHt-GsueGsu-GBu-GsveGhpNic4aGm4ZWi4aGq4ZWm4YiH4a2IxLnhrYrGnOGhseGtjeGIkeGqleGguuGnrOGVteC5ieGhu-GasOGtmOGigc2S4aKD4ZW-4Zeh4a2d4Yij4a2f4Lmb4ZaD4Lme4Yiq4a2j4aaj4K-g4YiuxoXhiLDguafhopXhlo_hqZ_hlpHhp5LhtL3gua7ehOGinNO04Kiz4Zaa4a-I4Ze6ybXhoqLhrbfIgOGvjeGkhuGip-GQi8a84a2-4Z-K4a-U4LqW4a6D4ZiI4aOI4a-o4Zim4aK04bmD4aSt4a-34a-h4bmG4a-74a6R4a-Y4baM4bi-4a6W4ZeE4a6Y4Yua4Lq94Ke_4aON4aKz4Z6n4a-x4ZeOxafho5ThiaHhpLThmKzhl5TaleGknuGyjuGvueGXmeGIneGwgMqu4aS84YqN4aS-4a6x4biW4a6zZeC7kuGLtuGlhuG2q-GYvuGwjOGjr-GuvOGGleGKnOGMgeGlkeGwkuGvguCqueGjuOGKo-GXt-GJgce04YmDxLLhkoThoqPhlqDhuLfhs7LhpIfhnKXhmIHhpIrgqYvhlrThpKnhlr3gup3hpJHhrojhr5zhro_GkuGkmOG5neGvuOG5iuG5ouG5jOGxk-C6h-GkpOCpsOG5j-GJsOGvreGireGumeG5h-Gvs-GksOGkrOGvtuCsi-GLnuG5n-GkjeG5o-GuquGKiOGvv-GjotG_4Zi04YqP4bmt4bCH4bmx4a634bmz4bCLy5nhsI3hl63htrDhrr_hubvhoI_LjuGllOG5vsuc4ba24ba44ba64ba84Yai4ba_4bCd4aWg4bCf4aWi4ZmX4L2l4aWm4L2o4bCm4Zmd4aWs4bCq4Yyk4bCs4L284bCv4bC-4L6S4bCy4Zms4bC04aW44bC24L6H4bC44Yy54bC74Zm34bC94Y2B4L6U4Y2F4L6X4aaH4ZqC4aaJ4bGH4aaP4aaN4bGM4bqf4aaQ4ZqO4bGN4aaV4L6r4bqf4aaY4Y2n4K-N4bGZ4ZqZ4bGc4L654K-Z4aagxI5E4bKB4Zqk4L-ow7vgp6HDkuGyieGpn-GcgeGyjOGaruGjneGhveGykMOQ4bKT4aa1zZLhjozhmrfhspfhmrnhspnhmrvhjpLhspzhgI3hp4Dhjpnhp4LhsqLhjp3hsqThgJThm4jhgJjhp4nhjqbhsqrhp43hsqzhjqvhp5Dhm5LhsrHhu6Dhr7rhjrXhrLTCpOGytuGzpeCwreGAs-GbneGAteGRpOC0huGbouGyvuGbpOGzgOGbpuGTjeGyi-GpveGbq-C0leGnq-GDn-Gqg-Gnr9K_4KKA4LGO4aez4Zu34bOQ4Y-a4Zu74LGY4YGW4bOX4ae64bOZ4bqq4Y-o4bOc4Y-q4bOe4aiI4YGj4bOg4LG94bOi4YGs4ZyS4by94LG14bOo4YGf4aiS4bOr4Zyd4bOt4bSj4bOv4aiX4ZCF4YKk4ZCH4bi44a-P4bi6cuGoneG2nuGIh-GppOGDi-GdhuGzu-C1q-GpquGCtOGQluGpreG0gOGoqeG0guG9suGcuuGor-CyrOG0heG9t-GRkeCgguG3smvhqLfhnaLhtZThtIzhqLzhkZzhs77hvojgoJbgoZvhnZDgs4vhnZLhqYbhoZLYm-GQuOGpieG0meGpjeG-lOGdoeG0rOG0i-Czo-GdpeG0g-GdluG0peGRj-G-keGDm-G-lOG-gOCzoeGdtOG0sOG-nOG0suG0keG0tGThqbLhjr_hsrzhvYThh6jhnoLhtLrhka3htLzhrazhqb_hvY3hno3hvY_hp63hhILhs4rhp7DhvZPgtKDhqonhkoDhtYrhuobhqo_hqbjhkofhnp7htZDhn6XhqpfhpJThqpnhnqrhqpvhnq_hnrHhnrPhtZ_gtYLhkpvhqqPgtYfhnrzhkqHhqqjhk4Lhn5vhqqvhk4bhn4Thta7hrIXhhZrhqZ_hn4nhvb7gpIbhqrLhk5Phn47hn6fgo6bhq5Dhtbzgo6_hq5Phtb_htanhtoPhn53hk4fhn5_hv7Thn4fhqZ_hk4_huKnFreG2i-G0q-GStuG_vdqV4YWm4Z-T4aq74ZOa3Jfhtb7hk57htpbhiYLhk6Hhtpnhk6Xhqbjhk6fhtpzhq57htqDhkZThn7_hkJDhoIHhk5Lhj6fhhonhgYvhhovhq6fhk7_hsIrhoI3hq6vhu4Hhrr7hlIThq7Dhu4g64bCa4YyH4Yan4oC7y7g34au24L2U4beB4LeT4au_4KWx4ayB4aCq4ayD4aix4ayF4Ya34beN4aCw4L-Q4beW4Ymq4beT4YeD4beV4ayP4aC44YeI4biL4Le04ayU4ZS14KaZ4aC_4ayY4Le94aya4YeX4aGG4bejzbYz4ZST4bem4aGM4ZWF4aylZOGsp-GNtOGhkeG3rOG-juG3ruGhleC4m-GVkOGpn-GhmOGpouG4quGss-G-l-Gvud2fE-G3t-G9gNO04be5xKzht7vEhOGVn-C4s-GIgeC4teGthOG9nuG0quGVqOGhruGVq-GIjOGhssi14aG04biK4ayS4bWB4a2T4ZW34LmL4LGH4a2X4KiC4a2a4aKE4biW4a2eb-GIpeG4m-Gii-G4neComOG4n-GikOG4ouGikuG4pOGCpOGiluGWkOG-lOGtruG4rcSM4biv4aKe4bix4aKg4biz4a224Ze94aKm4b264a284bi84a-T4aKrxpLhuYDhpI7huYLhuY3huYThnqfhuYrhpI3huq3hupLhi4nhlr_hiobhronhupPho4Hhr6rhuo_huZDho4bhuZLhs6XhuZTKh-G5luGkruG_n-Gun-GjkuGJvuGKgOGvoeG6suKDmuGKhOKDiuGvveGkuuGKi-G5qeGwg-GYteGwheG5ruG5sOC8v-Gjq-KAsOGuuuG5tuGwjuKAtOGZhcuw4Luj4bm94Ze14aO64Kq-4a-H4bqD4a-J4aqN4Ze84aKk4Zai4b254Yqv4a-Q4bqN4KuT4a-r4oOJ4oOS4a6O4oOMyZbhpJLhuZfhpK_huYrhupnhpLPhupvig4HEluG6neGiv-KEkmvhuqHMsOG6o-GvrOCnv-GvruG5geGkquG9n-GvsuGitOG5meGYquG5ntia4a6Q4a6p4bqv4oOj4bCB4oOl4Ly44bCE4a6y4bq64oOr4bmy4oOt4Zeq4aWL4bm34ZmD4aWP4Luh4oOz4ZmH4bCU4YyGMuKAuuGGqOGGqOKAveKAv-GMj-GZlOGwoOGlo-GMl-GZmeG7l-GZnOC9rOCtn-GlreGwq-Glr-G7nuGlsuG8t-GMruC9v-GltuGZruGZsOGluuC-ieG7qeGMu-Glv-GZueGZpeGxgOGZveG7sMKW4ZqB4bGE4ZqE4ZqG4bGN4bu24ZqK4Zia4ZqM4bGP4bu74Y2g4bu94oWr1pnhu7_hpprhvILhppzhvIThmp3Ontuc4LiR4ZaI4Zqj4Y244L-ow7zCrsOMxprhmqnhkLzgr6zhso3hvJXVhsOP4byZ4Y6K4byb4aa34Zq44YCB4byg4YCE4bKb4Zq-4byk4bKf4bym4bKhxJbEmOGbhdyz4byr4aeH4ZuJ4byu4aeL4byw4LKs4aeO4byz4bKu4Z2e4LCh4YCn4aCz4oGP4aeX4bK14ZuZ4b2r4KeO4aec4amW4b2B4amz4aGi4bK92J3hsr_hgLzhs4Hhsorhv4jhg4fYrOGnqeCxhOGepeG4jOGziOGPj-GbseGzi-G_kmThs43gv4Hhm7jhp7bhvZnhm73hvZvhm7_gv4zhvJLhn4rhnIPihKDhj6nhnIjhj6vhvaThqIXhs6rgsa3hvaThnI_gs7Phj7fhgaDhhojhvazgtozhnJjhva_hgbjfjOG-sOG3reGBv-G9teGomeG6i-KEguG9vOG-tuGpkuCymOGCkuG-uuG0j-GctOG0s-GoquGorOG0ouG-jeG-peGCoeKBiOG-tOGcv-G-lOG-luG-rOG0nteG4ai74bO84bSO4ams4b684amu4YK44bST4b6h4bSV4amH4bSX4b6n4LOY4ZKI4amO4oCN4oa9yZbhvqvhnqHhvq3hqZThvq_hvozhgb7hvrLhtKfSpeGpoeG_uOG4quG-t-Cru-GRl-GpqOG-hOGzveKHtuGdjeKIjOChnOGpsOG-v-G0tuKGtuGRqeG0ueGehOG0u-Gnp-G4quGei-GnquG_jOKGveG9kOKHheG_keCxjeG_k-Cig-GqiuG_luGem-G_mOCikuG_muC0juGqkuCykuC0suG_neG1k-KBueCipuGEn-GEoeC0vuGEpOGRmuGEpuG1oOGet-GeueGSneG_quGqpeGeveGSomThkqThtoHhq4Lhn5zhqqzhq5nhn4XigInhn6Hhv7bhtbPgtoXhv7zhto7hkrnhhafigJbFruGFjOKAguCjs-KAhOKJpeG_seGrhuKAiOG3iuGTi-CjmOKAjOKBteKAjuG_uuGrjOGFouKAkuGTl-G2kOGTmeG2kuKAmOKJtcSM4auV4ZG-4auX4oCe4bab4L-M4bad4omN4KSv4ZOt4Lmt4oCm4Lag4oCo4bak4aul4bao4YaM4aCK4oSz4bat4ZO_4oOw4bm54Zew4aCV4buF4ba04aO44KWb4au2zITMgTUyzIXgvZvMheGgpMSM4ZSWZeClreKBg-GgqeGUnOKBh-GgrOGGtuG3jOC_jOG3jt-g4beQ4oaq4beSxpLhlKvFreGUreKBk-G3l-KBleKCkuGgu-KBmOGgveGUtuG3neGUueG3n-Gsm-G3oeKBoOGVgOKBouGGpzLht6fhlYbhrKbhlYjhrKrhvqThlYzigbDhlY_hrLDhtKngpLHigbfiiITht7Xhh7XigbvhlZrhrLzhqbThrL7ht73hrYDht7_igofhuIHhoazhuIPgp6vigozhobDguL7huIjhlbHhtozhrZHhrZbhkbXhlbbhrZXigpfgp7_huJHhlb104bCF4oKd4oKf4aKK4ZaF4aKN4oW74Zqix7LhlorJteGWjOGilOKCqeG4puGTjeG4qOKKgOKImOGtreG4rOGtsOG4ruKDucex4oO7xL7huLTigrbhr47ihIHhvbvigrrTmOKEmuGWuuKCvuCpt-KEn-KDhOG6leKEiOKDiOGui-Guo-KDi-KMsuKEp-GkoOKDhOKDjuCru-Gjhcag4aOH4oSf4oSj4oOf4oOV4b-e4a6e4ZeI4o2B4bmb4oOc4bqu4oSm4bmawpHihJThpKDig57hmLDho6Hhrq3hmLPhrq_ig6fihK_hipLhurvhsInhq6nhur7iiqHhpYzhubjhmYThpZDihLrhr4HihLzhuoDhr4bhuoLijKDhuLLHuOKDveG6iOKDv-G6iuG4ueGtvOGvkuKMqeKCvOC8quKMreKDh-GNj-GJpeKEi-KDl-GYk-KEluKEj-G5iOKNuuG6n8mW4o2N4a-n4oSW4oSY4ZiE4oOP4bqk4oSc4bqm4bmT4YuhyLXihKLig5nhuqzhmKvijYrijbPho53ijY_hr77huabhurXhgIDihK3ijZXhurnhmLnhsIjhl6fhrrnihLThu4XijZ3ihLfhsJDhu4TgrLbgvZDhjIUg4oqq4ayhzIU14oqu4oqw4LeO4oqy4aWfybThpaHhmZbhsKLhu5XhsKTihYrhpanhu5nihY3hu5vhjKXhpoHhiarhmabgvbrihZPhu6Lhma3hsLXhmbHhu6jhpb3ihZzhsLzhpoDihZPihaDhu6_hpobihaPhpojCluKFpuGxiOKFseGaiOGmjuGxjeGajeGNmuKFruGakuGml-GxleGNpeG8gOGNqeGNq-KFtuGNruG8heCvms6eUeG8iuKFvuGyhOCvpcO24byQ4ZSi4aat4aCA4oaI4Y6Fw5zihovhmrXhspbijpjhmrrihpLhmr3hjpTihpXhgIvhsqDhjpvhvKjgvKvihpzhjqFk4Y6j4ZG-4ZuK4bKp4ZuN4YG_4oakzKDhjqzgv4zhp5HijJnhm5Phj7jigY7ii4TGn-G8ueGggOG8vOGvtOG8vuGyueKIs-G_g92t4b2G4oa54b2I4bWx4b2K4aqT4am-xJbihr_hgYXhqoHigpPhtYPhtqbhtYXih4fih4nejeG9l96S4oeN4bOUza3Fi-G9nOKHkeGtheKHleG9oeKHl-G9o-GXk-KHmuGoh-GXk-KHnuGQkOKHoOGTtOGojuG1uuKHpeKHm-GcnOKHqOKIn-GQg-KHrOGzseGco-KMpuGtvOG9veKKlOKIpuKHsuGSkeKHtOGopOGpq-G-h-KIi-G-ieGdu-KHueKHqeKBruGBv-G-kOGpuOG9uOGTjeGotOKIpeG_icSW4oiD4oib4oiF4Ke_4oiH4oir4oiJ4pGd4bSQ4oiv4b6g4YK74b6i4bSW4Z2W4bSY4oiU4oaF4oan4oya4bSc4ZWW4bSt4bO54YON4oie4ZGK4ama4pGj4oih4pGR4Z2t4oex4be04b6Y4YOk4oe14oiK4pG14pGf4oiw4YOu4oa04b2D4Z6A4bS44Z6D4YO14am64ZON4am84pCm4YiH4oi74oeA4Zut4bOH4Zuv4oeE4b-Q4b2S4omC4aqI4omE4b-V4ZKC4b-X4Z6d4omL4b-c4baM4KKh4o6M4bmY4ZGX4Z6r0rHhkpXiiZXhv6bhtaHiiZvhtaThv6vhqqfhnr_hqqnhn4Hhq4TgtZbhv7Piibzbh-G1sOCiluG_t-KRluKKgeGri-GfpeGrjuKJsOKAleG2kdKJ4aq94oqL4ZOA4om34b-w4auF4baG4ZOJ4pOI4b-14ZON4om_4pGqZeKAj-GEmeGrjeKKheGfqeKKh-Gfq8Kj4Z-t4LaS4oCa4Z-y4baX4Z-04ZOj4Z-24YW34Z-44oCj4oqW2KziipjhnKriiprhq6PhtqXhiLzhl6PigK7hur3igLHhi7zihLbhoJLhtrHgtr_htrPhq7Hho7jLvDbihL4w4LeN4KWi4belN8u94au84aCl4oGC4beD4ayA4beF4ayC4Leb4oe_4pC34ayG4aCu4oGL4ayJ4oGN4ouJ4oar4ayN4beU4beR4KmU4ZSw4oGWyLjii47hh4_ii5DhoYDFp-Ghgsi14aGE4ouV4ayd4oGh4LiG4aCbMOKLm-KBqOKBquGsqeGHpeKBreKHveGHqOG3r-GhluG3seKLpeCxgOKLp-KRruKLqeGhnRNf4ous4be64ouu4be8zJrii7HigoXhlaPhqZ_hlaXhnILhnbDii7bhuIXhnqPigo7CpeKCkOKLueKAkOGUpeKSpc2G4oyB4biP4ou_4Yib4oKZ4aKC4a2b4oKc4biY4oKe4a2g4bic4ZaG4oyO4aKP4a2l4oKm4a2n4oKo4am44oKq4bin4oKs4oyc4ZiX4a2x4aO-4oKy4a204oK04a-L4a244bqJ4pGS4aib4L-w4oSE4o6G4Yml4oys4a-X4o2_4o6L4bqp4oyv4oy04bqW4oSJ4o6L4bmj4oy54Zie4oSF4bW3zYbijL7huqfhuaDXhmPijYPilpzhrqXKh2TijYjhrqTPiWXig6HhkpDhuaXgtavhuafCpuGwguKOmeG6uOGlgOKDqeGuteKNmOKOnuGjreG5teKEteKKo-KNn-KEueCstOKNouKOp-G5v-GvheKDuOKNpsSz4oyh0Irijarhr4zijaziloXhs7ThpInilojijLvhorfihIfhr6LhupfGn2PijLDil5HilpPGn2Throzijb7ij5bhiaXilqjhi4zijbXhlrnguodf4oy64LqF4oy8xafihJ3igr_ijL_ijo7ig4Xijo3ijYXijo_ihKXgt6jhurDijpPihKnhrqzhpLvhrq7huarihK7ijpvgu5Hhi7XihLHhurzihLPhpYrijqHilIThq63hu4PijaHhsJLhu4fgu6filIvilI3ilI_gpZ8yOOKUkuKOsOKOssaT4o604bCh4aWk4o634Yya4aWo4Zmf4bCn4bua4L2w4aWu4Yym4oWR4o-C4Zmp4Yyv4bCz4aW34Zmv4aW54bC34oWa4o-J4L6N4o-L4oWe4aaC4o-O4aaF4Zm_4o-R4buywpZf4aaK4bu4Y-GaieGmj2Tiha3hu7hl4oWv4aOA4oWz4bGY4o-j4bGb4o-l4oW44L69AVDij6rhpqbhvIzDsMOQwrDij6_htbHhqbzhjoLhpKDhvJbgv54Bw5vij7bhspXhjo3hvJ7ihpDgr7zhvKHihpPij73hgInhvKXhjprcruKQguG8quKQheKQh9y54oag4pCK4YCe4LCZ4ZuQ4aas4bKv4pCT4LGm4by34ZuX4oat4aeZ4oav4Ye14oax4LWr4aee4pCe4pKZ4YC54pCh0p7hgL3ihrviiLnikavgsYHhtL_gobbih4Likqbhp67iiYDikqngtJ_ih4jhvZXhs4_hj5nikLThs5LhvZrhrIXikLnhvJHikLvhr7Hih5bhqIHih5jikYDhvabhgafhvajhlZbikYbhq6PikYjgo6nhqJDhva7ikYvhs6zikofhs67ih6rhs7DhtIbigrfikZPhs7XilYXhkZTiiKfhqLnhvoLikpHikbTih7fhvr3ikaHikY7hs6_ikaXgsrLhvpLRreKRqeKTjeKSgOKRrOKRmM-J4pGx4LmQ4ois4pKS4pq54pG24oiO4pG44oiQ4oug4KW24oiT4Z2a4oiV4b6q4puG4bSf4oG94ZGI4pGi4pWA4pKK4pqu4L-M4oik4puD4oKJ4aq04ouo4pKP4Ke_4oiq4puJ4pGz4Zyz4oiu4pKU4b6-4b-A4aeg4b-C4pm94auZ4b-F4oi34b-H4pqD4puEa-KSouKQquGzhuKaiOG1guKSp-G1hOGekuKHh-G1h-GeluGEi-GemeKSr-G1juG_m-KasuGti-KTpeKSpOKEjOG_n-KSt-G_ouGqneG_peGqoOKJmeGqouGeuuKJneGSoOKTgeG1qOKTg-G1quKAhuG_suC1mOG2iOKJq-G2iuKKguKTkOKTp-G1uOG_v-GFi-KTluG2lOKJtuKcm-KAheKJpsS-4pOc4pyg4pOg4oms4pqz4bW10b3hhaTKh-KAlOGquuG2keKTq-G2k-KTreKKjOGTn-KAnOG2mOGfteG2muGft-GrneGyr-Grn-G2oeGyjeGrouKZt8qH4pO94KOp4ban4a604oqe4baq4oqg4oCy4aCR4piD4oC14pSI4oC34pSNy7_gvZfhhp7LvuKUjuGZjuGrtuKKs-C3keG3guC3leKUmOCls-KBhuKUm-KKvOKBieKKvuGpn-KLgNOY4ouC4pCV4pSo4ouF4bGy4pmz4beY4aG34Kiv4aC84pSt4oGa4ayX4Le74ouT4oGf4pS14ouXwqThoJvgpZvilLrhoY_guJHigazhgb7hrK3hlY7hqbjigbLhk43igbTik6Lim6LilYfhnKrikoPih7PilYrilYzht7jhoaHdqOKLr-KVkeKChOGhqOKChuGVpOKQu-KbouKVmeKLuOKciuGIjeKLu-Gtj-KUquGIluG4jeGhuuGVuOKVpuGVuuKVqOG4k-KVquGlgOKMieKVruKCoeKVsOGsqOKFvOKMkOGtpuKMkuGtqOGItOGtquKRv-KbouKCreKMneKCr-KMn-KXhOKNqNW24oK14oO-4aSF4o2t4oK44YmN4peN4pel4a6C4o6J4paS4oy24paO4bmF4oSW4oOF4Ymi4paQ4ZeX4p-U4o224Za_4pek4ZCR4pemybnil5DijYDilp3gp7_ilp_iiZDin6XilqLFp-KWpOKWkeKWquKNi-KXnuKfnOKfr-G6s-KOluKNkuGjo-KXuOKOmuKWsuGXo-KOneGuuOKWt-G6v-KDr-KAs-KKpOKNoOKWveG5vOKNo-KXgWTho7zilb7ig7rin4jhhI_huLXgu7Pin4zil4rhpIjgu7nhuo7il47hrofil5DhuYril5TiiZDhuYril5nin67il5bin5XGn-KfseGmr-KfneKXocmW4pej4paX4paJ4Ku94bql4p-k4per4peV4p-q4pea4a6k4pap4bmk4a6r4o2R4pe24o2T4p-44pax4LuO4bCG4o6c4pa14p-94Zep4piA4Lub4qCB4pa74aO04piG4o2j4p2b4LiIzIPguIjgpqfgt4454p2i4piR4YCT4ZmV4piU4oWI4buW4Zmb4o664oWM4Yyh4o694bud4Zm64buf4pih4oWV4pij4oWX4pim4bun4pio4L6L4o-K4bur4o-M4but4Zm84o-P4piw4oWk4K2R4pi04bu04bGN4pi34o-Y4bu44pi64bu64pi84pi-4o-e4K-I4ZqW4byB4pmC4Y2t4Zqb4bGd4byGzp5P4pmJ4bKD4K-kwrjDkcO_fuKZj-CiluKVluG8k-G8uuKPs-GykMOa4pmY4aa24o-44aa54pmd4o-74aa94bKd4Y6X4ZuC4pCB4oaZxIzikIPgsI7ihp3hsqbihp_hsqjhm4zimazhjqrikI7hvLTimbDhvLbhsrNr4pCY4oCn4pCa4b2f4pCc4ay54bK64aeh4pCf4oa44pqA4oa64amf4pCl4KKa4pCn4pqF4b-L4oeB4b-N4YSA4pCt4pO-4pyA4pKq4pCx4YGQ4Zu54b2Y4pqT4oeO4pqV4oeQ4pqX4b2e4pqZ4pC94pqb4pC_4p-z4Y-t4pqe4oec4pGD4bOj4pCU4pCb4oej4YWn4pGK4Y--4b2x4pqq4b2z4pqs4pGQ4pue4oSA4paG353iko3ikoLiiJzhs7rimrfim6rhqYDhvp7hvorhgp3imrzimqzimr7hgqXhtIfinIngua3ika3inpTio6vFp-KbiM2O4b6F4Z2L4bO_4qOw4oiN07ThgrriirbikbniiJHikbvim5PhqYvim5Xio7jgoLHim5fhvq7htKDim5vZjuGpneKjpeGTjeKboOGCjOKRl-KSjuKJkeKSkOKRm-G-huKjruGoqOGdu-KIseKbruGyu-KGteG_g-KIteKSm-GRq-KSneKZkOKGvOKbouKbueG9juKIvuG_juGRt-Kbv-GqhuKcgeG_lOG1ieKSruKJh-KSsOC_jOKJjOKkmeC5rOG1keKksOG6qeG_oMqH4pK4bOKSuuGEo-KSvOKJmuG1o-GqpOKcmOG1p-KJoeKTmeGfguKThuKcn-G1r-GqsOKcouKTj-KSs-KTkeGfkeKcp-KJs-KcqeKcvuKTmOKcrOKJuOKTm-Grh-KllOGrieKlluG1tOKJruKctuGqt-KcuOKlm-KcvOKKiuKcquKcv-KAm-G6g-KAneKdg-KAn-CikuKAoeKKkuKTtuGfveKdieGaruKdi-Kjm-C2quKKnOKdkeKUgOKdlOKUg-KWuuKEuOG2suGjteKKqMuN4au04KWl4Kao4aGKzIThhqXhq7ThoJrilJTiirTinaXhhrHigYXiirrinarhgqPilJ3igYriir_igYzhlKbilKfhuZ_ii4bgoZzigZLhsrLhrJDii4vht5ninbnilKzgt7finbzii5HhoYHinb_hlL3gp7_hlL_hnK_guIXhh5vLtuKehuG3qeKeiOG3q-KeiuKVguKBseKLpOKfgeKLpuKkkOKLquKemOKbmeGsuuKemuCnl-KVkOCnm-KVkuKen-KVlOGTjeKii-KHk-KVmOKCi-CnreKVn-GVreKeqOKCkeKmqOKVouKClOKMguGyj-KMhOKesc-s4p6z4qC54p614bia4oyL4a2i4oKj4pWx4aak4bihxaXhuKPhlo3inr_hopfipI7JluKfg-KVvOKMnuKXg-G6hOC4sOKMo-Kfi-GtuuKgksWa4oyo1IrijKrguofilovhroXil5zihIbhrp3il6Dhorzilo7in5rin5jioLHilpbhpKXilpjguqzhupHijorhrqDFp-KfqOKog-Koj-KNhsKR4p-t4a-g4o2J4pex4pan4qCx4o6U4oSq4bmo4pe34oOm4qC44YqR4aOp4p-84pSB4oOu4pa54qGB4qaG4bCR4o6h4oO14a-E4oO34qCI4p-G4qe04bqG4qCO4a254pqv4qOn4a-R4qCU4p-R4qCW4qiO4qCj4qiF4peT4peV4qCb4qCv4oy14p-e4LqH4qCh4a6o4oy44oSW4qCm4qiL4qCo4paZwpHil6jijbTiqJThuqzil63ho4ril6_hr7jijpTiqJzil7TioLTig6TiqKDilrDho6bioLnig6nil7zigK7ioL3hubTin7_iqKjinZbhu4LhubrimIXijqHimIfhiqLipovipo_ipo7gpqjMgTnippLhu5DijrPhu5LijrXimJXhjJjijrjioZTimJnijrvioZfimJzihY_imJ7ioZrihZLioZzhmavij4Xhu6Xij4fioaLhmbTioaThmbjijr_horvhpoPihaHij5DioavgrYzioa3ihafimLbimLjhsY3iobPij5viobXij53hu77ij5_iobnij6LhsZriobzhpp7iob_imYZS4bGh2rnhsaPaveGxpWLDkMKc4bGp4LSOzIzhvZ7hoLLhkZTEjsOa4bGy4bGv4pmW4bG24qq1AcOc4qOZ4oeh4KS54Y6Fw6Lhsb5N4qKC4b-x4L-p4qKG4Kel4oaE4qetyI3imZLhmJjimZTKh8SOw5niopHiho3iopPhspjiopXhprzhvKPimaHihpbimaPgsIriopzhvKnhp4XioqDikIbhsqfhp4rimavhsqvima3hsq3ima_ikb_imbHipqDijpHhsrThmq7ioq_igKrhm5vhvL_hp53ihrPhv4HipKbim7HhvYXhp6ThvYfhp6bhg7nhs4Tior7inIzio4Dih4PimorikqjgtJ7hgY7gtbbio4fih4zio4rikLbhs5bio43hk43ih5LfoOKHlOKjkOGqs-GogNWa4aiC4pqd4LGr4b2n4oed4qq_4pGH4b2t4YG14pqo4qOg4Z2n4pKI4pWA4pqt4oiA4oyl4qi3zrjio6nhrLTinpXikZnio6zipJ7ipIHhvp3ZtOKau-KjoeKHvN-84pSc4pq_4qO34qa_4LGA4qO64aqU4pWJ4qO94qOt4ai_4qSh4bSS4qSF4amE4ayq4b6j4pS_4KCl4YOC4pG94bSa4qeu4Z2g4qeB4ZGD4pKG4qyi4pqr4pKJ4qSV4qym4amf4qSY4oG44oqD4oG44qWD4amn4q2A4qSC2bTipKPimbzgoaThkajim7PikpziiLjiq77iiLrimobikrTinqvirIPhv4_ipLTih4bikqrinILiiYXipLnhtYziiYjgopPinIjirLrip5Pim6PhtYDiqJPirL7CkeKlheKlh-GSl-KJl-GSmeKliuG_qeGEreKJnuG_rOKTguG_ruGqquKlkeGEuOKTh-KUneKTn-G1seKTjOKkvuKTo-Kco-KlmOKcpcWn4bW54pql4omy4pOV4bW94pOX4baA3ozhv6_iro3hn57htofipaThtonikb_ik6Tirbvhto3ipaniqY3inLnhtbriibLipa3hn5fhq5TinYDipbLinYLik7LinYTik7TinYbikb_inYjigKXhtqLhoILinYzFp-KdjtK84pO_4ZO64o2a4pSC4Zer4piC4qmo4oql4oC24LeCMeGGozA24aCf4pSMOeKvlOKUjOKdouKdo-KKteKKt-KUl-KBhOKUmeKdqeG3iOKUnNuG4qac4p2u4qae4YeD4ayL4qamxJbipqLii4jipqXigZTgt7DilKrhh4zht5vilK7igZzhh5XigZ7iprDKh-KmsuGpqeCmpeG2uTPiprfii53ht6rii5_irYjhoZThrK7ilYPhh63hvpTinpPirL3im6XilYrigbziq7Xigb7ip4bhh7vip4jguLHip4rhrYLinqDilZXinqLgpLHinqTip5LinqbilZzilZ7inqbhrZDhobjhiJfhj6_ip5rhjoTigpjguIPijIbijIjilazijIrhraHigqLhsoHip6jguLDijJPhraniq4zhqY_imoTip7DiqYfgqLHip7LhuLDioIvigrPijKLin4rijavioJDhs7Pip7nhuLviqLnin6Hin5LioJfiqIjioJrisYXiqJjiqIThorHil7LihJXilo3ilaDip73iqI3hr6_il6ril67in6vCkeKDluKSteGqmOKXq8-J4bmc4oSQ4oOd4bqv4ZeV4qmY4quu4o2Q4bq04p-24bq24o2U4qii4Yuz4qik4qC84qim4o6g4qGA4qmn4oOx4qCD4oqm4Kq74qCG4qiv4qCJ4a2z4bqF4aSB4oyk4qOm4peL4qCT4p-Q4rGC4qi74rGR4rGJ4ZiL4qmA4o274qmC4qi94aKx4o6B4rKB4LyS4o6ExabisY_hmKHisoDiqZHil6zhuZjioKzioJ3iqZfil5_hvaTijpXilqzijpfhurfiqZ7iqKPhpYPiqaHhmLvil7_ilrjimIHipoXijqTiqarijqbhmYnijqjir47MgOKvkcu24oS-4q-Vy7bgvZTioY7imJPihYfhsKPimJfhu5jioZbhmZ_ihY7hu5zihZDiqoPimKDhpbTimKLhu6PimKTihZjimKfhpbzioaPimKrioaXimKzij4DimK7hsYLhu7HihaXimLXiqIHhpoziqpjhu7jij5rhppLis5DhjZ7iobbiqp7iobjhsZfiobriqqLhpp3iob7ij6fimYbUs-KCpOKFveKZiuGyhOG8jcORw77DgOKiidSG4KeU4oaG4byU4Y6D4quQ0LHDmOKrlMqt4byc4aa44quX4aa74byi4oaU4qub4o-_4oaX4qKbxJfhsqPiq6Himafiq6ThvK_ikIvdg-G8suKip-KGpuKwseGysOKGqeKdsuG5n-KireKKmeKrseKHouKGsOKrtOKGsuGOveKtouKQi-KQoOKru-KQouKrveGbquKrv-GDveKIveKtrOKaieKtruKQruKjhOKajeKjhuGntOKakeCxluKQteGnuOGPoOKsj-KamOGnveC5reKslci14qyX4qOU4b2l4qyZ4pqf4qyb4b2p4aiL4q-AwpHimqTNjuKapuKsn-Kjn-KRjeKstOGoluCyiOKkluKgkeG6jOKHsOKtjeKVoOKwh-KknOKRmuG0jeG-m-KIreKjr-KssuG-i-K1heG0hOKst-KjtuKIgeK1jOKbheKkm-KtnOGdh-KtnuKsseGpguKthOG0lOKthuKRuuKHquKRvOKblOKRvuK0i-KbouKImuKju-KRr-KtkOKkkuKjs-KtlOCzreKSi-G0qOKtueGqs-KatOGsteKShOG0r-Ksr-G0seKSk-Kkg-KSleGdveG9guGDseKrueG_hOGpt-KJieKkq-CiluKSn-Kiu-KSoeKtquGqguKksuGekOKtr-KJgeKajeKtsuKSreKcheKkuuKch-KSseKjuOKlgOKIveKlguKcj-G1luGqnOG_pOGqn-Kug-GqoeG_qOKcluKuh-KljeKJoOKJouKuoeKujOKTheKujuKlk-KJqeKTitSG4q6T4LOz4q6p4aig4qWZ4aq44qWb4q6d4oCB4qWv4qWf4q6L4pOE4baE4YWV4om74q6Q4oCK4pyy4qWm4omt4pOm4omv4oqG4omx4py74pOs4ZK_4oqN4KSc4pOw4auY4LiW4aub4p2F4oCi4p2H4oCk4aqz4pO54LO44pO74rS94q-C1Jrir4Tiip_ir4bgpYjinZXhtq_isa_hq6_inZngt4LhhqPijq3hlJPigL7hlJDcm-GUj-C4h-Kmk-KdpOKUluKdpuKvnOKdqOKmmOKvn-Kdq-KTiOKvouKPsOKUoeKmn-KLg-Kds-KUpeKBkeKrreC3qOGUseGIlOG3muGsleKvseKdvuKBneG3oOCineG3ouKLl8Kjy70x4q-84oGp4oue4pS-4qa74oui4p6N4qa-4rWs4qeA4rWe4ZWY4our4p6Z4ZWb4aGi4p6c4qeJ4p6e4rCS4qeM4bWx4qeO4qyR4qeQ4Li74p6l4biG4ou64LmA4Key4p6p4ouM4pu84qeZ4pWl4oyD4pWn4rCk4oKa4biV4p604rCn4p624oyM4bie4qem4big4oyRxL7isK7ip6zigqvitZzhuKvgtqzigq7imLriqLHil4Xip7bisLzip7jitYrip7vihJnijbLhlqvisYTisY3huqjin5fiuZviqZXhuYnisYfioKLijLHiqYThrpPhpKbhrpfiqLzhr7Tig5TFp-KxluKlguKxmeGjk-KWpeKyl-Kxn-KyluKDouKXteKpm-KgtuKooeKynOKxqOKKneKopeKyoeKppeKyo-KoqeKypeKghOKorOKxs-GKpOK5kOKgjOKXh-KWg-KXieKwvuK1iuKNsOKnvOK5mOGvu-KWjOKzkOKEiuKyg-K5nuKNvOKDhuKpg-KgpMaS4rKI4rqY4qi-4Zic4p-g4Lye4oOQyofiqY_hibPioK7in6nispPisYjispfisaDil7HiqJ7ilq7ihKzho6XhpL_iqZ_ihLDiqaLisavioL_hl6zisa7ioILilrzisbHhu4bijaPit6zLv-GhieGhicu_4LeHy7XMgOKpteKYkuKpt-KhkeKyteGwpeKFi-Glq-KOvOKqgOKyu-KqguGZpeKhm-Kyv-KhneKzgeKhn-G7puGZsuKFm-Kzh-KqjeKPjeG7ruKYr-Gxg-Gag-Kzj-GituKPl-G7t-KzluKzlOGmj-G7vOKYv-Kqn-Kzm-KqoeG8g-KZhOGxnuKZhkviq4bhn4Pbt8OC4rOo4qW1xYzhmqrgopbgqJjis67ioo3is7DVhsOX4rO0ZeKztuKGj9yX4oaR4quZ4rO74aa_4quc4byn4quf4oab4qKf4rSD4qKi4qul4qKk4qun4qKmx7_ikI_hqZ_ikJHik6Liq6ziuILitI_hp5jhj7HiorDiq7PikJ3itoThm6HitobitJrhgLviorfikKPgopbiorrgoYjiorzikKnipLDitKLim73irITitpPimozirIfhk4LirInhs5Hgs6vhs5PitK3hs5jii7Thp7zhs5virJThs53Gp-Gzn-K0uOKjl-K0tuKRhOC2oOKaouK0veK0v-GBs-GzqeK1g8SM4ZCA4oe74rWG4aiY4pGR4rqL4oev4pGV4q6U4pui4rW64qys4aij4rWR4ail4puL4pur4raB4ZCa4air4qST4Zy84rWZ4pGn4bWx4puC4r2X4ZCm4rig4Z2G4qO-4aKA4puK4pq44r2f4LOI4rWk4oiP4rWm4qSJ4rWo4qSL4am44amM4amf4oiW4oyZ4rWt4q2P4pKF4rWy4rWX4b6x4q2V4pGm4puA4KGF4qyq4q2b4oip4rWh4pGe4r2g4q2h4ryi4Z2_4q2j4puy4raI4am54q2n4rSe4q2p4qyA4pCr4qeY4qOC4p2P4pCv4q2x4qS34pyE4aqM4o2p4ZKF4YSS4q244rie4qeW4qyB4rGX4pyO4Z2G4q6A4YSg4LS94qWI4pyT4b-n4bWi4q6G4bWl4omf4b-t4auB4q6i4rav4aqt4rax4pOe4reG4q6S4pyz4rW54py14KSN4qWq4q6Z4ra74om04ra-4q6g4baC4qWh4baF4qWj4ray4om-4r6_4b-74reK4q6s4baP4reN4oqI4q6x4oCZ4qWw4pOv4p2B4pOx4auZ4reW4q654reY4q674rea4oqX4q6-4oCp4rST4aCE4qaA4bmv4bap4Zem4rGr4oqh4q-J4reo4qaH4aCW4qaJOuGUi-Cln-GMh8yE4rKr4Yeb4piO4Yal4oGB4Yav4oq44qaX4beHxL7gpbfir6Dht4vilJ_ipp3iuIDir6XiuIbhi6rir6nipqTinbbipqfinbjii43ir7DipqzilK_CkeKUsdGG4q-04ayc4qax4ayey7rinoXigabhrKTinofhrKjinonhrKziprzii6PilYTitbjgua3isIbhs7jinpbEveK4ouKnhOKBv8Ks4oKB4Liw4be-4pWT4biA4pWX4biC4qeR4aG14rCa4ri04r6n4riJ4oKT4pWk4p6u4ri64p6w4ri84pWp4oKb4ri_4ZaB4qei4rCp4p644Y204p664rCs4qeq4oyU4pW34oyW4bWx4oyY4p6R4KSx4rCz4a-m4pW94rG24qe14rC74peI4rC94oeu4oyn4rGB4rqg4YmZ4qe_4oOA4rme4rKR4oSN4rmh4rGc4peb4rui4Yms4qiJ4p-Y4rqf4YmQ4oSb4oy94qCr4rGT4aOM4pag4rKQ4rGa4rmw4a-94rmy4p-y4qCy4p-04rKZ4rGk4o6Y4rqv4bms4p-64o2X4pe94o2Z4Yu54o2b4YqZ4rqA4pSG4o6l4aO24pa_4Kq74rG04rqG4rC54peG4paC4bi24rqK44Gc4o2v44Ge44Gu4qiC4rKP4rKG4rKC4rGG4rqV4rKF4rmj4rqZxp_iupvjgpzisorjga3hirXiuqHil6fin5Piuanin5bispLisZPjgqDjgbvhuYfhurHiqZnisaPioLXin7fiubjiurDisp3Lg-Kyn-KDrOK3pOKxrOK6tuK3p-K6uOKhg-Kpq-KhheC3ieGUjeKOq-K_t-ClouGhiuK7heKhj-KFhuG7lOKpuuKytuK7i-GwqOC-kuKyuuKOvuKFk-K7kuGwseKzgOKqh-KYpeK7l-KPiOKzhuGZtuK7m-Khp-GxgeKFouKqk-KPk-K7oeGkluCuquKFqeGmj-K7puKPnOGxkuKzkOKZgOKznOK7reKhveKPpuGNseKZhk7iqqjhj5fiqqrigoLgv6jDvVjis6jCtuKqsOC_jM2r4qqz4bGu0bfDl-KquNG3w5jiqrvhqrPiq5LirJzhsbsBw6Hhsb5V4ruy4Y25w4zis6jHm-Kri-C_jBTij7HigKfioo7imZXitqThnK_cjOC_ueGmtOKGjOKzteKGjuKZm-K8heKrmOKzuuKZoOK8ieKzveKrneGAjuKZpeK0guG8rOGOpOKZquK8kuG8seKrqOKGpeKrquK0i-K8muK0juKxoeK0kOKTuuK0kuKrgeK0lOK8oeKSl-K2heK-keKruuK8ptqD4pqB4qK54qSt4KSx4ryt4rSh4a2S4r6b4q-D4rSm4ry04auB4ry24qOJ4ry44pqU4pOI4pqW4rSv4qOP4rSx2KzitLPhnJjivYLhgaXhs6HitLrimqHhvaripb7gp7_ivYrgsbjivYzhnJvimqnirZLio6LikaPirKXivoXiuZTivZXivojim6TitY_irK7ivZzikZzipKDih7jitZbjhbDirLXivaTit7zjhbTitZvjgKXYrOKsvOOAqOKsreKsv-K1vuG-u-K2gOK9suCgmeKtheCmueKth-GpiOKtiuK1quKtjOOGhuKImeK9v8KR4amV4pm64YOR4r2j4Z2q4rW14rWI4pKM4rmL4r2Z4qO84rW944W74qSf4q2B4bSz4r6O44WF4ryj44WH4raH4oi24q2m4pu14q2o4pqE4qSv44WQ4p6v4ZG24raS4rSl4qS14r6e4pKs4qS44raY4q214qS74amf4qS94oG44rad4qK_4r6p4qiZ4rW84r6s4omU4r6v4ral4pyU4ran4omc4rap4bWm4rar4qWQ4r654omn4q6P4YS84r694pOL4r-P4q2a4YWF4q6YwpHirpritYDirpziv4bipZ7iv4jiiaTik5riv4vit4Tjh5niiarit4firqjirpbitY3itrnipavik6nhq5Hipa7ipZ7it5Hiio_ipbTiipHhqZ_iipPirpTirrzit5viv6PiipvigKzhq6bir4Xjgobir4fhk77iv63jg4LilIfipojilInLjcu94r-2MOGUi-G2t-GGqeKUjuKvkeK3tOKvmeGgp-K3uOG3huGgq-KmmuKvoeKdreK3v-C3o-KdseKUo-KQluKvqOKdteKiq-K4iMiQ4ZSz4qaq4ryC4riM4bee4riO4ouU4riQ4ouW4qazzbbihL7gvZfiuJbilLzjgKDhnZbinovht7DisITiuYvjgKfhvoHhrLbilYvilY3igoDilY_jg7vii7DiuKjhqbjhrYPinqHigojisJbjgLbigo3ip5XirbrisJ3jgLzhuI7jgL7ip5viuLvhkZrisKXhrZzip6HhiKbila_ijI3inrnijI_jgYvigqfip6vhuKXin4DivqbhkZTjgZTgqLDjgZbho7_isbfhrbXjgpPioI_jhbXjgZ3isb3jgZ_ilorjgqvioJ7iuaTjgq3jgaXjgaPjgrDin5viuaLjibXjgqLinIviuZfiqIziuafjgpvjgqziqJDCkeKokuKcjeKNhOKplOKxlOKol-G6muKxneKxoeKxlOKphuGvpuGupOK6rOKWr-OCgOKDqOKfu-KxquK5veKNnOOIiOKhguKoq-KxsuOCjeGjueK6heKns-KXheKgjeKxueKfjeKasOKXjOC7u-KWmOGvluKogOOBqeGWuuKgmeKtveOCoeK6nWvioJziuqjjgqXhiZnjipHilpXiqYnjgqfho4TjgqniqY7jibTiuqXjirHihKDiqIbil7Dho5jiuqrho5jjipTiuq7huavjipfioLvjgoTilrbioL7isqLisa3jg4Hjip3jgovhsJPjiqAg44iO4L2V44iQ4ZSQ4KWk4au344iV44OM4rKz44OP4oWJ4qm84K6T4pia4ruN4Yyj44OW4pif4Zmo4ruT4qqG4buk44Oc4qqJ4rOF4qqL4rua4bus4Zm64rOL44Ok4o-S4qqV4o-V44qu4Y2d4qGw4ruk44u7wpbiqpris5Xji7_imL3iqp3jg6_iu6rij6HhppvimYPjg7PimYXHqt2w4rOj4bKC4quHw7wO24DCsuKzq9KlFeOEnOKKmeOEnuKrkQHiiZbjhKHgr7PjhKTij7fimZrij7nivIbjhKvhpr7hm4DivIrihpjitIDEieKZpuOEs-KQiOOEteGnjOKGo-K0iOK8leKiqOKrq-KiquKvp-KirOK8neGOueGyuOKisuK0mOCwtuKZv-OFiuKiuOG9ieOFjeCxgOOFj-OHh-K8r-OGueGqhOK8suKshuG9lOKsiOK0qeKjiOKakuOFmeKji-OFm-KsjuG1seKskNuO3q_jhZ_JluOFoeK0teOCseK0t-OFpOKsmuKjmOK0u-GxuuK9ieKsnuGPveOFruKsoeGpmeKtk-KspOKjpOKtluOKp-KsqOK1i-OGmOKSs-OGieK9m-G-muK9neK9sOK1lOCypeOFv-ONquOFseKspOKjteK9puGCp-KIguOGmuK9reGCleKbqeOGquG0keKRt-Kkh-KbkOKwgOCzk-K9uOCikuK9uuGTjeK9vOOBkuGQvuOGmuOGnOCjqeGpl-OGn-GpnOOGoeONruG1seKtmOOFuOOHneKViOKwiOKtneOGjOK1k-KtguKbreOMvuKSmuG_huGehuONhOGRlOOGtuONh-OFkeKbvuOGu-KtsOK2leK-n-Gqi-G1i-KDvOK-o-GqkOK-peKIl-GeouKJj-OLguK1n-K-rOK2ouGqnuKlieKcleOHkeK-tOKuieKcmuK3gOKcnOKcruGHqOKJqOK-vOOHrOK-vuK3iOKctOKlqOK_guKpjeOHodC944ej4qWd4ZK_44em4r644reC4q6k4pOd4reF44-Q4KKW4pOh4puD4ra34r-B4LaI4r-DwpHirq7irpvit47inL3it5DirrTHseKls-Kut-K7t-Klt-OHu-KlueGroOKdiuG2o-KTvOK_p-CqnuKmguOCvuK_rOKypOKUhuK6uuK_seK6vuGgn-KAvuC3hOClo-ClpOGhiuClo-KvmOKmleG3hOK3ueK_v-Gdl-G3ieKmm-OInuG1seKdr9SK44ih4q-r4ouK44ik4pSm4ryb4rGh44in4ZWz3ITinbripqvhh5Hir7LhlLvjgJbilLTjgJjilLbiiq_hlJDjiLbiuJjgoKDim5HhkajjgKLiuJzjgKTjiaXhqrPjiL7hvrjjiYDip4PisIvhoaDiuKTinpvisI_jgLHip4vjgLPhlKTih5TinqPjiY3irbrjgLjhrY7jgLrjiKjisJ7inqzisKDiuLnjiZXjgYDjiZfiuL3ijIfjiZniuYDjgYbjiZziuYPjiZ7ilbLinrvilbTinr3ilbbgopLilbjijJfilbriuY3in4TiuY_jiqPin4jiuZLjgZrjia_igrnjgpjjgqjjgaDjibTjibvijbnisonisb_jgafjkbTjgariubPjirLisYrjirzhroHijofjgbDiuajji4PjioXjiofjkbPjgbXaleOKjOORtuK5sdqV44q54pez44qP44uJ4qmc44qW4o2W4rGp44uO4qmj44KH4buA4rq344uU4rKm44KM4rKo4peA44KP45Go44KR44ql4qe34qi24rG74qi444mx44KZ4oyz45KA4qCY4rqU4rqSxpLjirXjio3jgajjg6jjirjjgaviuZ7iqYrhuqLiuabioKrjkoDji4HjiojilqHjgrDispXjgbriqJ3iubXihKvjko_ji4vjkpHisp7hpYXil77jgr7iurXijqLilIXimITiuoLisqfhr4PijqjjkIXhlIvgpaIw45CJ4L2X4L2Y44ug4ruH4rK04piW4ruK4qGV4ruM4qm_44uo4qGZ4ruR4qqE44us4oWW4o-G4oWZ44ux4bC64qqM44u04oWf4rud4rOM4pix4bGE44u54aaP44u94oWq44u_44yB4aaP44yE44Ou44u744Ow4rus4o-k44yL4ruvx6pT44SU4oW_44SWw73hrYHigKDiu7nUhhbjjJnik7rjjJvQscOd4ryB4ryD44So4o-64ryH44Ss44yo44Su4ryL44yr4qKe4ZuH4oae4byt4qKj44yx4ZuO44yzwpLivJbhk43ivJjim4PjhLzjiKLiuIPiq6_hvLrjhYHbpuK8oOOMveK-j-G0t-KZvuK0m-K8p-K0neGeiOG9jOK0oOOOr-OGuOOFkuK3oeOFlOONjeK8teONj-KsiuONkuKsjOGPnuONleCiluONl9SK4qyS442axpLjjZzimpzitLbikYHjhaXjjaLjhafitLzjhanhgbDjjabhnJnirKDitYTjhoDivZHhvbbjhoTirKfjkqPirKnjhqTjhprhvoPim6jitZLivZ7jjbnhtIHio7LivoLio7TivaXivobhkKTiuYvjhojjiL_itbzjjoTgspziva_jhb3jjojim47jjorivbXjkLHhvqbjhpXipIzitavjjrzgpLHita7itY7itZ_jjpbNjuOOmOK1s-KbnOK-hOKsuOC0juOOnuOOoeK_kOKsq-OGpuKbp-Kjv-OVteOOh-KIr-OOp-OUsOKItOKtpeKkquK-leOUtuGhrOOOruK-qOONiOOUu-ChveOUveKJg-C0ouKcg-OOtuKchuK-pOK2m-OApeOHhuK-qOK2n-K-q-KJk-K-ruKuguGcr-KJmOK-seKSvuKljOOHk-K-tuKJo-OPneKcneOPjeOHmNGo44ea4ra044ec4pyk4reL4ra644ez4oCA4q6y4oCD4qWg44eo4reD4q6l4r-N4qWl44eu4qWX44ew44ef44-r44ei44-t44e144-v4qWx44-x4q624r-c4pOz4ZOm4pO14reZ4pO3yZbit5zJmuKlveK8n-Klv-OIguKKneOPvuOIheK3peKmhOOCieGuv-OQg-OIjOGGm-G2vuKUjuG2ueKKrOKYjuGGn-OLm-OQjeK3tuKmluKvneK3uuOAgOOQk-OIneOAhOKvo-OAhuGxreOAiOGHgeOIpeOMuOOQoOKVoeOQouOIquG3nOOAkuOAlOKUs-OIsOKegeOIssKkzIDilJLjkK7ir77iuJnjgKHiuJvgopLino7htbHinpDim6HiuJ_io6ritbDjgKrjkLvitJbjkL3ii63iuKXjkYDisJHjiYjisJPip43isJXgsYDisJfjgLfjiY_isJzinqrhrZLjgL3igpbjkZHgqIDip53FruKnn-CoiOORl-OJm-Ket-OJneOBieOJn-K5hsON4rmI44mj4rCw45aA4LGA44mn4Lmz4rC24oKx4rC44paA4rC644mt4qi145We4rC_4a2945Gu44q945Gw4rma45Kr4oOC44m445me4bqo4qiH44m545G544m944qz4aOC45K24oOR45K44rmu4pae44G04oOT4o2L45KH4o294pam45KK44uH4aOf45KO4rm34qmd44K54rm64p2R4rm845OI44uR44OA4a6944iJ44uV4qit4o6o4qCH4rG144mq4Liw45Kg4rmT45Ki45mY4rqN44qA4qmM44qs44Gi45mha-OKsOOSuuK6nOGiseOSreOSiOOKt-KXneOSsuOak-OStOOaj-KgleOBr-OCquOBseOKiuKgreK6p-OSruKgsOOZpeOSv-KpmuOTgeOZuOOSkOKXuuOTheOZveOXrOOCv-OTiuKdl-KDsuOTjeK6u-OLl-KvjuKKr-KvjuKvlMyF45e40LfhlIvjk5jioZDjk5rjg5Djk5ziqb3isrjhsKniu47ji6nisr3ji6vjg5niu5Tjg5vis4PioaHjk6jEsuGMuuOLs-KhpuOLteOTreOLt-KYsuOTseKhr-KzkuKzluOTtuGxjeOTuOKFsOOTuuOMh-KFtOKhu-KznuODtOG8hwFW44O44Zu344O64L-Fw71i44yU44SB4amf1rTjhITgv5kBw53jhIjOgsOe44SL4bGzAcOf44SO4rS94aap4bG-WOOUgse3eOGyheOMltGtF-OUi-K3neOUjdeHw6PjlJDjhKfjjKTjhKrimZ_jjKfhsp7jlJfjjKrihprjjK3jlJzjhLTjlJ7ihqLjlKDjhLjitInjhLriiJfjlKfjkJrilKTjlKrikJnihq7jlZThjrritJXjhp3itJfjlpjiorXjjYDMoeONguKQpOOOrOGqs-ONhuOWoOOOsOK8seOOsuK2lOOFleKJo-OFl-ONkc2o4ry54oeP4ae54pC644We4ry-4rSy4r2A4YGg4bmf45WP442h4r2F45yD45yu4rS-45WW4oem4pGM4r2O446Z0aLjja3jlZ3isbrjmZjivZbirZnhs7fjlbHjgKnCkeOVo-OWk-OOhuKtn-ONuuOVqeOVmuK1mOOGg-OWi-Gos-OOguK9q-G0ruOVs-KkgOK1v-KbjOKSlOOOieGCvOOGkuK1p-KRo-K1qeOVvuOGl-OQtuGDiOOOleKtkeONvOOGgeOGoOG0puK1tuKIo-OFt-OWjuK1n-OWkuK9ruOdqOK1ouGRoOKSluKrt-KSmOOGr-KkqOOOquGpu-OcueC5reOWn-K-meK4t-OWos2P45ak4pKr45am4q2z44eA44644bWN45aq4qS84pKy4rWN45mu446i4q2_45ax4ZKW44ye4amp45a14pK94qWL4pyX45a54q6K4r634rau44-e44eX4r6744-h4raz2Zzjl4Pirpfjl4XinKbjl4finKjirp7iv4fjh5XjnrvinK_iv4zjj4_jnr_gpITjj5Liv4Djj5Tjj6jirq3ipazit4_hn5jhn7Djj7DgpJ7jl5zit5Xjl57igKDjl6Div6Djl6LGkuOXpOGTsuOPuuK3n-OPvOK_qeGrqOOas-OQgOOXr-KdmOOIi-KAt-KvlOKhjDnjiI7hmZHhq7bhlJPhhqDjiJbjkI7inafjiJriirvjiJzjgIPjlIjSpeOQl-OAu-OAh-OQnuC3qOOAiuOYh-GvuuOYi-OIqeOAkOOQpeK4jeKvs-K4j8ac4riR44iywqM0y7_jmJniprnir7_iuJrisILipr3jkLXjmYzhkZTjkLjiiKjhnKzhoZ7jgKzisI3hlZ3jiYXinp3hlaHjgLLii7PjgLTii7XjkYfisJnjmLXiuLHilaDii77jgL_iuLjjiZTisKLip5zjgYHinrLjgYPip6DjmYHigqDiuYLip6XjkZvip6fjmYfjmYnijJXjiaTjoJ3hqrPjmY7hiL_jmZDhrbLjmojhiYXhuofjkavjmoziuZXjmZrjkb3jibPjmZ3ji7vihKHig4PjgabjmbLjmpfhupDjibziqIrjkrXjioHhuZHjmavjgbLhibfjnqzjkoHiqJXisZvjoZrjgbjhuaHjmbXhr7rispjgo6nilq3jipXjk4PjmrDjmbzjipnjmb7iub7ji5LjmoHjkpjjmrjhiqDji5fjmobjgpDjmZPjgpLjoY7iuonjgZvija7gq5HjoZLhrpXjkbXil6njkbfhupTjgp7jmpPiupbjmaPjmpPjgqTjkbrgupbisovhl4HiqYzhpKfji4DjmqfjkoTjma_ihKTiqZbhuq_joazilqvjoa_isprisabiubnho6jjmrHjobXjmrPjk4njipziqKrji5Xiqazijqjjn7A245-y4KWl45-04oGj4au24aWe4YyQ4bCe45uE44ui4qGT4piY44ul4qm-4rK54qGY4rK845Oi4rK-45uP44ut4rOC4qGg4ruY4pip44Og45Or4pit45ua4qqS4o-S4o-U4bu145uf44u_44Os4bu44ruo4qG34bGW44yI4oW144yK4qqk4rOgx6pZ45yIxL3Dttu3w77jnIzFmuGyiOK7vOKPsuK7vuGOhcOk45yU4quW4byf45yX4o-845yZ4qKZ4pCA4pmk4ryM45ye4qKh45Sd4ryR45Sf4pCM45Sh45Sj4bWx45Sl4q6U45yo44CM45yr4qKu45yt45en4pm445yw446X4qu24puv4qu444av4ryl4ael4bOC4pu24pui45y7456d4qyC4rSj4qSz45y_4ryz45S-44WW45WA4ry3452F44Wa4pSd44Wc442W4rSw452L44Wg452N44Wj4Y-v45WQ452S442j4bOk452U44Wr4ZyX44Wt4aiT442p4r2Q4pGP4rWH446c4r2U4b27452g446f452i45C54rW8452m456P45Wl4424446m4qyz452s4pq945Ws4qy5456B44aH446D4r6L44aO4rWj44aQ4rWl45274r224529446Ow4zjjpDhtbHjjpLjmKLjjpTjnbLitbzjloXhkYbjhp7jlojipJTjjpvjnZ3ipJfjnovita_irb7jno7jjoXjpYLjlbbjlpbjhqzjnpTjhYbikIvjnpfim7TjjqvjpJPgpLHjnpzim7vjpJfivLDitKTio4PjhrzjjrTjhr7ivqDjjrfivqLjnqfjjrrjlqvjnoHjlq3jpJbjh4jjhqbjj4Hhv6Pjj4PivrDjnrTivrPik4DipY7itqziv4njl4zivrrhhLrjn43ipZXjl5Hipafiv5Hjj5Xhv77jn4XipZzjn4fjh6Xjn4njlr3inLDirqbigIvjn4Hjl5Pjn4PFp-OXleOPmOOXl-OXieKTruGrluK3k-KKkOK3l-KluOOXoeKluuKuveOPueKuv-OdlOK3oOChveKAreOIhOGliOOIhuG7heOiq-GwkOOXseKAt-Ggm-K6v-K6v-GUjuGgn-C9leGwnOK_u-GUl-K_veOXvuOQkeOAgeOGg-OYguOfv9Gt46CB45GM4riB44S946CF45iJ4q-sa-OgieK4iuKBmeOgjOOIreOgjuOIr-OgkOOIseKvuEHjoJPiiq7joJbjgJ_iprrjmJzjoJrjgKPjiLzjjbLGn-Ogn-KateOJgOKwiuOYqOKnheOQvuKnh-OgpuK4p-OgqOORguOgquORhOK4ruGIiuK4sOKVm-Ogr-Omh-OnmeKnmOOYueGhvOC5jeOYveG4lOORleKVq-OBheOZguOgvuKwq-OhguKevuOZiuK5iuOntOGWlOKVu-KwtOOJqeKVv-OJq-KWgeOiguOClOOihOKfjuKWh-OKquOakOKCveORseOhmeKWj-OorOOikOOhluKWlOG6nuOak-OZqOOhoOOZquOKg-OhpuKfpuKNguK6puOho-KDm-KylOKxnuOhq-OaquOCtOKfteOCtuKxpeKgt-OipeKguuOSkuK6s-OKmuOCiOOSl-OirOOSmeOhvOOSm-OCjuOKouKwt-KNp-OSn-K6iOOopOORrOOihuOSpeORr-ORuOOSqOKEluKNuOOmieOhm-GYkOOJuuKEluOikuOZpuGko-ORvOOiiOOaouOKv-OapOGkseOBpOKDmOOCr-OovuOKj-OioOKgs-OCteK5tuOCt-OZueOCgeK6seOLjeOpiuOhtuOKm-OQgeOTjOK6uuOLluOpkcuO46eH4oC-46eJ4ZmO46eL46CU4oWE46K544OO4o6245uG4o6545uI45Oe46OA45uL45Oh4aaC44OY4aaC4o-E44uu45uS46OJ44Of4oWd4qqO4Yyt44u246OP4piy46OR4oWo46OT45Kw4Y2W46OV4rOW46OX4rOZ46OZ45un4rOd4oW345O_zIpa46Oh4KKSwqDbgDrjo6bGvBnjnI_ioLHis7HXh8Ol46Ou44yj4qKU4rO545yY4qKY4pmi45SY45yd44Sy45yf44yv45yh4rSG4pCN44y04rSK45yn44y346ee44S_4red45Ss3Z7jlK7ip4TiorPim7DjpI_iorbjjYHivKjUhuK8quOmiOOklOK2j-KQrOOOseOlvOOOs-OdgeGzjuKHi-Okn9id452G4qOM452I4qOO4ry84bOa4KyD4pqa4qyW45WN442e452Q4rS545WR4ay04r2I46Sv452W45WY452Z46Wh3YLjnZzjna_jnZ7itYrjpLvjlo7jjqDjpafjnq3jpYDjparjjbfjpazim6zjpYXjnoXhnKDjjb_jla1y4r2o452h4bSJ45ik4q2-452045aU452p4b6f45W445264ZC045W744CA46WV46WX4KKW46WZ4r2p46Wb46yd456t46WexqrjlofjlaritbTjnojjhqLitbfjpYrjpL3joKDhtK7jpanjlbTjnpDivoziraDjnpPjpI3jnpXjpbHjlprhv5nitorUhuK2jOK8q-K2juK-mOOluOKkseKjgeOrqOK-nOOeoeK2luOGv-K-oeOigeKttuKJiuOeqeK2nOOOvuOaluKtvuOHi-OWsuOeseG-hOOes-KuheK2qOOPh-KcmeKlj-OXi-Kuo-OevOOml-OevuOmmeK0i-OPpuOfkuGFh-KlmuOmn-K2vOOmr-GfmeOPiuKcreKJueOmpeOXj-Kup-OtruOHr-OJv-OHnuOmquOPquOfleOPruOfl-OHt-OmsuOHueOmtOOPtuOmtuOPuOKlvOOfpeOmu-Ofp-KdkuK_quKmg-KviOOqgOOfreK_sOOXsuGGoOGHnMu-4KWl4piO4q-Q4Yaf4KWn46eO4oq244iY4oq546eS45iB45--4ayI44ig4pSi45yp44ij4Lep46ed45Cb46ef4q-u45Cj44ir44CR45Cm4aGD45Co45iT45Cq4p6Cy7vjn7Ljp63igavjp6_jiLnjkLPjmJ7iuJ3joYbjgKbivb_joKLjkLzjp7vjmKrjkL_jp77isJDjiYfgopLjiYnisJTjiYvjmLLjoK3joLDip5TiuLPjkYrjiZDjmLfjhrjjqIzhuJDjqI_jmL_hloDhoojjkZjjmYPjkZrjmYXjkZzjiaDilbXjiaLjoYTjmYvivb3jgZPjqJ3jgZXjoYrioIrjqZXjooDjkarjooPjqZnjqKfhlqjjiqvjqKrjoZXjqqjjgprjopvjopPil4_jirbjr7_joonjirrjgaPjqanguobisZDihJ7ilqHjgbPjqLvjiorjgbbjqbLiqJrjqYDjkr7jqYLjgb3jqYTjgb_jobLjgoLjqYnisqDjqb7jqYzji5PjqY7jobvjmoTjkpzjqZPjmZHjr7LjqKHjpoLiqLTiloTjpLnjgpfjqZvjmZvjqZ3jqLfhuYrjqaDjqK3jgp_ioJ3hupzjmp3jqLDhi5LjsIbil6bjqazjoaLjmqXjsIzjqa7jkrzjop_jqYHjko3jk4DiqJ_jmq7jsJfjqbvil7vjk4bjgoXjp4DiqKfiub_jqY3iuoHjqoLjoq7hub_jrpnLt-Oum-Kps-GGpeKvkeGVguObg-OqjuKpueOLo-OiveC-kuOLpuOTn-KYneOqoOCtn-OqmOKPgOOqmuOjh-ODneKqiuOTqeObl-KzieKqj-OqouKhquOjkOODp-GkouCuh-ODquKPmeKYu-Oqq-KzmOOMhuKzmuOjmuObqOOqseKqpceqW-ObruC_guObsNCJ4LCZ27fhqYrjj6HitK7htbHZiOObuOC_lcOj45u8254Bw6Tjm7_iqrnDpeOdk-OkiOOMnMOt4bG-YOOqtdKBw5HDu8Om46q6chrjqr3jmaXjqr_EjsOp46uC4byd45yW46uF46Oy46uH44yp4rO_xJjjlJrhsqXiq6PivJDitIXioqXima7ikJDhvLXitI3jlKjivJzimbXivJ7iq7LjhYPjlK_jhq3ivpDitJnjq5_jnLbjq6HdteOemuKGvuOrpuK-muOtkOOFk-OlveOrq-KHiuKQs-K0q-Ksi-K8uuG9neOrtOKQvOK8v-G9ouK9geKHmeKjluOzgOG5n-K9huGcquOrv-OymOGojeOsgeK9jeCygOOdmuKHq-Okt-OlpOK1ieOFtuOVoeOlnOOdpOOsj-OsveOlq-OWleOsk-ONu-OkteOlh-OdruK1muOdsOOVr-OljOOOpOOVpuKtguOdueKkiOOspuGdl-OsqOKkjeOom2vjloLjjbTim5jjr4jhtKHhkJ7ih6rim53jjpzjhqPjtInjhqXjmKXjhqfjjbbjhbzjs7bivo3jrYHipKXjrYPhqbbjhrHjlpvjhrPivpbjhrXjs43jnp7js4_jlLzjs5HhnpTjpb_jlqjitpnjnqjjh4Pjnqrjrb_irbzjrZzjnq3jrZ7jnrDjj4Tjh5Dikr_irojjrabjppPjh6fjraninJ7jravjh6vjn47hkq_jpqjjtLLirqvjpp3ik5LinLriiojjrbTiv5fitr_jnrnit4HjpqTjn4zjrazjl5Djrb3jl5LjtYbhn6bjroHjpqzSheKusOOfluKus-OXmuOfmuK_m-OfnOKuuOOXn-KuuuK0i-OHvuK_ouOmueK_pOOFguK_puOXqcuDWOOukeOfqeOxi-GGkeOXruOxjuOQguKvjOC9keKAvuGGn-K_tuOglMu_4ayh4Yaf4oqv466h4q-a4re3466k44ib4aCt46eW4KaA4q-k45iG46CE44CJ466u45yq466w4ri24oGX46CL4oGb46CN45Cn46CP1JXjrrnjoJLisq7jrr3ilL3jkLDjjozhq5njr4HguJzjr4Pjr6zilYbjr4bjiYHiuKPjr4rjp73jgLDjmK3jr4_jmK_iuKvjmLHhkZTjmLPjiY7jr5fhuInjr5njtpDjrY7ijIDjiZPjmLrjoLbjiZbhnK_jiZjjqJLjr6HjqJTip6TjqJbinrziuYfjqJjjr6rjqJrjrLjijJvjkaXip7Hin4Xjkp7jr7PjgZnjr7XjoZDih6_iuZbijoXjmqHijKvjqKvjmaTji4LjkbLjoanjsILjsK3isLTjoovig43ioKfjt5bilpnin6PjsLvjqa7PieOSg-OpoeOinOKoleOZseK6l-OhqteG45KL4oSo47GC45qs47GE46m445qv47CY4rm746Ko47Wy46Kq466V45q346qC47Cg46mS4bqB46mU4p-H46mW45mV47Co44KW46ma46io47ej45qR4oyu4oSW45qV46--46mn4LqW45qZ47ec47iR4LyS47ex4qmI45Kz47C444q-4rqj4ZeG45K547iQ47ie47iU45K944m845qr46m245qt47e247GG44K64bmvaeOxieOLj-KppOOpv-OfrOO3vuGMg-OLl-O1ueODiOO1vOO1uuO1v-OxmuG7k-Oqj-OxneKyt-Oqk-ObiuOToOOjguOql-OTo-OjheOTpeKqiOOTp-GwueObleG7quODoeObmeKhqOK7nuKzjeKhrOOxsuGvo-OLvOOqp-Oxs-CuquOboeKqnOOTueOvvHTjk7vjjIniqqPis5_jg7XHqmHjsp0B44yTw7zinozipbbjtofGvMes46Op44Sd46Or4bKQw6rjsqris7fjo7Djsq3iopfij77hjpjjhK_hjpzjsrPiq6LimajikInjhLbjjLLjnKTjq5HjnKbikJLjq5Tjrq_jq5bgsKnjpIfjs4HjpInjhYTjpa_jhq7js4bjnLXEv-Oct-K8qeOzi92747Sm46W5442J4b2R442M4aey442O4b2W4rSqZ-Gnt-Odh-OyiuOVhuOkpeOrtuKjkeOruOKjk-OruuOzn-KaoOOrvuOFqOOzpeOdleKHpOOksuG9sOOVmeOsleOktuK9kuK1iOOwqeKaseO0leOVouOljeOdt-K9oOOslOOzueOVq-Ozu-OOgNSG46ya46S846yc45aQ47SX46yf46y-46WO46yi4r2z4puP45W647ae46yn45W94r2547SI47eJ4pKB47uH4q2-46yw4YOQ4LOn46yE456H4b6z47Ot47SU47uV47WX47SM4qSd44ao4qyw46y_4YOt4raD47OE45Sx4r6S47Sh462G45ac4b2L45ae47qV47a346SY44a646up452A47Sr456j4raX462V4aqO44eC4ZON44eE44W446iJ47Sz47if4rag4ZKUQ-OPguKckuOHjuOWtuOeteOHkuK-teOeuOOWu-OeuuOWveG1reOeveO1guOtreKIl-Otr-OmnOOfk-OmnuK_lOGfq-O1jOKun-Omo-OPjOOtuuOmmOO1lOO8luOtvuKuquO1mOK_kuKAk-Oug-OXmOOuheOfmS_jj7Ljl53jtaPjn57jtaXiiJfjtafik7jjiIDjj7vjta3iv6jjtbDigK_jj7_it6bjobniqKrjp4Xgt4LgvZnhhqXisqrgt43iiq8z0LfhmZLjl7viv7zir5vjtoTjn7zjtobjrqjhhrrjrqrjpITjrq3jkJ3jp5vhi6rjp6DipqnjtpLinb3jp6TjtpXjp6bjtpfir7bjgJnMgTTjtpvjiLjih6rjiLrisIPhlZHisIXjtqXjmKfjnLHjmKnilY7jmKvjr4zjkYHiuKnjkYPip4_jgLXiuK_isJjjr5XinqfjtrPii7zjoLHjkY3jtrjinq3jtrrjqr_ijIXjkZTisKbjqJPjoL3jt4LjjI_jr6fjkZ_jr6njgY7joYXjtqPjiabjr67jiajjr7DjgZfjoY3jsKfjgpXjooXjr7fhrb_iuo_jgaHjuI3jt5njtLTjuJXjoonjt67jt53jr73jipLjqaLhpIzjuJrjkb7ilprjqa3huqvisZTjt6niua3jqLzgp7_jt63ijpDjsJDjt7DjqbTjgbzjoqLjgb7ispvjmbrjoqbjobTjkpPiurTjmb_jmrXir4risbDig7TiuoTjuILjsKPjuITjooDjmorjoY_jmZfiuozjoofhr5XilpTiupHjsLbEluO4j-O3quO-pOC6h-O4k-O-o-O-oeOanOOZpeG5iuOan-O3leKouuOpq-O4nOGvsOOimuO_luOouOKfmeOLheGjn-O-t-CjoOOZt-O4p-KXueO3uOOCu-O4rOOSlOC9hOO_geOng-OCiuOpj-OxkeGwlcyC45e14LiI4Yany7njvYnjorfihYXjuLrjsZzjorzjuL3jg5Pgvbfjg5Xjqpbij4DjsaXiqo_jsafiu5bji7DjuYjhjZ3juYrjo4zis4rjo47jsbDjm5zjuZHhrorCluOTs-KYueOxt-OMg-OxueObpeOxu-Oqr-ODsuOjneO5oMyK04_jjI_hvIvYnOCzltu33rTjhJnhqZ_MnuO5rOOMmuO5ruKZlcOr47mx4ryE45ST44ym47Kv45yb47Kx4qKd46O447K146O647K34ryT47K54ryX47K746Su466r45Sp44y547K_44y74pm546SL45yy47uq4oa246SQ4qu846SS44a04pu346SV462N45ah47So45aj47Sq47qa45S_47qc442Q47OV45WC47OX452J47OZ4qyT452M47Oc452O4rGh46u74r2E442e47Oi4LO447Ok47qJ45WV47qv4pqn47Oo4r2P47SQ44Wy46yG47O846yI47Ov47q547Ox44aK452l47q74r2x452q4Zy447uc4b6P46WI44aF47uh4b6V47O_47ul45225IKC47uM46WQ4r2046WS47SF452-47uT45W_476Q4aqz47SL452j5IG_47uZ46yy46WG47SR45aK5IG646Wl47Ow46yu44W5446j5IKM44aN47q8462A47up47qM47OF47Sg4qSp47uu47Sj45ad4r6X45S445y845S65IGa456g5IGc456i4YSI45an4omG44eB4raa462Z45as462b47yD45aw4bWWwptewpfDt8OAJ-OyqeOmjuOto-OPhuOmkeOHlOOtqOOHluO1gOKcseOPkeOmmuK3ieKKhOOugeOPl-O1m-KTlOOHpOOPm-O8n-OtueO1kuO8lOO8o-KMmeO8l-SDmeO8qOK3jOKTk-K_leO1neG2leK_meKuteO1oeGHqOK_neO1pOK_n-O1puK_oeO8tuO1qeOIgeGTt-OmvuK3o-OfquO8vuKNnuO9gOO1t-GMheKps-GUj-O9iuGUkOKhjOOuu-KKsuO2geOuo-K_vuO2heKKveOYg-OIn-O9kuOnmuOyveKxoeOghuO2i-GBouO9meOAj-K4i-OutOO2lOOutuO2luOgkeOnqeKeg-O_v-O9peOuv-O9p-O2oOOYn-CiluOYoeOsrOOgnuO9rOOJguOAruOJhOO2quOvjuCnouO2reKiiuO2r-Gqs-O2seORiOOoiOGcqeOgsuORkeOgtOO-guOojuOguOKnnuOguuOZgOO-h-Kno-KwquO-iuOol-ORoM6u44GP4KKW44GR46Wa476R47eL46ie476U46GM4Zad47eQ46mY47eS44mw47iK47-h47eX46-747mV476i4rmd46iz46mk476f47ef476n4Yms476p45qi47el46i34p-q47eo46Gl5IWq45KG44G34rS244qQ47-r4rGi46mD46m346mF44K446m647ip4oOq46m946Kp47-147e947-E4Zey47-G4o2l47iD4qiy4rG445Kh47-N4oev45qO47-g4rG-47ee46KK5IWk44qv45Kq47-T44q05IWh45qT47iX4o6C47iZ47ei5IWa4qmN47-j4rGS47C8446_47-l47-a47ii5IWj4rm047e04rqt45OC47-v47GH46Kn476_46mL45KW47Cd47GP47iy46qE4o6p4ba545-0zIXkhIbilIzhq7TijrHjorjhu5HjorrjuLvkgIXjg5LimJvjuYDiu5DjuYLjo4Tjqpnjg5rjqpvjo4jjg57ji7Ljo4vjm5jjk6zjuY3jk67jg6Xjm53iqpfiobHjm6DkgJ7juZrCluObo-K7qeSAouKZgeOqsOK7ruOxv8yKY-OyguC_g-GxpNW14Ye_27fhsojhn6DjuqHUhtiU47KN4qq8w6njspDFvuCzluOylNG3w6vjspfkgbHQscOs4bG-1brkgKnij6vJteGEkNuAwrzjsqId47Kl44G647KnAcOm5IC345SS44yl46uG47m24qKa46O245SZ5IC_47m844yw45yi46O947qA45Si44y144S747qE47aO47qG4Kiv46uY4YCw47OC46ub446o45Sy44WJ47OI45S147uw4biq5IGX47yC47uz46W646SZ47u246Sb5IGd46Sd5IGf45WB46Sg442T46Si45WF3p3juqPeo-Ort-K0tOOrueKNj-SBq-OzoOKxoeSBrt6v47qs5Ie147qu4qOd47qw4oen46yD46yz442s47Os46yH442v45Wf442x5IKJ47SW4q2-47Oz45215IKo5IKO4qOx5IKE5ImJ4qy247uB46yY47uE46yLyZbjlbDjpL7jnaTju4njs7XjrKHhnY_jrKPjtITju5DjtIbju5Ljjo_ju5Tjr4TipI_kgb7PieSCnOOloOSJmeGDluOlo-SJjOOOneOlpuOWg-K-iuO0gOOlg-OGq-O0neKitOK2huOlsuOGsuOltOSBleKkruO7suSBmeOcvuSIrOO6meSCuuGRvuSCvOKttOOepuOtl-G1j-OtmuKSs-SFrOO8hOGerOK-reO0t-SDjeOPheO0uuK2quOWuuK2reO1kOOPjOO8kuO1geOXgOOPouOXguOfkOOWj-GqteSDqOOXhuO8m-GfleK2veOmouSDkuOfiuKJuuOXjuO8ouOtvOO8pOO1luO8puOHseOmq-O8quOtteOfmOO1n-O8ruOfm-SDseOfneKltuOfn-SDteOfoeGTr-O8t-OfpuO8ueOPveOmv-KOn-Ofq-O1teOXsOSEgeGjuOGrtuCln8yD4q-646Kx46Kxy77hoKPkhIrjp5DjkJDkhI3inazkhI_jkJbjtonii4fir6bjp57khJXjvZfkhJfjrrHjmI7jiKzii5LjiK7inoDjtpjkhKDigLvhrKLjgJzht6jir73joJfjmJvjr4DjmJ3jtqHjoJzkgpfjr4XkibDhgLHjtqbjoKPjp7zisI7jvbLjtqvkhLLiuKrkhLTjr5LjtrDjr5TjqIfjvbziuLXip5fiuLfjr5zinq_jmLzkhYDjmL7khYLjr6DhuJnjt4HkhYbiuYTigqXip6njiaHjgY3jkaHkhYvUhuSFjeSEquOhh-O-kuOZj-O3jeSGg-K5keSFleOJruSFl-ORreOwq-Ohk-SFm-OpnuSFouO_puO3m-O_muO3m-OwhOOos-SFpuKgqeOotuOwieOSheOZreOwveO-rc-J476z47-p46Gt4qib47GB4rqr47GD5Ial47GF5Ian5IW54pa05Iaq47Cb5Ias47y_5Iau5IaA46G945Kd5Iyp4rqH47iG476Y46im4rG85IWZ5IaL476l4qmQ45qb5IaP46KN5IaR47-Z46iv47mayZbkhpXjt6DioKXkjLrkhprjopnjqbHkhp7kja_jmqjiuqnkjYfji4jkjYnjobHkjYzjmbvhua_jgrzihLLkjZDioIDki4_iqanjobvjv7nLjuSLk-KdneSLluOfseSLmeOqjOSGuuOxm-KhkuKpu-OxnuC9t-OxoOOqlOSHgOOxo-GlseSHg-OxpuSHheOxqOSAkOK7meSHiuOxreOqoeSAluK7n-KqlOSAmeKDjOSAm-O5lOO5kuOMgOSHlOSFneGNluSHl-OjmOKPoOSAo-OTveSApeObq13jqrXHu-KzqOOUiuSAr-GTjdWo5ICy45SM5IC044ycw6fkiIfjsqzhsprjsq7kiIvjo7Xiq57kiI7jq4vjo7njnKDjo7vkiJLitIfkiJTjo7_gopbjpIHgs7PjpIPioqvkiJrSiOSInOGzpuO6iuOzg-SCrOO7q-OFiOOkkeKaguSKheOFjuSKh-OcveOlu-OtkeSCueK0qOSIsOOrrgnjq7DjjZTjq7LjhZ3kgaXjlYrepeOkqOOznuK9g-SIvuC3qOSJgN6h5ImC4r-l5IGy5ImF5IG0442o47qy47q_5IG45ImL5IKh47Ou46S65Im547uj4rWQ47SZ44ap5Iml4pGg47O45IG3442-5IKH47O947SJ5Img46y645Wy5IKB45Wn5Imm47uN45W55IKS5Imp5IKU5Ims5IKW446T4ZGU5IKZ5Imh5IKb456E5I--45aJ5Im25JCB47ug5Imu46y546e34rW846y85ImU446l5Im-5IKr462C46Ww5IKu456Y4pKe47qT4Z6K5I-g5IK25IqJ5I-j46uq47u45IK7456k47u74KuF5IqR44675Iu847yB4pqH5IOD4bSu46aL4pyR44Sg456y4q6E5Iqb45a447yN44-J47WP44-L4om55Iqi5IOV44eb5Iqn46yM47yn47WI462y5Iqs45eI47WN44-c47yQ47yg5IOi5Iqk47WDxrzjj6TirpTkg6bkiqnkkZzik6jkkZ7igJfkirzjrobiv5rit5Tki4HjvLHki4PjvLPijJnjvLXjl6Pki4jjro_ki4rjn6jjvLzkg73jtbTkhq3jtbbit6rgvZHgvZfgvZnhtrfiiq7hh5vgpZzimI3LuuO9i-Onj-O9jeSEjOO9j-SEjuO5qXLjp5jjkKHki6PjoIfigZDhlKzjgIvjiKbki6njvZvipq3ilLDipq_jgJfjvaHilLbjvYjLteSEo-OgmOOnsOO5p-SLuuOns-SCieOntuK1u-OAqeCnj-O9reSBjuO9r-OJg-O9seSEsOOogOO9tOOoguO9tuOgrOO9uOOYtOSMjeORi-SSl-SIqeSEveOojeGhvuOvnuSMluGihuOgvOSFheOBiOGNteOZhuO3hOOZiOO3huO-juOvq-SQnuSMpeSFkOOvr-SMqOO_iOSGhOOJrOOoo-SMrOSGh-SFmOOvuOOoqcaf476d5I2q44m34aSU5Iy15I2m5I6o5I2f46iy5IaR46i046KX44qC5Iy947er46i54qiR5IWs45ms476y5IWv442e5IWx5I2045m25I2244uK5I24476947y645qy47e75IW947iw5IW_4pa-5Iaw46G-47eO47Cl46KB476X46il44qo5I2c5JOg47iL47-R44qt5I2nxpLjv5XjsLHjmpPkjaXho5bhuYrkjankho7il6Lkjazjopjjvqzhr7Xjqa_jionjsL7jsI_ji4bkk7rjoa3jv63khbbjqbnji4zjsYjklIHijp_jt7zklITiurnkhq_jk4_hub_kkobijq3gvZnihYHkkovhoJriiq_isrLjk5njorvkjo3kgIbkhr_jsaLjg5fjuYPkh4Tjm5Dkh4bjsanjm5TkgJLjk6rkh4vjo43kh43jm5vjk7DkjqHijLLkjqPkh5Ljk7XkjqfkjqXkjqrjqq3kjqzkh5rkgKTjuZ_jm6tf5Ieg47KE1bUBw7TbgOC_rOSHp-CjmCzikLviqrTjhIzkiIXkh67YrcOn5IexzoLDqOSHtOSPuNCxw67hsb5e47mjQOKzqNGm5I624bWxH-SIguOJvOSIhMOo5I6-46uE5I-A47m14rO847m346uJ5IC-5I-G5IGA5I-I5IGC44S34ryU5IiV46uS47qD47K85IGI47K-4quw47qI5JW344y85Iif45yz4ryk47OH47qQ47OJ0a3jq6PkgZjkj5_jrYzkiKjkiojkj6Ljs5DkkL3kiK7jnYLjpJ7jhZjkiLLjlYPikLjkiLXSpeOVh8yw45WJ46Sm442b5I-w4qyY442g46u846Ss45WS442k46yA5IGz4rWC5I-85ImI5IKe5I-_47q146S447iI4LKP5JCE5IKa44214oiI5Imk456R5ImX4r2i5IKF4oe-5Imb46WJ5JCp47uG4r6J4r2s5JCU47SC5Imn446L44aU4ZC64q2L4b6p4rmL5JCg5JCS452k5Imy47ub5Im047ud4oii0a3jlo3jrI3kiqjjhbjjno3kl5_kkLDhtLXklqDjnpbjrYXitonju6_ikqDju7HklqnkkYfkk4Pjnp_hkbnkiK3kiozhtYjjpoDjlqnjpoTkg4Djpobkg4Ljv6bjj4Djnq_ikrvkiprjtLnkkZDjj4jjrafjrbfiv4ritrDkiqPiib3hhL7jtYXkirjjh5_kg5vgtazjtYvkg57jn5fkkaHkiqDkg6Hjh6rkkaXiv47kkZnjl4Tkiqrjh7Lkka7iionkkbDjvK3jvK_jtaLjj7Tki4TjvLTkg7bkkbrkg7jjvLjkg7rjiIPkg7zjtbLki47kkoLki5DkkoThjIXigL7hoKDgt4jMgeGgmuGGquKvkeGGpeSSjuOuouSLnOOfu-KmmeO9kOKUoOOuqeSEkuSWmeSElOO2jeOurOSEmOOYjeSSn-OYkOSSouOQqeSSpOKeguK4lOKLmuSLs-KLnOK4l-OYmuO2neOgmeSSq-SEp9SG5ISp46yb46e15ISs47an472w46-L5JK445SG47as5IyH1IbiuKzjjZjjvbfjqIXjvbnkjIzhiI_jgLnjtrXkjI_jupbkjJHjgL_kjJPjkZPjgYLiuL7joLvkhYTjgYfjmYTkk43jr6bkhYjjvo3kjKDjvo_kk5ThopnkjKbjoYnkk5jjoYvjqKDjgZjkjZnklI3jjbDjt5Tisozjvpzjt5jkhaDkjaPklJTjop3iuaDkjLPkjLjkk6zklJ_kk6_kho3kk7Hjvq7kk7TjvrHilqPkk7fijpTkjYbjsJLjt7PjuKXjt7XklKvjt7fkhqjjvr7khbvklILjobfjmoDkg7_kjZPklIbklLXjuIHkhoLkk5njiqTjqZfkk53kgbvhvbvkhonkmqDjr7nijbPjv5LkmqXjv5TkhpDkm5PkhpLjsLPihJbklJzkjaHklJ7khpjkjZ7kja3klKHjoZfisZjkjbHjmprkhbDkhbLjoa7gu4XjoqPjqYbjvrzjqYjkhqnkmr7klLDklIPkjb_juLHihLvjuLPilIzjiLTippDkmYngpaPhhqTkjoniqbbkhrvkgITklYHkhr7ji6fklYTji6rhsLDklYfjo4bkgI_juYfkjprjqp_iu5zklZDjqqPklZLioa7kh5Hji77kh5XjuZfis5bklZrjsbrjqq7klZ3kjq7klZ_OnkfklaLgv4TbtsO-4Kih2K7jm7Xhk40x5JWs44SFzoLDkuSVsOC_n-SVs-OykcOU5JW247Wr4quRAhPhsb5X5Jyd5Iei4bKEw74q4rOowqLknKPhtbEy5Jym45u5w6DknKrjhJDknKzkh6_DouScr-OUrdyIAuGtmOGbnsSO4Yq_wq3ih4rklaPYnAJEw4zjsqHklangtI7NmeSHq-OEjOGKrOScquSdi-SdhcmX5Jyy5J2I46uZ4bKQw7Lhsb7jvbnknZDhsaLknJ7RoeKGguKihsib5J2Y4L-MM-SdgOC_lcOs5J2Dw63knaDEjsOu5J2j5Iid4L-e4Yqs4bG-SuOQr-Gsq-GdluGFtdGE44i74L-MN-G-lMSOw7LjhprFvw_hsb7knojkmacvRteD4q-e4LiWw5rFv-Och-GBlsOI442V47q30qXatuSMicSr1rbJjOCltNG314ngqK9jxq_fv-GIjMSOw4bWvOCnrOC5gXPilpzKieKUquG6qeOypwLJmeC0ss6L34HhmJLgorJyZ8ipz6HhjabOntSI5Je54pCLDcOKxL_enuOls-Gpn92G46W14L-VwqPkkLnjoLPkmIPivp3imo3knoXjpZHjrKXkiakLw7Tkn4nhvqjhqZ_Fg-K5i8SOwqHknowBwqLhsb7FnOSXl-C4scKa5IuC5JCn1IYg5JeP5JCh1YbjjYrkl5LjrJHjtJvkgqrHqta047qb4pqQ5IGg47qe4aGlBOSfnOO6oOCjmNus452K47qk5JWuwpzklr3itLbEjsKe47qp4b2kxI7Cn-Sdu-SPluOMnMKh47On5JeHzIrbu-OytuKGoeKQiwoKxb925IGE4ZON4K-d4qKp5JaY472UxI7CneOMuuGyt8y3xI7CnOGxvtOW45e845CP5JmQ4oySDOSfv-SLn-SSlOC_o-OYheSSmOSEluGvusSOwqLkmZjkgYnEjuKbuuSTguKvr-SEmuOno-KZlcKj5Jme4664xqDhh5nFiuKUuuG4ncSO5J6qxbXCs-Coj3TLsi9JUEZTUNygxJTkiJILwobEjnzel8Ow5Ja20a3hsoDhvZ7CqVvMl9WPxrts5I6x4rKQ1rzFrXNzzZ_knrLhgoHWvMWkz5LMj-K8nuGeo8W_G96Ewqfkoalu5KGrwq5pcGZzLtafaC5i16bYvc6eI-GcudWe1K3fksOexI7ChuChqeOsmMSn5IqT472-5J654YCxxb_elAIb4KCF45iP5J664rCk17zVltWYz7XPquCyouSiktWg1aLVpCzOnsye5Iq-5Jiz2J045Iu544-14ZON46q5466L4L-VwpXkkbvjs6XClOSgpMW_EsW_Gcyd466Q45er5Ji_5IO-4o6j5JKD45-u4LeCy7XLt8u5y7vLvcu_zIHMg-K3tMSO4ZOSwrXkoZHkoZPkoZXkoZfgsZNzY8W5yKvjsoXQjOSdlNSC4bKH45CV4KKW07bhsq_koafkooDkoavkoa3kmq7ilKrCp-ShsOShssa544y7xb8dxb8fyLTCqNadx5lp0Yjkmb3SgNSQ5KG-5KOv0rHkooPkooXkoofkoonkoovkoo1k5KGMAeOmt8Srwq_ko5zHnsS05KGa5KG50pnCluCnouShoeSho8Wa4byJ5KGm5KGo3ZvkooHSseSjseOKhOG5h-SjtMaq5KO25JSk4bqr5KOF5KG25KSY4pm24p6m5KKf4KSR5KSHbMKxxrvkoZLHnuSiiN6z5KSN4Ka4ZNa91p_LssOZz6fHhtCcOi8v5KS4y7LkpLvkoorkoozkpL463JvkmYovzp7hmJjCseSklcqe4Zu45KOh5KOj4auFAXzFv8Ou5KSd5Iug4KKW5KKQ5KOt5KSi5KGq5KSl4pah5KOz5KO15KGz4bG7xJrko73ko79l5KSB1bHir7XhjabkpLTkpKPkoavkpLfkpYHkpLrkpIzkpY7YveSlgOSkucqe5KWDaOSlhXPkpYfkpYnkpbrKnuSljOSkvdi95KWQ4Yaf4KWj5KWT4pmGb-SIoOKAh9W805DOsuSWpMWaMOSQt9uexJrkn5HkhLzkn5PitKbhjJFIwpbGlcSmAMSOHuSAkeSmpAHko4HguJnkpqcBHuC-lcm2xI4b5KavHOCtkeSgqAEm5KavJ-SmuAHCnMSO5Ka7xI4p5Ka-wp3EjuSmt-SngeSOk-GZn-SgicSOKuSmrynkjo7kpqvCn8SOK-Snj-SAh-Smq8KgxI4u5KavLeSchOKPgOSfoeSng-Smryzkpr7CotGE5Kec5KeK4K6TxI7Co8SOLeSmry_kpr7DgOSmtOSmrzXkpr7DgeSmqAPgoo_kpr7gr6bhhJDkpq_kp5XgrYzEjsOE5KaoAsSONwDknqLWuMWy5Kar4LSJOOSmrzfkprLVh8SOOeSmrx4D4K6Z4L-SxI475KavPuSmvuSfiAE85Kia4K2I5Karw4vEjj3kqJrgrYrkpqvbuQE_5Kav4Kar5Ke_AcON3YXkqKzkqKHbn8SOQeSorOSop-GxsMSOQ-Smr0bkpr7DkOG8iOSovOSos-GykcSOReSovOSouAHDksSO5Ki9xI5H5Ka-w5Pgvr7kpq9H5KmCw5TEjuCmq-SpjOSph8OXxI5L5KavTuSmvsOYxI5M5Kmc5KmCw5nEjk3kqZzkqYfknpcBT-Smr1Lkpr7Dm8SOUOSprOSpgsOcxI5R5Kms5KmHw53EjlPkpq9W5Ka-5KKV4LC45Km85KmCw5_EjlXkqbzkqYfgp53jm6zkpq9X5Ka-w6HEjuSpncSOV-SpgsOixI7kqa3kqpDkqYfDo8SOWOSmr1vkpr7gpKQBWeSqm-SpgsOlxI5a5Kqb5KmHw6bEjlzkpq9f5Ka-w6fEjl3kqqvkqYLDqNSi5Kqr5KmHw6nEjmDkpq9j5Ka-w6rEjmHkqrrkqYLDq8SOYuSquuSph8OsxI7kqrvEjmTkpr7DrcSO5Kqc5KuK5KmC040B5Kqs5KuK5KmH1LEBxaDEjkrkprjIssSOJOSmrxvjk7Tkh5XJiMSOJeSroOOMguSro-Set-SohOSroOObpOSrqQ_kq5rkq6Dji7rkq6ngsLfkq6HkqITfhsqP5KakAuSjhAHkp4gBaeSrnBPkqYzkpq_HmuSnv-Sdi-SqkOSsg-Sos-GKrOSriuSsg-SrnOSjhuSrvOSmr2rgrZfkq7jkop_EjiPkrJAC5KiW5KKh5KyV5KavbOSsmOSruRzkp4fkrJzkrJLPh-SrueSjugHgorvEjmbkq5zgs5Vu5Kiv5Kau5KyZH-SjmeSmryHFoeSsk8SaxI5r5Kavb-Cti-O5nOOjm-O5nuObqg",
    },
    {
      header: t("Blockchain"),
      color: "#2196f3",
      // name: t("Blockchain"),
      image: "thumbs/blockchain.png",
      desc: t("Des7"),
      video: "https://youtu.be/zcX7OJ-L8XQ",
      save: "wofCrGxhc3Rfbm9kZV9pZMONAVTEgcSDxIVsaW5rxIvEjQJSwqXEh8SJc8KdworCosSMw4zDrcKkdHlwZcKtQ29udHJvbC9UaW1lcsKjcG9zwpLEjsKmw40Cw4LCpHNpemXCgsKhMMOMwqjCoTEYwqVmxIJnc8KBwqljxLHEgnBzZWTDg8Klb3LEiXIAwqRtxIhlAMKnb3V0cMWsc8KRwoTCpG5hxLbFqm5fdGlja8SmxKhlw7_CpcSUxJbFsMSOwpLGgmFiZWzCpzMwxo8wbXPCqnDEsMSpcsW6ZXPCgsKoxJV0xLd2YWzDjXUwwqVldmXErsSmxbtrwqhib3jFl2zFoMKkIzLGuMShxKPDv8W-xKnEq8StxK_EscSzxLXEt8S5xLvEvQHCiifFg8WFxYfFicOMwozFjRrFkMWSxZTFlsWYYcWaxZzFnsWgxaIBxaXFp8WpxavFrcWvxbHFs8W1ZcW3xbnGrca9xoDGgsSVa8aFAcKuxojGimzCpsaOxo_GksaUxpbEt8aZxpvGncSuxqDGosONC8K4xqfGqcarxbrFvMavxrHGs8a1xrfGucSiZMOMw4_HrcKsSW7FrnQvQsWsdMStx4bEvMWAKsWAwp3HjMWGwpLDjMKJLceUYcWTwoDFn8WhxLcFx6DEiQDCpsSVyJvFsMKDx6fEtsKgx63GvMaDa8aGxarFrMi7wpLIvcW0yL_JgcevxoTCk8SOdcSOwpTEjsOjyYrHqMmAxKfEqcKnxrDEsWVhbsmOx7HDgMe8b8aXx7_Cg8KlxqFsdWXFnsW6dGxlwqVDybJhcsKlxZd1xK7EjmjGusiUw67HrcKrxKzErsSwxLJBbnnIoseIwrJFyKjHjsWKx5ExQsiuxZPFlcazxZnFm8WdyLLFogfItsWoyLnImsWvwpPJl8S2wqFByYHCpMmDxI7CrsqlZcKhQsqpyqsBwpTKrsKhQ8qyx7DEjsOkyYbHpHTIvMi-ZcKmx6PIm8mNyYPHssKVyaXJp2nGmsKAyb_EjhPHrca_yoXHgkTGi2HKisS6yKMBw5DFgMOZyo_FiMqRx5LKlceWypjHmcqax5zIs3IGyp_IuMi6x6XKrsmZxb_Jgsq6AcOjyr3Iu8KRy7HLhsewx7LDpMuKx77LjMWUwqrFusS2xIvFuMaSw40Dw6jJv8OMw6nIl8iZyJvIncifyKHLmsS9Ahwoyo_IqsKQLMukyLHHncS3CMutyqHLucu7yZrGgMqqy7XClcu4xa_JicuBy7LEqcaBy4fCkcSOwo7Mp8W_yZxvyZ7JoMmic8mkxpXJpsyBxprJqcmrya3CoMKlybDJssKjQWRkybnFq8m8CjrMjcOMx63Crk3EiHXJsnMvzZlkzZtlyovDjMK-Msybw4zCmR7Mn8qcxLcCy63Mrcq_y7rLgcKidHjHrQDMvsy1AcaTzYHLi82EwqfGqsaJybLKm82Kx6lOZXR3xaBrzZDGtHLCpjdlNTdjMsKoc3ViZ3LHmWjEgMSCxITEhsWnxJgdxJHOocmDxJjEjgzEnMWnc8Keyb8EyoJNYXRoL1LJoGRvbcqLF37Np8OIzarFkcivy6XHmMeaypvMocWjzKTLr82xzLjMssyqxJbDgM2wxbDFssmLybPNhmXHrcKmbnVtxorJuMy0Bce1xovDi0PCpcOlWg1xwqXCncyAxpjMgsKDwqlhxazOu860xbvDg8KjbcSVAM-5YXjPpcKrw4FtZ07DiADJv8i1zKjCq86zzrXNns2axrTNo8OVw4zCpsybeDzLpMqXz4bLqM2scsyjxabIt8ylzK7KtsqozKjPm8-dz5_PkGsFyrbKsdClz5zPnsS30KkGz5PNss-WwqE9z5rQr8-fzbkJz67JqMqnz6XCkCDChDjCgsK3w5zKsAnCok9QwqElyb_LrMyowq1PYmplY8icybJuZ861zaPDn8OMwojNp8K-z4LHldCZbMqZx5vQnMus0J_KoM-My4DPlsuD0ZXRl3TNt9CpB9C0z5XHqMKm0ZrRnGjHrc2IzLQGz6Ns0L3Nvc2DxZTJqsaizYfJv8yj0IrQjM62zrhuzrrOvMyWIcOMw6zPgNGkz4TRptGoz4jLqsef0azLrsqiz43MsMq5z5HRuMuB0onJrM-Z0K7Qp8S3zbkK0oPPpcKbw4XDsDd1wqPDrtC-z7DPss-0bc-2Y8-4z7puz7zSv8-_Q9CB0IPQhdCHyJMJzrLOtM62zZ_Nm2_QkcSOFNCV0JfPg8qWx5fRp8un0anPidOO0qHQocq_zK_QttCkxb_QptCwctCpCtCs0LnSrtOryYML0LTKttC40q3Tqs25DtK7zYTRgEPCkggrw7NBUsWMQtGK0YzRjsm_CsuS0ZTRltGYL9G80Z3MlsOM0Z_DttGi0prTm8umz4fLqcqdz4vSo9Gv0bpv0bLRmNG1yYMM0qjRsNSR0b7MqNKAy73CkQvSg9KFx73Pr8aawoHSqtKLyJMLyJfUjdGzL8SVxIl4yovEjmvDjNSWxYTIqc2k05nRpdOc0p3DgtCc1LrTotGu06XHqMKj1KJq1KXHsA3KrsKl1L9lzbbTt9CoyYMOz5PVk8S21LfSrMW_wrPEhHLElWcs1ZbRsyzJt86cec25xI4L1ZvVndWfxb_UrcaEzYDUs8e_y47Ikw3Tj9CN05LQkMyWxI7CpcWAwrTTmM2rz4nItdWR1J_Vpcqv06fEqdOp1aHHsA_TrtWg0LHJgxDTtMuB0LfTr9O4zLTOqtO7c8KD073CnMKywojDncKgwoHChcqwZNGL0Y3Rj8iTDsyQ0qMvTtOwzaPCocWAw7rRojLWj8uqza7Wksym0qXMqMWkyYPPksuEy7DXitOo0LrSr8y0ENaowoPCq3DEgmNlaMSxxaLCoSPNiWnJscuC1r3TuM-YwqMxxo_JvwzWhdKQzrnOu8qLeMWAwpTSmdeFxaID1J7Xic-WzLHMqdeN1KjHqNWn1qTQu8y0D9KyQ8KUcsO2wq_Dk8OafdeX0r3IoNK_yIvTgs-7z73Th9OJ0ITQhsKJyJMPzZfWh8aaL0_Jh8Ws1YICTte1zafCtCjXuMS31oTXiNeQ173VmMSWFNaowoHNs821yb_KnsyowqzUvNSP1brVggFhetGi1YrSm9WM057SnsWi1IvYsdOkyq7VldGV2LRrCNW50pLVntiE1p7HsAnVpNWbz5jHrdWqxK_VrdWv1KN01bJy1bTVtgHTrdKp1brRv8y-1b_NgtS0c9aCxIzXutGS2L_InNm5zaPDkkbMm8SOfMOMwoXQmNmJ1JvQnM6x2Y5zwprPjsuC1bDUpNeNyrYwx63CtNWr2aPXk3LZpNSO0bTakNaiMdqT2pXRmyzal9qZ0bPQqcOAyrbNpsyo2pTZotqh2qPajtqbx7Dap9aiM9qf2qzVrtqu2aXapsq2NNq11azardOw2qTaj9qxyrY12r3altuA2q_autaiNtuG2r_TqtuB2rDPkcq2N9uN2rfbiNq52pzQtjjbldqi25famtqmz5Pai9eR1pfar8y-wpQHCAzVmtai2pLQpdqgZ9uK0Lbantuu2rbbsceowqHaqdOo26_btsqm2rTbtNq-27Dbmdu32rzbv9Wt27zKr9uF3IXRm9yHwqHbjNyK3IHbg9ai25Tcj9yM25vclNeN1qjChNej16XCptm5zo3FoMKnIzVh3KPco8KoZseAU8eNENWnw5lgWwogICLGosW7ZSIs3LHcs8awYty43LoiY8m3xrRz3L7csiJkYcap3YXcs8ao3Lfcud2GZs6cxJbdiyLOm2HXnN2UaGXEjGndlGnGoW4iCl3Jv82u2bjZpdij2aXKi1DEjsKG2b8CLcOMwqrahNSa0JvPideu2onKtduj2o3bmNyRz5bNtG_bnNq425_Ks9msz5bCpN2Rzrvegtue2qXKs9W40qnZn9qq26_bnduP24nKs9Sn14_Kv9262LPQpdulzLQUyq7egM-a27vcgsS23ojEsG3eo9u13qXPl9KK1ajWl9qX2qbcmdybybLcndml3J9y3KHcpdykYdyn3Kncq9ytM3vcv8igIjrdjN2K3Y_cs96Jbd-G3LPctd2Y34oiz5jfjjIwCn3MvsOcABDClgUEAAXIuNqXwpYGBt-hAdaYxLfClgcDAN-nAMKWCN-uBwDfsQnfogffqd-kCggACd-j07DClgsK37_fu-CgggzfruCghd-xDd-uC9-2wpYO4KCAC-Cgh9OqwpYPDAAN4KCB4KCWEA7goJrgoJXPn8KWFAIAD-CgkMSOCt-1AgHaq9yA3pTPn9uQwpbVt-CgjwIC4KCu24feldml4KCzAduqAAID4KC4247goLHar8KmzpvFq8WawpDCpsWXbmZpZ8KAwqfGqXLFhMStw4s_w5nCmeChmuChmsKay48BOsetwqrMkcWsxLPVnnTVggM-Wtm_ASzXhNOa2bTQnNe62onQtcmY2ZPXjtil0qTenNu62rbVtt2w3JnCq2LGtMW8y4zcqsWGMteZ15vXndefxLfCr8aqxp9yIMafeHQg3ZpyybPOhcKkVOChptWnwqfSv9GnxaB5zI3Djc2XU8SpY2nGoi9MxZxnx4XMllDDjMKC3a_CisSOw7bYrnLToceh06Nz3pvHqM201bvbpN29xJbEjtapy4HCo2HNjtKmyYQBzLfLgcKn4KKvbsaaaXPPmt6W3b7YguCimMWb0bTMqMu04KOFAXXPk-Civ8mM2L3Vs8uY25Dgob4uyq7CqWLGosmg15woKcet3KfJu9GYacStzL7CkMquwqfEh27go7Hgo7PMqOCjteCjv8W64KO5y4fass-WwqpkaWbgoY5jzZvEp9mZz6DLvdmxzb5z2oPgoppQzLtswqzgophxdWngophOxK3XnMOC4KSK4KSM4KSO4KSQeQDCqeCknuCkoOCimFRvw4PCqc-YVMW_x5RvzrTgoZ5Hy5LgoqfRl-CiqsSyTcSV4KKwx4fMisKYxI7OsdWHypDDjMK0xY3KlOChsMygy6rZjeCivNGuyqTgo5Dgo4pk4KOb4KOW3JfKut2w1ZvgooJvxbzIl-Cjp3nbkNCpxYBRyq7CpMS6xLHgpaPZqOCjqOCjmOCjhQIuz5PgpZbPlsKsxK_JoHPdl-CkhW7gpZvFv8Ks4KWk4KOp1qYCT9G51abgo77XnOCkkuChvlDSg8OOAMOOWMOw2Z7ctWTLvNW-1qjCguCkp-CkjcW74KSqAsKw4KWY4KWC4KOTcuCksULgooPHscOC4KGeTcetwrLgpL7goqngoqvgpqbgpaFrY2hhxJXVggfJlAEiy6DHj8OS4KWO4KK53bjgpZTUn-ChtcS2wqZwybfgoo_go5fgo4TJhMSa4KW1yq7Cpt2a4KGPaOCjndeS07Dgo7rgo6zgo67EguCjv2Xgo7Lgo7Rm4KO24KW94KeY4KOQ4KaJ4Ked4KSBxb_gpIPgo7fgpIbgpJTWqOCkmNekybLCquCmscW84Ka04Ka2buCknWXgpJ_gpKFl4KSj4Kec4KSm4KSL4Kac4KSPbMSn4KSs4KSu4Ke64KSx4KSz4KS1xb_Co8ae4KGeSuCkveCiqOClgMid4Kan1YIEwqbDjMOI3a_CgMm94KK51ZDgp4PIu-ClttG64KeI4KKYyIrFv9eM4KWdMsqu4KW43ZLgpbvgp6rgpb7gp4vehOClnU_Vm-CnpeCkkuClpwJQ4KeP3bvgpoHgpa_gpaXensu9zJdRxYBS4KWq4Ka1c9Sr4KG83IDZsOCmlMSU4KaW4KOe2bDWqMKK3rRlwqLGt9-qcgLgppvgpKngqIJ5A8Kw4KanT25W4KaV4Keya8OD4Ke34Ke54KKY4KaixLfDguCigeCmp1Jld8m3ZArgpLTgppVUeOClvsOaARdbeyLfhToi3Z_JoNy4It-M34bgqobdkmvgqoXflDo5Nn0s4Km-4KqA4KqC3aDgqoXgqofgqoHdkcmg4KqLLN-T3q7fhuCqj-CqkeCqk2_gqojgp5LgpIvgqpfeqOCqiN2I34ngqp7Sq-CqoOCqkOCqkuCpv-CqpOCqgd-Q3Y7gqonOu-Cqqt2J4Kq24KqNMzLgqqLgqrLgqojdjeCqqOCquOCqgdy84KqM4KqfOjY04Kq_4KqU3ZbfkeCqt9-N4KqB4KqD3aHgqp3gqo3gq4rgq4zgqrPdh-CquuCrg-Crkd2A3YLEu-Crh-CqruCqjuCqkF3CqsmrxIzgp7zXnMOOAiFaw5TgqbXgqYxIxINow4DCq-Crp2RQ4KeJxK7DmUIweMaQZmM515xkMzNhNmI1OWQxYWYw3KMxY2I5NDYz4KyW4KuKODJh4KqP4KyUOGPgrI004KyDOeCsiuCsh82OMjNjYzDgrKLcpOChnkngqI_gpL_gprDgqJPWiQNSxYDCsuComeCom-ClkNqH17vKo-CnkOCoouCniteL3IfgqKrgpbrgpbzgo7jgqK7eneCnjOCkiNiC4Ki01p3Tsdqx4Ki54KG7xKngqLvVtOCmg9SuxYDgqKjLgcKk4KmF4KmH1pfbr-Cpit6Q4KaV4KaXyaPWqMKJ4KmS4KmUMeCplgHgqZngpp3gqZvgpp_gqZ_gqaHgqaPgpqfgqabgqIXgqangpYNy4Kms4KWgxbzgqa_gqbHFoeCptOCrt-Cpt-ClvsOZw7Lgqb3gq4DgqoHgqqbdneCqneCqmCLgrovgq6HJrd-GNDjgq5jgqqXdm-Cqp-CujeCqqeCuiuCumOCujOCqreCukjrgrpTgrpbgqrTElOCrj-CujuCukOCrleCriOCrl-CqseCqlN2Bct2D4Kuc4KqI4KuG4K6p4Kui35bgrqPdlc6c4K6m4K6b4KqJ4Kqb4K6R3Lfgq6PgrrfgrrPgq5Dgq4Hgqqzgqo04MH3gq6Xgq7fgq6llw44BT8OaA-CrsMSM4Kuy4KmG4Ku84Ku-4KyA4KyC4KyE4KyG4KyI4KyK4KyM4KyO4KyQ4KyS4KyU4Kya4KyZ4KyX4K6U4Kyd4KyfYuCsoeCso-CspeCsp-ClmOCsquCsrOCsrt2INd-a35zgoLxzw4zDjADDjMONyLjar-CgvHXIleCvu8yKw7_goLzCjsyO4LCDAeCwhcaGxKTgr7vDjwDgsIvKtOCwgsOMw67gsIrgoLzCleCwlOCvu8Op4LCQ4KC8wq7DjMO_4K-7w67gsJzJleCwgsuQ4LCjAcOk4LCm4LCUAuCwi92wxI46AMSOR8i426_goLPgpbPgr7zgsLEBRwLgrZfgpbDgoLvgrZvEjkngsLlK4KCo4KaF4LCy4LGD36ngr7_FgN2s4LC6AcSOSgLgqZbgsLbgqYEB4LGE4LCyAeCwveCoveCwv8Sa4LGP4LC5TeCvvtml4KGGxLB14KGJ4KGLxK3goY7goZDgoZLEt-ChlW7goZfgoZngoZvCmcKa",
    },
    {
      header: t("Wallet"),
      color: "#cccccc",
      // name: t("Wallet"),
      image: "thumbs/wallet.png",
      desc: t("Des11"),
      video: "https://youtu.be/E2cU3bpa0F0",
      save: "wofCrGxhc3Rfbm9kZV9pZMONAVPEgcSDxIVsaW5rxIvEjQRrwqXEh8SJc8KRwovCosSMxI5TwqR0eXBlwq5NxIh1bGVzL1dhbMSvdMKjcG9zwpLDjMKqxL3CpHNpemXCgsKhMMOMwrLCoTHDjMKmwqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbElXB1dHPClsKDwqRuYW1lwqpwcml2YXRla2V5xKbEqMWdwqTElMSWw4DFpsWoxarConRvxbfEqcWZxbtrxb3Fp8WpZcKkZMWxYcaExbnGh8aJxb9lwqhnxINMaW1pdMaRxobElcaIxb7Gi8KlxbBsdcaMxKfGhcW6xqHGlMaLxYBlbmTGn8asxbzCp2_FosWhxaPCl8ajxarCqmJsb2NrY2hhxJXGn8Klxodzxq7FqsKnYWRkcsSwc8eJx4vHjWXCp2LEtGFuY8apxbgAx4rGoceMxr1lwqNVU0THlsekx5jGgXjHrMSWx6XGiseOx5PHn2lwxp7GqsWdx6PHsseYwqhjb250cmFjx7rHoce9a8eMxaxyb8SpcnRpxLDCg8KnxrFhx4BlZMODwqXIknTEr8KmxLPEtWV0wqXIgceBcsKmZTkxZTYzwqhzdWJnyIVwaMSAxILEhMSGxZzEmMSOUsSRyLvGh8i-BF3EnMWcc8OcADzCisSixI0BC8aRwq9DcsSoxoIvS8W1IFDHh3LEuMS6wpLDjQISxI5AxYDFgsWExYbDikNTwpnCmsWKQsWOxZDFksWUxZZlchDFmsWcxZ7FoMWixLvHpsKtW8Wtxa_FsWUgxbR5XcaRwqbEhMWubmfGtWvDjQRRx6bGl8axybfKhcaRw7_KkcOAxrfGucm-wpPHpsKryoPFsMWyyofFtcqLyo3ElWfIisSfyaI3x6bFrMizxJRjyqjFtse7yozIhMqsyq7HmMePx5HHk3PHlcq5yqvKj8quwpTJoibJoinJoi7JoljIjciPybfIksSwwoDCicmOxI4MxpHCrcSsZMSuxLAvSW7GusmfxLvDjMOmyaXJp8WDxYXFh8OSxYomybJhxZHFk8WVxZfFmcWbxIkAyp90xrrEn8qyyqXKhcqIyp3KrsKRypNRy5HIkMuUc8KBx7TFq8yAxbLKiMuXxKMBDcaRxKvErcSvxLFPyqDEt8S5xLvDjQM-yaJsy6plxLzCtCjLscuzybXFlxzJusu5xZ_Lo8m-wpHHpsKgxrTGh8miJMyIy5PIk8yLzI3Gv8eBx4PHhceHbsmNzJMOyZJXZWIzL0LNgceEx4bElculyaECHMmiworMpcusw4zLrsWLwpLMqsm0y7XJtxHMr8WdzLHLvcy0zI3CrFvHgMeCzZHNhMqKy4TKu8qPypHJoiXLu8u9xrzMv82tzYLNkm7Kqs2zyq3Hi82VJMmiNsemwqnHm8SCx55lKCnGkcKoZnXHnsiSyILMhMmiJ8emwqfEh86Mzo7OkM6SzpRpzpbHl8qAzbxrTnVtYsm3zp7Hu86RzpPIh86ibs6XAmLKgMiEx51zyIbOlW7OrcW4zq_Ooc6jx6TMhQJIx6bKjMaxZM6-xKnPgM6xz4LHss-ERc6Ix7Zlx7h0z4vGls6gz47Os8eLz4RLzLvIkcy9woLKv8eSx5TCoMKoxa1vdsSMybfCu2h0y7xzOi8vcnBjLsikaC5idWlsZDo0NjIzNMySyY8PxpHCsENvbcS5bsaxxaMvQ82-zZRGyaLCgMylyaEBwpBkzaDLtMm2cgHNpcu6xrjLvMyzzLXOgMqOzoLPg822z6DMisKDyJ3GncSvwqXQlc2Ewq1zZcSvyIfImlbEtMaoz67PsHDPss-0z7bPuM-6z7zPvtCA0ILQhNCGxqXRgGXRgs-xz7PPtc-3z7l0z7vPvc-_0IHQg9CF0IfLmAHJuce7zJfLnsyZL8yb0KjMncmgzKDChMSOLNCbw4zMqNCgzKzJtxrQpc2n0KnMjcy2x7vGoMSWy4nQsMy9zIzGlc-ky4FzzYbJj82k0aRVyJJsxLFGzrDOvM2UypPDmMSOXs2axYbLp8mw0bTNonId0bjJvcWjyqLRu86f0pHOss21As6ZzI3CpGPEtMykx7vKnMy4AijOmseQz6XLgtCryqzSqCnNuMm-wpLHptGQxqfHoMaFzrQr0KrSsMq90oHEsMKCzI3HmseczozCqWFyZ86p0JJzwpDSiMSOEsaRwqzLosa6zY7FosaCbtKTBNKVAcKa0bHDiDLNoMKBwqnIp8SC0YTImsic0p3Tm8u4zabSocu-0qTSsNKoKtK9xaPSv9O6xbjDv8600rTUgcSpx5pvb8Svx53Tic-pzInMvdCyxqbGqMiAyrVrIMWq0LPIn2XCpkLToc6WyIHOk3TLi9OZARPLm9CNyIPIjmwvVMabybfSkwUexI7CrtKYxYfCjMWKGtOs067UitOw0LrIm9G1cgLQpdO-xJ_ChNONyIJfyJLHg8qbzrQqx4rImNC7wqYzMNWUbXPTinPCgsKoxJXFsnLGpsONC8K4wqVldtCSxKZpx4PCqGJveMinxZXCpCMy1bLUpBTMltKMz7_Sj8iObSDNimnUsMOwxI7CkNS1w4zCoNS40pzQoiPSoMyyxaPNqcaVwqXSocqLbs6pzqty0qgr1YTWjcaLwqbQp8a61pHWk8m3yq7Ck8miLMmiLcmiMtWYwoHCqMSJY8abxLRzEtCIxI4Vy5tEaXNwxIJ5xLLFsceF0pMGwrjLqcWBxYPEvMONPNaHxZcm1orNqNWGxpXRvMeh0qgs1Y_Oq2zCoNap1JnQtcSzdMeF1rIBFsyWy53Ln8yazJzWv8O0xI7DgtGx0bPFj8uyzaHQoifXi9G6147Mt8ah1qXWqdONzorHncef1KQXxpHCttCN0I_IgtOW1KzEsHQgRmF1x5_Rq8yfBH4y1oPNnS7XiMm3G9ew07_StcuAx5TSuc200rIuzprHk3HGqMSEypvSqC_WmMemx6_Ym9Ctz5DJojDVmMKA1KQY05zTnsWi06DPsMiC06R0w4zCltOp06vXq8yr0p0D2JbTudey07vGk9WE1IDZhdSCzrQv04fFuNSI1Ipl1IzHl9WY1JHRkdSU1ajUltSYyJ7IoNSd2LfOs9SgyIMB150Z1rXWt9a5Yda715rWvsyeyaEFwqrYj9eDzKbMoDHXh9i_163FlyLZg8KR143Gi9ePxqvSsjDXk9C715bUjsy8xLDCgdeYZcKl2ato1KTRt8e70IzQjtCQ2IJQxa7Hn9a_QMmiYtaDwr7Whtm30KHFlwTZu8qWW3N5zqrUis2xxbjKutCsyp3Yp9SG1JvWks6q1qDOg8miMcmiM9iv153Ylce7wq3Wtta41rrWvNebaNKTB8KAyaLCvNOp2bbJs9qhybfUptO2ybzWi9WF2rHRvsqSAjHag9eV15fZnNqL2o3UpMyu2r5NxbFoL03ErsiS1rl524Ziy4nQm3jbjNes245yKNmD2YnGi8KhQdae2rTWldKyMsemwqFC27vWlNKoM9qwxpXCoT3cg9q1x6TNlTTJojXZldu5w4s_WMOPA0YVF8KR3IHDi0BeaRDDvsK_UcO_wqJPUMKhKtSk0p_Hu8Kv24DZqNa7RNS805Jz0pMIcMSOw4zRscK-N9iTcirapNuV0qg03IfZvtyLctSNyI7Uj8SwwoTCq86myJNTyagyyqTEgsefaNSKxZfCr9CSybcgxbJ42IVoybfai9udwqfcs8S13LXTgcao3JTDh8KTwofCgXLDm8KB150e16DMmMug0anLpNmtw40I0a4CWNepzKnaoNWAK92C2YragNe0AtyR2obPodqIzI3HqMeq1KQf0IvNis2M1KzIhW7Ous-b1r_CrsqTBtaDw7DFisOMwrrcv86P25HRucWjwpnHps2rzqbNg8SV2qvEqdqt0rrSss6HzarKgsWuyqbFs8W13rDUm8uFypDSssqx0qtbxoLevN6y2JzXtARTzppb1JJl3rzCrdqz1pQs3r7SqDnPh1vGjnRh34XflMy4BFXKslvGmHPGmsacdN-P35HJt9-TzoHSqDvfod-j2pbVqN-Oy5vfqXLfq9qu0rI834vOnMef36jWn9-2353Grcemyadnzb_Zht6JPdWE0qPGlcKrzrjemc670qfKuW9iamXIh8q9z4fFgeCghcia2KrOtEfgoJlp4KCbxrPTiM-dyaJG1ZjCiN2qZcOAyYfOjMOAxo3Gj8OAwqPfo8ONZcKQxpfEg9-xx5_DjwDgoL0Cw4tTw4fCgM-oyI7Pq8WX0ZPRhNGV0YfRmNGa0YvRndGONMiNyoTFssmZecOZQjB4NmXIrTkzZGY3NOCgljgwYTQxYTgyMTNjOTXgoa45ZTTSrTEyMGY01ZQ2MTg34KCWMzhlyJrgooNkOWbgoaZmMzngoabgob3GgW_DmSrgoZkx4KKHNmYyZjbOq2bgobcwMuChtMefMWbgoprGjmQwYzJjYtWUMjjgob1kM2XXnSDLm9eh0afYtNiLyaED0a4Dwo7YkMuv3L8F1YPWnNexxovgopDMg-Cgpd-J17bGleCikNSk2brHu8Ks1bfSjtSsb9W8z5XTpAbKk8m52bLNm8Kq2p_bjdWA2LLep9O41pnUmNaQyrnftc21BFndhsWq1pvMnN2IzrQ51qnWq-Cgltau0o7WsdGh1onbot23xLHgornSkwN6ypPCiOCjgDHLsN6D0p3en9uR4KOuxozfmcaQxpPOl9-f4KOMxq_gpI_UpCTYs9aLL86o27zTpEzDjQXFmdmyxLzCvti-4KOh0p3VteCjpNuT4KOmZdm_xpLfiFfgpI3gpK7Cpt-1zrQ72ZXdlciGZd2Y0IDJt8KhI9qKwqbgpJzWlOCgqsKlMjbVlDDXnSXgorbgo77LodaL0pMCw5rgpKDdteCjndKZzZ3gpIjgpKfQogfgo4TMnNmExovgoLjfpMabxp3go4nQrgRX4KSUxargpaHfpcad1KTXise7wrTXv9qUyIPEsUfEg8mb2pfHp927BGrgpKDCtNqdxYrYkuCkidCi1rTgpKrLvdu3x47apsSpyJrfnN-s0rJA3qtbbduox7jElMm334Xgo6rSskHgpLLgo7LatgJCyaJD2K_UpNevx7vCquCiudiD3aDgpZHgpZMF04zgpKPRr-Ckptuy1YAI3obdh9G92q_go4XWjNmO3rHevs60QNWY3Y7dkGXdksWD3ZTZqN2X3ZnJt92byIPdnd2f3aHdo9qKwqRUZd2g4KCqwqRmxJLUpNu14KOR4Kao4KWD1K_du8yhw40GzYjgpKPDjOCkpdy_CeCmtcWq4KSu25bKnuCmueCln-Cnq-CmndCuAkHgpLjgp4fgpLvgp4ly4KS_4KWB4Kee3YnfjcKmMS7gpYkx153Oj9q-3LDbgtqN1LDCguCnotGw4Kelw4jbsdmA0KLdteCmhsyz2b3gp7HgprfSssmxxILXlNqF3Yvah8yL2orajNa92o7Rod2B2r7go5PEsVTgo5ZHd-CjmN27BdCYBTzWg9aFMdS54KaDxZfek-ColeCmusyN1o_Wi92I0qhD4KSN4KOw0argp7LYrAI84KO11qzgo7jWsNSk3oXgp5zgpJrZntOi24bJpAXNv-Coj-CmseCoksWX4KWM4Ki84Kew4KSt2KTMuAPDs9mI4Ka7ZdSD4KClAj3gqabZkNSLz5zHrdmV4KCq2ZjHg9SX3aTQtNSb4KmT1J_GuMiDJtSk0bDSi9KN0o_Spti43bsIFsygw6jWg8Om0pvgqLnfqtmD4KCL4Ka2zr_Pms680qjPktKr0q3EteCpod6JRuCgoOCgotiq0qhH4Kml4Ki-343HsciLzZVKyaJN4Kmm4Kmo4Kmw3ozMitOMxpXGsMay05HTk9OV4KW005jRoS3VtuCqgS_SkM-B06PduwnDosygcOCqiuCqjOClmsWX4Kq64Kme4KqQ4KiY4KqS4KqDzb_Sss-G4KqX0q7gqprRvwJJ4KCDx4ZzaOCqn9KySuCqotaO4Kqk0b3WocmiT8miVMmiVuCqq92Ky5LejdWZzI3goI3emN6azrzgqrTTlMWq4Kq31KQu4Kq71bjgqr3gq4_SkwoAypN-4KuGMcmx4KqNcuCruuCri-Cpps-N4KqU0rJL4KCD4KqY0q_UgtKoTOCrmcSD4KuczbLfuN6JTeCroMak4KuiyIngpp5QyaLfoNqx4Kqsx77VmOCqsMaLwqfPlM-W4Ku14Kq2xaPgqrjMky_gpJnTn-CpueCrgNGsCgrgo5vYvdy_15_gqZ7gpKzgpK7Ssd6JTuCsneCrjcSp4Kym4KqmyaJJyaLgrJXaseCprdmS4Kmv4Kyn4Kqu1JDgqbJj1JXgqbXgpYHgrLbIpuCpu9SiAcKY1KQw1KfIgsiE1IrUrNSuyZ7gq4HgpJ8E0bfgpZbUtuCjoOCmstKdCuClndGq25TShNWI1Ypr1YzgqalO25rVkuClidWW4Kyo1Zvgp4zVnsS01aDVotWk1abgrbjVqtWs1a7WldWx1bLXnTHZptuB2anbg9ms0awLGMygXNCby4_Qn-Csh-Css-Csv-Col-CpoOComd6JT9ua4Kie4KutzIraidud4Kij24TXndiP4KiH2afgqIngqKTSkws2ypPGnuCmr92_4K6f4KuIybfYj-Cuot2D0rJQ4K6o25zgqbfgrq7XnNGhNt220abduNek3bsL4KuoA-CqieCnpdeq4K6-cuCtoeCsv-CpptuW4Kun4KWpZcev15034K-M16LRqOCvj-CumHzKk8O23oHcvzPgp6rgrqTXkNKyVeCvnuCsq-Cgls-Vx7nUpDjJkk_goJTgoJZ0L-Cqrtur4K-QcuCkoMKq3Lwe3L_grpLgr5rej-Cgk2rXs-CrllbgppzHu8Kgyq7NlVfJolnXl9-N4KCtx5_XnTngrpPcseCultuF3bsMwrLgpKDCjNuL3L802bvgrqPgp6zSqFfgr4XgrZPaiOCootuf0aE60IvgqKkvUkxQIEXHnsWc0pMM24jgp6PgpoAxfty_NdmDxaXgr4LeiVjgr5vSqFngsY_Gk-CxkuCgguCxjMW84LGUxrbgp6_gpKzgqYXWneCsmcq84KmpWuCmo9GhO8aRwqvJlMmWby9I4KyX0pMN0a4G2qPgpKN44LCH4KyH4K-L4LCK1o7go6jFuNC5zoEs4KaZ3ola4KSNwqTgq5rgrJjarOCmveCmnlvJolzau9Gh4Ki04K6y4K6U2argrrXduw5g4KSgzLbgpq8D2bXcv-CvouCvgd6H4KSv4KuWW-CwsOCon-CrruCurOCvh-CwtMyT3IrakVPOgS9TyLPgsqrQrNKTDtKVBtaC4K2t4Kem4KuH4K2w0KLgr7ngrIrMjd-GypDgrqXgq5Zc04DEhNOSyIjeseCxvuCrll3Ph8Svyo_RmeCpgdmH4LGaz4fgprngoJ3gqalf15fgs4TIkRrUpD7grLTYteCnveCxrcOK4KeiwrjcvOCpmtm4ybfJkeCxt-Cqkd6I4LGZ4KWe4K2A4KmHyIvPhF3gp7bdluCnuOCkveCnuuClgNud4KWC37_goKrCouClh9SkP8yW4LKvyqzQlNCOYsSV4KW60awQ1qQG0pfgsrbUt-Cshdy_4LCe4LK83IjbuuCzgNuXXtyA3ILgtJbJol_cgEPgsI7GiOCphOCzk-CxnsuG4Kae4LKUAmHgsaLMk8mm4Kam4Kao4KeT4Kaq3bsPWuCnotiy4KSjazjcv8ua4LOp4K2G4LKe4LSh4LOR2rHgsr7OtF7gp4Ddj82Q3ZHdk-CkueCniOCztuCni9Wd3Z7gp5Tgp4_Hk-CnkeC0r8il343CouChmded4LSVxbjcr-Cus-CulUHYmcuC0pMRCOCnolTgrp0BVOCvhOCsh-CwtuC0u-Cvr-Czq9uXYOCkuOCnguCnhGXgp4bgs7TgpLzFl-Cwk92l4LWe0rdz153gtJrFuNGl4K-k3bnFouC1oc2XBsOq4K-r4KyH4LGk4LWs4LCt0rLgtKngsLHMvsaVyIDgraPIhciH1KTgtJ_gqoDgq7zgqr7em-CluzjJosKy4KyE4KaC4K-X4KK14Kme4KaI4LWtz5ngq4_SqM624KuT4KqZ4KCH4KuWY-CthdqL4Kyf04Tgqall4Kur2ZTgtpDgrKnFquC1hc2u4Ke94Kyu4Ku34Kyw1KTHq-CpkeCstdSe4Ky32IzLjgLDpOCsvOCsh9e84LaM4KuV25dk4Lax4K2BzrRj4Kms1avZkdmT4Kqt4LKi0LHgrZXgrZfZm-Cpt9Sc4LeG4K2b1KHDjMOt151F4LCf4K6024TUsOCsogLbiuCoj-CokeCzpnLgpJjgspzgs6rgtL3JotqL4Kic2oTgr4bUmuCviOCopcyTRuCtotSp4K2l1K3FquCtqNGsBOCjmgLDrtaD4LSP4Ki44K-XzJXgpIzgsZrgrqPGt27VidmZ4K264Kez0J_gt7ts4K2-1ZXVl-C2ueCugtWd1Z_VodWj1aXIg9Wn1anVq9Wt1IrVr-CujzLXnSHgpY3gr43go7_gpZDduwLDuMqT4K2syajNm-ClmNy_zYjguJPgs63TgOCqpOCkkeCjiuCwmOC2kNKD4Kye0ZHUpFHGkcKx1KjgraTUq9SoZMadzrLct-CkgwbTqOCytsWF4KiB3L_guLPgtqXcgOC1mcSp4LG70Kzgsb3fv-Cjq-CzisyN3IHLm96-4Lmn27zNtQPDp-C2scSmcsaoxpHgrY_gt5rHvtOA4K6I4Lip4KCk0K7gqaPckkHDgNyBANynUMKiIT3UpE3gtIHGgsiFZ2XbpmXFm8mV24bgpZMH4Ka04LSO4K2v4KmbybfZpeC1rMKj0Lrgs4bgt7gEXOCkjeCgs8ik4Kqlyq_gubLgt73IoE3gupTFlXnXneCvreCjveC4teClj9260awGw5bgp6LCpOCkhuClmeCyucWX0IrguYLgrbTgpKzgqrLGs-C5htyNypNcypPgs7LguYnSq9C6xrLKrsmKQ8KWzLnEjg7grIHMlOCgveC7lQIlxI4P4LuZ4LuY4LK-4Lucy4rJkALEjhDgu5vOmOC7lwHEjhEA4KyMzrLgu5wo05rgu5kRAcO_4Lucy4zgu6bgu64C4LujyaIqxI4T4LuZEgDgu7nJoivgu67gu5kUxZ7fteC7nNakAeC8jNaz4LuqAtam4LyR4LuZFuC8lMuO4Lu8ARfFnt6-4LucL8SOGOC7mRfgu7jgu5wwxI7gvJ7EjhngvJTauAEa4LuZG-C8lDLEjuC8kgEc4LyN37_gu5wzxI7gvLHEjhwB4KS04Ly7yaLcj-C8uOC7mR3gvJQ14L2A4LuZHuC8lOCuuAHgu5jEjh_gvJ_OgeC7nDfEjgvgu5kf4L2C4LygyaI5xI4i4L2bA9-Q37_ft8qs4LucO8SOJOC9mwXgvaXbvOC9p8qP4LucPMSOKuC9mwbgva_fkuC9nuCpqsSOK-C9mwjgvIcC2poBJ-C7mSbgvZXQrOC7nEHEjijgvobgvYLgvI7JouCmoAHgvofEjingvJRDxI7gvpQB4L224L2D27zgu5xF4LuXBdGv4Luw4KqT4Luy4KCm4L2T4LunASzgvKfJokfgvZPgu63gvqrgu77gvbtI4LuXBMSOLeC-pOCrj-C7nOCtiwEv4LuZLeC-rALgqqjgvqrgvr_gvrLgvZbJokvgu5fgo5oBLuC-ueCqv-C7nOCkn-C-veC7mS7gv4FN4L6jxI4u4L-G4L6JyaJOxI4w4LuZ4L6-4L6B4KumAeC-uMSOMeC8lOCsouC_jOC7mTLgvJTgq6jgv6Tgu5k24LyUVeC_mOC7mTfgvJRW4L634LuZOOC8lOCwlgHgv7vEjjngvJRY4L2Z4L6pOuC8lFnEjuC_vwE6AQDgu5zgtLPhgIvgu5k7AOC5pcqs4Lmv1pTgu5zgsogB4YCTxI484LyU4LuL4YCb4LuZPeC8lF3Ejj7hgKLgvo_gvYQCXsml4LuZP-C8lF_EjuGAo8SOP-GAjeC7nOCylAHhgK_EjkHgvJRh4YC04LuZQuC8lNut4L2RA8SOQ-C_js-b4LucY8SOROC7mUPgv4HJj0bgu5nhgY3gvoFl4YGG4LuZReC7quC5ssSOTeC7mVEB4YCVyo_hgJfJt-C7leCpo8SO4YGf4L294LyG4LuVypTLmeC7meC9muC7v9-JxI4g4L2b4L-a4L2oypPgv7MBI-C9mwThgbDgv70l4LuZ4L2s4YCOypPhgIgBIeC7meC9ouC-neGAmOC7isSOM-C7meGBneGCgsmF4YKM4YGe4YCU4Lmu37XCpsi1xrjRhMKQwqbIgW5m4KChwoDCp9WlcsWByILclMOZwpnhgqnhgqnCmsqu4YKb4YKYdeGCmuGCnMiC4YKfZ-GCoeGCo-GCpW7hgqfhgqrhgqs",
    },
  ];

  allCards = lessons.map((lesson) => {
    return (
      <Card className={classes.card}>
        <CardActionArea
          onClick={() => {
            window.open(lesson.video);
          }}
        >
          <div
            style={{
              padding: 3,
              backgroundColor: lesson.color,
              color: "#FFFFFF",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 24,
            }}
          >
            {lesson.header}
          </div>
          <CardMedia
            className={classes.media}
            image={lesson.image}
            title={lesson.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {lesson.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {lesson.desc}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              codec.decompress(lesson.save).then((json) => {
                global.graph.configure(json);
                global.graph.stop();
                global.graph.start();
                setShowVideoLibrary(false);
                global.showLibrary = false;
              });
            }}
          >
            {t("Load")}
          </Button>

          <Button
            size="small"
            style={{ marginLeft: 20 }}
            variant="contained"
            onClick={() => {
              window.open(lesson.video);
            }}
          >
            {t("Watch")}
          </Button>
        </CardActions>
      </Card>
    );
  });

  /* FOR TOP MENU FOR TABLETS:
<div style={{zIndex:1,position:"fixed",right:0,top:0,width:"100%"}}>
  <div style={{borderRadius:"0px 0px 8px 8px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,right:0,top:0,width:475,backgroundColor:"#DFDFDF"}}>
    <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

      <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={async ()=>{
          alert("click")
        }}>
        <Tooltip title="Learn More" style={{marginLeft:10,cursor:"pointer"}}>
          <Icon>
            swap_vert
          </Icon>
        </Tooltip>
      </span>

    </div>
  </div>
</div>
*/

  /*
<div style={{zIndex:1,position:"fixed",width:"100%",left:0,top:0}}>
  <Grid container className={classes.root} spacing={2}>
    {customNodes}
  </Grid>
</div>

 */

  let [width, height] = useWindowSize();

  const toggleDraw = (e) => {
    let currentDrawing = drawing;
    console.log("toggle draw", currentDrawing, drawingColor);
    currentDrawing = !currentDrawing;
    if (currentDrawing) {
      currentDrawing = drawingColor;
      global.graph.canvas.drawing = drawingColor;
      global.graph.canvas.selectToolActive = false;
      setSelectToolActive(global.graph.canvas.selectToolActive);
    } else {
      global.graph.canvas.drawing = false;
    }

    setDrawing(currentDrawing);
    console.log("toggle draw is now", global.graph.canvas.drawing);
  };

  let spacing = 0;

  const mouseEnter = (name, e) => {
    //console.log(e.pageY,height)
    if (e.pageY > 60 && e.pageY < height - 60) {
      setMenu("");
    } else {
      setMenu(name);
    }
  };

  const mouseLeave = (e) => {
    setMenu("");
  };

  const tabFontSize = 14;

  let extraTabs = [];
  //console.log("MENU:",menu)
  let customNodes = [];

  if (!showVideoLibrary) {
    for (let n in global.customNodes) {
      //console.log("GRID",global.customNodes[n])
      //if(global.customNodes[n].name!="Special" && global.customNodes[n].name!="Modules"){
      if (!drawing && global.customNodes[n].name == menu) {
        let positionStyle = { position: "absolute" };
        let style = {
          borderBottom: "3px solid #888888",
          whiteSpace: "nowrap",
          letterSpacing: -1,
          fontSize: 14,
          margin: 4,
          borderRadius: "8px 8px 8px 8px",
          padding: 6,
          textAlign: "center",
          color: "#FFFFFF",
          backgroundColor: "#" + global.customNodes[n].color,
        };
        if (n < 6) {
          positionStyle.left = 0;
        } else {
          positionStyle.right = 0;
        }

        let items = [];
        let itemspace = 40;
        for (let i in global.customNodeItems[global.customNodes[n].name]) {
          let item = global.customNodeItems[global.customNodes[n].name][i];
          //console.log("Add item",item)
          items.push([
            <div style={{ ...positionStyle, top: 50 + itemspace * i }}>
              <Dragger
                key={"dragger" + n + "_" + i}
                name={item.title}
                drop={(name, x, y) => {
                  //console.log("DO A DROP AT ",name,x,y)
                  setMenu("");
                  var node_watch = global.LiteGraphJS.LiteGraph.createNode(
                    menu + "/" + item.title
                  );
                  node_watch.pos = [
                    x - 40 + global.graph.canvas.visible_area[0],
                    y + global.graph.canvas.visible_area[1],
                  ];
                  //console.log("looking in",,liteGraph,liteGraph._is_subgraph)
                  global.graph.canvas.graph.add(node_watch);
                }}
              >
                <div
                  onMouseUp={() => {
                    if (menu) {
                      setMenu("");
                      var node_watch = global.LiteGraphJS.LiteGraph.createNode(
                        menu + "/" + item.title
                      );
                      node_watch.pos = [
                        width / 2 - 40 + global.graph.canvas.visible_area[0],
                        height / 2 + global.graph.canvas.visible_area[1],
                      ];
                      //console.log("looking in",,liteGraph,liteGraph._is_subgraph)
                      global.graph.canvas.graph.add(node_watch);
                    }
                  }}
                  style={style}
                >
                  {item.title}
                </div>
              </Dragger>
            </div>,
          ]);
        }

        if (global.customNodes[n].name == "Modules") {
          /*
          items.push(<div key={"bar4"} style={{padding:4,position:"absolute",bottom:itemspace*4,width:"80%",borderTop:"1px solid #888888"}}></div>)

          let count = 3
          for(let m in global.modules){
            items.push(
              <Dragger key={"draggercustom"+m} name={m}  drop={(name,x,y)=>{
                  //console.log("DO A DROP AT ",name,x,y)
                  setMenu("")

                  localStorage.setItem("litegrapheditor_clipboard",JSON.stringify(global.modules[m]))
                  global.graph.canvas.last_mouse_position[0] = width/2
                  global.graph.canvas.last_mouse_position[1] = height/2
                  global.graph.canvas.pasteFromClipboard()
                  global.graph.canvas.setDirty(true);
                  global.graph.canvas.graph.change();
                }}>
                  <div style={{...style,bottom:itemspace*count++}}>
                    {m}
                  </div>
              </Dragger>
            )
          }

          //items.push(<div key ={"bar3"} style={{padding:10,position:"absolute",bottom:itemspace*3,width:"100%",borderTop:"1px solid #999999"}}></div>)

          items.push(<div key={"bar3"} style={{padding:4,position:"absolute",bottom:itemspace*2,width:"80%",borderTop:"1px solid #888888"}}></div>)

          */

          items.push(
            <div style={{ ...positionStyle, bottom: itemspace * 1 }}>
              <div
                onMouseUp={() => {
                  console.log("copying global to canvas");
                  global.graph.canvas.copyToClipboard();
                  let item = localStorage.getItem("litegrapheditor_clipboard");
                  console.log(item);

                  let webfile =
                    `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>URL</key>
    <string>https://eth.build/` +
                    codec.compress(item) +
                    `</string>
  </dict>
  </plist>
    `;

                  var file = new Blob([item]);
                  var url = URL.createObjectURL(file);
                  var element = document.createElement("a");
                  element.setAttribute("href", url);
                  element.setAttribute("download", "eth.build.module");
                  element.style.display = "none";
                  if (document.body) {
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    setTimeout(function () {
                      URL.revokeObjectURL(url);
                    }, 1000 * 60);
                    setOpenSaveDialog(false);
                  }
                }}
                style={{ ...style, bottom: itemspace * 1 }}
              >
                Save
              </div>
            </div>
          );
          items.push(
            <div style={{ ...positionStyle, bottom: itemspace * 2 }}>
              <div
                onMouseUp={() => {
                  document.getElementById("moduleloader").click();
                }}
                style={{ ...style, bottom: 0 }}
              >
                Load
              </div>
            </div>
          );
        }

        if (width < 1000 && global.customNodes[n].name == "Modules") {
          extraTabs.push(
            <div
              onMouseLeave={mouseLeave}
              style={{
                position: "absolute",
                bottom: 0,
                right: 80,
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={() => {
                setMenu(global.customNodes[n].name);
              }}
            >
              <div
                style={{
                  transform: "rotate(90deg)",
                  transformOrigin: "63% 52%",
                  height: itemspace * items.length + 80,
                  position: "relative",
                  borderRadius: "0px 0px 8px 8px",
                  padding: 6,
                  textAlign: "center",
                  letterSpacing: -1,
                  color: "#888888",
                  backgroundColor: "#222222",
                  opacity: 0.9,
                }}
              >
                {global.customNodes[n].name}

                {items}
              </div>
            </div>
          );
        } else if (global.customNodes[n].name == "Modules") {
          extraTabs.push(
            <div
              onMouseLeave={mouseLeave}
              style={{
                position: "absolute",
                bottom: 0,
                right: 80,
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={() => {
                setMenu(global.customNodes[n].name);
              }}
            >
              <div
                style={{
                  height: itemspace * items.length + 80,
                  position: "relative",
                  borderRadius: "8px 8px 0px 0px",
                  padding: 6,
                  textAlign: "center",
                  letterSpacing: -1,
                  color: "#888888",
                  backgroundColor: "#222222",
                  opacity: 0.9,
                }}
              >
                {global.customNodes[n].name}

                {items}
              </div>
            </div>
          );
        } else if (width < 1000 && global.customNodes[n].name == "Components") {
          extraTabs.push(
            <div
              onMouseLeave={mouseLeave}
              style={{
                position: "absolute",
                bottom: 0,
                left: 80,
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={() => {
                setMenu(global.customNodes[n].name);
              }}
            >
              <div
                style={{
                  transform: "rotate(90deg)",
                  transformOrigin: "46% 76%",
                  height: itemspace * items.length + 80,
                  position: "relative",
                  borderRadius: "0px 0px 8px 8px",
                  padding: 6,
                  textAlign: "center",
                  letterSpacing: -1,
                  color: "#888888",
                  backgroundColor: "#222222",
                  opacity: 0.9,
                }}
              >
                {global.customNodes[n].name}

                {items}
              </div>
            </div>
          );
        } else if (global.customNodes[n].name == "Components") {
          extraTabs.push(
            <div
              onMouseLeave={mouseLeave}
              style={{
                position: "absolute",
                bottom: 0,
                left: 80,
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={() => {
                setMenu(global.customNodes[n].name);
              }}
            >
              <div
                style={{
                  height: itemspace * items.length + 80,
                  position: "relative",
                  borderRadius: "8px 8px 0px 0px",
                  padding: 6,
                  textAlign: "center",
                  letterSpacing: -1,
                  color: "#888888",
                  backgroundColor: "#222222",
                  opacity: 0.9,
                }}
              >
                {global.customNodes[n].name}

                {items}
              </div>
            </div>
          );
        } else {
          customNodes.push(
            <Grid
              key={"girdder" + n}
              onMouseLeave={mouseLeave}
              item
              xs={1}
              style={{
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={() => {
                setMenu(global.customNodes[n].name);
              }}
            >
              <div
                style={{
                  height: itemspace * items.length + 80,
                  position: "relative",
                  borderRadius: "0px 0px 8px 8px",
                  padding: 6,
                  textAlign: "center",
                  letterSpacing: -1,
                  color: "#888888",
                  backgroundColor: "#222222",
                  opacity: 0.9,
                }}
              >
                {width > 800
                  ? global.customNodes[n].name
                  : global.customNodes[n].icon}

                {items}
              </div>
            </Grid>
          );
        }
      } else {
        if (drawing) {
          if (
            global.customNodes[n].name != "Modules" &&
            global.customNodes[n].name != "Special" &&
            global.customNodes[n].name != "Components"
          ) {
            customNodes.push(
              <Grid
                key={"grd" + n}
                onMouseLeave={mouseLeave}
                onMouseEnter={mouseEnter.bind(this, global.customNodes[n].name)}
                item
                xs={1}
                style={{
                  cursor: "pointer",
                  letterSpacing: -3,
                  fontSize: tabFontSize,
                  fontFamily: "'Rubik Mono One', sans-serif",
                }}
                onClick={(e) => {
                  //console.log("SET COLOR",global.customNodes[n].color)
                  setDrawingColor("#" + global.customNodes[n].color);
                  global.graph.canvas.drawing =
                    "#" + global.customNodes[n].color;
                  setDrawing("#" + global.customNodes[n].color);
                  global.graph.canvas.setDirty(true);
                  global.graph.canvas.graph.change();
                }}
              >
                <div
                  style={{
                    borderRadius: "0px 0px 8px 8px",
                    padding: 6,
                    paddingTop: 16,
                    paddingBottom: 8,
                    textAlign: "center",
                    color: "#222222",
                    height: 20,
                    backgroundColor: "#" + global.customNodes[n].color,
                    opacity: 0.6,
                  }}
                ></div>
              </Grid>
            );
          }

          //setDrawingColor
        } else if (width < 1000 && global.customNodes[n].name == "Modules") {
          extraTabs.push(
            <div
              onMouseLeave={mouseLeave}
              onMouseEnter={mouseEnter.bind(this, global.customNodes[n].name)}
              style={{
                overflow: "hidden",
                position: "absolute",
                bottom: 80,
                height: 200,
                right: 0,
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={(e) => {
                //if(e.pageY<height-80){
                //  setMenu("")
                //}else{
                setMenu(global.customNodes[n].name);
                //}
              }}
            >
              <div
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "100px 30px",
                  borderRadius: "8px 8px 0px 0px",
                  padding: 6,
                  textAlign: "center",
                  color: "#222222",
                  height: 200,
                  backgroundColor: "#" + global.customNodes[n].color,
                  opacity: 0.6,
                }}
              >
                {global.customNodes[n].name}
              </div>
            </div>
          );
        } else if (global.customNodes[n].name == "Modules") {
          extraTabs.push(
            <div
              onMouseLeave={mouseLeave}
              onMouseEnter={mouseEnter.bind(this, global.customNodes[n].name)}
              style={{
                position: "absolute",
                bottom: 0,
                right: 80,
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={(e) => {
                if (e.pageY < height - 80) {
                  setMenu("");
                } else {
                  setMenu(global.customNodes[n].name);
                }
              }}
            >
              <div
                style={{
                  borderRadius: "8px 8px 0px 0px",
                  padding: 6,
                  textAlign: "center",
                  color: "#222222",
                  height: 30,
                  backgroundColor: "#" + global.customNodes[n].color,
                  opacity: 0.6,
                }}
              >
                {global.customNodes[n].name}
              </div>
            </div>
          );
        } else if (width < 1000 && global.customNodes[n].name == "Components") {
          extraTabs.push(
            <div
              onMouseLeave={mouseLeave}
              onMouseEnter={mouseEnter.bind(this, global.customNodes[n].name)}
              style={{
                overflow: "hidden",
                position: "absolute",
                bottom: 80,
                height: 200,
                left: 0,
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={(e) => {
                //if(e.pageY<height-80){
                //  setMenu("")
                //}else{
                setMenu(global.customNodes[n].name);
                //}
              }}
            >
              <div
                style={{
                  transform: "rotate(90deg)",
                  transformOrigin: "22px 30px",
                  borderRadius: "8px 8px 0px 0px",
                  padding: 6,
                  textAlign: "center",
                  color: "#222222",
                  height: 200,
                  backgroundColor: "#" + global.customNodes[n].color,
                  opacity: 0.6,
                }}
              >
                {global.customNodes[n].name}
              </div>
            </div>
          );
        } else if (global.customNodes[n].name == "Components") {
          extraTabs.push(
            <div
              onMouseLeave={mouseLeave}
              onMouseEnter={mouseEnter.bind(this, global.customNodes[n].name)}
              style={{
                position: "absolute",
                bottom: 0,
                left: 80,
                zIndex: 3,
                cursor: "pointer",
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={(e) => {
                if (e.pageY < height - 80) {
                  setMenu("");
                } else {
                  setMenu(global.customNodes[n].name);
                }
              }}
            >
              <div
                style={{
                  borderRadius: "8px 8px 0px 0px",
                  padding: 6,
                  textAlign: "center",
                  color: "#222222",
                  height: 30,
                  backgroundColor: "#" + global.customNodes[n].color,
                  opacity: 0.6,
                }}
              >
                {global.customNodes[n].name}
              </div>
            </div>
          );
        } else if (global.customNodes[n].name == "Special") {
        } else {
          customNodes.push(
            <Grid
              key={"grd" + n}
              onMouseLeave={mouseLeave}
              onMouseEnter={mouseEnter.bind(this, global.customNodes[n].name)}
              item
              xs={1}
              style={{
                cursor: "pointer",
                letterSpacing: -3,
                fontSize: tabFontSize,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
              onClick={(e) => {
                if (e.pageY > 60) {
                  setMenu("");
                } else {
                  setMenu(global.customNodes[n].name);
                }
              }}
            >
              <div
                style={{
                  borderRadius: "0px 0px 8px 8px",
                  padding: 6,
                  paddingTop: 16,
                  paddingBottom: 8,
                  textAlign: "center",
                  color: "#222222",
                  height: 20,
                  backgroundColor: "#" + global.customNodes[n].color,
                  opacity: 0.6,
                }}
              >
                {width > 800
                  ? global.customNodes[n].name
                  : global.customNodes[n].icon}
              </div>
            </Grid>
          );
        }
      }

      //}
    }
  }

  let clickawayscreen = "";
  if (!showVideoLibrary && menu) {
    clickawayscreen = (
      <div
        ref={drop}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
        onClick={() => {
          setMenu("");
          if (global.graph && global.graph.canvas.search_box)
            global.graph.canvas.search_box.close();
        }}
      ></div>
    );
  }

  let tools = "";

  if (!showVideoLibrary && global.graph && global.graph.canvas) {
    //console.log("TOOLSm",selectToolActive)
    tools = (
      <div>
        <div
          style={{ margin: 5 }}
          onClick={async (e) => {
            if (global.graph.canvas.search_box) {
              global.graph.canvas.search_box.close();
              setMenu("");
            } else {
              global.graph.canvas.last_mouse_position[0] = e.clientX - 209;
              global.graph.canvas.last_mouse_position[1] = e.clientY;
              global.graph.canvas.showSearchBox();
              //setMenu("search")
              setMenu("");
            }
            global.graph.canvas.last_mouse_position[0] = width / 2;
            global.graph.canvas.last_mouse_position[1] = height / 2;
          }}
        >
          <Tooltip
            title={t("Add Item [space bar]")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>add_circle_outline</Icon>
          </Tooltip>
        </div>

        <div
          style={{ margin: 5 }}
          onClick={async () => {
            if (global.graph.canvas.search_box)
              global.graph.canvas.search_box.close();
            global.graph.canvas.closeSubgraph();
            global.graph.canvas.ds.reset();
            global.graph.canvas.setDirty(true);
            global.graph.canvas.graph.change();
            setDrawing("");
            global.graph.canvas.drawing = false;
            global.graph.canvas.selectToolActive = false;
            setSelectToolActive(global.graph.canvas.selectToolActive);
          }}
        >
          <Tooltip
            title={t("Reorient [esc key]")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>aspect_ratio</Icon>
          </Tooltip>
        </div>

        <div
          style={{ margin: 5, color: drawing ? drawingColor : "#dddddd" }}
          onClick={toggleDraw}
        >
          <Tooltip
            title={t("Draw")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>create</Icon>
          </Tooltip>
        </div>

        <div
          style={{ margin: 5, color: selectToolActive ? "#03A9F4" : "#dddddd" }}
          onClick={async () => {
            //console.log(JSON.stringify(global.graph.canvas.graph))
            global.graph.canvas.selectToolActive =
              !global.graph.canvas.selectToolActive;
            setSelectToolActive(global.graph.canvas.selectToolActive);
            setDrawing("");
            global.graph.canvas.drawing = false;
          }}
        >
          <Tooltip
            title={t("Select [hold ctrl]")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>photo_size_select_small</Icon>
          </Tooltip>
        </div>

        <div
          style={{ margin: 5 }}
          onClick={async () => {
            try {
              global.graph.canvas.copyToClipboard();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Tooltip
            title={t("Copy [ctrl+c]")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>file_copy</Icon>
          </Tooltip>
        </div>

        <div
          style={{ margin: 5 }}
          onClick={async () => {
            global.graph.canvas.pasteFromClipboard();
            global.graph.canvas.setDirty(true);
            global.graph.canvas.graph.change();
          }}
        >
          <Tooltip
            title={t("Paste [ctrl+v]")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>dynamic_feed</Icon>
          </Tooltip>
        </div>

        <div
          style={{ margin: 5, color: moreInfo ? "#03A9F4" : "#dddddd" }}
          onClick={async () => {
            global.graph.canvas.moreInfo = !global.graph.canvas.moreInfo;
            setMoreInfo(global.graph.canvas.moreInfo);
            console.log(
              "global.graph.canvas.moreInfo",
              global.graph.canvas.moreInfo
            );
          }}
        >
          <Tooltip
            title={t("Properties")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>more</Icon>
          </Tooltip>
        </div>

        <div
          style={{ margin: 5 }}
          onClick={async () => {
            //console.log(JSON.stringify(global.graph.canvas.graph))
            global.graph.canvas.selectNodes();
          }}
        >
          <Tooltip
            title={t("Select All [ctrl+a]")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>select_all</Icon>
          </Tooltip>
        </div>

        <div
          style={{ margin: 5 }}
          onClick={async () => {
            //console.log(JSON.stringify(global.graph.canvas.graph))
            global.graph.canvas.deleteSelectedNodes();
            //console.log("global.graph.canvas",global.graph.canvas)
            global.LiteGraphJS.LiteGraph.closeAllContextMenus();
            if (drawing) {
              //console.log("CLEAR INK FROM",global.graph.canvas)
              global.graph.canvas.ink = [];
              global.graph.canvas.setDirty(true);
              global.graph.canvas.graph.change();
            }
          }}
        >
          <Tooltip
            title={t("Delete Selected [delete key]")}
            style={{ marginLeft: 4, cursor: "pointer" }}
          >
            <Icon>delete</Icon>
          </Tooltip>
        </div>
        <div style={{ margin: 5 }}>
          <Tooltip title={t("en")} style={{ cursor: "pointer" }}>
            <img
              src="https://flagcdn.com/w40/gb.png"
              srcset="https://flagcdn.com/w80/gb.png 2x"
              width="40"
              height="23"
              alt="English"
              onClick={() => changeLanguage("en")}
            ></img>
          </Tooltip>
        </div>
        <div style={{ margin: 5 }}>
          <Tooltip title={t("vi")} style={{ cursor: "pointer" }}>
            <img
              src="https://flagcdn.com/w40/vn.png"
              srcset="https://flagcdn.com/w80/vn.png 2x"
              width="40"
              height="23"
              alt="Vietnam"
              onClick={() => changeLanguage("vi")}
            ></img>
          </Tooltip>
        </div>
      </div>
    );
  }

  let extraMenus = "";

  if (!showVideoLibrary) {
    extraMenus = (
      <div>
        <div
          style={{
            zIndex: 8,
            position: "fixed",
            right: 0,
            top: "20%",
            width: 50,
          }}
        >
          <div
            style={{
              borderRadius: "8px 0px 0px 8px",
              textAlign: "left",
              color: "#dddddd",
              height: 490,
              right: 0,
              top: 0,
              width: 475,
              backgroundColor: "#333333",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                letterSpacing: -5,
                fontSize: 32,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
            >
              {tools}
            </div>
          </div>
        </div>

        <div
          style={{
            zIndex: 2,
            marginRight: 8,
            position: "fixed",
            width: width - 16,
            left: 8,
            top: 0,
          }}
          ref={drop2}
        >
          <Grid container spacing={3}>
            {customNodes}
          </Grid>
        </div>

        {extraTabs}

        {clickawayscreen}
      </div>
    );
  }

  let qrReader = "";
  if (readQr) {
    qrReader = (
      <div
        style={{
          zIndex: 5,
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#111111",
        }}
        onClick={() => {
          setReadQr(false);
        }}
      >
        <QrReader
          delay={500}
          onError={(e) => {
            console.log("ERROR", e);
          }}
          onScan={(result) => {
            console.log("SCAN", result);
            if (result) {
              if (result.indexOf("http") >= 0) {
                window.location = result;
              } else {
                window.location = "https://eth.build/" + result;
              }
            }
          }}
          style={{ margin: "auto", maxWidth: "80%", maxHeight: "80%" }}
          resolution={1200}
        />
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <div className="App" style={{ color: "#FFFFFF" }}>
        {qrReader}

        {extraMenus}

        <AboutDialog />
        <SaveDialog
          liteGraph={liteGraph}
          setOpenSaveDialog={setOpenSaveDialog}
          openSaveDialog={openSaveDialog}
          dynamicWidth={dynamicWidth}
          screenshot={currentScreenShot}
        />
        <LoadDialog
          liteGraph={liteGraph}
          setOpenLoadDialog={setOpenLoadDialog}
          openLoadDialog={openLoadDialog}
          dynamicWidth={dynamicWidth}
          live={live}
        />
        <div
          style={{
            zIndex: 1,
            position: "fixed",
            height: barHeight,
            left: 0,
            bottom: 0,
            width: "100%",
          }}
        >
          <div
            style={{
              borderRadius: "8px 8px 0px 0px",
              paddingLeft: 6,
              margin: "auto",
              textAlign: "left",
              color: "#222222",
              height: barHeight,
              left: 0,
              bottom: 0,
              width: 475,
              backgroundColor: "#DFDFDF",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                letterSpacing: -5,
                fontSize: 32,
                fontFamily: "'Rubik Mono One', sans-serif",
              }}
            >
              <span
                style={{
                  margin: 5,
                  borderRight: "1px solid #cccccc",
                  height: barHeight,
                }}
                onClick={() => {
                  liteGraphCanvas.switchLiveMode(true);
                  setLive(!live);
                  liteGraphCanvas.draw();
                }}
              >
                <Tooltip
                  title={live ? t("Edit") : t("View")}
                  style={{ marginRight: 10, cursor: "pointer" }}
                >
                  <Icon>{live ? "build" : "visibility"}</Icon>
                </Tooltip>
              </span>
              <span
                style={{
                  margin: 5,
                  borderRight: "1px solid #cccccc",
                  height: barHeight,
                }}
                onClick={() => {
                  //console.log(liteGraph.status,playing)//cccccc.status==2
                  if (playing) {
                    liteGraph.start();
                    setPlaying(false);
                  } else {
                    liteGraph.stop();
                    setPlaying(true);
                  }
                }}
              >
                <Tooltip
                  title={playing ? t("Playing") : t("Fast Forwarding")}
                  style={{ marginRight: 10, cursor: "pointer" }}
                >
                  <Icon>
                    {playing ? "play_circle_outline" : "fast_forward"}
                  </Icon>
                </Tooltip>
              </span>

              <span
                onClick={() => {
                  setShowVideoLibrary(true);
                  global.showLibrary = true;
                  localStorage.setItem("eth.build.showLibrary", true);
                }}
                onTouchStart={() => {
                  setShowVideoLibrary(true);
                  global.showLibrary = true;
                  localStorage.setItem("eth.build.showLibrary", true);
                }}
              >
                <span style={{ color: "#03a9f4" }}>Block</span>
                <span
                  style={{
                    position: "relative",
                    left: -5,
                    bottom: 15,
                    color: "#f44336",
                    marginBottom: 25,
                  }}
                >
                  .
                </span>
                <span
                  style={{ position: "relative", left: -10, color: "#333" }}
                >
                  sim
                </span>
              </span>

              <span
                style={{
                  margin: 5,
                  borderLeft: "1px solid #cccccc",
                  height: barHeight,
                }}
                onClick={() => {
                  handleOpenSaveDialog();
                }}
              >
                <Tooltip
                  title={t("Save")}
                  style={{ marginLeft: 10, cursor: "pointer" }}
                >
                  <Icon>save</Icon>
                </Tooltip>
              </span>
              <span
                style={{
                  margin: 5,
                  borderLeft: "1px solid #cccccc",
                  height: barHeight,
                }}
                onClick={async () => {
                  // document.getElementById("loadjsonfile").click()
                  setOpenLoadDialog(true);
                }}
              >
                <Tooltip
                  title={t("Load")}
                  style={{ marginLeft: 10, cursor: "pointer" }}
                >
                  <Icon>open_in_browser</Icon>
                </Tooltip>
              </span>
              <span
                style={{
                  margin: 5,
                  borderLeft: "1px solid #cccccc",
                  height: barHeight,
                }}
                onClick={async () => {
                  setOpenAboutDialog(true);
                }}
              >
                <Tooltip
                  title={t("About")}
                  style={{ marginLeft: 10, cursor: "pointer" }}
                >
                  <Icon>info</Icon>
                </Tooltip>
              </span>

              {/* <span
                style={{
                  margin: 5,
                  paddingLeft: 10,
                  borderLeft: "1px solid #cccccc",
                  height: barHeight,
                }}
                onClick={async () => {
                  setReadQr(!readQr);
                }}
              >
                <Tooltip
                  title={t("Scan")}
                  style={{ marginLeft: 10, cursor: "pointer" }}
                >
                  <svg
                    style={{ width: 24, height: 24, opacity: 0.95 }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000000"
                      d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z"
                    />
                  </svg>
                </Tooltip>
              </span> */}

              <span
                style={{
                  margin: 5,
                  borderLeft: "1px solid #cccccc",
                  height: barHeight,
                }}
                onClick={async () => {
                  setShowVideoLibrary(true);
                  global.showLibrary = true;
                  localStorage.setItem("eth.build.showLibrary", true);
                }}
              >
                <Tooltip
                  title={t("Learn More")}
                  style={{ marginLeft: 10, cursor: "pointer" }}
                >
                  <Icon>swap_vert</Icon>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>

        {/* <div style={{position:'absolute',bottom:-100000,left:-100000}}>
      <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}}>
        <input id="loadjsonfile" type="file" name="file" onChange={(e)=>{
            console.log("FILE",e.target.files[0])
            var reader = new FileReader();
            reader.onload = (event) => {
              let compressedString = event.target.result
              //console.log("compressedString",compressedString)
              let loc = compressedString.indexOf("<string>")
              if(loc>0){
                loc += 8
                let endloc = compressedString.indexOf("</string>",loc)
                //console.log("loc",loc,"endloc",endloc)
                compressedString = compressedString.substr(loc,endloc-loc)
                compressedString = compressedString.substr(compressedString.lastIndexOf("/")+1)
              }
              console.log("decompress:",compressedString)
              codec.decompress(compressedString).then(json => {
                console.log("configure graph with:",json)
                if(json){
                  localStorage.setItem("litegraph",JSON.stringify(json));
                  liteGraph.configure( json );
                }
              })
            }
            try{
              reader.readAsText(e.target.files[0])
            }catch(e){console.log(e)}
          }}>
        </input>
      </span>
    </div> */}

        <div style={{ position: "absolute", bottom: -100000, left: -100000 }}>
          <span
            style={{
              border: "1px solid #777777",
              color: live ? "#00ff00" : "#0000ff",
              padding: 5,
              cursor: "pointer",
            }}
          >
            <input
              id="moduleloader"
              type="file"
              name="file"
              onChange={(e) => {
                console.log("FILE", e.target.files[0]);
                var reader = new FileReader();
                reader.onload = (event) => {
                  let compressedString = event.target.result;

                  /*
              let loc = compressedString.indexOf("<string>")
              if(loc>0){
                loc += 8
                let endloc = compressedString.indexOf("</string>",loc)
                compressedString = compressedString.substr(loc,endloc-loc)
                compressedString = compressedString.substr(compressedString.lastIndexOf("/")+1)
              }
              console.log("decompress:",compressedString)*/

                  if (compressedString) {
                    let json = compressedString;
                    //  codec.decompress(compressedString).then(json => {
                    /////////
                    console.log("CLIP:", json);
                    localStorage.setItem("litegrapheditor_clipboard", json);
                    global.graph.canvas.last_mouse_position[0] = width / 2;
                    global.graph.canvas.last_mouse_position[1] = height / 2;
                    global.graph.canvas.pasteFromClipboard();
                    global.graph.canvas.setDirty(true);
                    global.graph.canvas.graph.change();
                    //  })
                  }
                };
                try {
                  reader.readAsText(e.target.files[0]);
                } catch (e) {
                  console.log(e);
                }
              }}
            ></input>
          </span>
        </div>

        <div
          id="mainCanvas"
          style={{
            overscrollBehavior: "none",
            position: "relative",
            overflow: "hidden",
            background: "#222",
            width: "100%",
            height: "100%",
          }}
        >
          <canvas
            id="main"
            width={Math.max(100, width)}
            height={Math.max(100, height)}
            tabIndex={10}
            style={{
              background: "#111111",
              outline: "none",
              borderBottom: "1px solid #666666",
            }}
          ></canvas>
          <div id="reactElements"></div>
        </div>

        <canvas
          id="chart"
          style={{
            outline: "none",
            position: "absolute",
            left: -10000,
            top: -10000,
            zIndex: -1,
            width: 320,
            height: 240,
          }}
        ></canvas>

        <div
          id="clipboarddiv"
          style={{
            position: "absolute",
            left: -10000,
            top: -10000,
            zIndex: -1,
          }}
        ></div>

        <Drawer variant="persistent" anchor="bottom" open={showVideoLibrary}>
          <div style={{ height: height * 0.6, backgroundColor: "#eeeeee" }}>
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                color: "#222222",
                height: barHeight + 3,
                left: 0,
                bottom: 0,
                width: "100%",
                backgroundColor: "#DFDFDF",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  letterSpacing: -5,
                  borderBottom: "1px solid #999999",
                  borderLeft: "1px solid #999999",
                  borderRight: "1px solid #999999",
                  fontSize: 32,
                  fontFamily: "'Rubik Mono One', sans-serif",
                }}
                onTouchStart={async () => {
                  setShowVideoLibrary(false);
                  global.showLibrary = false;
                  localStorage.setItem("eth.build.showLibrary", false);
                }}
                onClick={async () => {
                  setShowVideoLibrary(false);
                  global.showLibrary = false;
                  localStorage.setItem("eth.build.showLibrary", false);
                }}
              >
                <span style={{ color: "#03a9f4" }}>Block</span>
                <span
                  style={{
                    position: "relative",
                    left: -5,
                    bottom: 15,
                    color: "#f44336",
                    marginBottom: 25,
                  }}
                >
                  .
                </span>
                <span
                  style={{ position: "relative", left: -10, color: "#333" }}
                >
                  sim
                </span>
                <span
                  style={{
                    margin: 5,
                    borderLeft: "1px solid #BBBBBB",
                    height: barHeight,
                  }}
                >
                  <Tooltip
                    title={t("Collapse")}
                    style={{ marginLeft: 10, cursor: "pointer" }}
                  >
                    <Icon>swap_vert</Icon>
                  </Tooltip>
                </span>
              </div>
              <div>
                <Grid
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      paddingTop: 15,
                      margin: 5,
                      height: 35,
                    }}
                  >
                    <Tooltip
                      title={t("en")}
                      style={{ marginLeft: 10, cursor: "pointer" }}
                    >
                      <img
                        src="https://flagcdn.com/w40/gb.png"
                        srcset="https://flagcdn.com/w80/gb.png 2x"
                        width="40"
                        alt="English"
                        onClick={() => changeLanguage("en")}
                      ></img>
                    </Tooltip>
                  </span>
                  <span
                    style={{
                      paddingTop: 15,
                      margin: 5,
                      height: 35,
                    }}
                  >
                    <Tooltip
                      title={t("vi")}
                      style={{ marginLeft: 10, cursor: "pointer" }}
                    >
                      <img
                        src="https://flagcdn.com/w40/vn.png"
                        srcset="https://flagcdn.com/w80/vn.png 2x"
                        width="40"
                        height="23"
                        alt="Vietnam"
                        onClick={() => changeLanguage("vi")}
                      ></img>
                    </Tooltip>
                  </span>
                </Grid>
                <StackGrid columnWidth={350}>{allCards}</StackGrid>
              </div>
            </div>
          </div>
        </Drawer>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={"bottomcentersnackbar"}
          open={snackbar && snackbar.msg && snackbar.msg != ""}
          onClose={() => {
            setSnackbar({ msg: "", color: "" });
          }}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          style={{ marginBottom: 100 }}
          message={
            <span
              id="message-id"
              style={{
                fontFamily: "monospace",
                color: snackbar.color ? snackbar.color : "#d33535",
                fontSize: 22,
              }}
            >
              {snackbar.msg}
            </span>
          }
        />
      </div>
    </I18nextProvider>
  );
}

//,borderRadius:"16px 16px 0px 0px"

function useWindowSize() {
  let [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([
        window.clientWidth || window.scrollWidth || window.innerWidth,
        (window.clientHeight || window.scrollHeight || window.innerHeight) - 8,
      ]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default App;
