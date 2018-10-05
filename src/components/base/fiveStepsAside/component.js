import React from 'react';

const StepsAsideComponent = (props) => (
  <aside className="section-aside">
      {props.body}
    <img
      src="src/assets/css/images/logo-image.png"
      alt="" className="logo-image" width="51" height="54"
    />
  </aside>
);

export default StepsAsideComponent;
