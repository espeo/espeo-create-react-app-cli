{{setVar "capitalizedName" (capitalize name)}}

import React, { PureComponent } from "react";

interface Props {}

export class {{capitalizedName}} extends PureComponent<Props> {
  render() {
    return <div>{{capitalizedName}} component works!</div>;
  }
}
