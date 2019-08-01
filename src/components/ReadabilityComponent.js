import React from "react";

class ReadabilityComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isPanelOpen: false,
      activeEffects: []
    }
  }

  render() {
    return (
      <div className="readability-block">
        <button type="button" aria-label="toggle accessibility" className="navbar-control navbar-control--accessibility">
          <svg width="24" height="29" aria-hidden="true">
            <use xlinkHref="#icon-accessibility"></use>
          </svg>
        </button>
        <div className="collapse readability-block__collapse">
          <ul className="readability-effects">
            for effect in ["greyscale", "negative"] {
              <li>
                <button>
                  effect
                </button>
              </li>
            }
          </ul>
        </div>
      </div>
    )
  }

}

export default ReadabilityComponent;