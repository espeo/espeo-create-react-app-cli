import { connect } from "react-redux";

import { RootStore } from "@core/store";

import { {{capitalize name}} } from "./{{toLowerCase name}}.component";

interface {{capitalize name}}PropsAttrs {}

interface {{capitalize name}}PropsActions {}

export type {{capitalize name}}Props = {{capitalize name}}PropsAttrs & {{capitalize name}}PropsActions;

const mapStateToProps = (store: RootStore): {{capitalize name}}PropsAttrs => ({});

const mapDispatchToProps: {{capitalize name}}PropsActions = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)({{capitalize name}});
