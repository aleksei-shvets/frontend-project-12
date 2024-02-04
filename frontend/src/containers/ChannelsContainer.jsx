import { useSelector } from 'react-redux';
import { channelsSelector, currentChannelIdSelector } from '../store/slices/channelsSlice.js';
import ChannelsHeader from '../components/ChannelsHeader.jsx';
import ChannelsList from '../components/ChannelsList.jsx';

const ChannelsContainer = () => {
  const channels = useSelector((state) => channelsSelector.selectAll(state));
  const currentChannelId = useSelector((state) => currentChannelIdSelector(state));
  /* const currentChannel = useSelector(
    (state) => channelsSelector.selectById(state, currentChannelId),
  ); */
  const handleChoose = () => { };
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader />
      <ChannelsList
        handleChoose={handleChoose}
        channels={channels}
        currentChannelId={currentChannelId}
      />
    </div>
  );
};

export default ChannelsContainer;