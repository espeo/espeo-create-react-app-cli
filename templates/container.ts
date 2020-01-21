{{setVar "capitalizedName" (capitalize name)}}

import { connect } from "react-redux";

import { RootStore } from "@core/store";

import { {{capitalizedName}} } from "./{{toLowerCase name}}.component";

interface {{capitalizedName}}PropsAttrs {}

interface {{capitalizedName}}PropsActions {}

export type {{capitalizedName}}Props = {{capitalizedName}}PropsAttrs & {{capitalizedName}}PropsActions;

const mapStateToProps = (store: RootStore): {{capitalizedName}}PropsAttrs => ({});

const mapDispatchToProps: {{capitalizedName}}PropsActions = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)({{capitalizedName}});
