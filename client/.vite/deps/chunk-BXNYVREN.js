import {
  GlobalStyles_default,
  defaultTheme_default,
  extendSxProp,
  identifier_default,
  require_jsx_runtime
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

// node_modules/@mui/material/GlobalStyles/GlobalStyles.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function GlobalStyles(props) {
  return (0, import_jsx_runtime.jsx)(GlobalStyles_default, {
    ...props,
    defaultTheme: defaultTheme_default,
    themeId: identifier_default
  });
}
true ? GlobalStyles.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: import_prop_types.default.oneOfType([import_prop_types.default.array, import_prop_types.default.func, import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string, import_prop_types.default.bool])
} : void 0;
var GlobalStyles_default2 = GlobalStyles;

// node_modules/@mui/material/zero-styled/index.js
var React2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
function globalCss(styles) {
  return function GlobalStylesWrapper(props) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      (0, import_jsx_runtime2.jsx)(GlobalStyles_default2, {
        styles: typeof styles === "function" ? (theme) => styles({
          theme,
          ...props
        }) : styles
      })
    );
  };
}
function internal_createExtendSxProp() {
  return extendSxProp;
}

export {
  GlobalStyles_default2 as GlobalStyles_default,
  globalCss,
  internal_createExtendSxProp
};
//# sourceMappingURL=chunk-BXNYVREN.js.map
