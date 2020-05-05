import React from "react";
import "./ChatButton.scss";
import ChatBox from "3box-chatbox-react";
import Box from "3box";

class ChatButton extends React.Component<any, any> {
  SPACE_NAME = "MoneyLego";
  THREAD_NAME = "globalChat";
  constructor(props: any) {
    super(props);
    this.state = {
      // box: {},
      myProfile: {},
      myAddress: "",
      isReady: false,
    };
  }
  async componentDidMount() {
    let { box } = this.state;
    box = await Box.create(window.ethereum);
    this.setState({ box });
  }
  handleLogin = async () => {
    let { box } = this.state;
    const myAddress = this.props.walletAddress;
    await box.auth([], { address: myAddress });
    const myProfile = await Box.getProfile(myAddress);

    box.onSyncDone(() => {
      this.setState({ box });
    });
    this.setState({ box, myProfile, myAddress, isReady: true });
  };
  render() {
    const { box, myAddress, myProfile } = this.state;
    return (
      <div className="chat-bar">
        {box && (
          <ChatBox
            // required
            // spaceName='3boxtestcomments'
            // threadName='ghostChatTest5'
            spaceName={this.SPACE_NAME}
            threadName={this.THREAD_NAME}
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
        )}
      </div>
    );
  }
}

export default ChatButton;
