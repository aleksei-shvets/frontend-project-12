import {
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/slices/modalSlice.js';

export const RemovableItem = ({
  channel,
  handleChoose,
  currentChannelId,
}) => {
  const dispath = useDispatch();

  const removeChannelHandler = (id) => {
    dispath(modalActions.showModal());
    dispath(modalActions.setModalType('removingChannel'));
    dispath(modalActions.setUpdatedChannelId(id));
  };

  const renameChannelHandler = (id) => {
    dispath(modalActions.showModal());
    dispath(modalActions.setModalType('renamingChannel'));
    dispath(modalActions.setUpdatedChannelId(id));
  };

  const variantColor = () => (Number(currentChannelId) === Number(channel.id) ? 'secondary' : 'light');
  const { t } = useTranslation();
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
        <Dropdown.Item onClick={() => removeChannelHandler(channel.id)} as="button">{t('buttons.deleteBtn')}</Dropdown.Item>
        <Dropdown.Item onClick={() => renameChannelHandler(channel.id)} as="button">{t('buttons.renameBtn')}</Dropdown.Item>
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