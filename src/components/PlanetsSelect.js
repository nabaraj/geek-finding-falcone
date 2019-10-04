import React, { Component } from "react";

class PlanetsSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPlanets: [],
      selectedValue: ""
    };
    this.filterPlanets = this.filterPlanets.bind(this);
    this.clearSelect = this.clearSelect.bind(this);
    this.displayValue = this.displayValue.bind(this);
    this.removeSelect = this.removeSelect.bind(this);
    this.showLists = this.showLists.bind(this);
    //this.node = useRef();
    this.node = React.createRef();
  }
  componentWillMount() {
    document.addEventListener("mousedown", this.clearSelect);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.clearSelect);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.resetApp) {
      this.setState({
        filteredPlanets: [],
        selectedValue: ""
      });
    }
  }
  filterPlanets(e) {
    let inputText = e.target.value;
    let filteredPlanets = this.props.planetsArr.filter((item, index) => {
      return item.name.toLowerCase().includes(inputText);
    });
    this.setState({
      filteredPlanets
    });
  }
  clearSelect(e) {
    if (!this.node.current.contains(e.target)) {
      this.setState({
        filteredPlanets: []
      });
    }
  }
  displayValue(value, itemIndex) {
    this.setState({
      selectedValue: value,
      filteredPlanets: []
    });
    this.props.selectPlanete(itemIndex);
  }
  removeSelect() {
    this.setState({
      selectedValue: ""
    });

    this.props.selectPlanete(`-${this.props.parentIndex}`);
  }
  showLists() {
    let filteredPlanets = this.props.planetsArr;
    this.setState({
      filteredPlanets
    });
  }
  render() {
    let { parentIndex, trackObject } = this.props;
    let { filteredPlanets, selectedValue } = this.state;

    return (
      <div className="form-group autoComplete" ref={this.node}>
        {selectedValue ? (
          <div className="form-control tagContainer">
            <span className="badge badge-primary">
              {selectedValue}
              <span className="badge badge-light" onClick={this.removeSelect}>
                X
              </span>
            </span>
          </div>
        ) : (
          <input
            list="planetsLists"
            name="myBrowser"
            onChange={this.filterPlanets}
            placeholder="Search Planets"
            className="form-control"
            autoComplete="off"
            onFocus={this.showLists}
          />
        )}

        {filteredPlanets.length > 0 && (
          <div className="list-group">
            {filteredPlanets.map((item, index) => {
              return (
                <a
                  href="#"
                  key={`${item.name}-${index}`}
                  value={`${item.name}`}
                  className={`list-group-item list-group-item-action${
                    item.disabled ? " disabled" : ""
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    this.displayValue(
                      item.name,
                      `${item.orgIndex}-${parentIndex}`
                    );
                  }}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default PlanetsSelect;
