import { Button } from 'react-bootstrap';

const RemovebleItem = ({ channel, handleClick }) => (
  <Button onClick={handleClick} type="button" className="w-100 rounded-0 text-start btn">
    <span className="me-1">#</span>
    {channel.name}
  </Button>
);

const UnremovebleItem = ({ channel, handleClick }) => (
  <Button onClick={handleClick} type="button" className="w-100 rounded-0 text-start btn">
    <span className="me-1">#</span>
    {channel.name}
  </Button>
);

export { RemovebleItem, UnremovebleItem };
