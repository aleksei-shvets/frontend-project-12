import { ListGroup } from 'react-bootstrap';
import { RemovebleItem, UnremovebleItem } from './channelsListItem.jsx';

const ChannelsList = ({ channels, handleChoose }) => (
  <ListGroup as="ul" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
    {channels.map((channel) => (
      <ListGroup.Item as="li" key={channel.id} className="nav-item w-100">
        {channel.removeble
          ? <RemovebleItem channel={channel} handleClick={handleChoose} />
          : <UnremovebleItem channel={channel} handleClick={handleChoose} />}
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default ChannelsList;
