import React, {Component, PropTypes} from 'react';

import Text from 'app/Viewer/utils/Text';
import 'app/Viewer/scss/conversion_base.scss';
import 'app/Viewer/scss/document.scss';

export class Document extends Component {
  handleMouseUp() {
    if (!this.text.selected()) {
      this.props.unsetSelection();
      return;
    }
    this.onTextSelected();
  }

  handleClick() {
    if (this.props.executeOnClickHandler) {
      this.props.onClick();
    }
  }

  componentDidMount() {
    this.text = Text(this.pagesContainer);
  }

  onTextSelected() {
    this.props.setSelection(this.text.getSelection());
  }

  componentDidUpdate() {
    this.text.renderReferences(this.props.references);
    this.text.simulateSelection(this.props.selection);
  }

  render() {
    const {document} = this.props;

    return (
      <div>
        <div
          className={'_' + document._id + ' document ' + this.props.className}
          ref={(ref) => this.pagesContainer = ref}
          onMouseUp={this.handleMouseUp.bind(this)}
          onTouchEnd={this.handleMouseUp.bind(this)}
          onClick={this.handleClick.bind(this)}
        >
        {document.pages.map((page, index) => {
          let html = {__html: page};
          return <div key={index} dangerouslySetInnerHTML={html} />;
        })}
        </div>
        <style type="text/css" dangerouslySetInnerHTML={{__html: document.css}}></style>
      </div>
    );
  }
}

Document.propTypes = {
  document: PropTypes.object,
  setSelection: PropTypes.func,
  unsetSelection: PropTypes.func,
  resetDocumentViewer: PropTypes.func,
  selection: PropTypes.object,
  references: PropTypes.array,
  className: PropTypes.string,
  onClick: PropTypes.func,
  executeOnClickHandler: PropTypes.bool
};

export default Document;
