import React, { Component } from "react";
import axios from "axios";

function oneToN(n) {
  const result = [];
  for (let index = 0; index < n; index++) {
    result[index] = index + 1;
  }
  return result;
}

const helperDay = oneToN(31);
const helperMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthConvert = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};
const helperYear = oneToN(10).map((x) => x + 2020);
const helperHour = oneToN(24);
const helperMin = oneToN(60);

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  getItems() {
    axios
      .get(`/api/v1/items/`)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getItems();
  }

  packnsend(input, id) {
    const result = {
      Date: input[0] + "-" + input[1] + "-" + input[2],
      Time: input[3] + ":" + input[4],
      Title: input[5],
      Details: input[6],
      Tag: input[7],
      Done: input[8],
    };
    this.insertData(result, id);
  }

  insertData(data, id) {
    axios.patch(`/api/v1/items/${id}`, data).then((res) => console.log(res));
    window.location.replace("http://localhost:3000/home/about");
  }

  render() {
    const currentPage = window.location.href.substr(28);
    const currentID = currentPage.substr(0, currentPage.length - 5);
    return (
      <>
        <h1>Editing Item</h1>
        {this.state.items
          .filter((item) => item.id.toString() == currentID)
          .map((x) => (
            <form>
              <label>Date:</label>
              <div class="form-row">
                <div class="form-group col-md-1">
                  <select id="inputDay" class="form-control" required>
                    <option selected disabled>
                      {x.Date.substr(8, 2)}
                    </option>
                    {helperDay.map((y) => (
                      <option>{y}</option>
                    ))}
                  </select>
                  <div class="invalid-tooltip">Please select a day.</div>
                </div>
                <div class="form-group col-md-1">
                  <select id="inputMonth" class="form-control">
                    <option selected disabled>
                      {helperMonth[Number(x.Date.substr(5, 2)) - 1]}
                    </option>
                    {helperMonth.map((y) => (
                      <option>{y}</option>
                    ))}
                  </select>
                </div>
                <div class="form-group col-md-1">
                  <select id="inputYear" class="form-control">
                    <option selected>{x.Date.substr(0, 4)}</option>
                    {helperYear.map((y) => (
                      <option>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
              <label>Time (24hr):</label>
              <div class="form-row">
                <div class="form-group col-md-1">
                  <select id="inputHour" class="form-control">
                    <option selected disabled>
                      {x.Time.substr(11, 2)}
                    </option>
                    {helperHour.map((x) => (
                      <option>{x - 1}</option>
                    ))}
                  </select>
                </div>
                <div class="form-group col-md-1">
                  <select id="inputMin" class="form-control">
                    <option selected disabled>
                      {x.Time.substr(14, 2)}
                    </option>
                    {helperMin.map((x) => (
                      <option>{x - 1}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputTitle">Title:</label>
                  <input
                    type="title"
                    class="form-control"
                    id="inputTitle"
                    placeholder="Title"
                    value={x.Title}
                  ></input>
                </div>
                <div class="form-group col-md-2">
                  <label for="inputTag">Tag:</label>
                  <input
                    type="tag"
                    class="form-control"
                    id="inputTag"
                    placeholder="Tag"
                    value={x.Tag}
                  ></input>
                </div>
              </div>
              <div class="form-group">
                <label for="inputDetail">Details:</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="inputDetail"
                  placeholder="What to do..."
                  rows="3"
                  value={x.Details}
                ></textarea>
              </div>
              <label>Done?</label>
              <div class="form-row">
                <div class="form-group col-md-1">
                  <select id="inputDone" class="form-control">
                    <option selected disabled>
                      {x.Done.toString()}
                    </option>
                    <option>true</option>
                    <option>false</option>
                  </select>
                </div>
              </div>
            </form>
          ))}
        <button
          class="btn btn-primary"
          type="submit"
          onClick={() =>
            this.packnsend(
              [
                document.getElementById("inputYear").value,
                monthConvert[document.getElementById("inputMonth").value],
                document.getElementById("inputDay").value,
                document.getElementById("inputHour").value,
                document.getElementById("inputMin").value,
                document.getElementById("inputTitle").value,
                document.getElementById("inputDetail").value,
                document.getElementById("inputTag").value,
                document.getElementById("inputDone").value,
              ],
              currentID
            )
          }
        >
          Update
        </button>
      </>
    );
  }
}

export default EditForm;
