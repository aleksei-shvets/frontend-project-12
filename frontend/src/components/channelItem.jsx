import {
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

export const RemovableItem = ({
  channel,
  handleChoose,
  currentChannelId,
}) => {
  const variantColor = () => (Number(currentChannelId) === Number(channel.id) ? 'secondary' : 'light');
  const renameHandle = () => { };
  const deleteHandle = () => { };
  return (
    <Dropdown as={ButtonGroup} className="m-0 p-0 col w-100 container w-100">
      <Button
        variant={variantColor()}
        className="text-start rounded-start-pill w-100"
        onClick={() => handleChoose(channel.id)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>

      <Dropdown.Toggle
        className="rounded-end-pill"
        split
        variant={variantColor()}
        id="dropdown-split-basic"
      />

      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={deleteHandle} as="button">Удалить</Dropdown.Item>
        <Dropdown.Item onClick={renameHandle} as="button">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const UnremovableItem = ({ channel, handleChoose, currentChannelId }) => (
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
);
