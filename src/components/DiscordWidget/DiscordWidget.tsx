import React from "react";
import "./DiscordWidget.scss";
import WidgetBot from "@widgetbot/react-embed";
import Crate from "@widgetbot/crate";

function DiscordWidget() {
  // const crate = new Crate({
  //   server: "712217378888613968",
  //   channel: "712217378888613971",
  // });
  return (
    <div className="discord-widget-view">
      <div className="discord-widget-container">
        {/* <iframe
          src="https://discordapp.com/widget?id=712217378888613968&theme=dark"
          title="discordapp"
          allowTransparency={false}
          frameBorder="0"
          className="discord-widget"
          style={{ height: 400 }}
        ></iframe> */}
        {/* <WidgetBot
          server="712217378888613968"
          channel="712217378888613971"
          shard="https://e.widgetbot.io"
          className="discord-widget"
        /> */}
        {/* <WidgetBot
          server="712217378888613968"
          channel="712217378888613971"
          shard="https://e.widgetbot.io"
          className="discord-widget"
          
        /> */}
        {/* {crate} */}
        {/* <iframe src="https://discordapp.com/widget?id=712217378888613968&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe> */}
        {/* <iframe
          src="https://valendres.github.io/react-discord-widget/?serverId=637716460411682826"
          title="discord-widget"
          width="260"
          height="300"
          allowTransparency={false}
          frameBorder="0"
        ></iframe> */}
      </div>
    </div>
  );
}

export default DiscordWidget;
