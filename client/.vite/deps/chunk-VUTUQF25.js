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

// node_modules/@mui/material/CardMedia/CardMedia.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/CardMedia/cardMediaClasses.js
function getCardMediaUtilityClass(slot) {
  return generateUtilityClass("MuiCardMedia", slot);
}
var cardMediaClasses = generateUtilityClasses("MuiCardMedia", ["root", "media", "img"]);
var cardMediaClasses_default = cardMediaClasses;

// node_modules/@mui/material/CardMedia/CardMedia.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    isMediaComponent,
    isImageComponent
  } = ownerState;
  const slots = {
    root: ["root", isMediaComponent && "media", isImageComponent && "img"]
  };
  return composeClasses(slots, getCardMediaUtilityClass, classes);
};
var CardMediaRoot = styled_default("div", {
  name: "MuiCardMedia",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      isMediaComponent,
      isImageComponent
    } = ownerState;
    return [styles.root, isMediaComponent && styles.media, isImageComponent && styles.img];
  }
})({
  display: "block",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  variants: [{
    props: {
      isMediaComponent: true
    },
    style: {
      width: "100%"
    }
  }, {
    props: {
      isImageComponent: true
    },
    style: {
      objectFit: "cover"
    }
  }]
});
var MEDIA_COMPONENTS = ["video", "audio", "picture", "iframe", "img"];
var IMAGE_COMPONENTS = ["picture", "img"];
var CardMedia = React.forwardRef(function CardMedia2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCardMedia"
  });
  const {
    children,
    className,
    component = "div",
    image,
    src,
    style,
    ...other
  } = props;
  const isMediaComponent = MEDIA_COMPONENTS.includes(component);
  const composedStyle = !isMediaComponent && image ? {
    backgroundImage: `url("${image}")`,
    ...style
  } : style;
  const ownerState = {
    ...props,
    component,
    isMediaComponent,
    isImageComponent: IMAGE_COMPONENTS.includes(component)
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(CardMediaRoot, {
    className: clsx_default(classes.root, className),
    as: component,
    role: !isMediaComponent && image ? "img" : void 0,
    ref,
    style: composedStyle,
    ownerState,
    src: isMediaComponent ? image || src : void 0,
    ...other,
    children
  });
});
true ? CardMedia.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: chainPropTypes(import_prop_types.default.node, (props) => {
    if (!props.children && !props.image && !props.src && !props.component) {
      return new Error("MUI: Either `children`, `image`, `src` or `component` prop must be specified.");
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: import_prop_types.default.string,
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: import_prop_types.default.string,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var CardMedia_default = CardMedia;

export {
  getCardMediaUtilityClass,
  cardMediaClasses_default,
  CardMedia_default
};
//# sourceMappingURL=chunk-VUTUQF25.js.map
