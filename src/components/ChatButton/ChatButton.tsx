import React from "react";
import "./ChatButton.scss";
import ChatBox from "3box-chatbox-react";
import Box from "3box";

class ChatButton extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // box: {},
      myProfile: {},
      myAddress: "",
      isReady: false,
    };
  }
  handleLogin = async () => {
    const myAddress = this.props.walletAddress;

    const box = await Box.openBox(myAddress, window.ethereum, {});
    const myProfile = await Box.getProfile(myAddress);

    box.onSyncDone(() => this.setState({ box }));
    this.setState({ box, myProfile, myAddress, isReady: true });
  };
  render() {
    const { box, myAddress, myProfile, isReady } = this.state;
    return (
      <div className="chat-bar">
        <ChatBox
          // required
          // spaceName='3boxtestcomments'
          // threadName='ghostChatTest5'
          spaceName="MoneyLego"
          threadName="globalChat"
          // case A & B
          box={box}
          currentUserAddr={myAddress}
          // case B
          //@ts-ignore
          loginFunction={this.handleLogin}
          // case C
          // ethereum={window.ethereum}

          // optional
          // mute
          openOnMount
          popupChat
          // colorTheme="#1168df"
          // threadOpts={{}}
          // spaceOpts={{}}
          // useHovers={true}
          currentUser3BoxProfile={myProfile}
          userProfileURL={(address) =>
            `https://userprofiles.co/user/${address}`
          }
        />
      </div>
    );
  }
}

export default ChatButton;
