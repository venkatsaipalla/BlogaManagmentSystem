import { withRouter } from "react-router-dom";
import { Component } from "react";
import Popup from "reactjs-popup";
import BlogItem from "../BlogItem/index";
import Cookies from "js-cookie";
import { v4 } from "uuid";
import "reactjs-popup/dist/index.css";
import "./index.css";

const initialTodosList = [
  {
    id: 1,
    title: "Book the ticket for today evening",
    content: "content-1",
  },
  {
    id: 2,
    title: "Rent the movie for tomorrow movie night",
    content: "content-2",
  },
  {
    id: 3,
    title: "Confirm the slot for the yoga session tomorrow morning",
    content: "content-3",
  },
  {
    id: 4,
    title: "Drop the parcel at Bloomingdale",
    content: "content-4",
  },
  {
    id: 5,
    title: "Order fruits on Big Basket",
    content: "content-5",
  },
  {
    id: 6,
    title: "Fix the production issue",
    content: "content-6",
  },
];

// Write your code here

class Home extends Component {
  state = {
    todoList: initialTodosList,
    newTitle: "",
    newContent: "",
  };

  onDelete = (uniqueNo) => {
    const { todoList } = this.state;
    const filteredData = todoList.filter(
      (eachItem) => eachItem.id !== uniqueNo
    );
    this.setState({ todoList: filteredData });
  };

  onUpdate = (id, itemTitle, itemContent) => {
    const { todoList } = this.state;
    const filteredData = todoList.map((eachItem) => {
      if (eachItem.id === id) {
        const newItem = {
          id,
          title: itemTitle,
          content: itemContent,
        };
        return newItem;
      }
      return eachItem;
    });

    this.setState({ todoList: filteredData, newTitle: "", newContent: "" });
  };

  onClickLogout = () => {
    Cookies.remove("jwt_token");
    const { history } = this.props;
    history.replace("/login");
  };

  addBlog = () => {
    const { newTitle, newContent } = this.state;
    const newItem = { id: v4(), title: newTitle, content: newContent };
    this.setState((prevState) => ({
      todoList: [...prevState.todoList, newItem],
      newTitle: "",
      newContent: "",
    }));
    return false;
  };

  changeContent = (event) => {
    this.setState({
      newContent: event.target.value,
    });
  };

  changeTitle = (event) => {
    this.setState({
      newTitle: event.target.value,
    });
  };

  refresh = () => {
    this.setState({
      newTitle: "",
      newContent: "",
    });
  };

  render() {
    const { todoList, newTitle, newContent } = this.state;
    return (
      <div className="bg">
        <div className="bg-container">
          <div className="mainContainer">
            <h1 className="heading">Blog Items</h1>
            <div calssName="p-2">
              <button
                className="btn btn-danger"
                style={{ marginRight: "10px" }}
                onClick={this.onClickLogout}
              >
                Logout
              </button>
              <Popup
                trigger={<button className="btn btn-primary">Add Blog</button>}
                modal
                nested
                onOpen={this.refresh}
                onClose={this.refresh}
              >
                {(close) => (
                  <div
                    calssName="addNewBlogContainer"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "25px",
                      justifyContent: "center",
                      paddingLeft: "60px",
                    }}
                  >
                    <h1 className="heading">Add New Blog</h1>
                    <div
                      style={{
                        marginLeft: "20px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label for="titleInput" className="titleInputTag">
                        Title
                      </label>
                      <input
                        type="text"
                        calssName="inputTagCss"
                        id="titleInput"
                        name="titleInput"
                        placeholder="Enter title"
                        style={{ fontSize: "19px" }}
                        onChange={this.changeTitle}
                        value={newTitle}
                      />
                      <label for="contentInput" className="titleInputTag">
                        Content
                      </label>
                      <input
                        type="text"
                        calssName="inputTagCss"
                        id="contentInput"
                        name="contentInput"
                        placeholder="Enter Content"
                        maxLength="100"
                        style={{
                          minHeight: "150px",
                          padding: "10px",
                          fontSize: "19px",
                        }}
                        value={newContent}
                        onChange={this.changeContent}
                      />
                      <div style={{ marginTop: "15px" }}>
                        <button
                          type="button"
                          onClick={this.addBlog}
                          className="btn btn-primary"
                        >
                          Add
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
            </div>
          </div>
          <hr />
          <ul className="listContainer">
            {todoList.map((eachItem) => (
              <BlogItem
                key={eachItem.id}
                onDelete={this.onDelete}
                itemDetails={eachItem}
                onUpdate={this.onUpdate}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default withRouter(Home);
