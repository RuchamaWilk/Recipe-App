import {
  Paper_default
} from "./chunk-WFF7VSZJ.js";
import {
  useDefaultProps
} from "./chunk-K6UZHT2X.js";
import {
  chainPropTypes,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime,
  styled_default
} from "./chunk-2ZLD634V.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  require_prop_types
} from "./chunk-ZNVVQF6B.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/material/Card/Card.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/Card/cardClasses.js
function getCardUtilityClass(slot) {
  return generateUtilityClass("MuiCard", slot);
}
var cardClasses = generateUtilityClasses("MuiCard", ["root"]);
var cardClasses_default = cardClasses;

// node_modules/@mui/material/Card/Card.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getCardUtilityClass, classes);
};
var CardRoot = styled_default(Paper_default, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  overflow: "hidden"
});
var Card = React.forwardRef(function Card2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCard"
  });
  const {
    className,
    raised = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    raised
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(CardRoot, {
    className: clsx_default(classes.root, className),
    elevation: raised ? 8 : void 0,
    ref,
    ownerState,
    ...other
  });
});
true ? Card.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: chainPropTypes(import_prop_types.default.bool, (props) => {
    if (props.raised && props.variant === "outlined") {
      return new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.');
    }
    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Card_default = Card;

export {
  getCardUtilityClass,
  cardClasses_default,
  Card_default
};
//# sourceMappingURL=chunk-DQ7OJY5V.js.map
