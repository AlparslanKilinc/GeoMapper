import React from 'react';
import '../../styles/view.css';
import Modal from '@mui/material/Modal';

const View = ({ map, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} className="view-background">
      <div className="view-content" onClick={(e) => e.stopPropagation()}>
        <div className="view-left-pane">
          <img src={map.thumbnailUrl} alt="map" />
        </div>
        <div className="view-right-pane">
          <div className="view-info-box">
            <div className="view-title">{map.title}</div>
            <div className="view-author">{map.authorUserName}</div>
            <div className="view-description">{map.description}</div>
            <div className="view-tags">
              {map.tags.map((tag) => (
                <div className="view-tag">{tag}</div>
              ))}
            </div>
          </div>
          <div className="view-comment-section">{/* comments here */}</div>
        </div>
      </div>
    </Modal>
  );
};

export default View;
