import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();

    return <Component navigate={navigate} {...location} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;
