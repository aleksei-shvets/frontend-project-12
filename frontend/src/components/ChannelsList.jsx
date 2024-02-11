// import { ListGroup } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import { RemovableItem, UnremovableItem } from './channelItem.jsx';
// import { useState } from 'react';

const ChannelsList = ({ channels, handleChoose, currentChannelId }) => (
  <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
    {channels.map((channel) => (
      <li key={channel.id} className="bg-light nav-item w-100">
        {channel.removable
          ? (
            <RemovableItem
              channel={channel}
              handleChoose={handleChoose}
              currentChannelId={currentChannelId}
            />
          )
          : (
            <UnremovableItem
              channel={channel}
              handleChoose={handleChoose}
              currentChannelId={currentChannelId}
            />
          )}
      </li>
    ))}
  </ul>
);

export default ChannelsList;
