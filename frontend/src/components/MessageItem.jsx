export const CurrentUserMessage = ({ item }) => (
  <div key={item?.id} className="container pl-3 mb-4 row text-end">
    <div className="col-lg-2" />
    <div className="col-10">
      <p className="fw-bold m-0 small px-3">{item?.username}</p>
      <div className="rounded px-3 py-1 m-0 bg-secondary-subtle text-break">
        {item?.body}
      </div>
    </div>
  </div>
);

export const OtherUsersMessage = ({ item }) => (
  <div key={item?.id} className="container pl-3 mb-4 row">
    <div className="col-10">
      <p className="fw-bold m-0 small px-3">{item?.username}</p>
      <div className="rounded px-3 py-1 m-0 bg-primary-subtle text-break">
        {item?.body}
      </div>
    </div>
    <div className="col-lg-2" />
  </div>
);
