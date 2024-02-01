import { useSelector } from 'react-redux';
import ChannelsHeader from '../components/ChannelsHeader.jsx';
import ChannelsList from '../components/ChannelsList.jsx';
import { channelsSelector } from '../store/slices/channelsSlice.js';

const ChannelsContainer = () => {
  const handleChoose = () => { };
  const channels = useSelector(channelsSelector.selectAll);
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader />
      <ChannelsList handleChoose={handleChoose} channels={channels} />
    </div>
  );
};

export default ChannelsContainer;
