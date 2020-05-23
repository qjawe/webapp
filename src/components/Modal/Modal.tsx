import React, { useContext } from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUpload } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../state";
// import { useChart } from "../../hooks";
// import { ISideBarProps } from "../SideBar/models";
function Modal({ setChart }: any) {
  const ctx = useContext(AppContext);
  // const { setChart }: ISideBarProps = useChart();

  const importChartFlow = (evt: any) => {
    let fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(evt.target.files[0]);
  };

  const handleFileRead = async (evt: any) => {
    const chartFlow = JSON.parse(evt.target.result);
    // console.log(chartFlow);
    setChart(chartFlow);
    ctx.actions.setModalConfig(false);
  };

  return (
    <div>
      <div
        className={`modal-overlay ${!ctx.state.openModal ? "closed" : null}`}
        id="modal-overlay"
        onClick={(e) => ctx.actions.setModalConfig(false)}
      ></div>

      <div
        className={`modal ${!ctx.state.openModal ? "closed" : null}`}
        id="modal"
      >
        <button
          className="close-button"
          id="close-button"
          onClick={(e) => ctx.actions.setModalConfig(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-guts">
          {ctx.state.modalConfig.type === "import-flow" && (
            <>
              <div className="flow-import-title">Import from Local</div>
              <div className="flow-input-field">
                <input
                  className="flow-file-import"
                  type="file"
                  id="file"
                  accept="application/JSON"
                  onChange={(e) => importChartFlow(e)}
                />
                <div>
                  <div className="flow-upload-icon">
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  <div className="flow-upload-icon-title">
                    Drop a flow to import
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
