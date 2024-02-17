import { useSelector, useDispatch } from 'react-redux';
import { channelsSelector, currentChannelIdSelector, channelActions } from '../store/slices/channelsSlice.js';
import ChannelsHeader from '../components/ChannelsHeader.jsx';
import ChannelsList from '../components/ChannelsList.jsx';
import { modalActions } from '../store/slices/modalSlice.js';
import store from '../store/index.js';

const ChannelsContainer = () => {
  const dispath = useDispatch();
  const channels = useSelector((state) => channelsSelector.selectAll(state));
  const currentChannelId = useSelector((state) => currentChannelIdSelector(state));
  /* const currentChannel = useSelector(
    (state) => channelsSelector.selectById(state, currentChannelId),
  ); */
  const handleChoose = (id) => {
    dispath(channelActions.switchChannel(id));
    console.log(store.getState());
  };

  const addChannelModalHandler = () => {
    dispath(modalActions.showModal());
    dispath(modalActions.setModalType('addingChannel'));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader addChannelHandle={addChannelModalHandler} />
      <ChannelsList
        handleChoose={handleChoose}
        channels={channels}
        currentChannelId={currentChannelId}
      />
    </div>
  );
};

export default ChannelsContainer;
