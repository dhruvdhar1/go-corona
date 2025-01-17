"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledWorldMap = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var fillStyle = function fillStyle(fillProp) {
  if (fillProp === 'horizontal') {
    return "\n      width: 100%;\n      height: unset;\n    ";
  }

  if (fillProp === 'vertical') {
    return "\n      width: unset;\n      height: 100%;\n    ";
  }

  if (fillProp) {
    return "\n      width: 100%;\n      height: 100%;\n    ";
  }

  return '';
}; // undefined fillProp has width for backwards compatibility


var StyledWorldMap = _styledComponents["default"].svg(_templateObject(), _utils.genericStyles, function (props) {
  return props.fillProp !== undefined ? fillStyle(props.fillProp) : 'width: 100%;';
}, function (props) {
  return props.theme.worldMap && props.theme.worldMap.extend;
});

exports.StyledWorldMap = StyledWorldMap;
StyledWorldMap.defaultProps = {};
Object.setPrototypeOf(StyledWorldMap.defaultProps, _defaultProps.defaultProps);

//# sourceMappingURL=StyledWorldMap.js.map