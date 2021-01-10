import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import Delete from "./Delete";
import Display from "./Display";
import Edit from "./Edit";
import Tagging from "./Tagging";

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  getItems() {
    axios
      .get("/api/v1/items")
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getItems();
  }

  deleteItem = () => {
    axios.delete(`/api/v1/items/${id}`);
  };

  render() {
    const currentPage = window.location.href;
    const currentID = currentPage.substr(38);
    return (
      <>
        <h1>Items with Tag: {currentID}</h1>
        <div>
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th>Date (DD/MM/YYYY)</th>
                <th>Time</th>
                <th>Title</th>
                <th>Details</th>
                <th>Tag</th>
                <th>Done?</th>
                <th colspan="3"></th>
              </tr>
            </thead>

            {this.state.items
              .filter((item) => item.Tag == currentID)
              .map((x) => {
                return (
                  <tbody>
                    <td>
                      {x.Date.substr(8, 2)}/{x.Date.substr(5, 2)}/
                      {x.Date.substr(0, 4)}
                    </td>
                    <td>{x.Time.substr(11, 5)}</td>
                    <td>
                      <Display title={x.Title} number={x.id.toString()} />
                    </td>
                    <td>{x.Details}</td>
                    <td>
                      <Tagging label={x.Tag} />
                    </td>
                    <td>{x.Done.toString()}</td>
                    <td>
                      <Edit number={x.id} />
                    </td>
                    <td>
                      <Delete number={x.id} />
                    </td>
                  </tbody>
                );
              })}
          </table>
        </div>
      </>
    );
  }
}

export default ItemsContainer;
