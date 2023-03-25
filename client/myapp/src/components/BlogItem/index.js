import { useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";

const BlogItem = (props) => {
  const { onDelete, itemDetails, onUpdate } = props;
  const { id, title, content } = itemDetails;
  const [formData, setFormData] = useState({
    itemTitle: title,
    itemContent: content,
    updateFlag: 0,
  });
  const onDel = () => {
    onDelete(id);
  };

  const onUp = () => {
    setFormData({ ...formData, updateFlag: 1 });
    const { itemTitle, itemContent } = formData;
    onUpdate(id, itemTitle, itemContent);
  };
  const changeTitle = (event) => {
    setFormData({
      ...formData,
      itemTitle: event.target.value,
      updateFlag: 0,
    });
  };

  const changeContent = (event) => {
    setFormData({
      ...formData,
      itemContent: event.target.value,
      updateFlag: 0,
    });
  };

  const refresh = () => {
    setFormData({
      itemTitle: title,
      itemContent: content,
      updateFlag: 0,
    });
  };

  return (
    <>
      <li className="listItem">
        <div className="blogContentContainer">
          <p className="title">{title}</p>
          <p className="info">{content}</p>
        </div>
        <div className="p-1 optionsContainer">
          <Popup
            trigger={<button className="button update">Update</button>}
            modal
            nested
            onOpen={refresh}
            onClose={refresh}
          >
            {(close) => (
              <div
                calssName="addNewBlogContainer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "25px",
                  paddingLeft: "60px",
                }}
              >
                <h1 className="heading">Update Blog</h1>
                <div
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="titleInput" className="titleInputTag">
                    Title
                  </label>
                  <input
                    type="text"
                    calssName="inputTagCss"
                    id="titleInput"
                    name="titleInput"
                    placeholder="Enter title"
                    style={{ fontSize: "19px" }}
                    onChange={changeTitle}
                    value={formData.itemTitle}
                  />
                  <label htmlFor="contentInput" className="titleInputTag">
                    Content
                  </label>
                  <input
                    type="text"
                    className="inputTagCss"
                    id="contentInput"
                    name="contentInput"
                    placeholder="Enter Content"
                    maxLength="100"
                    style={{
                      minHeight: "150px",
                      padding: "10px",
                      fontSize: "19px",
                    }}
                    value={formData.itemContent}
                    onChange={changeContent}
                  />
                  {formData.updateFlag === 0 ? null : (
                    <div>
                      <p style={{ color: "green", fontSize: "20px" }}>
                        Update Successfull
                      </p>
                    </div>
                  )}
                  <div style={{ marginTop: "15px" }}>
                    <button
                      type="button"
                      onClick={onUp}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => close()}
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
          <button onClick={onDel} type="button" className="button delete">
            Delete
          </button>
        </div>
      </li>
      <hr />
    </>
  );
};

export default BlogItem;
