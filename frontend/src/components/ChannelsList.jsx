// import { ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
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
              className="text-start w-100 rounded-pill mb-1"
            >
              <span className="me-1">#</span>
              {channel.name}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Button>
          )
          : (
            <Button
              id={channel.id}
              onClick={() => handleChoose(channel.id)}
              type="button"
              variant={(Number(currentChannelId) === Number(channel.id) ? 'secondary' : 'light')}
              className="w-100 rounded-pill text-start mb-1"
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
