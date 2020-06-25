'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageItem = function (_Component) {
	_inherits(MessageItem, _Component);

	function MessageItem(props) {
		_classCallCheck(this, MessageItem);

		var _this = _possibleConstructorReturn(this, (MessageItem.__proto__ || Object.getPrototypeOf(MessageItem)).call(this, props));

		_this.onToggleEditMode = function () {
			_this.setState(function (state) {
				return {
					editMode: !state.editMode,
					editText: _this.props.message.text
				};
			});
		};

		_this.onChangeEditText = function (event) {
			_this.setState({ editText: event.target.value });
		};

		_this.onSaveEditText = function () {
			_this.props.onEditMessage(_this.props.message, _this.state.editText);
			_this.setState({ editMode: false });
		};

		_this.state = {
			editMode: false,
			editText: _this.props.message.text
		};
		return _this;
	}

	_createClass(MessageItem, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    message = _props.message,
			    onRemoveMessage = _props.onRemoveMessage;
			var _state = this.state,
			    editMode = _state.editMode,
			    editText = _state.editText;


			return _react2.default.createElement(
				'li',
				null,
				editMode ? _react2.default.createElement('input', {
					type: 'text',
					value: editText,
					onChange: this.onChangeEditText
				}) : _react2.default.createElement(
					'span',
					null,
					_react2.default.createElement(
						'strong',
						null,
						message.user.username || message.user.userId
					),
					' ',
					message.text,
					message.editedAt && _react2.default.createElement(
						'span',
						null,
						'(Edited)'
					)
				),
				editMode ? _react2.default.createElement(
					'span',
					null,
					_react2.default.createElement(
						'button',
						{ onClick: this.onSaveEditText },
						'Save'
					),
					_react2.default.createElement(
						'button',
						{ onClick: this.onToggleEditMode },
						'Reset'
					)
				) : _react2.default.createElement(
					'button',
					{ onClick: this.onToggleEditMode },
					'Edit'
				),
				!editMode && _react2.default.createElement(
					'button',
					{ type: 'button', onClick: function onClick() {
							return onRemoveMessage(message.uid);
						} },
					'Delete'
				)
			);
		}
	}]);

	return MessageItem;
}(_react.Component);

exports.default = MessageItem;

//# sourceMappingURL=MessageItem.js.map