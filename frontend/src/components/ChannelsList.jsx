// import { ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// import { useState } from 'react';

const ChannelsList = ({ channels, handleChoose, currentChannelId }) => (
  <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
    {channels.map((channel) => (
      <li key={channel.id} className="bg-light nav-item w-100">
        {channel.removeble
          ? (
            <Button
              id={channel.id}
              onClick={() => handleChoose(channel.id)}
              type="button"
              variant={(Number(currentChannelId) === Number(channel.id) ? 'secondary' : 'light')}
              className="text-start w-100 rounded-0"
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          )
          : (
            <Button
              id={channel.id}
              onClick={() => handleChoose(channel.id)}
              type="button"
              variant={(Number(currentChannelId) === Number(channel.id) ? 'secondary' : 'light')}
              className="w-100 rounded-0 text-start"
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          )}
      </li>
    ))}
  </ul>
);

export default ChannelsList;
