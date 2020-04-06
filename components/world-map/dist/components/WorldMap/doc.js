"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doc = exports.themeDoc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var themeDoc = {
  'worldMap.color': {
    description: 'The color for each individual dot when a color is not passed as a prop',
    type: 'string',
    defaultValue: 'light-3'
  },
  'worldMap.continent.active': {
    description: "The size of the visual dots belonging to a continent when the\ncontinent is being hovered.",
    type: 'string',
    defaultValue: '8px'
  },
  'worldMap.continent.base': {
    description: "The size of the visual dots belonging to a continent that is\nnot being hovered.",
    type: 'string',
    defaultValue: '6px'
  },
  'worldMap.hover.color': {
    description: 'The color for an individual dot when it is being hovered',
    type: 'string',
    defaultValue: 'light-4'
  },
  'worldMap.place.active': {
    description: "The size of a visual dot for an individual place in the map \nwhen it is being hovered.",
    type: 'string',
    defaultValue: '20px'
  },
  'worldMap.place.base': {
    description: "The size of the visual dot representing an individual place \nin the map when it is not being hovered.",
    type: 'string',
    defaultValue: '8px'
  },
  'worldMap.extend': {
    description: 'Any additional style for the WorldMap.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;

var doc = function doc(WorldMap) {
  var DocumentedWorldMap = (0, _reactDesc.describe)(WorldMap).availableAt((0, _utils.getAvailableAtBadge)('WorldMap')).description('A map of the world, or a continent.').usage("import { WorldMap } from 'grommet';\n<WorldMap />").intrinsicElement('svg');
  DocumentedWorldMap.propTypes = _objectSpread({}, _utils.genericProps, {
    color: _utils.colorPropType.description('Default color'),
    continents: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      color: _utils.colorPropType,
      name: _reactDesc.PropTypes.oneOf(['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America']).isRequired,
      onClick: _reactDesc.PropTypes.func,
      onHover: _reactDesc.PropTypes.func
    })).description('Continent details.'),
    fill: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['horizontal', 'vertical']), _reactDesc.PropTypes.bool]).description('Whether the width and/or height should fill the container.'),
    onSelectPlace: _reactDesc.PropTypes.func.description("Called when the user clicks on a place.\n        It is passed the location."),
    places: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      color: _utils.colorPropType,
      name: _reactDesc.PropTypes.string,
      // for a11y aria-label
      location: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number).isRequired,
      onClick: _reactDesc.PropTypes.func,
      onHover: _reactDesc.PropTypes.func
    })).description('Place details.'),
    hoverColor: _utils.colorPropType.description('Color when hovering over places while selecting.')
  });
  return DocumentedWorldMap;
};

exports.doc = doc;

//# sourceMappingURL=doc.js.map